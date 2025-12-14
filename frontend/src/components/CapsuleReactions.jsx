const CapsuleReactions = ({ reactions, currentType, onToggle }) => {
  const counts = {
    like: reactions.filter((r) => r.type === "like").length,
    love: reactions.filter((r) => r.type === "love").length,
    sad: reactions.filter((r) => r.type === "sad").length,
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="group relative bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-6 rounded-3xl border border-amber-200/40 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-rose-400/10 to-pink-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
        <div className="p-4 bg-linear-to-br from-rose-100 to-pink-100 rounded-2xl shadow-lg border border-rose-200/50 backdrop-blur-sm relative z-10">
          <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-lg">
            Reactions
          </h2>
          <p className="text-lg text-amber-700 font-medium">How does this memory make you feel?</p>
        </div>
      </div>

      {/* Reaction Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button
          className={`group/btn relative bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-6 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center gap-3 text-lg overflow-hidden ${
            currentType === "like"
              ? "border-blue-400/70 bg-linear-to-br from-blue-100/70 to-indigo-100/70 ring-2 ring-blue-200/50 scale-105"
              : "border-amber-200/50 hover:border-blue-400/70 hover:bg-linear-to-br from-blue-50/70 to-indigo-50/70"
          }`}
          onClick={() => onToggle("like")}
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500 blur pointer-events-none rounded-2xl"></div>
          <span className="text-3xl group-hover/btn:scale-110 transition-transform duration-300 relative z-10">👍</span>
          <span className="relative z-10">Like</span>
          <span className={`px-3 py-1 rounded-full text-sm font-black shadow-lg ${
            currentType === "like" 
              ? "bg-blue-400/80 text-white ring-2 ring-blue-300/50" 
              : "bg-blue-100/70 text-blue-700 border border-blue-200/50"
          }`}>
            {counts.like}
          </span>
        </button>

        <button
          className={`group/btn relative bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-6 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center gap-3 text-lg overflow-hidden ${
            currentType === "love"
              ? "border-pink-400/70 bg-linear-to-br from-pink-100/70 to-rose-100/70 ring-2 ring-pink-200/50 scale-105"
              : "border-amber-200/50 hover:border-pink-400/70 hover:bg-linear-to-br from-pink-50/70 to-rose-50/70"
          }`}
          onClick={() => onToggle("love")}
        >
          <div className="absolute inset-0 bg-linear-to-r from-pink-400/20 to-rose-400/20 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500 blur pointer-events-none rounded-2xl"></div>
          <span className="text-3xl group-hover/btn:scale-110 transition-transform duration-300 relative z-10">❤️</span>
          <span className="relative z-10">Love</span>
          <span className={`px-3 py-1 rounded-full text-sm font-black shadow-lg ${
            currentType === "love" 
              ? "bg-pink-400/80 text-white ring-2 ring-pink-300/50" 
              : "bg-pink-100/70 text-pink-700 border border-pink-200/50"
          }`}>
            {counts.love}
          </span>
        </button>

        <button
          className={`group/btn relative bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-6 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center gap-3 text-lg overflow-hidden ${
            currentType === "sad"
              ? "border-yellow-400/70 bg-linear-to-br from-yellow-100/70 to-amber-100/70 ring-2 ring-yellow-200/50 scale-105"
              : "border-amber-200/50 hover:border-yellow-400/70 hover:bg-linear-to-br from-yellow-50/70 to-amber-50/70"
          }`}
          onClick={() => onToggle("sad")}
        >
          <div className="absolute inset-0 bg-linear-to-r from-yellow-400/20 to-amber-400/20 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500 blur pointer-events-none rounded-2xl"></div>
          <span className="text-3xl group-hover/btn:scale-110 transition-transform duration-300 relative z-10">😢</span>
          <span className="relative z-10">Sad</span>
          <span className={`px-3 py-1 rounded-full text-sm font-black shadow-lg ${
            currentType === "sad" 
              ? "bg-yellow-400/80 text-white ring-2 ring-yellow-300/50" 
              : "bg-yellow-100/70 text-yellow-800 border border-yellow-200/50"
          }`}>
            {counts.sad}
          </span>
        </button>
      </div>

      {/* Active Reaction Indicator */}
      {currentType && (
        <div className="group relative bg-linear-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-xl border border-emerald-200/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-400/10 to-green-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-linear-to-br from-emerald-100 to-green-100 rounded-2xl shadow-lg border border-emerald-200/50">
              <svg className="w-7 h-7 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent drop-shadow-lg">
              You reacted with {currentType === "like" ? "👍 Like" : currentType === "love" ? "❤️ Love" : "😢 Sad"}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default CapsuleReactions;
