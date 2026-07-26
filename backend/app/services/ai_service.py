import os
import json

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
)


def analyze_paper(title: str, abstract: str):

    prompt = f"""
You are an expert AI research assistant.

Analyze the following research paper.

Title:
{title}

Abstract:
{abstract}

Return ONLY valid JSON.

The JSON must have this exact format:

{{
    "summary":[
        "...",
        "...",
        "..."
    ],
    "research_gaps":[
        "...",
        "..."
    ],
    "prerequisites":[
        "...",
        "..."
    ],
    "future_work":[
        "...",
        "..."
    ],
    "difficulty":"Beginner | Intermediate | Advanced"
}}
"""

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="openai/gpt-oss-120b",
        response_format={"type": "json_object"}
    )

    return json.loads(chat_completion.choices[0].message.content)
