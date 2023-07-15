import React, { useCallback, useRef } from 'react';
import { Graphics, useTick } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface ClockHandProps {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  color: number;
  filters: Array<PIXI.Filter>;
  radius: number;
}

const ClockHand = React.forwardRef<PIXI.Graphics, ClockHandProps>(((props) => {
  const graphicRef = useRef<PIXI.Graphics>(null);

  useTick((delta) => {
    if (graphicRef.current) {
      const date = new Date();
      // get the hours, minutes, and seconds
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      // convert everything to degrees
      let hoursAngle = (hours % 12 * 30) + (minutes * 0.5); // 0.5 comes from (30 degrees/hour) / 60 minutes
      let minutesAngle = minutes * 6;
      let secondsAngle = seconds * 6;

      // adjust for the clock hands to start from the '6 o'clock' position
      let correction = 180;
      hoursAngle -= correction;
      minutesAngle -= correction;
      secondsAngle -= correction;

      graphicRef.current.rotation = (props.type === 'hour' 
        ? hoursAngle 
        : props.type === 'minute' 
        ? minutesAngle 
        : secondsAngle) * Math.PI / 180
    }
  });

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      const { x, y, width, height, color, radius } = props;

      g.clear();
      g.beginFill(color);
      g.moveTo(width * .05, height - height / 10)
      g.lineTo(0, 0);
      g.lineTo(width, 0);
      g.lineTo(width - (width * .05), height - height / 10)
      g.arc(width / 2, height, width / 5, 0, Math.PI / 1.5)
      g.endFill();

      g.pivot.set(width / 2, (radius / 2) * 0.33);
      g.position.set(x, y);
    },
    [props],
  );

  return <Graphics draw={draw} filters={props.filters} x={props.x} y={props.y} ref={graphicRef} />;
}));

export default ClockHand;