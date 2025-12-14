import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CapsuleCard from "../components/CapsuleCard";

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
       //error boundary required
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [theme, API]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="text-center relative z-10">
          <div className="inline-block p-8 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-3xl shadow-2xl mb-6 border border-amber-200/50 backdrop-blur-sm group">
            <div className="w-16 h-16 border-4 border-amber-200/50 border-t-amber-600 rounded-full animate-spin mx-auto mb-4 group-hover:scale-110 transition-transform duration-500"></div>
          </div>
          <h2 className="text-3xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            Unlocking Memories...
          </h2>
          <p className="text-xl text-amber-700 font-light tracking-wide">Gathering your {theme} time capsules ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 p-6 sm:p-8 lg:p-12 relative overflow-hidden">
      {/* Floating memory orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-linear-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-1/2 right-20 w-32 h-32 bg-linear-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-2xl animate-float-medium"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-linear-to-br from-amber-300/50 to-orange-300/50 rounded-full blur-xl animate-float-fast"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border border-amber-200/50 hover:border-amber-300/70 font-semibold mb-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:bg-white text-amber-800"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>

          <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 hover:border-amber-300/60 p-8 lg:p-10 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-6 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-3xl shadow-xl group-hover:scale-110 transition-all duration-700 border border-amber-200/50 backdrop-blur-sm">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-amber-900 via-amber-800 to-orange-900 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
                  {theme.charAt(0).toUpperCase() + theme.slice(1)} Memories
                </h1>
                <p className="text-2xl text-amber-700 font-light tracking-wide mt-2 drop-shadow-sm">
                  {capsules.length} precious {capsules.length === 1 ? 'capsule' : 'capsules'} preserved ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Capsules Grid */}
        {capsules.length === 0 ? (
          <div className="text-center mt-24 relative z-10">
            <div className="group relative bg-white/80 backdrop-blur-xl rounded-4xl shadow-2xl border border-amber-200/40 p-16 lg:p-24 max-w-4xl mx-auto hover:shadow-3xl transition-all duration-700 hover:-translate-y-4">
              <div className="absolute inset-0 bg-linear-to-r from-amber-400/5 to-orange-400/5 rounded-4xl blur-xl"></div>
              
              <div className="relative z-10 mb-8 group-hover:scale-105 transition-transform duration-700">
                <div className="inline-block p-8 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-4xl shadow-2xl mb-6 border border-amber-200/50 backdrop-blur-sm group-hover:shadow-3xl">
                  <svg className="w-20 h-20 text-amber-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent mb-6 drop-shadow-2xl leading-tight">
                No {theme} capsules yet
              </h2>
              <p className="text-2xl text-amber-700 font-light mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                Be the first to preserve your <span className="font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{theme}</span> memories in a time capsule
              </p>
              <Link
                to="/capsules/new"
                className="group/btn relative inline-block bg-linear-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-700 hover:via-amber-600 hover:to-orange-700 text-white px-10 py-6 rounded-3xl transition-all duration-500 font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none"></div>
                <span className="relative z-10">✨ Create First Capsule</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
            {capsules.map((capsule) => (
              <CapsuleCard key={capsule._id} capsule={capsule} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeCapsulesPage;
