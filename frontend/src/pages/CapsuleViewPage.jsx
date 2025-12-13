import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MediaViewer from "../components/MediaViewer";
import CollaboratorManager from "../components/CollaBoratorManager";

const CapsuleViewPage = () => {
  const { id } = useParams();
  const { API, user } = useAuth();

  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCapsule = async () => {
    try {
      const res = await API.get(`/capsules/${id}`);
      setCapsule(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load capsule");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapsule();
  }, [id]);

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

  if (!capsule) return null;

  const isOwner = capsule.owner?._id === user?._id;

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
          <p className="text-gray-700 mb-4">{capsule.description}</p>
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
              <h2 className="text-lg font-semibold mb-3">Memories</h2>
              <div className="space-y-4">
                {capsule.media?.map((item, index) => (
                  <MediaViewer key={index} media={item} />
                ))}
              </div>
            </div>

            {/* AI Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">
                AI Memory Assistant
              </h2>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() =>
                    API.get(`/capsules/${id}/ai?type=summary`)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Generate Summary
                </button>

                <button
                  onClick={() =>
                    API.get(`/capsules/${id}/ai?type=caption`)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Generate Caption
                </button>

                <button
                  onClick={() =>
                    API.get(`/capsules/${id}/ai?type=transcript`)
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Transcribe Audio
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                AI output is generated securely on the server.
              </p>
            </div>

            {/* Collaborators (Owner Only) */}
            {isOwner && (
              <CollaboratorManager
                capsuleId={capsule._id}
                collaborators={capsule.collaborators}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CapsuleViewPage;
