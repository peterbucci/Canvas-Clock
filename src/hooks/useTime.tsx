import { useState } from "react";
import { useTick } from "@pixi/react";

const degToRad = (deg: number) => {
  return (deg * Math.PI) / 180;
};

const useTime = () => {
  const [time, setTime] = useState({
    hoursAngle: 0,
    minutesAngle: 0,
    secondsAngle: 0,
  });

  useTick(() => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // convert everything to degrees
    let hoursAngle = (hours % 12) * 30 + minutes * 0.5 - 180;
    let minutesAngle = minutes * 6 - 180;
    let secondsAngle = seconds * 6 - 180;

    // convert to radians
    hoursAngle = degToRad(hoursAngle);
    minutesAngle = degToRad(minutesAngle);
    secondsAngle = degToRad(secondsAngle);

    setTime({
      hoursAngle,
      minutesAngle,
      secondsAngle,
    });
  });

  return time;
};

export default useTime;
