import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CapsuleCard from "../components/CapsuleCard";
import LogoutButton from "../components/LogoutButton";
import GroupedCapsules from "../components/GroupedCapsule";
const Dashboard = () => {
  const { API, user } = useAuth();
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const res = await API.get("/capsules");
        
        setCapsules(res.data.data || []);
      } catch (err) {
        setError("Failed to load capsules");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [API]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {user?.fullName}
          </h1>
          <p className="text-gray-600 text-sm">
            Your time capsules
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/capsules/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Capsule
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Capsules */}
      {capsules.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No capsules created yet</p>
          <p className="text-sm mt-2">
            Create your first memory capsule ✨
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map((capsule) => (
            <CapsuleCard key={capsule._id} capsule={capsule} />
          ))}
        </div>
      )}
      <GroupedCapsules/>
    </div>
  );
};

export default Dashboard;
