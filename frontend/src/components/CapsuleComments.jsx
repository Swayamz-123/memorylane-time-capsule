const CapsuleComments = ({
  comments,
  newComment,
  setNewComment,
  onAddComment,
}) => (
  <section className="space-y-8">
    {/* Header */}
    <div className="group relative bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-6 rounded-3xl border border-amber-200/40 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-blue-400/10 to-indigo-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
      <div className="p-4 bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-lg border border-blue-200/50 backdrop-blur-sm relative z-10">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <div className="relative z-10">
        <h2 className="text-2xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent drop-shadow-lg">
          Comments
        </h2>
        <p className="text-lg text-amber-700 font-medium">{comments.length} comment{comments.length !== 1 ? 's' : ''}</p>
      </div>
    </div>

    {/* Add Comment Form - Compact */}
    <form onSubmit={onAddComment} className="group/form relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 p-6 hover:shadow-3xl transition-all duration-500 overflow-hidden space-y-4">
      <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-700"></div>
      <div className="relative z-10">
        <input
          type="text"
          className="w-full bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/30 p-5 rounded-2xl transition-all duration-500 outline-none text-lg font-medium text-amber-800 placeholder-amber-400 shadow-xl hover:shadow-2xl group-hover/form:border-amber-400"
          placeholder="Share your thoughts on this memory..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!newComment.trim()}
        className="group/btn relative bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg overflow-hidden w-full"
      >
        <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none"></div>
        <span className="relative z-10 flex items-center justify-center gap-2">
          Post Comment ✨
        </span>
      </button>
    </form>

    {/* Comments List */}
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="group relative bg-linear-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl rounded-3xl border border-amber-200/40 p-12 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          <svg className="w-20 h-20 text-amber-300 mx-auto mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-2xl font-bold text-amber-700 mb-2 relative z-10">No comments yet</p>
          <p className="text-lg text-amber-500 font-medium relative z-10">Be the first to share your thoughts</p>
        </div>
      ) : (
        comments.map((c) => (
          <div key={c._id} className="group/comment relative bg-white/80 backdrop-blur-xl rounded-2xl border border-amber-200/40 p-6 hover:border-amber-300/70 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-2xl blur opacity-0 group-hover/comment:opacity-20 transition-opacity duration-500"></div>
            <p className="text-lg font-medium text-amber-900 mb-5 leading-relaxed relative z-10">{c.text}</p>
            <div className="flex items-center gap-3 text-sm bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm px-5 py-3 rounded-xl border border-amber-200/30 relative z-10">
              <div className="w-8 h-8 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-bold text-amber-800">{c.user?.name || "Unknown"}</span>
              <span className="text-amber-500 font-medium">•</span>
              <div className="w-4 h-4 text-amber-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-amber-600 font-medium">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  </section>
);

export default CapsuleComments;
