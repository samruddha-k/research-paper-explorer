from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import papers
from app.routers import ai

app = FastAPI(
    title="Research Paper Explorer API"
)

# Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(papers.router)
app.include_router(ai.router)
@app.get("/")
def root():
    return {"message": "API Running"}