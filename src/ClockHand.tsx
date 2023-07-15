import React, { useCallback } from "react";
import { Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";

interface ClockHandProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: number;
  filters: Array<PIXI.Filter>;
  radius: number;
}

const ClockHand = React.forwardRef<PIXI.Graphics, ClockHandProps>((props) => {
  const draw = useCallback(
    (g: PIXI.Graphics) => {
      const { x, y, width, height, color, radius, rotation } = props;

      g.clear();
      g.beginFill(color);
      g.moveTo(width * 0.05, height - height / 10);
      g.lineTo(0, 0);
      g.lineTo(width, 0);
      g.lineTo(width - width * 0.05, height - height / 10);
      g.arc(width / 2, height, width / 5, 0, Math.PI / 1.5);
      g.endFill();

      g.pivot.set(width / 2, (radius / 2) * 0.33);
      g.position.set(x, y);
      g.rotation = rotation;
    },
    [props]
  );

  return (
    <Graphics draw={draw} filters={props.filters} x={props.x} y={props.y} />
  );
});

export default ClockHand;
