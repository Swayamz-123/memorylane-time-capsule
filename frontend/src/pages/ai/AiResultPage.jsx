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
  }, [id, type, API]);

  const titleMap = {
    summary: "🧠 AI Memory Summary",
    caption: "✨ AI Caption Suggestion",
    transcript: "🎧 Audio Transcription"
  };

  const iconMap = {
    summary: "🧠",
    caption: "✨",
    transcript: "🎧"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-block p-6 bg-amber-100 rounded-2xl mb-6 animate-pulse">
            <div className="w-16 h-16 bg-amber-200 rounded-full mx-auto mb-4"></div>
            <div className="w-48 h-6 bg-amber-200 rounded-full mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">Crafting precious memories...</h2>
          <p className="text-amber-600">AI is weaving your time capsule magic ✨</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Memory Magic Paused</h1>
            <p className="text-amber-600">Something went wrong preserving your moment</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6 text-center">
              <div className="text-amber-500 w-16 h-16 bg-amber-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                ⚠️
              </div>
              <p className="text-amber-800 font-medium">{error}</p>
            </div>
            <button 
              onClick={() => navigate(-1)} 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              ← Back to Your Time Capsule
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col p-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto w-full">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-sm text-amber-700 font-medium mb-8 hover:text-amber-900 transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Capsule
        </button>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 p-8">
          {/* Icon Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-6 bg-linear-to-br from-amber-100 to-amber-200 rounded-3xl mb-6 shadow-xl">
              <div className="text-5xl mb-4">{iconMap[type]}</div>
              <div className="w-32 h-1 bg-linear-to-r from-amber-400 to-amber-600 rounded-full mx-auto"></div>
            </div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent mb-4">
              {titleMap[type]}
            </h1>
            <p className="text-amber-700 text-lg">Preserved forever in your time capsule ✨</p>
          </div>

          {/* AI Result */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-amber-50 via-amber-100 to-amber-50 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative bg-linear-to-br from-amber-50 to-amber-25 border-2 border-amber-200/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
              <div className="absolute top-6 right-6 w-24 h-24 bg-linear-to-r from-amber-400/20 to-amber-500/20 rounded-2xl -rotate-3"></div>
              <div className="absolute bottom-6 left-6 w-20 h-20 bg-linear-to-r from-amber-300/20 to-amber-400/20 rounded-full rotate-3"></div>
              
              <div className="relative z-10 prose prose-amber max-w-none">
                <blockquote className="border-amber-300/50">
                  <p className="text-2xl leading-relaxed text-amber-900/90 font-light tracking-wide whitespace-pre-wrap">
                    {result.content}
                  </p>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-10 pt-8 border-t border-amber-200">
            <button 
              onClick={() => navigator.clipboard.writeText(result.content)}
              className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-4 rounded-xl transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy to Memory
            </button>
            <button 
              onClick={() => navigate(`/capsules/${id}`)} 
              className="flex-1 bg-white border-2 border-amber-300 hover:border-amber-400 text-amber-800 px-6 py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Love This Memory
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-amber-600 text-sm mt-12 opacity-75">
          Crafted with ❤️ by AI for your timeless memories
        </p>
      </div>
    </div>
  );
};

export default AIResultPage;
