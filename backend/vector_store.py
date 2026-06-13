from __future__ import annotations

import json
import math
import re
from dataclasses import asdict, dataclass
from pathlib import Path

import faiss
import numpy as np

from backend.embeddings import EmbeddingService


@dataclass
class ChunkRecord:
    chunk_id: str
    source: str
    text: str


class FaissVectorStore:
    def __init__(self, storage_dir: Path, embedding_service: EmbeddingService) -> None:
        self.storage_dir = storage_dir
        self.index_path = storage_dir / "faiss.index"
        self.meta_path = storage_dir / "chunks.json"
        self.embedding_service = embedding_service
        self.index: faiss.IndexFlatL2 | None = None
        self.records: list[ChunkRecord] = []
        self._load()

    def add_documents(self, records: list[ChunkRecord]) -> int:
        if not records:
            return 0

        texts = [record.text for record in records]
        embeddings = self.embedding_service.embed_texts(texts)
        embeddings_array = np.asarray(embeddings, dtype="float32")
        faiss.normalize_L2(embeddings_array)

        if self.index is None:
            self.index = faiss.IndexFlatL2(embeddings_array.shape[1])
        self.index.add(embeddings_array)
        self.records.extend(records)
        self._persist()
        return len(records)

    def similarity_search(self, query: str, top_k: int) -> list[tuple[ChunkRecord, float]]:
        if not self.records:
            return []

        vector_scores: dict[int, float] = {}
        if self.index is not None and self.index.ntotal > 0:
            query_embedding = self.embedding_service.embed_texts([query])
            query_array = np.asarray(query_embedding, dtype="float32")
            faiss.normalize_L2(query_array)
            distances, indices = self.index.search(query_array, min(top_k * 3, len(self.records)))

            for idx, distance in zip(indices[0], distances[0]):
                if idx == -1:
                    continue
                vector_scores[idx] = 1 / (1 + float(distance))

        scored_records: list[tuple[ChunkRecord, float]] = []
        for idx, record in enumerate(self.records):
            lexical_score = self._lexical_score(query, record.text)
            vector_score = vector_scores.get(idx, 0.0)
            score = (0.65 * lexical_score) + (0.35 * vector_score)
            if score > 0:
                scored_records.append((record, score))

        scored_records.sort(key=lambda item: item[1], reverse=True)
        return scored_records[:top_k]

    def total_chunks(self) -> int:
        return len(self.records)

    def _persist(self) -> None:
        if self.index is not None:
            faiss.write_index(self.index, str(self.index_path))
        self.meta_path.write_text(
            json.dumps([asdict(record) for record in self.records], indent=2),
            encoding="utf-8",
        )

    def _load(self) -> None:
        if self.index_path.exists():
            self.index = faiss.read_index(str(self.index_path))

        if self.meta_path.exists():
            data = json.loads(self.meta_path.read_text(encoding="utf-8"))
            self.records = [ChunkRecord(**item) for item in data]

    def _lexical_score(self, query: str, text: str) -> float:
        query_tokens = re.findall(r"[a-zA-Z0-9]+", query.lower())
        text_tokens = re.findall(r"[a-zA-Z0-9]+", text.lower())
        if not query_tokens or not text_tokens:
            return 0.0

        query_set = set(query_tokens)
        text_set = set(text_tokens)
        overlap = len(query_set & text_set)
        phrase_bonus = 0.15 if query.lower() in text.lower() else 0.0
        return (overlap / math.sqrt(len(query_set) * len(text_set))) + phrase_bonus

    def reset(self) -> None:
        """Clear the in-memory and on-disk index and metadata."""
        # remove index file
        try:
            if self.index_path.exists():
                self.index_path.unlink()
        except Exception:
            pass

        # remove meta file
        try:
            if self.meta_path.exists():
                self.meta_path.unlink()
        except Exception:
            pass

        self.index = None
        self.records = []
