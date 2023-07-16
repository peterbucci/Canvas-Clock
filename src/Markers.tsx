import React from "react";
import Marker from "./Marker";
import * as PIXI from "pixi.js";

interface MarkerProps {
  app: PIXI.Application;
  radius: number;
  borderSize: number;
}

const Markers: React.FC<MarkerProps> = ({ app, radius, borderSize }) => {
  const markerWidth = Math.max(1, radius * 0.01);
  const markerHeight = Math.max(2, radius * 0.03);
  const markerColor = 0x000000;

  const markers = Array.from({ length: 60 }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / 60 - Math.PI / 2;

    const hourMultiplier = i % 5 === 0 ? 1.2 : 1;

    const markerX =
      app.screen.width / 2 +
      (radius - borderSize * 1.6 * hourMultiplier) * Math.cos(angle);
    const markerY =
      app.screen.height / 2 +
      (radius - borderSize * 1.6 * hourMultiplier) * Math.sin(angle);

    const modifiedWidth = i % 5 === 0 ? markerWidth * 2 : markerWidth;
    const modifiedHeight = i % 5 === 0 ? markerHeight * 2 : markerHeight;

    return (
      <Marker
        key={i}
        x={markerX}
        y={markerY}
        width={modifiedWidth}
        height={modifiedHeight}
        rotation={angle + Math.PI / 2} // Add Math.PI / 2 to align the marker vertically
        color={markerColor}
      />
    );
  });

  return <>{markers}</>;
};

export default Markers;
