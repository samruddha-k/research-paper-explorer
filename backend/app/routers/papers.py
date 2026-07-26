from fastapi import APIRouter
from app.services.paper_service import search_papers
from app.schemas.paper_schema import Paper
from typing import List


router = APIRouter(
    prefix="/papers",
    tags=["Research Papers"]
)


@router.get("/search", response_model=List[Paper])
def search(query: str):
    return search_papers(query)