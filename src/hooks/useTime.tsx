import { useState } from "react";
import { useTick } from "@pixi/react";

const degToRad = (deg: number) => {
  return (deg * Math.PI) / 180;
};

const useTime = () => {
  const [time, setTime] = useState({
    timestamp: "00:00:00",
    hoursAngle: 0,
    minutesAngle: 0,
    secondsAngle: 0,
  });

  useTick(() => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    // convert everything to degrees
    let hoursAngle = (hours % 12) * 30 + minutes * 0.5 - 180;
    let minutesAngle = minutes * 6 - 180;
    let secondsAngle = seconds * 6 - 180;

    // convert to radians
    hoursAngle = degToRad(hoursAngle);
    minutesAngle = degToRad(minutesAngle);
    secondsAngle = degToRad(secondsAngle);

    setTime({
      timestamp: date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      hoursAngle,
      minutesAngle,
      secondsAngle,
    });
  });

  return time;
};

export default useTime;
