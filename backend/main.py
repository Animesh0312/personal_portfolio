from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.chat_service import ChatService
from backend.config import settings
from backend.document_loader import SUPPORTED_EXTENSIONS
from backend.llm import LLMService
from backend.models import ChatRequest, ChatResponse, HealthResponse, SourceChunk, UploadResponse


app = FastAPI(title="GenAI Banking Support Chatbot", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chat_service = ChatService()
llm_service = LLMService(settings.openai_api_key, settings.openai_model, settings.openai_base_url)


@app.on_event("startup")
def startup_event() -> None:
    chat_service.bootstrap_sample_documents()


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        documents_indexed=chat_service.vector_store.total_chunks(),
        vector_store_ready=chat_service.vector_store.total_chunks() > 0,
        llm_configured=llm_service.is_configured,
        details={
            "embedding_model": settings.embedding_model,
            "llm_model": settings.openai_model,
            "llm_base_url": settings.openai_base_url or "default",
            "embedding_configured": chat_service.embedding_service.is_configured,
            "embedding_mode": chat_service.embedding_service.mode,
            "supported_extensions": sorted(SUPPORTED_EXTENSIONS),
        },
    )


@app.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    if chat_service.vector_store.total_chunks() == 0:
        raise HTTPException(
            status_code=400,
            detail="Knowledge base is empty. Upload or index documents first.",
        )

    retrieval_query = chat_service.build_retrieval_query(payload.session_id, payload.message)
    search_results = chat_service.vector_store.similarity_search(retrieval_query, settings.top_k)
    contexts = [record.text for record, _score in search_results]

    answer = llm_service.generate_answer(
        user_message=payload.message,
        chat_history=chat_service.get_history(payload.session_id),
        contexts=contexts,
    )

    chat_service.add_message(payload.session_id, "user", payload.message)
    chat_service.add_message(payload.session_id, "assistant", answer)

    sources = [
        SourceChunk(
            source=record.source,
            chunk_id=record.chunk_id,
            score=round(score, 4),
            text=record.text,
        )
        for record, score in search_results
    ]

    return ChatResponse(
        session_id=payload.session_id,
        answer=answer,
        sources=sources,
        retrieved_context=contexts,
    )


@app.post("/upload", response_model=UploadResponse)
async def upload(files: list[UploadFile] = File(...)) -> UploadResponse:
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded.")
    saved_paths: list[Path] = []
    for file in files:
        suffix = Path(file.filename or "").suffix.lower()
        if suffix not in SUPPORTED_EXTENSIONS:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {suffix}")

        content = await file.read()
        if len(content) > settings.max_file_size_mb * 1024 * 1024:
            raise HTTPException(status_code=400, detail=f"File {file.filename} exceeds size limit.")

        destination = settings.upload_dir / file.filename
        destination.write_bytes(content)
        saved_paths.append(destination)

    chunks_added = chat_service.ingest_paths(saved_paths)
    return UploadResponse(
        indexed_files=[path.name for path in saved_paths],
        chunks_added=chunks_added,
        total_chunks=chat_service.vector_store.total_chunks(),
    )


@app.post("/clear")
def clear_knowledge_base():
    """Clear persisted vector index and metadata. Use with caution."""
    try:
        chat_service.vector_store.reset()
        # also clear session histories
        chat_service.sessions.clear()
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to clear knowledge base")

    return {"total_chunks": chat_service.vector_store.total_chunks()}


frontend_dir = Path(__file__).resolve().parent.parent / "frontend"
app.mount("/static", StaticFiles(directory=frontend_dir), name="static")


@app.get("/")
def root() -> FileResponse:
    return FileResponse(frontend_dir / "index.html")
