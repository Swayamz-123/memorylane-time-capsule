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
      <div className="flex items-center gap-2 animate-pulse">
        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <p className="text-sm font-semibold text-orange-600">
          Unlocking soon...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-rose-700">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <p className="text-xs font-medium uppercase tracking-wide">Time Until Unlock</p>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white rounded-lg p-2 text-center border border-rose-200 shadow-sm">
          <div className="text-xl font-bold text-rose-600">{timeLeft.days}</div>
          <div className="text-xs text-rose-500 font-medium">Days</div>
        </div>
        
        <div className="bg-white rounded-lg p-2 text-center border border-rose-200 shadow-sm">
          <div className="text-xl font-bold text-rose-600">{timeLeft.hours}</div>
          <div className="text-xs text-rose-500 font-medium">Hours</div>
        </div>
        
        <div className="bg-white rounded-lg p-2 text-center border border-rose-200 shadow-sm">
          <div className="text-xl font-bold text-rose-600">{timeLeft.minutes}</div>
          <div className="text-xs text-rose-500 font-medium">Mins</div>
        </div>
        
        <div className="bg-white rounded-lg p-2 text-center border border-rose-200 shadow-sm">
          <div className="text-xl font-bold text-rose-600 animate-pulse">{timeLeft.seconds}</div>
          <div className="text-xs text-rose-500 font-medium">Secs</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;