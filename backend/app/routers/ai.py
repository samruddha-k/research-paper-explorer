from fastapi import APIRouter

from app.schemas.ai import AnalyzePaperRequest
from app.services.ai_service import analyze_paper

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/analyze")
def analyze(request: AnalyzePaperRequest):

    result = analyze_paper(
        request.title,
        request.abstract
    )

    return result