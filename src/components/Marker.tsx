import { Graphics } from "@pixi/react";

interface MarkerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: number;
}

const Marker: React.FC<MarkerProps> = ({
  x,
  y,
  width,
  height,
  rotation,
  color,
}) => (
  <Graphics
    x={x}
    y={y}
    rotation={rotation}
    draw={(g) => {
      g.clear();
      g.beginFill(color);
      g.drawRect(-width / 2, -height / 2, width, height); // Center the rectangle on (x, y)
      g.endFill();
    }}
  />
);

export default Marker;
