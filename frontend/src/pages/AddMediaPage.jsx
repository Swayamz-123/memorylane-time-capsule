import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddMediaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API } = useAuth();

  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (text.trim()) formData.append("text", text.trim());
    for (const file of files) {
      formData.append("media", file);
    }

    try {
      await API.post(`/capsules/${id}/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/capsules/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add media");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 p-6 sm:p-8 lg:p-12 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-linear-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-linear-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-xl animate-float-medium"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border border-amber-200/50 hover:border-amber-300/70 font-semibold mb-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:bg-white text-amber-800"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Capsule
        </button>

        {/* Header */}
        <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 p-10 text-center mb-8 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
          <div className="inline-block p-6 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-3xl shadow-xl mb-6 border border-amber-200/50 backdrop-blur-sm group-hover:scale-105 transition-all duration-500 relative z-10">
            <svg className="w-14 h-14 text-amber-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-4xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-2xl mb-3 relative z-10">
            Add to Capsule
          </h1>
          <p className="text-xl text-amber-700 font-light tracking-wide relative z-10">Preserve more memories for the future ✨</p>
        </div>

        {/* Form Card */}
        <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 p-8 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Text Memory */}
            <div className="group/input">
              <label className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-3 bg-linear-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-2xl border border-amber-200/50">
                <svg className="w-6 h-6 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Written Memory
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write down your thoughts, feelings, or a message for the future..."
                className="w-full bg-white/60 backdrop-blur-sm border-2 border-amber-200/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/30 p-6 rounded-2xl transition-all duration-500 outline-none resize-none text-lg font-medium text-amber-800 placeholder-amber-400 shadow-xl hover:shadow-2xl group-hover/input:border-amber-400"
                rows={6}
              />
              <p className="text-sm text-amber-600 mt-3 font-medium italic bg-amber-50/50 px-4 py-2 rounded-xl border border-amber-200/30">Optional - Leave blank if you're only uploading files</p>
            </div>

            {/* File Upload */}
            <div className="group/upload">
              <label className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-3 bg-linear-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-2xl border border-amber-200/50">
                <svg className="w-6 h-6 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Media Files
              </label>
              <div className="group/drop border-2 border-dashed border-amber-300/60 hover:border-amber-500/80 bg-linear-to-br from-amber-50/50 to-orange-50/30 backdrop-blur-sm rounded-3xl p-10 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:bg-amber-50/70 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-amber-200/20 to-orange-200/20 -skew-x-12 opacity-0 group-hover/drop:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <svg className="w-20 h-20 text-amber-400 mx-auto mb-6 group-hover/drop:scale-110 transition-transform duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                
                <input
                  type="file"
                  multiple
                  accept="image/*,audio/*,video/*"
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer block relative z-10">
                  <span className="text-amber-700 font-bold text-xl hover:text-amber-900 mb-2 bg-linear-to-r from-amber-200 to-orange-200 px-6 py-3 rounded-2xl inline-block shadow-lg hover:shadow-xl transition-all duration-300">
                    Click to upload media
                  </span>
                  <span className="text-amber-500 text-lg block font-medium">
                    Images, videos, or audio files
                  </span>
                </label>

                {files.length > 0 && (
                  <div className="mt-8 space-y-3 relative z-10">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-amber-200/50 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-amber-800 bg-linear-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-xl">
                          {files.length} file{files.length !== 1 ? 's' : ''} selected
                        </span>
                        <button
                          type="button"
                          onClick={() => setFiles([])}
                          className="group/clear text-sm text-red-600 hover:text-red-800 font-bold px-4 py-2 bg-red-50/50 hover:bg-red-100 rounded-xl border border-red-200/50 hover:border-red-300 transition-all duration-300"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {files.map((file, index) => (
                          <div key={index} className="text-sm text-amber-700 bg-linear-to-r from-amber-50 to-orange-50 px-4 py-3 rounded-xl border border-amber-200/30 flex items-center gap-3 shadow-sm">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {file.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 relative z-10">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 group relative bg-linear-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent -skew-x-12 -rotate-2 group-hover:animate-shimmer pointer-events-none"></div>
                <span className="relative z-10">Cancel</span>
              </button>
              <button
                type="submit"
                disabled={!text.trim() && files.length === 0}
                className="flex-1 group relative bg-linear-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-700 hover:via-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover:animate-shimmer pointer-events-none"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Save Media ✨
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="group relative mt-8 bg-linear-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-indigo-400/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex gap-4 relative z-10">
            <div className="p-3 bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-lg border border-blue-200/50 shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-lg text-blue-800 font-medium">
              <p className="font-bold mb-2 text-xl bg-linear-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">Tip:</p>
              <p>You can add both text and files, or just one type. All media will be preserved in your time capsule.</p>
            </div>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default AddMediaPage;
