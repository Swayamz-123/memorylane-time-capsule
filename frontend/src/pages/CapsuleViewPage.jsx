import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MediaViewer from "../components/MediaViewer";
import CollaboratorManager from "../components/CollaBoratorManager";
import RecipientManager from "../components/RecipientManager";
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
      //add error boundary
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCapsule();
    fetchMeta();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-linear-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-xl animate-float-medium"></div>
        </div>
        <div className="text-center relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-amber-200/40">
          <div className="inline-block p-8 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-3xl shadow-2xl mb-8 border border-amber-200/50 backdrop-blur-sm animate-spin-slow">
            <div className="w-16 h-16 border-4 border-amber-200/50 border-t-amber-600 rounded-full"></div>
          </div>
          <h2 className="text-3xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Loading Capsule
          </h2>
          <p className="text-xl text-amber-700 font-light tracking-wide">Opening your precious memory ✨</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 flex items-center justify-center p-12 relative overflow-hidden">
        <div className="relative bg-linear-to-r from-red-50/90 to-rose-50/90 backdrop-blur-xl border  rounded-3xl p-12 shadow-2xl border-l-8 border-red-400/60 max-w-2xl mx-auto">
          <div className="absolute top-4 right-4 w-6 h-6 bg-red-400/80 rounded-full animate-ping"></div>
          <div className="text-center relative z-10">
            <div className="w-20 h-20 bg-linear-to-br from-red-100 to-rose-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-red-200/50">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-red-800 leading-relaxed">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!capsule) return null;

  const isOwner = capsule.owner?._id === user?._id && capsule?.isUnlocked;
  const isOwnerUser = capsule.owner?._id === user?._id;
  const canEdit = capsule.owner?._id === user?._id && !capsule?.isUnlocked;
  const isOwnerOrCollaborator =
    capsule.owner?._id === user?._id ||
    capsule.collaborators.some((c) => c._id === user?._id);
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

  const handleRecipientsChange = (updatedRecipients) => {
    setCapsule((prev) => ({ ...prev, recipients: updatedRecipients }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-linear-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-linear-to-br from-orange-200/50 to-amber-300/50 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-linear-to-br from-amber-300/40 to-orange-300/40 rounded-full blur-xl animate-float-fast"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <div className="group mb-12">
          <button
            onClick={() => navigate(-1)}
            className="group relative bg-white/80 backdrop-blur-xl text-amber-800 border-2 border-amber-200/60 hover:bg-linear-to-r hover:from-amber-50/90 hover:to-orange-50/90 hover:border-amber-400/70 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 font-bold shadow-xl px-6 py-3 rounded-2xl flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur pointer-events-none rounded-2xl"></div>
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="relative z-10 tracking-wide">Back to Capsules</span>
          </button>
        </div>

        {/* Header Card */}
        <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-8 lg:p-12 mb-12 lg:mb-16 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-4xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <h1 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
                  {capsule.title}
                </h1>
                <div className={`text-4xl lg:text-5xl shrink-0 p-3 rounded-3xl shadow-xl ${capsule.isUnlocked ? 'bg-linear-to-br from-emerald-100 to-green-100 border-4 border-emerald-200' : 'bg-linear-to-br from-rose-100 to-red-100 border-4 border-rose-200'}`}>
                  {capsule.isUnlocked ? "🔓" : "🔒"}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg border border-amber-200/50">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-amber-800 capitalize tracking-wide">
                  {capsule.theme}
                </span>
              </div>

              {/* Privacy Control */}
              {isOwnerUser && !capsule.isUnlocked && (
                <div className="group/privacy inline-flex items-center gap-3 bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-amber-200/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-2xl blur opacity-0 group-hover/privacy:opacity-20 transition-opacity duration-500"></div>
                  <div className="p-2 bg-linear-to-br from-amber-200 to-orange-200 rounded-xl shadow-md relative z-10">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-amber-800 relative z-10">Privacy:</span>
                  <select
                    value={capsule.privacy}
                    onChange={handlePrivacyChange}
                    className="relative z-10 border-2 border-amber-200/60 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 rounded-xl px-4 py-2 text-sm font-bold text-amber-900 outline-none bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <option value="private">Private</option>
                    <option value="shared">Shared</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {capsule.description && (
            <div className="mt-8 relative z-10">
              <p className="text-xl text-amber-800 leading-relaxed bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-8 rounded-3xl border border-amber-200/40 shadow-xl">
                {capsule.description}
              </p>
            </div>
          )}
        </div>

        {/* LOCKED STATE */}
        {!capsule.isUnlocked && (
          <div className="space-y-12 lg:space-y-16">
            {/* Lock Status Card */}
            <div className="group relative bg-linear-to-br from-rose-50/80 to-red-50/80 backdrop-blur-xl rounded-4xl border-4 border-rose-200/60 shadow-2xl p-12 lg:p-16 text-center hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-rose-400/20 to-red-400/20 rounded-4xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
              <div className="relative z-10 inline-block p-6 lg:p-8 bg-linear-to-br from-rose-100 to-red-100 rounded-full shadow-2xl border-4 border-rose-200/60 mb-8 lg:mb-12">
                <svg className="w-16 h-16 lg:w-20 lg:h-20 text-rose-600 drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-black bg-linear-to-r from-rose-900 to-red-900 bg-clip-text text-transparent drop-shadow-2xl mb-6 relative z-10">
                Capsule Locked ⏳
              </h2>

              {capsule.unlockType === "date" && (
                <p className="text-2xl text-rose-800 font-bold relative z-10">
                  Opens on{" "}
                  <span className="bg-linear-to-r from-rose-600 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
                    {capsule.unlockDate
                      ? new Date(capsule.unlockDate).toLocaleString()
                      : "the scheduled date"}
                  </span>
                </p>
              )}

              {capsule.unlockType === "event" && (
                <p className="text-2xl text-rose-800 font-bold relative z-10">
                  Unlocks when{" "}
                  <span className="bg-linear-to-r from-rose-600 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
                    {capsule.unlockEvent || "Unnamed event"}
                  </span>{" "}
                  happens
                </p>
              )}
            </div>

            {/* Event Unlock Button */}
            {canEventUnlock && (
              <div className="group relative bg-linear-to-r from-purple-50/80 to-indigo-50/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-purple-200/60 p-10 lg:p-12 text-center hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-4xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
                <p className="text-xl lg:text-2xl text-purple-800 font-bold mb-8 relative z-10">
                  Has <span className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">"{capsule.unlockEvent}"</span> happened?
                </p>
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
                  className="group/btn  bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 lg:px-12 py-5 lg:py-6 rounded-3xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative z-10"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none rounded-3xl"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    🎯 Mark Complete & Unlock Now
                  </span>
                </button>
              </div>
            )}

            {/* Collaborators & Recipients */}
            {canEdit && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-8 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-4xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                  <CollaboratorManager
                    capsuleId={capsule._id}
                    collaborators={capsule.collaborators}
                  />
                </div>
                
                <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-8 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-400/10 to-green-400/10 rounded-4xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                  <RecipientManager
                    capsuleId={capsule._id}
                    recipients={capsule.recipients}
                    isUnlocked={capsule.isUnlocked}
                    onRecipientsChange={handleRecipientsChange}
                  />
                </div>
              </div>
            )}

            {/* Add Media Button */}
            {!capsule.isUnlocked && isOwnerOrCollaborator && (
              <div className="group text-center">
                <button
                  onClick={() => navigate(`/capsules/${capsule._id}/media`)}
                  className="group relative bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 inline-flex items-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover:animate-shimmer pointer-events-none rounded-3xl"></div>
                  <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="relative z-10 tracking-wide">Add Media to Capsule</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* UNLOCKED STATE */}
        {capsule.isUnlocked && (
          <div className="space-y-12 lg:space-y-16">
            {/* Memories Section */}
            <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-8 lg:p-12 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-400/10 to-green-400/10 rounded-4xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="p-4 bg-linear-to-br from-emerald-100 to-green-100 rounded-3xl shadow-xl border border-emerald-200/60">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-2xl">
                  Preserved Memories ✨
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {capsule.media?.map((item, index) => (
                  <MediaViewer key={index} media={item} />
                ))}
              </div>
            </div>

            {/* AI Assistant Section */}
            <div className="group relative bg-linear-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-blue-200/60 p-8 lg:p-12 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-indigo-400/10 rounded-4xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
              <div className="flex items-center gap-4 mb-8 lg:mb-12 relative z-10">
                <div className="p-4 bg-linear-to-br from-blue-100 to-indigo-100 rounded-3xl shadow-xl border border-blue-200/60">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-black bg-linear-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent drop-shadow-2xl mb-3">
                    AI Memory Assistant
                  </h2>
                  <p className="text-xl text-blue-800 font-light tracking-wide">
                    Let AI help you explore and enhance your memories
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                <button
                  onClick={() => handleAI("summary")}
                  className="group/ai relative bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400 hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 text-blue-800 px-8 py-8 rounded-3xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover/ai:opacity-20 transition-opacity duration-500 blur pointer-events-none rounded-3xl"></div>
                  <svg className="w-12 h-12 mx-auto mb-4 group-hover/ai:scale-110 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xl tracking-wide relative z-10">Generate Summary</span>
                </button>

                <button
                  onClick={() => handleAI("caption")}
                  className="group/ai relative bg-white/90 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-400 hover:bg-linear-to-br hover:from-emerald-50 hover:to-green-50 text-emerald-800 px-8 py-8 rounded-3xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-400/20 to-green-400/20 opacity-0 group-hover/ai:opacity-20 transition-opacity duration-500 blur pointer-events-none rounded-3xl"></div>
                  <svg className="w-12 h-12 mx-auto mb-4 group-hover/ai:scale-110 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="text-xl tracking-wide relative z-10">Generate Caption</span>
                </button>

                <button
                  onClick={() => handleAI("transcript")}
                  className="group/ai relative bg-white/90 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-400 hover:bg-linear-to-br hover:from-purple-50 hover:to-indigo-50 text-purple-800 px-8 py-8 rounded-3xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover/ai:opacity-20 transition-opacity duration-500 blur pointer-events-none rounded-3xl"></div>
                  <svg className="w-12 h-12 mx-auto mb-4 group-hover/ai:scale-110 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="text-xl tracking-wide relative z-10">Transcribe Audio</span>
                </button>
              </div>
            </div>

            {/* Interactions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="lg:col-span-1">
                <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-8 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-rose-400/10 to-pink-400/10 rounded-4xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                  <CapsuleReactions
                    reactions={reactions}
                    currentType={reactionType}
                    onToggle={handleToggleReaction}
                  />
                </div>
              </div>

              <div className="lg:col-span-1 space-y-8 lg:space-y-12">
                <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-8 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-4xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                  <CapsuleReflections
                    reflections={reflections}
                    newReflection={newReflection}
                    setNewReflection={setNewReflection}
                    onAddReflection={handleAddReflection}
                  />
                </div>

                <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-8 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-indigo-400/10 rounded-4xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                  <CapsuleComments
                    comments={comments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    onAddComment={handleAddComment}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style >{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float-slow { animation: float-slow 25s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 18s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 14s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 2s linear infinite; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default CapsuleViewPage;