import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MediaViewer from "../components/MediaViewer";
import CollaboratorManager from "../components/CollaBoratorManager";
import RecipientManager from "../components/RecipentManager";

// NEW
import CapsuleReactions from "../components/CapsuleReactions";
import CapsuleReflections from "../components/CapsuleReflections";
import CapsuleComments from "../components/CapsuleComments";

const CapsuleViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API, user } = useAuth();

  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // interaction state
  const [comments, setComments] = useState([]);
  const [reflections, setReflections] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReflection, setNewReflection] = useState("");
  const [reactionType, setReactionType] = useState(null);

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

  const fetchMeta = async () => {
    try {
      const [commentsRes, reflectionsRes, reactionsRes] = await Promise.all([
        API.get(`/capsules/${id}/comments`),
        API.get(`/capsules/${id}/reflections`),
        API.get(`/capsules/${id}/reactions`),
      ]);

      setComments(commentsRes.data.data);
      setReflections(reflectionsRes.data.data);
      setReactions(reactionsRes.data.data);

      const mine = reactionsRes.data.data.find(
        (r) => r.user._id === user._id
      );
      setReactionType(mine ? mine.type : null);
    } catch (err) {
      console.error("Failed to load capsule meta", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCapsule();
    fetchMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const isOwner = capsule.owner?._id === user?._id && capsule?.isUnlocked;
  const isOwnerUser = capsule.owner?._id === user?._id;
  const canEdit = capsule.owner?._id === user?._id && !capsule?.isUnlocked;
  const canEventUnlock =
    capsule.owner?._id === user?._id &&
    !capsule.isUnlocked &&
    capsule.unlockType === "event";

  // media checks
  const hasText = capsule.media?.some((m) => m.type === "text");
  const hasImage = capsule.media?.some((m) => m.type === "image");
  const hasAudio = capsule.media?.some((m) => m.type === "audio");

  const handleAI = (type) => {
    if (type === "summary" && !hasText) {
      alert("Sorry, this capsule does not contain any text memories.");
      return;
    }

    if (type === "caption" && !hasText && !hasImage) {
      alert("Sorry, captions require text or image memories.");
      return;
    }

    if (type === "transcript" && !hasAudio) {
      alert("Sorry, no audio file exists in this capsule.");
      return;
    }

    navigate(`/capsules/${id}/ai/${type}`);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await API.post(`/capsules/${id}/comments`, {
        text: newComment,
      });
      setComments((prev) => [res.data.data, ...prev]);
      setNewComment("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleAddReflection = async (e) => {
    e.preventDefault();
    if (!newReflection.trim()) return;

    try {
      const res = await API.post(`/capsules/${id}/reflections`, {
        content: newReflection,
      });
      setReflections((prev) => [res.data.data, ...prev]);
      setNewReflection("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add reflection");
    }
  };

  const handleToggleReaction = async (type) => {
    try {
      const res = await API.post(`/capsules/${id}/reactions`, { type });

      if (res.data.message === "Reaction removed") {
        setReactions((prev) =>
          prev.filter((r) => r.user._id !== user._id)
        );
        setReactionType(null);
      } else {
        const reaction = res.data.data;
        setReactions((prev) => {
          const withoutMine = prev.filter(
            (r) => r.user._id !== user._id
          );
          return [...withoutMine, reaction];
        });
        setReactionType(type);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to toggle reaction");
    }
  };

  const handlePrivacyChange = async (e) => {
    const value = e.target.value;
    try {
      const res = await API.patch(`/capsules/${capsule._id}/privacy`, {
        privacy: value,
      });
      setCapsule((prev) => ({
        ...prev,
        privacy: res.data.data.privacy,
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update privacy");
    }
  };
  console.log(capsule.privacy)

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

            {/* Owner-only privacy control */}
            {isOwnerUser && !capsule.isUnlocked && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-500">Privacy:</span>
                <select
                  value={capsule.privacy}
                  onChange={handlePrivacyChange}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="private">Private</option>
                  <option value="shared">Shared</option>
                  <option value="public">Public</option>
                </select>
              </div>
            )}
          </div>
          <span className="text-2xl">
            {capsule.isUnlocked ? "🔓" : "🔒"}
          </span>
        </div>

        {capsule.description && (
          <p className="text-gray-700 mb-4">{capsule.description}</p>
        )}

        {/* LOCKED */}
        {!capsule.isUnlocked && (
          <>
            <div className="border border-dashed border-gray-300 rounded p-6 text-center mb-6">
              <p className="text-lg font-medium mb-2">
                This capsule is locked
              </p>
              <p className="text-sm text-gray-600">
                It will unlock automatically at the scheduled time.
              </p>
            </div>

            {canEventUnlock && (
              <div className="text-center mb-6">
                <button
                  onClick={async () => {
                    try {
                      await API.post(`/capsules/${capsule._id}/unlock`);
                      fetchCapsule();
                      fetchMeta();
                    } catch (err) {
                      alert(
                        err.response?.data?.message ||
                          "Failed to unlock capsule"
                      );
                    }
                  }}
                  className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
                >
                  🎯 Mark Event as Completed & Unlock
                </button>
              </div>
            )}

            {canEdit && (
              <>
                <CollaboratorManager
                  capsuleId={capsule._id}
                  collaborators={capsule.collaborators}
                />
                <RecipientManager
                  capsuleId={capsule._id}
                  recipients={capsule.recipients}
                />
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
              <h2 className="text-lg font-semibold mb-3">
                AI Memory Assistant
              </h2>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleAI("summary")}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Generate Summary
                </button>

                <button
                  onClick={() => handleAI("caption")}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Generate Caption
                </button>

                <button
                  onClick={() => handleAI("transcript")}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Transcribe Audio
                </button>
              </div>
            </div>

            {/* Reactions / Reflections / Comments */}
            <div className="mt-8 space-y-6">
              <CapsuleReactions
                reactions={reactions}
                currentType={reactionType}
                onToggle={handleToggleReaction}
              />

              <CapsuleReflections
                reflections={reflections}
                newReflection={newReflection}
                setNewReflection={setNewReflection}
                onAddReflection={handleAddReflection}
              />

              <CapsuleComments
                comments={comments}
                newComment={newComment}
                setNewComment={setNewComment}
                onAddComment={handleAddComment}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CapsuleViewPage;
