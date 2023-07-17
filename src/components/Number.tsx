import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";

interface NumberProps {
  x: number;
  y: number;
  text: string;
  fontSize: number;
}

const Number: React.FC<NumberProps> = ({ x, y, text, fontSize }) => {
  return (
    <Text
      text={text}
      anchor={0.5}
      x={x}
      y={y}
      style={
        new PIXI.TextStyle({
          align: "center",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: fontSize,
          fontWeight: "bold",
          fill: "#ffffff",
          stroke: "#000000",
          strokeThickness: 2,
          dropShadow: true,
          dropShadowColor: "#7a7a7a",
          dropShadowBlur: 1,
          dropShadowAngle: Math.PI,
          dropShadowDistance: 0,
        })
      }
    />
  );
};

export default Number;
