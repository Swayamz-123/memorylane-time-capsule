import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const CollaboratorManager = ({ capsuleId, collaborators = [] }) => {
  const { API } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [localCollaborators, setLocalCollaborators] = useState(collaborators);

  const addCollaborator = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);
      const res = await API.post(`/capsules/${capsuleId}/collaborators`, {
        email
      });
      
      setLocalCollaborators(res.data.data);
      setEmail("");
      
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add collaborator");
    } finally {
      setLoading(false);
    }
  };

  const removeCollaborator = async (userId) => {
    try {
      await API.delete(
        `/capsules/${capsuleId}/collaborators/${userId}`
      );
      
      setLocalCollaborators(localCollaborators.filter(u => u._id !== userId));
      
    } catch (err) {
      alert("Failed to remove collaborator");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="group relative bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-6 rounded-3xl border border-amber-200/40 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
        <div className="p-4 bg-linear-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg border border-purple-200/50 backdrop-blur-sm relative z-10">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-lg">
            Collaborators
          </h3>
          <p className="text-lg text-amber-700 font-medium">
            {localCollaborators.length} collaborator{localCollaborators.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Add Collaborator Form - Compact */}
      <div className="group/form relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 p-6 hover:shadow-3xl transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-700"></div>
        <div className="flex gap-4 relative z-10">
          <input
            type="email"
            placeholder="Enter collaborator's email..."
            className="flex-1 bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 focus:border-purple-500 focus:ring-4 focus:ring-purple-200/30 p-5 rounded-2xl transition-all duration-500 outline-none text-lg font-medium text-amber-800 placeholder-amber-400 shadow-xl hover:shadow-2xl group-hover/form:border-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={addCollaborator}
            disabled={loading || !email.trim()}
            className="group/btn relative bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg overflow-hidden min-w-25"
          >
            <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none"></div>
            {loading ? (
              <span className="flex items-center gap-2 relative z-10">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent shadow-lg"></div>
                Adding...
              </span>
            ) : (
              <span className="relative z-10">Add ✨</span>
            )}
          </button>
        </div>
      </div>

      {/* Collaborators List */}
      {localCollaborators.length === 0 ? (
        <div className="group relative bg-linear-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl rounded-3xl border border-amber-200/40 p-12 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          <svg className="w-20 h-20 text-amber-300 mx-auto mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-2xl font-bold text-amber-700 mb-2 relative z-10">No collaborators yet</p>
          <p className="text-lg text-amber-500 font-medium relative z-10">Add someone to work on this capsule together</p>
        </div>
      ) : (
        <div className="space-y-3">
          {localCollaborators.map((user) => (
            <div key={user._id} className="group/collaborator relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-200/40 p-6 hover:border-purple-300/70 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-3xl blur opacity-0 group-hover/collaborator:opacity-20 transition-opacity duration-500"></div>
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-linear-to-br from-purple-200 to-indigo-200 rounded-2xl flex items-center justify-center shadow-xl border border-purple-200/50 group-hover/collaborator:scale-105 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-amber-900">{user.fullName}</p>
                    <p className="text-lg text-purple-600 font-medium bg-linear-to-r from-purple-50/80 to-indigo-50/80 px-4 py-2 rounded-xl border border-purple-200/30">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeCollaborator(user._id)}
                  className="group/remove relative bg-linear-to-r from-red-100/80 to-rose-100/80 backdrop-blur-sm hover:from-red-200 hover:to-rose-200 text-red-700 px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-400 border border-red-200/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover/remove:animate-shimmer pointer-events-none"></div>
                  <span className="relative z-10">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollaboratorManager;
