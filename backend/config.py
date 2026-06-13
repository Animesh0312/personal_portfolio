from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    openai_api_key: str = ""
    openai_base_url: str = ""
    openai_model: str = "gpt-4o-mini"
    embedding_model: str = "text-embedding-3-small"
    top_k: int = 4
    max_history_messages: int = 6
    chunk_size: int = 700
    chunk_overlap: int = 120
    storage_dir: Path = BASE_DIR / "storage"
    upload_dir: Path = BASE_DIR / "uploads"
    data_dir: Path = BASE_DIR / "data" / "sample_docs"
    max_file_size_mb: int = 10

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
settings.storage_dir.mkdir(parents=True, exist_ok=True)
settings.upload_dir.mkdir(parents=True, exist_ok=True)
settings.data_dir.mkdir(parents=True, exist_ok=True)
