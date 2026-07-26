from pydantic import BaseModel


class AnalyzePaperRequest(BaseModel):
    title: str
    abstract: str