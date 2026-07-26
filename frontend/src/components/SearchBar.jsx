import { Search, Loader2, X } from "lucide-react";

function SearchBar({ query, setQuery, onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">
          <Search size={18} />
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search millions of papers (e.g. Transformers, Quantum Computing, LLMs)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <button type="submit" className="btn btn-primary search-submit-btn" disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={16} className="spin-icon" /> Searching...
          </>
        ) : (
          "Explore Papers"
        )}
      </button>
    </form>
  );
}

export default SearchBar;
