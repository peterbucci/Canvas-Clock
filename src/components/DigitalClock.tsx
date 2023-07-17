import React from "react";
import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

interface DigitalClockProps {
  size: { width: number; height: number };
  timestamp: string;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ size, timestamp }) => {
  return (
    <Container>
      <Text
        text={timestamp}
        anchor={0.5}
        x={size.width / 2}
        y={size.height / 1.5}
        style={
          new PIXI.TextStyle({
            align: "center",
            fontFamily: "Orbitron, sans-serif",
            fontSize: 18,
            fill: "#000000",
            letterSpacing: 2,
          })
        }
      />
    </Container>
  );
};

export default DigitalClock;
