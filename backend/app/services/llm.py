import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# maintain chat history (if session-based chat is needed)
chat = genai.GenerativeModel("models/gemini-1.5-pro-latest").start_chat(history=[])

def ask_llm(question: str) -> str:
    try:
        # Instructional system prompt
        prompt = f"""
You are a helpful and concise travel assistant.
Respond to travel-related queries with accurate and relevant information.
If documentation or rules depend on the traveler's nationality or destination, clarify that.
Keep responses clear and polite.

User: {question}
"""
        response = chat.send_message(prompt)
        return response.text
    except Exception as e:
        return f"Error: {e}"

