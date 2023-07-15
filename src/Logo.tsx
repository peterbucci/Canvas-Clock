import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";

interface LogoProps {
  x: number;
  y: number;
  text: string;
}

const Logo: React.FC<LogoProps> = ({ x, y, text }) => {
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
          fontSize: 16,
          fontWeight: "bold",
          fill: "#000000",
        })
      }
    />
  );
};

export default Logo;
