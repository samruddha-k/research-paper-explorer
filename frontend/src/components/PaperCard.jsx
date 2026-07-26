import { useState } from "react";
import {
  Users,
  Calendar,
  Quote,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
  FileText,
  HelpCircle,
  Lightbulb,
  GraduationCap,
  CheckCircle2
} from "lucide-react";
import { analyzePaper } from "../services/paperService";

function PaperCard({ paper }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [showAbstract, setShowAbstract] = useState(false);

  const handleAnalyze = async () => {
    if (analysis) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzePaper(paper.title, paper.abstract);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
      setError("Failed to generate AI insights. Ensure backend API & API key are configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paper-card">
      <div className="card-header">
        <div className="badge-group">
          {paper.year && (
            <span className="badge">
              <Calendar size={12} /> {paper.year}
            </span>
          )}
          <span className="badge">
            <Quote size={12} /> {paper.citations || 0} citations
          </span>
          {analysis?.difficulty && (
            <span className="badge badge-outline">
              <CheckCircle2 size={12} /> {analysis.difficulty}
            </span>
          )}
        </div>
      </div>

      <h2 className="paper-title">{paper.title}</h2>

      {paper.authors && paper.authors.length > 0 && (
        <p className="paper-authors">
          <Users size={14} /> {paper.authors.join(", ")}
        </p>
      )}

      {paper.abstract && (
        <div className="abstract-container">
          <button
            className="btn-text"
            onClick={() => setShowAbstract(!showAbstract)}
          >
            {showAbstract ? (
              <>
                Hide Abstract <ChevronUp size={14} />
              </>
            ) : (
              <>
                Show Abstract <ChevronDown size={14} />
              </>
            )}
          </button>
          {showAbstract && <p className="abstract-text">{paper.abstract}</p>}
        </div>
      )}

      <div className="card-actions">
        {paper.url && (
          <a
            href={paper.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            Read Paper <ExternalLink size={14} />
          </a>
        )}

        <button
          className={`btn btn-ai ${analysis ? "active" : ""}`}
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={15} className="spin-icon" /> Analyzing...
            </>
          ) : analysis ? (
            <>
              <Sparkles size={15} /> AI Analysis Active
            </>
          ) : (
            <>
              <Sparkles size={15} /> Summarize & Analyze
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <HelpCircle size={16} /> {error}
        </div>
      )}

      {analysis && (
        <div className="ai-breakdown-container fade-in">
          <div className="tab-nav">
            <button
              className={`tab-btn ${activeTab === "summary" ? "active" : ""}`}
              onClick={() => setActiveTab("summary")}
            >
              <FileText size={14} /> Summary
            </button>
            <button
              className={`tab-btn ${activeTab === "gaps" ? "active" : ""}`}
              onClick={() => setActiveTab("gaps")}
            >
              <HelpCircle size={14} /> Research Gaps
            </button>
            <button
              className={`tab-btn ${activeTab === "future" ? "active" : ""}`}
              onClick={() => setActiveTab("future")}
            >
              <Lightbulb size={14} /> Future Work
            </button>
            <button
              className={`tab-btn ${activeTab === "prereqs" ? "active" : ""}`}
              onClick={() => setActiveTab("prereqs")}
            >
              <GraduationCap size={14} /> Prerequisites
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "summary" && (
              <div className="tab-pane">
                <h4 className="pane-heading">
                  <FileText size={15} /> Summary & Key Points
                </h4>
                <ul className="bullet-list">
                  {analysis.summary?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "gaps" && (
              <div className="tab-pane">
                <h4 className="pane-heading">
                  <HelpCircle size={15} /> Research Gaps & Limitations
                </h4>
                <ul className="bullet-list">
                  {analysis.research_gaps?.map((gap, idx) => (
                    <li key={idx}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "future" && (
              <div className="tab-pane">
                <h4 className="pane-heading">
                  <Lightbulb size={15} /> Future Work & Directions
                </h4>
                <ul className="bullet-list">
                  {analysis.future_work?.map((work, idx) => (
                    <li key={idx}>{work}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "prereqs" && (
              <div className="tab-pane">
                <h4 className="pane-heading">
                  <GraduationCap size={15} /> Required Knowledge & Prerequisites
                </h4>
                <div className="prereq-tags">
                  {analysis.prerequisites?.map((req, idx) => (
                    <span key={idx} className="prereq-tag">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export default PaperCard;
