import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RecipientManager = ({ capsuleId, recipients = [], isUnlocked, onRecipientsChange }) => {
  const { API } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);
      setError("");

      await API.post(`/capsules/${capsuleId}/recipients`, {
        email: email.trim(),
      });

      const updated = [...recipients, email.trim()];
      onRecipientsChange(updated);

      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add recipient");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (emailToRemove) => {
    try {
      setLoading(true);
      setError("");

      await API.delete(`/capsules/${capsuleId}/recipients`, {
        data: { email: emailToRemove },
      });

      const updated = recipients.filter((email) => email !== emailToRemove);
      onRecipientsChange(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove recipient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Header */}
      <div className="group relative bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-5 rounded-3xl border border-amber-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
        <div className="p-3 bg-linear-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg border border-purple-200/60 relative z-10">
          <svg
            className="w-7 h-7 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent">
            Recipients
          </h3>
          <p className="text-sm text-amber-700 font-medium">
            {recipients.length} recipient{recipients.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50/90 border-l-4 border-red-500 text-red-700 p-3 rounded-2xl shadow-md text-sm">
          {error}
        </div>
      )}

      {/* Add Recipient Form */}
      {!isUnlocked && (
        <div className="group/form relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-amber-200/60 p-5 hover:shadow-2xl transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-700" />
          <div className="flex gap-3 relative z-10">
            <input
              type="email"
              placeholder="recipient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/70 backdrop-blur-sm border-2 border-amber-200/70 focus:border-purple-500 focus:ring-4 focus:ring-purple-200/40 p-3.5 rounded-2xl transition-all duration-300 outline-none text-sm text-amber-900 placeholder-amber-400"
            />
            <button
              onClick={handleAdd}
              disabled={loading || !email.trim()}
              className="group/btn relative bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-sm"
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none" />
              {loading ? (
                <span className="flex items-center gap-2 relative z-10">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Adding...
                </span>
              ) : (
                <span className="relative z-10">Add</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Recipients List */}
      {recipients.length === 0 ? (
        <div className="group relative bg-linear-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl rounded-3xl border border-amber-200/50 p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          <svg
            className="w-10 h-10 text-amber-300 mx-auto mb-3 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="text-amber-700 font-medium text-sm relative z-10">
            No recipients yet
          </p>
          <p className="text-xs text-amber-500 mt-1 relative z-10">
            Add people who will receive this capsule
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {recipients.map((rEmail) => (
            <li
              key={rEmail}
              className="group/item relative flex justify-between items-center bg-white/80 backdrop-blur-xl border border-amber-200/60 rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-2xl blur opacity-0 group-hover/item:opacity-25 transition-opacity duration-500" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-linear-to-br from-purple-200 to-indigo-200 rounded-2xl flex items-center justify-center shadow-md border border-purple-200/60">
                  <svg
                    className="w-5 h-5 text-purple-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <p className="font-medium text-amber-900 text-sm">{rEmail}</p>
              </div>

              {!isUnlocked && (
                <button
                  onClick={() => handleRemove(rEmail)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800 font-medium text-xs px-3 py-1.5 rounded-xl hover:bg-red-50 transition-all duration-300 disabled:opacity-50 relative z-10"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Locked Notice */}
      {isUnlocked && (
        <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-3 text-xs text-blue-700 flex gap-2 items-start">
          <svg
            className="w-4 h-4 text-blue-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>Recipients cannot be modified after the capsule is unlocked.</p>
        </div>
      )}
    </div>
  );
};

export default RecipientManager;