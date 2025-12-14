import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateCapsule = () => {
  const { API } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("other");
  const [unlockType, setUnlockType] = useState("date");
  const [unlockDate, setUnlockDate] = useState("");
  const [unlockEvent, setUnlockEvent] = useState("");
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title) {
      setError("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("theme", theme);
    formData.append("unlockType", unlockType);

    if (unlockType === "date") {
      // Convert local datetime to UTC ISO string for DB storage
      const localDate = new Date(unlockDate);
      if (isNaN(localDate.getTime())) {
        setError("Please select a valid unlock date and time");
        return;
      }
      const utcDate = localDate.toISOString(); // Converts IST/local to UTC
      formData.append("unlockDate", utcDate);
    }

    if (unlockType === "event") {
      formData.append("unlockEvent", unlockEvent);
    }

    if (text.trim()) {
      formData.append("text", text);
    }

    for (let file of files) {
      formData.append("media", file);
    }

    try {
      setLoading(true);
      await API.post("/capsules", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create capsule"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-linear-to-br from-amber-200/60 to-orange-200/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-40 h-40 bg-linear-to-br from-orange-200/60 to-amber-300/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header card */}
        <div className="group mb-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-200/60 shadow-2xl p-6 sm:p-8 flex items-center gap-4 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative flex items-center gap-4 z-10">
            <div className="p-3 sm:p-4 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg border border-amber-200/70">
              <svg
                className="w-7 h-7 text-amber-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 1.343-3 3 0 .795.316 1.515.828 2.036A3.001 3.001 0 0012 17m0-9a3 3 0 013 3c0 .795-.316 1.515-.828 2.036A3.001 3.001 0 0112 17m0-9V5m0 12v2m-7-7H3m18 0h-2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent">
                Create Time Capsule
              </h1>
              <p className="mt-1 text-sm sm:text-base text-amber-700">
                Capture a memory, choose when it opens, and attach photos, videos, or audio.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-2xl text-sm shadow-md">
            {error}
          </div>
        )}

        {/* Form card */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/70 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-amber-900">
                Title<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="text"
                placeholder="Give your capsule a meaningful title"
                className="w-full border border-amber-200 rounded-2xl px-3.5 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-all bg-white/80"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-amber-900">
                Description <span className="text-xs text-amber-500">(optional)</span>
              </label>
              <textarea
                placeholder="Describe what this capsule is about..."
                className="w-full border border-amber-200 rounded-2xl px-3.5 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-all bg-white/80"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Theme + unlock type */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-amber-900">
                  Theme
                </label>
                <select
                  className="w-full border border-amber-200 rounded-2xl px-3.5 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 bg-white/80"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="childhood">Childhood</option>
                  <option value="family">Family</option>
                  <option value="college">College</option>
                  <option value="career">Career</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-amber-900">
                  Unlock Type
                </label>
                <select
                  className="w-full border border-purple-200 rounded-2xl px-3.5 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 bg-white/80"
                  value={unlockType}
                  onChange={(e) => setUnlockType(e.target.value)}
                >
                  <option value="date">Unlock by Date</option>
                  <option value="event">Unlock by Event</option>
                </select>
              </div>
            </div>

            {/* Unlock date / event */}
            {unlockType === "date" && (
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-amber-900">
                  Unlock Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full border border-purple-200 rounded-2xl px-3.5 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 bg-white/80"
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)} // Prevents past dates
                />
                <p className="text-xs text-purple-600 mt-1">
                  User selects local time (IST) → Automatically converted to UTC for storage
                </p>
              </div>
            )}

            {unlockType === "event" && (
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-amber-900">
                  Unlock Event
                </label>
                <input
                  type="text"
                  placeholder="e.g. Graduation, Wedding, First Job"
                  className="w-full border border-purple-200 rounded-2xl px-3.5 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 bg-white/80"
                  value={unlockEvent}
                  onChange={(e) => setUnlockEvent(e.target.value)}
                />
              </div>
            )}

            {/* Text memory */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-amber-900">
                Write a memory
              </label>
              <textarea
                placeholder="Write what you want your future self or loved ones to remember..."
                className="w-full border border-amber-200 rounded-2xl px-3.5 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 bg-white/80"
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Media upload */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-amber-900">
                Attach media <span className="text-xs text-amber-500">(optional)</span>
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="file"
                  multiple
                  accept="image/*,audio/*,video/*"
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  className="text-sm text-amber-800 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 cursor-pointer"
                />
                {files.length > 0 && (
                  <p className="text-xs text-amber-600">
                    {files.length} file{files.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center justify-center bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {loading ? "Creating..." : "Create Capsule"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCapsule;
