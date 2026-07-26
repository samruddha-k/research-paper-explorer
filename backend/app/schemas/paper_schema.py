from pydantic import BaseModel
from typing import List, Optional


class Paper(BaseModel):
    title: str
    year: Optional[int] = None
    citations: Optional[int] = None
    authors: List[str] = []
    url: Optional[str] = None
    abstract: Optional[str] = ""