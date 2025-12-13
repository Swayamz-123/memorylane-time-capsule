import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MediaViewer from "../components/MediaViewer";

const CapsuleViewPage = () => {
  const { id } = useParams();
  const { API } = useAuth();

  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const res = await API.get(`/capsules/${id}`);
        console.log(res.data.data)
        setCapsule(res.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load capsule"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [API, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading capsule...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!capsule) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{capsule.title}</h1>
            <p className="text-sm text-gray-500 capitalize">
              Theme: {capsule.theme}
            </p>
          </div>

          <span className="text-2xl">
            {capsule.isUnlocked ? "🔓" : "🔒"}
          </span>
        </div>

        {/* Description */}
        {capsule.description && (
          <p className="text-gray-700 mb-4">
            {capsule.description}
          </p>
        )}

        {/* Locked State */}
        {!capsule.isUnlocked && (
          <div className="border border-dashed border-gray-300 rounded p-6 text-center">
            <p className="text-lg font-medium mb-2">
              This capsule is locked
            </p>
            <p className="text-sm text-gray-600">
              It will unlock automatically at the scheduled time.
            </p>
          </div>
        )}

        {/* Unlocked Content */}
        {capsule.isUnlocked && (
          <>
            {/* Media */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">
                Memories
              </h2>

              <div className="space-y-4">
                {capsule.media?.map((item, index) => (
                  <MediaViewer key={index} media={item} />
                ))}
              </div>
            </div>

            {/* AI Section (Backend-powered) */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">
                AI Memory Assistant
              </h2>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() =>
                    API.get(`/capsules/${id}/ai?type=summary`)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Generate Summary
                </button>

                <button
                  onClick={() =>
                    API.get(`/capsules/${id}/ai?type=caption`)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Generate Caption
                </button>

                <button
                  onClick={() =>
                    API.get(`/capsules/${id}/ai?type=transcript`)
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Transcribe Audio
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                AI output is generated securely on the server.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CapsuleViewPage;
