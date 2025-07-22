from fastapi import APIRouter
from app.schemas.query import UserQuery
from app.services.llm import ask_llm

router = APIRouter()

@router.post("/ask")
def ask_question(query: UserQuery):
    try:
        answer = ask_llm(query.question)
        return {"answer": answer} # return this to the user
    except Exception as e:
        return {"error": str(e)}

