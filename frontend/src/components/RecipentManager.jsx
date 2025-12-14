import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RecipientManager = ({ capsuleId, recipients = [], isUnlocked }) => {
  const { API } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);
      setError("");

      await API.post(`/capsules/${capsuleId}/recipients`, {
        email: email.trim(),
      });

      window.location.reload(); // simplest + safe
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add recipient");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (emailToRemove) => {
    try {
      setLoading(true);
      setError("");

      await API.delete(`/capsules/${capsuleId}/recipients`, {
        data: { email: emailToRemove },
      });

      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove recipient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-lg font-semibold mb-3">Recipients</h2>

      {error && (
        <p className="text-red-600 text-sm mb-2">{error}</p>
      )}

      {/* Add Recipient */}
      {!isUnlocked && (
        <div className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="recipient@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />

          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      )}

      {/* List */}
      {recipients.length === 0 ? (
        <p className="text-sm text-gray-500">
          No recipients added yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {recipients.map((email) => (
            <li
              key={email}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
            >
              <span className="text-sm">{email}</span>

              {!isUnlocked && (
                <button
                  onClick={() => handleRemove(email)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {isUnlocked && (
        <p className="text-xs text-gray-500 mt-3">
          Recipients cannot be modified after unlock.
        </p>
      )}
    </div>
  );
};

export default RecipientManager;
