"use client";

import { useState, useEffect } from "react";

export function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate IST time (UTC +5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5">
      <div className="relative flex h-1.5 w-1.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream opacity-75"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cream"></span>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-xs text-cream/70">
        <span>{time}</span>
        <span className="text-[9px] uppercase tracking-wider text-cream/40">IST</span>
      </div>
    </div>
  );
}
