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
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-linear-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute top-1/2 right-20 w-32 h-32 bg-linear-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-2xl animate-float-medium"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-linear-to-br from-amber-300/50 to-orange-300/50 rounded-full blur-xl animate-float-fast"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="inline-block p-8 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-3xl shadow-2xl mb-6 border border-amber-200/50 backdrop-blur-sm group">
            <div className="w-16 h-16 border-4 border-amber-200/50 border-t-amber-600 rounded-full animate-spin mx-auto mb-4 group-hover:scale-110 transition-transform duration-500"></div>
          </div>
          <h2 className="text-4xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent mb-3 drop-shadow-2xl">
            Awakening Memories...
          </h2>
          <p className="text-2xl text-amber-700 font-light tracking-wide drop-shadow-lg">Your time capsules are coming to life ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 p-6 sm:p-8 lg:p-12 relative overflow-hidden">
      {/* Floating memory orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-linear-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-linear-to-br from-orange-200/50 to-amber-300/50 rounded-full blur-2xl animate-float-medium"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-linear-to-br from-amber-300/60 to-orange-300/60 rounded-full blur-xl animate-float-fast"></div>
        <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-linear-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-lg animate-float-slow delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="mb-16">
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 hover:border-amber-300/60 p-10 lg:p-12 hover:shadow-3xl transition-all duration-1000 hover:-translate-y-3 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-4xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-block p-4 lg:p-6 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-3xl shadow-xl mx-auto lg:mx-0 group-hover:scale-110 transition-all duration-700 border border-amber-200/50 backdrop-blur-sm">
                  <svg className="w-10 h-10 lg:w-12 lg:h-12 text-amber-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black bg-linear-to-r from-amber-900 via-amber-800 to-orange-900 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
                  Welcome back,
                  <br className="hidden lg:inline" />
                  <span className="bg-linear-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg"> {user?.fullName}</span>
                </h1>
                <p className="text-2xl text-amber-700 font-light tracking-wide drop-shadow-lg flex items-center justify-center lg:justify-start gap-2">
                  <span className="inline-block w-3 h-3 bg-linear-to-r from-amber-500 to-orange-500 rounded-full animate-pulse shadow-lg"></span>
                  Your preserved memories await ✨
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Link
                  to="/capsules/new"
                  className="group/btn relative flex-1 sm:flex-none bg-linear-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-700 hover:via-amber-600 hover:to-orange-700 text-white px-8 py-5 lg:px-10 lg:py-6 rounded-3xl transition-all duration-700 font-bold text-lg lg:text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none"></div>
                  <span className="relative z-10 flex items-center gap-3">✨ Create New Capsule</span>
                </Link>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-7xl mx-auto mb-12 relative z-10">
            <div className="group relative bg-linear-to-r from-red-50/90 to-rose-50/90 border  backdrop-blur-sm rounded-3xl p-8 shadow-xl border-l-8 border-red-400/60 hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-4 right-4 w-4 h-4 bg-red-400/80 rounded-full animate-ping"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-800 font-semibold text-lg leading-relaxed flex-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Capsules Grid */}
        <div className="max-w-7xl mx-auto mb-20 relative z-10">
          {capsules.length === 0 ? (
            <div className="text-center mt-24">
              <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-16 lg:p-24 max-w-5xl mx-auto hover:shadow-3xl transition-all duration-1000 hover:-translate-y-4">
                <div className="absolute inset-0 bg-linear-to-r from-amber-400/5 to-orange-400/5 rounded-4xl blur-xl"></div>
                
                <div className="relative z-10 mb-12 group-hover:scale-105 transition-transform duration-1000">
                  <div className="inline-block p-10 lg:p-12 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-4xl shadow-2xl mb-8 border border-amber-200/50 backdrop-blur-sm group-hover:shadow-3xl">
                    <svg className="w-20 h-20 lg:w-24 lg:h-24 text-amber-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent mb-8 drop-shadow-2xl leading-tight">
                  No Memories Yet
                </h2>
                <p className="text-2xl lg:text-3xl text-amber-700 font-light mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-xl">
                  Start your timeless journey by creating your first time capsule and preserve precious moments forever
                </p>
                <Link
                  to="/capsules/new"
                  className="group/btn relative inline-block bg-linear-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-700 hover:via-amber-600 hover:to-orange-700 text-white px-12 py-8 rounded-4xl transition-all duration-700 font-bold text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none"></div>
                  <span className="relative z-10">✨ Create First Capsule</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {capsules.map((capsule) => (
                <CapsuleCard key={capsule._id} capsule={capsule} />
              ))}
            </div>
          )}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <GroupedCapsules/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
