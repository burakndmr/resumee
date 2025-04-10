import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function NewVersion() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-04-21T00:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const padNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-red-600 to-yellow-400 animate-gradient bg-[length:400%_400%]">
      <div className="text-center">
        <div className="flex items-baseline justify-center gap-4 text-white/90">
          <div className="flex flex-col items-center">
            <span className="text-8xl font-light tracking-tight">
              {padNumber(timeLeft.days)}
            </span>
            <span className="text-sm font-light tracking-widest mt-2 text-white/60 uppercase">
              Days
            </span>
          </div>
          <span className="text-6xl font-extralight mb-8">:</span>
          <div className="flex flex-col items-center">
            <span className="text-8xl font-light tracking-tight">
              {padNumber(timeLeft.hours)}
            </span>
            <span className="text-sm font-light tracking-widest mt-2 text-white/60 uppercase">
              Hours
            </span>
          </div>
          <span className="text-6xl font-extralight mb-8">:</span>
          <div className="flex flex-col items-center">
            <span className="text-8xl font-light tracking-tight">
              {padNumber(timeLeft.minutes)}
            </span>
            <span className="text-sm font-light tracking-widest mt-2 text-white/60 uppercase">
              Minutes
            </span>
          </div>
          <span className="text-6xl font-extralight mb-8">:</span>
          <div className="flex flex-col items-center">
            <span className="text-8xl font-light tracking-tight">
              {padNumber(timeLeft.seconds)}
            </span>
            <span className="text-sm font-light tracking-widest mt-2 text-white/60 uppercase">
              Seconds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
