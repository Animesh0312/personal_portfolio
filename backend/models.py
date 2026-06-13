from typing import Any

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    session_id: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)


class SourceChunk(BaseModel):
    source: str
    chunk_id: str
    score: float
    text: str


class ChatResponse(BaseModel):
    session_id: str
    answer: str
    sources: list[SourceChunk]
    retrieved_context: list[str]


class UploadResponse(BaseModel):
    indexed_files: list[str]
    chunks_added: int
    total_chunks: int


class HealthResponse(BaseModel):
    status: str
    documents_indexed: int
    vector_store_ready: bool
    llm_configured: bool
    details: dict[str, Any]

