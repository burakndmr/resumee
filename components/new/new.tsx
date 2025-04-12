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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-red-600 to-yellow-400 animate-gradient bg-[length:400%_400%] p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="text-center w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap items-baseline justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-white/90">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((unit, index) => (
            <React.Fragment key={unit.label}>
              {index !== 0 && (
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight mb-4 sm:mb-6 md:mb-8">
                  :
                </span>
              )}
              <div className="flex flex-col items-center min-w-[60px] sm:min-w-[70px] md:min-w-[80px] lg:min-w-[100px]">
                <span className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-light tracking-tight">
                  {padNumber(unit.value)}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-light tracking-widest mt-1 sm:mt-2 text-white/60 uppercase">
                  {unit.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
