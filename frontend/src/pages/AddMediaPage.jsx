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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold mb-4">Add media to capsule</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Text memory (optional)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border rounded p-2"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Files (images / audio / video)
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save media
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMediaPage;
