import React from "react";
import { Container } from "@pixi/react";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import * as PIXI from "pixi.js";
import ClockHand from "./ClockHand";
import Number from "./Number";
import WristBand from "./WristBand";
import Logo from "./Logo";
import useTime from "./hooks/useTime";
import Markers from "./Markers";
import ClockFace from "./ClockFace";
import DigitalClock from "./DigitalClock";
import Numbers from "./Numbers";

interface ClockProps {
  app: PIXI.Application;
  size: { width: number; height: number };
}

const Clock: React.FC<ClockProps> = ({ app, size }) => {
  const { hoursAngle, minutesAngle, secondsAngle, timestamp } = useTime();
  const radius = Math.min(window.innerWidth, window.innerHeight) / 2 - 100;
  const borderSize = 10;

  return (
    <Container>
      <WristBand
        x={size.width / 2 - size.width * 0.15}
        y={0}
        width={size.width * 0.3}
        height={size.height}
        color={0x2e1d06}
        filters={[
          new DropShadowFilter({
            offset: { x: 0, y: 0 },
            resolution: 5,
            alpha: 0.5,
            blur: 1,
          }),
        ]}
      />
      <ClockFace size={size} radius={radius}>
        <Logo
          x={size.width / 2}
          y={size.height / 2 - radius / 1.8}
          text="CRUMPET"
        />
        <DigitalClock size={size} timestamp={timestamp} />
        <Numbers size={size} radius={radius} />
        <Markers app={app} radius={radius} borderSize={borderSize} />
        <ClockHand
          x={size.width / 2}
          y={size.height / 2}
          width={radius * 0.04}
          height={radius * 0.85}
          rotation={hoursAngle}
          color={0x000000}
          filters={[
            new DropShadowFilter({
              offset: { x: 0, y: 0 },
              resolution: 5,
              alpha: 0.5,
              blur: 1,
            }),
          ]}
          radius={radius}
        />
        <ClockHand
          x={size.width / 2}
          y={size.height / 2}
          width={radius * 0.03}
          height={radius}
          rotation={minutesAngle}
          color={0x000000}
          filters={[
            new DropShadowFilter({
              offset: { x: 0, y: 0 },
              resolution: 5,
              alpha: 0.5,
              blur: 1,
            }),
          ]}
          radius={radius}
        />
        <ClockHand
          x={size.width / 2}
          y={size.height / 2}
          width={radius * 0.01}
          height={radius}
          rotation={secondsAngle}
          color={0xff0000}
          filters={[
            new DropShadowFilter({
              offset: { x: 0, y: 0 },
              resolution: 5,
              alpha: 0.5,
              blur: 1,
            }),
          ]}
          radius={radius}
        />
      </ClockFace>
    </Container>
  );
};

export default Clock;
