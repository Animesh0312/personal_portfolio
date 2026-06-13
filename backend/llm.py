from __future__ import annotations

import re

from openai import OpenAI


SYSTEM_PROMPT = """You are a banking support assistant.
Answer using the retrieved policy and FAQ context when available.
Rules:
- Be precise, clear, and safe.
- If the answer is not grounded in the provided context, say that the information is not available in the knowledge base.
- Do not invent loan terms, fees, timelines, or regulatory details.
- Mention that users should verify critical banking decisions with an official bank representative when appropriate.
"""


class LLMService:
    def __init__(self, api_key: str, model: str, base_url: str = "") -> None:
        self.model = model
        self.client = OpenAI(api_key=api_key, base_url=base_url or None) if api_key else None

    @property
    def is_configured(self) -> bool:
        return self.client is not None

    def generate_answer(self, user_message: str, chat_history: list[dict[str, str]], contexts: list[str]) -> str:
        resolved_message = self._resolve_followup_query(user_message, chat_history)

        if not self.client:
            return self._fallback_answer(resolved_message, contexts)

        history_block = "\n".join(f"{item['role']}: {item['content']}" for item in chat_history[-6:])
        context_block = "\n\n".join(f"Context {idx + 1}: {ctx}" for idx, ctx in enumerate(contexts))

        prompt = f"""
Conversation history:
{history_block or "No prior conversation."}

Retrieved context:
{context_block or "No relevant context retrieved."}

User question:
{resolved_message}
"""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt},
                ],
                temperature=0.2,
            )
            return (response.choices[0].message.content or "").strip()
        except Exception:
            return self._fallback_answer(resolved_message, contexts)

    def _resolve_followup_query(self, user_message: str, chat_history: list[dict[str, str]]) -> str:
        lower_message = user_message.lower()
        pronouns = {"it", "that", "this", "they", "them", "those", "these"}
        tokens = set(re.findall(r"[a-zA-Z0-9]+", lower_message))
        if not (tokens & pronouns):
            return user_message

        previous_user_messages = [item["content"] for item in chat_history if item["role"] == "user"]
        if not previous_user_messages:
            return user_message

        return f"{previous_user_messages[-1]} Follow-up question: {user_message}"

    def _fallback_answer(self, user_message: str, contexts: list[str]) -> str:
        if not contexts:
            return (
                "I could not find relevant information in the knowledge base for that question. "
                "Please upload a relevant banking document or verify with an official bank representative."
            )

        sentences: list[str] = []
        for context in contexts:
            parts = [part.strip() for part in re.split(r"(?<=[.!?])\s+|\n+", context) if part.strip()]
            sentences.extend(parts)

        query_tokens = set(re.findall(r"[a-zA-Z0-9]+", user_message.lower()))

        def score_sentence(sentence: str) -> tuple[int, int]:
            sentence_tokens = set(re.findall(r"[a-zA-Z0-9]+", sentence.lower()))
            overlap = len(query_tokens & sentence_tokens)
            return overlap, len(sentence_tokens)

        ranked_sentences = sorted(sentences, key=score_sentence, reverse=True)
        best_sentences = ranked_sentences[:2] if ranked_sentences else [contexts[0]]
        answer_body = " ".join(best_sentences)

        return (
            "Based on the knowledge base, here is the most relevant information:\n\n"
            f"{answer_body}\n\n"
            "This response is coming from fallback mode because the external LLM is currently unavailable."
        )
