from __future__ import annotations

import re

import numpy as np
from openai import OpenAI


class EmbeddingService:
    def __init__(self, api_key: str, model: str, base_url: str = "", fallback_dimension: int = 512) -> None:
        self.model = model
        self.fallback_dimension = fallback_dimension
        self.client = OpenAI(api_key=api_key, base_url=base_url or None) if api_key else None

    @property
    def is_configured(self) -> bool:
        return self.client is not None

    @property
    def mode(self) -> str:
        return "openai-compatible" if self.client is not None else "local-fallback"

    def embed_texts(self, texts: list[str]) -> list[list[float]]:
        if self.client:
            try:
                response = self.client.embeddings.create(model=self.model, input=texts)
                return [item.embedding for item in response.data]
            except Exception:
                pass

        return [self._fallback_embed(text).tolist() for text in texts]

    def _fallback_embed(self, text: str) -> np.ndarray:
        vector = np.zeros(self.fallback_dimension, dtype="float32")
        tokens = re.findall(r"[a-zA-Z0-9]+", text.lower())
        if not tokens:
            return vector

        for token in tokens:
            index = hash(token) % self.fallback_dimension
            vector[index] += 1.0

        norm = np.linalg.norm(vector)
        if norm > 0:
            vector /= norm
        return vector
