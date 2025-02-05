'use client'
import { useEffect, useState } from "react";

export default function CountDownMonth() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // Last day of the month at 23:59:59
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Initial calculation and set interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex ">
      {Object.entries(timeLeft).map(([label, value], index) => (
        <div
          key={index}
          className="  rounded-lg   "
        >
          <div className=" flex  items-center font-jost font-semibold  lg:text-[20px] leading-[20px]">
            <span className=" px-3" >{value.toString().padStart(2, "0")} </span>
            {label!=='seconds' && <p className=" ">:</p>}
          </div>
          
        </div>
      ))}
    </div>
  );
}
