import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  LOGO_ANCHOR,
  LOGO_H_ALIGN_DIV,
  LOGO_V_ALIGN_DIV,
  LOGO_V_OFFSET_DIV,
} from "../constants";

interface LogoProps {
  radius: number;
  size: { width: number; height: number };
  text: string;
}

const Logo: React.FC<LogoProps> = ({ radius, size, text }) => {
  const fontSize = radius * 0.065;

  return (
    <Text
      text={text}
      anchor={LOGO_ANCHOR}
      x={size.width / LOGO_H_ALIGN_DIV}
      y={size.height / LOGO_V_ALIGN_DIV - radius / LOGO_V_OFFSET_DIV}
      style={
        new PIXI.TextStyle({
          align: "center",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: fontSize,
          fontWeight: "bold",
          fill: "#000000",
        })
      }
    />
  );
};

export default Logo;
