const CapsuleReflections = ({
  reflections,
  newReflection,
  setNewReflection,
  onAddReflection,
}) => (
  <section className="bg-white rounded shadow p-4 space-y-4">
    <h2 className="font-semibold">Reflections</h2>

    <form onSubmit={onAddReflection} className="space-y-2">
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        placeholder="Add a reflection..."
        value={newReflection}
        onChange={(e) => setNewReflection(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Post Reflection
      </button>
    </form>

    <div className="space-y-3">
      {reflections.map((r) => (
        <div key={r._id} className="border rounded p-2">
          <p className="text-sm text-gray-700 mb-1">{r.content}</p>
          <p className="text-xs text-gray-400">
            By {r.user?.name || "Unknown"} on{" "}
            {new Date(r.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
      {reflections.length === 0 && (
        <p className="text-sm text-gray-500">No reflections yet.</p>
      )}
    </div>
  </section>
);

export default CapsuleReflections;
