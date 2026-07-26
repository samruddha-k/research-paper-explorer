import httpx

BASE_URL = "https://api.openalex.org/works"


def reconstruct_abstract(inverted_index):
    if not inverted_index:
        return ""
    word_positions = []
    for word, positions in inverted_index.items():
        for pos in positions:
            word_positions.append((pos, word))
    word_positions.sort(key=lambda x: x[0])
    return " ".join(word for _, word in word_positions)


def search_papers(query: str):

    params = {
        "search": query,
        "per-page": 10
    }

    response = httpx.get(
        BASE_URL,
        params=params
    )

    data = response.json()

    papers = []

    for item in data.get("results", []):

        authors = []

        for author in item.get("authorships", []):
            if "author" in author and "display_name" in author["author"]:
                authors.append(author["author"]["display_name"])

        abstract = reconstruct_abstract(item.get("abstract_inverted_index"))

        papers.append(
            {
                "title": item.get("title") or "Untitled Paper",
                "year": item.get("publication_year"),
                "citations": item.get("cited_by_count", 0),
                "authors": authors,
                "url": item.get("doi") or item.get("id"),
                "abstract": abstract
            }
        )

    return papers