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
      className="bg-white rounded-lg shadow hover:shadow-md transition p-5 flex flex-col gap-3"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xl">
          {isUnlocked ? "🔓" : "🔒"}
        </span>
      </div>

      <p className="text-sm text-gray-500 capitalize">
        Theme: {theme}
      </p>

      {!isUnlocked && unlockType === "date" && unlockDate && (
        <CountDown unlockDate={unlockDate} />
      )}

      {isUnlocked && (
        <p className="text-green-600 text-sm font-medium">
          Capsule unlocked
        </p>
      )}
    </Link>
  );
};

export default CapsuleCard;
