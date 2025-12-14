const CapsuleReflections = ({
  reflections,
  newReflection,
  setNewReflection,
  onAddReflection,
}) => (
  <section className="space-y-8">
    {/* Header */}
    <div className="group relative bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-6 rounded-3xl border border-amber-200/40 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
      <div className="p-4 bg-linear-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg border border-purple-200/50 backdrop-blur-sm relative z-10">
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="relative z-10">
        <h2 className="text-2xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-lg">
          Reflections
        </h2>
        <p className="text-lg text-amber-700 font-medium">{reflections.length} reflection{reflections.length !== 1 ? 's' : ''}</p>
      </div>
    </div>

    {/* Add Reflection Form - Compact */}
    <form onSubmit={onAddReflection} className="group/form relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 p-6 hover:shadow-3xl transition-all duration-500 overflow-hidden space-y-4">
      <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-700"></div>
      <div className="relative z-10">
        <textarea
          className="w-full bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 focus:border-purple-500 focus:ring-4 focus:ring-purple-200/30 p-6 rounded-2xl transition-all duration-500 outline-none resize-none text-lg font-medium text-amber-800 placeholder-amber-400 shadow-xl hover:shadow-2xl group-hover/form:border-purple-400"
          rows={4}
          placeholder="Share your deepest thoughts and reflections on this memory..."
          value={newReflection}
          onChange={(e) => setNewReflection(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!newReflection.trim()}
        className="group/btn relative bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg overflow-hidden w-full"
      >
        <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none"></div>
        <span className="relative z-10 flex items-center justify-center gap-2">
          Post Reflection ✨
        </span>
      </button>
    </form>

    {/* Reflections List */}
    <div className="space-y-4">
      {reflections.length === 0 ? (
        <div className="group relative bg-linear-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl rounded-3xl border border-amber-200/40 p-12 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          <svg className="w-20 h-20 text-amber-300 mx-auto mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-2xl font-bold text-amber-700 mb-2 relative z-10">No reflections yet</p>
          <p className="text-lg text-amber-500 font-medium relative z-10">Share your thoughts about this memory</p>
        </div>
      ) : (
        reflections.map((r) => (
          <div key={r._id} className="group/reflect relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-200/40 p-8 hover:border-purple-300/70 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-linear-to-r from-purple-400/10 to-indigo-400/10 rounded-3xl blur opacity-0 group-hover/reflect:opacity-20 transition-opacity duration-500"></div>
            <div className="flex gap-4 mb-6 relative z-10">
              <div className="shrink-0">
                <div className="w-14 h-14 bg-linear-to-br from-purple-200 to-indigo-200 rounded-2xl flex items-center justify-center shadow-xl border border-purple-200/50 hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xl font-medium text-amber-900 leading-relaxed mb-4 italic bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-6 rounded-2xl border border-amber-200/30 shadow-lg relative z-10">
                  "{r.content}"
                </p>
                <div className="flex items-center gap-3 text-sm bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-amber-200/30 shadow-md relative z-10">
                  <span className="font-bold text-amber-800 text-lg">{r.user?.name || "Unknown"}</span>
                  <span className="text-amber-500 font-medium text-base">•</span>
                  <div className="w-5 h-5 text-amber-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-amber-600 font-medium text-base">{new Date(r.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </section>
);

export default CapsuleReflections;
