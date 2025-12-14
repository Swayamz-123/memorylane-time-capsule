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
      formData.append("unlockDate", unlockDate);
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          Create Time Capsule
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Capsule title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Description (optional)"
            className="w-full border p-2 rounded"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Theme */}
          <select
            className="w-full border p-2 rounded"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="childhood">Childhood</option>
            <option value="family">Family</option>
            <option value="college">College</option>
            <option value="career">Career</option>
            <option value="other">Other</option>
          </select>

          {/* Unlock Type */}
          <select
            className="w-full border p-2 rounded"
            value={unlockType}
            onChange={(e) => setUnlockType(e.target.value)}
          >
            <option value="date">Unlock by Date</option>
            <option value="event">Unlock by Event</option>
          </select>

          {/* Unlock Date */}
          {unlockType === "date" && (
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={unlockDate}
              onChange={(e) => setUnlockDate(e.target.value)}
            />
          )}

          {/* Unlock Event */}
          {unlockType === "event" && (
            <input
              type="text"
              placeholder="Unlock event (e.g. Graduation)"
              className="w-full border p-2 rounded"
              value={unlockEvent}
              onChange={(e) => setUnlockEvent(e.target.value)}
            />
          )}

          {/* Text Memory */}
          <textarea
            placeholder="Write a memory..."
            className="w-full border p-2 rounded"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Media Upload */}
          <input
            type="file"
            multiple
            accept="image/*,audio/*,video/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Capsule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;
