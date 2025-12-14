import React from "react";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";

const CapsuleCard = ({ capsule }) => {
  const {
    _id,
    title,
    theme,
    isUnlocked,
    unlockType,
    unlockDate
  } = capsule;

  return (
    <Link
      to={`/capsules/${_id}`}
      className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 p-8 flex flex-col gap-6 border border-amber-200/40 hover:border-amber-400/70 overflow-hidden hover:scale-105 hover:-translate-y-2 transform bg-linear-to-br from-amber-50/30 to-orange-50/20"
    >
      {/* Floating orb corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-amber-200/40 to-orange-200/40 rounded-bl-full blur-xl opacity-40 group-hover:opacity-70 transition-all duration-700 -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
      
      {/* Lock indicator with glow */}
      <div className="absolute top-6 right-6 z-20">
        <div className={`relative p-3 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl shadow-xl border border-amber-200/50 backdrop-blur-sm ${isUnlocked ? 'animate-pulse ring-2 ring-green-200/50' : 'ring-2 ring-amber-200/50'}`}>
          <span className="text-3xl drop-shadow-lg">
            {isUnlocked ? "🔓" : "🔒"}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 pr-20">
        <h2 className="text-2xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-2xl group-hover:scale-105 transition-all duration-500 line-clamp-2 leading-tight">
          {title}
        </h2>
      </div>

      {/* Theme badge */}
      <div className="relative z-10">
        <div className="group/theme inline-flex items-center gap-3 bg-linear-to-r from-amber-100/80 to-orange-100/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-amber-200/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 hover:bg-amber-200/80">
          <div className="w-10 h-10 bg-linear-to-br from-amber-200 to-orange-200 rounded-2xl flex items-center justify-center shadow-md group-hover/theme:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <span className="text-base font-bold text-amber-800 capitalize tracking-wide">
            {theme}
          </span>
        </div>
      </div>

      {/* Countdown or Status */}
      {!isUnlocked && unlockType === "date" && unlockDate && (
        <div className="group/countdown relative z-10 bg-linear-to-br from-rose-50/80 to-red-50/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-200/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-rose-400/10 to-red-400/10 rounded-2xl blur opacity-0 group-hover/countdown:opacity-50 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <CountDown unlockDate={unlockDate} />
          </div>
        </div>
      )}

      {isUnlocked && (
        <div className="group/unlocked relative z-10 bg-linear-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-green-400/10 to-emerald-400/10 rounded-2xl blur opacity-0 group-hover/unlocked:opacity-50 transition-opacity duration-500"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-linear-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg border border-green-200/50">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg font-bold bg-linear-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent drop-shadow-lg">
              Memory Unlocked ✨
            </p>
          </div>
        </div>
      )}

      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-amber-400/20 via-amber-200/10 to-orange-400/20 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none rounded-3xl blur"></div>
      
      {/* Bottom accent glow */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-2xl mx-4 rounded-t-full"></div>
    </Link>
  );
};

export default CapsuleCard;
