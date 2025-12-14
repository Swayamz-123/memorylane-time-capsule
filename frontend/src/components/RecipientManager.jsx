import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RecipientManager = ({ capsuleId, recipients = [] }) => {
  const { API } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [localRecipients, setLocalRecipients] = useState(recipients);

  const addRecipient = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);
      const res = await API.post(`/capsules/${capsuleId}/recipients`, {
        email: email.trim()
      });
      
      // Backend returns full recipients array
      setLocalRecipients(res.data.data);
      setEmail("");
      
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add recipient");
    } finally {
      setLoading(false);
    }
  };

  const removeRecipient = async (recipientEmail) => {
    try {
      await API.delete(`/capsules/${capsuleId}/recipients`, {
        data: { email: recipientEmail }
      });
      
      // Remove from local state
      setLocalRecipients(localRecipients.filter(e => e !== recipientEmail));
      
    } catch (err) {
      alert("Failed to remove recipient");
    }
  };

  return (
    <div className="border rounded p-4 mt-6">
      <h3 className="font-semibold mb-2">Recipients</h3>

      <div className="flex gap-2 mb-3">
        <input
          type="email"
          placeholder="Recipient email"
          className="border p-2 rounded flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addRecipient}
          disabled={loading}
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <ul className="text-sm space-y-2">
        {localRecipients.length === 0 ? (
          <li className="text-gray-500 text-center py-2">No recipients yet</li>
        ) : (
          localRecipients.map((recipientEmail, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-1"
            >
              <span>{recipientEmail}</span>
              <button
                onClick={() => removeRecipient(recipientEmail)}
                className="text-red-500 text-xs hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipientManager;