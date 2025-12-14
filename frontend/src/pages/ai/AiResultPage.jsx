import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AIResultPage = () => {
  const { id, type } = useParams();
  const { API } = useAuth();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await API.get(`/capsules/${id}/ai?type=${type}`);
        setResult(res.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "AI feature is not available for this capsule."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAI();
  }, [id, type]);

  const titleMap = {
    summary: "🧠 AI Memory Summary",
    caption: "✨ AI Caption Suggestion",
    transcript: "🎧 Audio Transcription"
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Generating AI response...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-3">⚠️ Unable to Generate</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button onClick={() => navigate(-1)} className="text-blue-600 text-sm">
            ← Back to Capsule
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600 mb-4">
          ← Back to Capsule
        </button>

        <h1 className="text-2xl font-bold mb-4">{titleMap[type]}</h1>

        <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {result.content}
        </pre>
      </div>
    </div>
  );
};

export default AIResultPage;
