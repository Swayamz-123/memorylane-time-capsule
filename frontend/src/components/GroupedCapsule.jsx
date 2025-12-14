import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import CapsuleCard from "./CapsuleCard";

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
        setGroups(res.data.data);
      } catch (err) {
        setError("Failed to load capsules. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrouped();
  }, [API]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 flex justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-linear-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-xl animate-float-medium"></div>
        </div>
        <div className="text-center relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-amber-200/40">
          <div className="inline-block p-8 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-3xl shadow-2xl mb-8 border border-amber-200/50 backdrop-blur-sm animate-spin-slow">
            <div className="w-16 h-16 border-4 border-amber-200/50 border-t-amber-600 rounded-full"></div>
          </div>
          <h2 className="text-3xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Loading Collections
          </h2>
          <p className="text-xl text-amber-700 font-light tracking-wide">Opening your themed memory collections ✨</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 flex items-center justify-center p-12 relative overflow-hidden">
        <div className="relative bg-linear-to-r from-red-50/90 to-rose-50/90 backdrop-blur-xl  rounded-3xl p-12 shadow-2xl border-l-8 border-red-400/60 max-w-2xl mx-auto">
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

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 py-12 sm:py-16 lg:py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-linear-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-linear-to-br from-orange-200/50 to-amber-300/50 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-linear-to-br from-amber-300/40 to-orange-300/40 rounded-full blur-xl animate-float-fast"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="group relative text-center mb-16 lg:mb-20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 p-12 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h2 className="text-5xl lg:text-6xl font-black bg-linear-to-r from-amber-900 via-orange-900 to-amber-800 bg-clip-text text-transparent drop-shadow-2xl mb-6 relative z-10 leading-tight">
            Memory Collections
          </h2>
          <p className="text-2xl text-amber-700 font-light tracking-wide max-w-3xl mx-auto relative z-10">
            Your precious capsules organized by theme ✨
          </p>
        </div>

        <div className="space-y-16 lg:space-y-20">
          {groups.map((group) => (
            <div key={group._id} className="group/card relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-8 lg:p-12 hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-4xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
              
              {/* Theme Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 lg:mb-12 pb-8 border-b-2 border-amber-200/50 relative z-10">
                <Link
                  to={`/themes/${group._id}`}
                  className="group/link flex items-center gap-4 hover:scale-105 transition-all duration-500 flex-1 mb-6 lg:mb-0"
                >
                  <div className="p-5 bg-linear-to-br from-amber-100 to-orange-100 rounded-3xl shadow-xl border border-amber-200/50 backdrop-blur-sm group-hover/link:bg-linear-to-br group-hover/link:from-amber-200 group-hover/link:to-orange-200 transition-all duration-500 group-hover/link:scale-110">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-2xl group-hover/link:from-amber-800 group-hover/link:to-orange-800 transition-all duration-500 capitalize">
                      {group._id}
                    </h3>
                    <p className="text-xl text-amber-700 font-bold mt-2">
                      {group.capsules.length} {group.capsules.length === 1 ? 'Memory' : 'Memories'}
                    </p>
                  </div>
                </Link>

                <Link
                  to={`/themes/${group._id}`}
                  className="group/arrow relative bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-3xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ml-auto"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover:animate-shimmer pointer-events-none"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    View all
                    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Capsules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 relative z-10">
                {group.capsules.map((capsule) => (
                  <CapsuleCard key={capsule._id} capsule={capsule} />
                ))}
              </div>
            </div>
          ))}
        </div>
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
      `}</style>
    </div>
  );
};

export default GroupedCapsules;
