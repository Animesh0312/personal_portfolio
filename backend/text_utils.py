from __future__ import annotations


def normalize_text(text: str) -> str:
    return " ".join(text.replace("\u00a0", " ").split())


def chunk_text(text: str, chunk_size: int, chunk_overlap: int) -> list[str]:
    cleaned = normalize_text(text)
    if not cleaned:
        return []

    if chunk_overlap >= chunk_size:
        raise ValueError("chunk_overlap must be smaller than chunk_size")

    chunks: list[str] = []
    start = 0
    step = chunk_size - chunk_overlap

    while start < len(cleaned):
        end = min(start + chunk_size, len(cleaned))
        chunk = cleaned[start:end].strip()

        if end < len(cleaned):
            split_index = chunk.rfind(". ")
            if split_index > chunk_size // 2:
                end = start + split_index + 1
                chunk = cleaned[start:end].strip()

        if chunk:
            chunks.append(chunk)

        if end >= len(cleaned):
            break

        start += step

    return chunks

