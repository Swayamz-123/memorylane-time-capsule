import React, { useEffect, useState } from "react";

const Countdown = ({ unlockDate }) => {
  const calculateTimeLeft = () => {
    const diff = new Date(unlockDate) - new Date();

    if (diff <= 0) {
      return null;
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [unlockDate]);

  if (!timeLeft) {
    return (
      <p className="text-sm text-orange-600">
        Unlocking soon...
      </p>
    );
  }

  return (
    <p className="text-sm text-gray-600">
      Unlocks in{" "}
      <span className="font-medium">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </p>
  );
};

export default Countdown;
