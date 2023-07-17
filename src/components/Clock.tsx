import React from "react";
import { Container } from "@pixi/react";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import * as PIXI from "pixi.js";
import ClockFace from "./ClockFace";
import ClockHand from "./ClockHand";
import Markers from "./Markers";
import Numbers from "./Numbers";
import WristBand from "./WristBand";
import Logo from "./Logo";
import DigitalClock from "./DigitalClock";
import useTime from "../hooks/useTime";
import {
  RADIUS_DIVISOR,
  RADIUS_MARGIN,
  BORDER_SIZE_MIN,
  BORDER_FACTOR,
} from "../constants";

interface ClockProps {
  app: PIXI.Application;
  size: { width: number; height: number };
}

const Clock: React.FC<ClockProps> = ({ app, size }) => {
  const { hoursAngle, minutesAngle, secondsAngle, timestamp } = useTime();
  const radius =
    Math.min(size.width, size.height) / RADIUS_DIVISOR - RADIUS_MARGIN;
  const borderSize = Math.max(BORDER_SIZE_MIN, radius * BORDER_FACTOR);

  return (
    <Container>
      <WristBand size={size} radius={radius} />
      <ClockFace size={size} radius={radius} borderSize={borderSize}>
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
