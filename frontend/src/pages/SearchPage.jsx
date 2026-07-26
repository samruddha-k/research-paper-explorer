import { useState } from "react";
import {
  Sparkles,
  Search,
  Loader2,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Bot,
  Cpu,
  Atom,
  Network,
  Dna,
  Gamepad2,
  Compass
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import PaperCard from "../components/PaperCard";
import { searchPapers } from "../services/paperService";

const POPULAR_TOPICS = [
  { label: "Large Language Models", icon: Bot },
  { label: "Transformers", icon: Cpu },
  { label: "Quantum Computing", icon: Atom },
  { label: "Graph Neural Networks", icon: Network },
  { label: "CRISPR Gene Editing", icon: Dna },
  { label: "Reinforcement Learning", icon: Gamepad2 }
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async (searchTopic) => {
    const activeQuery = searchTopic || query;
    if (!activeQuery || activeQuery.trim() === "") return;

    if (searchTopic) {
      setQuery(searchTopic);
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchPapers(activeQuery);
      setPapers(data);
      setSearchedQuery(activeQuery);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch research papers. Please check if the backend API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page-container">
      <header className="hero-header">
        <div className="hero-badge">
          <Compass size={13} /> OpenAlex & Groq AI
        </div>
        <h1 className="hero-title">Research Paper Explorer</h1>
        <p className="hero-subtitle">
          Discover academic literature, summarize complex papers, extract research gaps, and unlock future directions.
        </p>
      </header>

      <main className="main-content">
        <div className="search-section">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={() => handleSearch()}
            loading={loading}
          />

          <div className="quick-topics">
            <span className="quick-topics-label">Trending topics:</span>
            <div className="topic-chips">
              {POPULAR_TOPICS.map(({ label, icon: IconComponent }) => (
                <button
                  key={label}
                  className="chip-btn"
                  onClick={() => handleSearch(label)}
                >
                  <IconComponent size={14} /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>


        {error && (
          <div className="error-banner global-error">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <Loader2 size={24} className="spin-icon empty-icon" />
            <p>Fetching top research literature from OpenAlex...</p>
          </div>
        )}

        {!loading && searchedQuery && (
          <div className="results-header">
            <h3>
              Showing top results for <span className="highlight-query">"{searchedQuery}"</span>
            </h3>
            <span className="results-count-badge">{papers.length} Papers Found</span>
          </div>
        )}

        {!loading && papers.length > 0 && (
          <div className="papers-list">
            {papers.map((paper, index) => (
              <PaperCard key={index} paper={paper} />
            ))}
          </div>
        )}

        {!loading && searchedQuery && papers.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Search size={32} />
            </div>
            <h3>No research papers found</h3>
            <p>Try searching with broader academic terms or different keywords.</p>
          </div>
        )}

        {!loading && !searchedQuery && (
          <div className="hero-placeholder">
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <BookOpen size={20} />
                </div>
                <h4>Instant OpenAlex Access</h4>
                <p>Search over 200M+ research papers, citation metrics, and open-access links globally.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Sparkles size={20} />
                </div>
                <h4>AI Paper Summarizer</h4>
                <p>Get concise bullet-point summaries of complex papers generated directly by AI.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <TrendingUp size={20} />
                </div>
                <h4>Research Gaps & Future Work</h4>
                <p>Uncover critical missing pieces, limitations, and key opportunities for future study.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
