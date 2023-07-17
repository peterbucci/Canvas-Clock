import { useCallback } from "react";
import { Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import {
  BAND_COLOR,
  H_ALIGNMENT_DIV,
  H_OFFSET_DIV,
  V_POSITION,
} from "../constants";

interface WristBandProps {
  size: { width: number; height: number };
  radius: number;
}

const WristBand: React.FC<WristBandProps> = ({ size, radius }) => {
  const filter = new DropShadowFilter({
    offset: { x: 0, y: 0 },
    resolution: 5,
    alpha: 0.5,
    blur: 1,
  });

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      const x = size.width / H_ALIGNMENT_DIV - radius / H_OFFSET_DIV;
      g.clear();
      g.beginFill(BAND_COLOR);
      g.drawRect(x, V_POSITION, radius, size.height);
      g.endFill();
    },
    [size, radius]
  );

  return <Graphics draw={draw} filters={[filter]} />;
};

export default WristBand;
