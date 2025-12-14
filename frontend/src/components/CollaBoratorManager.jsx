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
      
      // ✅ CHANGED: Set directly, don't spread
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
    <div className="border rounded p-4 mt-6">
      <h3 className="font-semibold mb-2">Collaborators</h3>

      <div className="flex gap-2 mb-3">
        <input
          type="email"
          placeholder="Collaborator email"
          className="border p-2 rounded flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addCollaborator}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <ul className="text-sm space-y-2">
        {localCollaborators.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center py-1"
          >
            <span>{user.email}</span>
             <span>{user.fullName}</span>
            <button
              onClick={() => removeCollaborator(user._id)}
              className="text-red-500 text-xs hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaboratorManager;