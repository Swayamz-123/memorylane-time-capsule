import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MediaViewer from "../components/MediaViewer";
import CollaboratorManager from "../components/CollaBoratorManager";
import RecipientManager from "../components/RecipentManager";

const CapsuleViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    return <div className="min-h-screen flex items-center justify-center">Loading capsule...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  if (!capsule) return null;

  const isOwner = capsule.owner?._id === user?._id && capsule?.isUnlocked
   const canEdit = capsule.owner?._id === user?._id && !capsule?.isUnlocked
  console.log(canEdit)

  // 🔐 MEDIA CHECKS
  const hasText = capsule.media?.some(m => m.type === "text");
  const hasImage = capsule.media?.some(m => m.type === "image");
  const hasAudio = capsule.media?.some(m => m.type === "audio");

  const handleAI = (type) => {
    if (type === "summary" && !hasText) {
      alert("Sorry, this capsule does not contain any text memories.");
      return;
    }

    if (type === "caption" && !hasText ) {
      alert("Sorry, captions require text or image memories.");
      return;
    }

    if (type === "transcript" && !hasAudio) {
      alert("Sorry, no audio file exists in this capsule.");
      return;
    }

    navigate(`/capsules/${id}/ai/${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{capsule.title}</h1>
            <p className="text-sm text-gray-500 capitalize">Theme: {capsule.theme}</p>
          </div>
          <span className="text-2xl">{capsule.isUnlocked ? "🔓" : "🔒"}</span>
        </div>

        {capsule.description && (
          <p className="text-gray-700 mb-4">{capsule.description}</p>
        )}

        {/* LOCKED */}
        {!capsule.isUnlocked && (
          <>
            <div className="border border-dashed border-gray-300 rounded p-6 text-center mb-6">
              <p className="text-lg font-medium mb-2">This capsule is locked</p>
              <p className="text-sm text-gray-600">
                It will unlock automatically at the scheduled time.
              </p>
            </div>

            {canEdit && (
              <>
                <CollaboratorManager capsuleId={capsule._id} collaborators={capsule.collaborators} />
               <RecipientManager  capsuleId={capsule._id}  recipients={capsule.recipients}/>
              </>
            )}
          </>
        )}

        {/* UNLOCKED */}
        {capsule.isUnlocked && (
          <>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Memories</h2>
              <div className="space-y-4">
                {capsule.media?.map((item, index) => (
                  <MediaViewer key={index} media={item} />
                ))}
              </div>
            </div>

            {/* AI */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">AI Memory Assistant</h2>

              <div className="flex gap-3 flex-wrap">
                <button onClick={() => handleAI("summary")} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Generate Summary
                </button>

                <button onClick={() => handleAI("caption")} className="bg-green-600 text-white px-4 py-2 rounded">
                  Generate Caption
                </button>

                <button onClick={() => handleAI("transcript")} className="bg-purple-600 text-white px-4 py-2 rounded">
                  Transcribe Audio
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CapsuleViewPage;
