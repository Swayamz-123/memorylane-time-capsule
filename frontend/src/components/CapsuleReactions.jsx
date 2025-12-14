const CapsuleReactions = ({ reactions, currentType, onToggle }) => {
  const counts = {
    like: reactions.filter((r) => r.type === "like").length,
    love: reactions.filter((r) => r.type === "love").length,
    sad: reactions.filter((r) => r.type === "sad").length,
  };

  return (
    <section className="bg-white rounded shadow p-4 space-y-3">
      <h2 className="font-semibold mb-2">Reactions</h2>
      <div className="flex items-center gap-3">
        <button
          className={`px-3 py-1 rounded border ${
            currentType === "like" ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={() => onToggle("like")}
        >
          👍 Like ({counts.like})
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            currentType === "love" ? "bg-pink-100 border-pink-500" : ""
          }`}
          onClick={() => onToggle("love")}
        >
          ❤️ Love ({counts.love})
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            currentType === "sad" ? "bg-yellow-100 border-yellow-500" : ""
          }`}
          onClick={() => onToggle("sad")}
        >
          😢 Sad ({counts.sad})
        </button>
      </div>
    </section>
  );
};

export default CapsuleReactions;
