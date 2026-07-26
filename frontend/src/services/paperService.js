import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function searchPapers(query) {
    const response = await axios.get(
        `${API_URL}/papers/search`,
        {
            params: {
                query: query
            }
        }
    );

    return response.data;
}

export async function analyzePaper(title, abstract) {
    const response = await axios.post(
        `${API_URL}/ai/analyze`,
        {
            title: title,
            abstract: abstract || "No abstract provided."
        }
    );

    return response.data;
}