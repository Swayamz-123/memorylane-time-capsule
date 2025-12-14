import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ThemeCapsulesPage = () => {
  const { theme } = useParams();
  const { API } = useAuth();
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const res = await API.get(`/capsules/theme/${theme}`);
        setCapsules(res.data.data);
      } catch (err) {
        console.error("Failed to load theme capsules");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [theme]);

  if (loading) {
    return <div>Loading capsules...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize mb-6">
        {theme} Capsules
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {capsules.map((capsule) => (
          <Link
            key={capsule._id}
            to={`/capsules/${capsule._id}`}
            className="bg-white p-4 rounded shadow"
          >
            <h3 className="font-semibold">
              {capsule.title}
            </h3>
            <p className="text-sm text-gray-500">
              {capsule.isUnlocked ? "🔓 Unlocked" : "🔒 Locked"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThemeCapsulesPage;
