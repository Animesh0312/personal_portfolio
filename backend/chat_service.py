from __future__ import annotations

from collections import defaultdict
from pathlib import Path
from uuid import uuid4

from backend.config import settings
from backend.document_loader import discover_documents, load_document
from backend.embeddings import EmbeddingService
from backend.text_utils import chunk_text
from backend.vector_store import ChunkRecord, FaissVectorStore


class ChatService:
    def __init__(self) -> None:
        self.embedding_service = EmbeddingService(
            settings.openai_api_key,
            settings.embedding_model,
            settings.openai_base_url,
        )
        self.vector_store = FaissVectorStore(settings.storage_dir, self.embedding_service)
        self.sessions: dict[str, list[dict[str, str]]] = defaultdict(list)

    def bootstrap_sample_documents(self) -> int:
        if self.vector_store.total_chunks() > 0 or not self.embedding_service.is_configured:
            return 0

        paths = discover_documents(settings.data_dir)
        return self.ingest_paths(paths)

    def ingest_paths(self, paths: list[Path]) -> int:
        records: list[ChunkRecord] = []

        for path in paths:
            document = load_document(path)
            chunks = chunk_text(document.text, settings.chunk_size, settings.chunk_overlap)
            for chunk in chunks:
                records.append(
                    ChunkRecord(
                        chunk_id=str(uuid4()),
                        source=document.source,
                        text=chunk,
                    )
                )

        return self.vector_store.add_documents(records)

    def build_retrieval_query(self, session_id: str, message: str) -> str:
        history = self.sessions[session_id]
        if not history:
            return message

        recent_user_messages = [item["content"] for item in history if item["role"] == "user"][-2:]
        if not recent_user_messages:
            return message

        previous_turns = " ".join(recent_user_messages)
        return f"{previous_turns} {message}"

    def add_message(self, session_id: str, role: str, content: str) -> None:
        self.sessions[session_id].append({"role": role, "content": content})
        self.sessions[session_id] = self.sessions[session_id][-settings.max_history_messages :]

    def get_history(self, session_id: str) -> list[dict[str, str]]:
        return self.sessions[session_id]
