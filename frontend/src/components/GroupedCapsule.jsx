import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const GroupedCapsules = () => {
  const { API } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrouped = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await API.get("/capsules/grouped/themes");
        // res.data.data => [{ _id: 'college', capsules: [...] }, ...]
        setGroups(res.data.data);
      } catch (err) {
        console.error("Failed to fetch grouped capsules:", err);
        setError("Failed to load capsules. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrouped();
  }, [API]);

  if (loading) {
    return <div className="flex justify-center p-8">Loading capsules...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8 text-center">{error}</div>;
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group._id}>
          <Link
  to={`/themes/${group._id}`}
  className="inline-block text-xl font-bold  mb-3 text-blue-600 hover:underline"
>
  {group._id}
</Link>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {group.capsules.map((capsule) => (
              <Link
                to={`/capsules/${capsule._id}`}
                key={capsule._id}
                className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold">{capsule.title}</h3>
                <p className="text-sm text-gray-500">
                  {capsule.isUnlocked ? "🔓 Unlocked" : "🔒 Locked"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedCapsules;
