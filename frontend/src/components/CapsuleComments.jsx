const CapsuleComments = ({
  comments,
  newComment,
  setNewComment,
  onAddComment,
}) => (
  <section className="bg-white rounded shadow p-4 space-y-4">
    <h2 className="font-semibold">Comments</h2>

    <form onSubmit={onAddComment} className="space-y-2">
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Post Comment
      </button>
    </form>

    <div className="space-y-3">
      {comments.map((c) => (
        <div key={c._id} className="border rounded p-2">
          <p className="text-sm text-gray-800">{c.text}</p>
          <p className="text-xs text-gray-400">
            By {c.user?.name || "Unknown"} on{" "}
            {new Date(c.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
      {comments.length === 0 && (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}
    </div>
  </section>
);

export default CapsuleComments;
