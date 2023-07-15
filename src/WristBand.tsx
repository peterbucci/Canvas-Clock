import { useCallback, forwardRef } from "react";
import { Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";

interface WristBandProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  filters?: Array<PIXI.Filter>;
}

const WristBand = forwardRef<PIXI.Graphics, WristBandProps>((props) => {
  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(props.color);
      g.drawRect(props.x, props.y, props.width, props.height);
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} filters={props.filters} />;
});

export default WristBand;
