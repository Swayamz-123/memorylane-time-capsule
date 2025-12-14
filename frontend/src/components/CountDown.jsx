import React, { useEffect, useState } from "react";

const IST_OFFSET = 5.5 * 60 * 60 * 1000; // milliseconds

const Countdown = ({ unlockDate }) => {
  const calculateTimeLeft = () => {
    // Convert both times to IST
    const nowIST = Date.now() + IST_OFFSET;
    const unlockIST = new Date(unlockDate).getTime() + IST_OFFSET;

    const diff = unlockIST - nowIST;

    if (diff <= 0) {
      return null;
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
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
      <div className="flex items-center gap-2 animate-pulse">
        <p className="text-sm font-semibold text-orange-600">
          Unlocking soon...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-rose-700">
        Time Until Unlock
      </p>

      <div className="grid grid-cols-4 gap-2">
        <div className="text-center">
          <div className="text-xl font-bold">{timeLeft.days}</div>
          <div className="text-xs">Days</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs">Mins</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs">Secs</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
