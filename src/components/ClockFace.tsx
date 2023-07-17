import React from "react";
import { Graphics } from "@pixi/react";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import * as PIXI from "pixi.js";

interface ClockFaceProps {
  size: { width: number; height: number };
  radius: number;
  borderSize: number;
  children: React.ReactNode;
}

interface CircleProps {
  x: number;
  y: number;
  radius: number;
  color: number;
  lineStyle?: Array<number>;
  hole?: Array<number>;
  filters?: Array<PIXI.Filter>;
}

const Circle: React.FC<CircleProps> = ({
  x,
  y,
  radius,
  color,
  lineStyle,
  filters = [],
  hole,
}) => {
  return (
    <Graphics
      x={x}
      y={y}
      draw={(g) => {
        g.clear();
        lineStyle && g.lineStyle(lineStyle[0], lineStyle[1]);
        g.beginFill(color);
        g.drawCircle(0, 0, radius);
        g.endFill();
        if (hole) {
          g.beginHole();
          g.drawCircle(hole[0], hole[1], hole[2]); // Draw a smaller circle inside the main circle to create a transparent mask
          g.endHole();
        }
      }}
      filters={filters}
    />
  );
};

const ClockFace: React.FC<ClockFaceProps> = ({
  size,
  radius,
  borderSize,
  children,
}) => {
  return (
    <>
      <Circle
        x={size.width / 2}
        y={size.height / 2}
        radius={radius - borderSize}
        color={0xffffff}
      />
      <Circle
        x={size.width / 2}
        y={size.height / 2}
        radius={radius}
        color={0xdaa520}
        filters={[
          new DropShadowFilter({
            offset: { x: 0, y: 0 },
            resolution: 5,
            alpha: 1,
            blur: 1,
          }),
        ]}
        hole={[0, 0, radius - borderSize]}
      />
      {children}
      <Circle
        x={size.width / 2}
        y={size.height / 2}
        radius={radius * 0.02}
        color={0xffffff}
        filters={[
          new DropShadowFilter({
            offset: { x: 0, y: 0 },
            blur: 1,
            alpha: 1,
            resolution: 5,
          }),
        ]}
      />
    </>
  );
};

export default ClockFace;
