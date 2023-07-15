import React, { useEffect, useRef, useState, useCallback } from "react";
import { Stage, AppConsumer, Graphics, Container } from "@pixi/react";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import * as PIXI from "pixi.js";
import ClockHand from "./ClockHand";
import Number from "./Number";

interface CircleProps {
  x: number;
  y: number;
  radius: number;
  color: number;
  lineStyle?: Array<number>;
  hole?: Array<number>;
  filters?: Array<PIXI.Filter>;
}

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  filters?: Array<PIXI.Filter>;
}

const Circle = React.forwardRef<PIXI.Graphics, CircleProps>(
  ({ x, y, radius, color, lineStyle, filters = [], hole }, ref) => {
    return (
      <Graphics
        x={x}
        y={y}
        ref={ref}
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
  }
);

const Rectangle = React.forwardRef<PIXI.Graphics, RectangleProps>((props) => {
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

const App: React.FC = () => {
  const circle = useRef<PIXI.Graphics>(null);
  const [radius, setRadius] = useState(
    Math.min(window.innerWidth, window.innerHeight) / 2 - 100
  );

  const resize = () => {
    if (circle.current) {
      circle.current.x = window.innerWidth / 2;
      circle.current.y = window.innerHeight / 2;
      setRadius(Math.min(window.innerWidth, window.innerHeight) / 2 - 100);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{
        backgroundColor: 0xffffff,
        resizeTo: window,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
      }}
    >
      <AppConsumer>
        {(app) => {
          (globalThis as any).__PIXI_APP__ = app; // for debugging
          return (
            <Container>
              <Rectangle
                x={app.screen.width / 2 - app.screen.width * 0.175}
                y={0}
                width={app.screen.width * 0.35}
                height={app.screen.height}
                color={0x2e1d06}
                filters={[
                  new DropShadowFilter({
                    offset: { x: 0, y: 0 },
                    resolution: 5,
                    alpha: 0.5,
                    blur: 1,
                  }),
                ]}
              />
              <Circle
                x={app.screen.width / 2}
                y={app.screen.height / 2}
                radius={radius - 10}
                color={0xffffff}
              />
              <Circle
                x={app.screen.width / 2}
                y={app.screen.height / 2}
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
                hole={[0, 0, radius - 10]}
                ref={circle}
              />
              <Number
                x={app.screen.width / 2}
                y={app.screen.height / 2 - radius + 34 + 20}
                text="12"
              />
              <Number
                x={app.screen.width / 2 + radius - 34 - 20}
                y={app.screen.height / 2}
                text="3"
              />
              <Number
                x={app.screen.width / 2}
                y={app.screen.height / 2 + radius - 34 - 20}
                text="6"
              />
              <Number
                x={app.screen.width / 2 - radius + 34 + 20}
                y={app.screen.height / 2}
                text="9"
              />
              <ClockHand
                x={app.screen.width / 2}
                y={app.screen.height / 2}
                width={radius * 0.04}
                height={radius * 0.85}
                type="hour"
                color={0x000000}
                filters={[
                  new DropShadowFilter({
                    offset: { x: 0, y: 0 },
                    resolution: 5,
                    alpha: 0.5,
                    blur: 1,
                  }),
                ]}
                radius={radius}
              />
              <ClockHand
                x={app.screen.width / 2}
                y={app.screen.height / 2}
                width={radius * 0.03}
                height={radius}
                type="minute"
                color={0x000000}
                filters={[
                  new DropShadowFilter({
                    offset: { x: 0, y: 0 },
                    resolution: 5,
                    alpha: 0.5,
                    blur: 1,
                  }),
                ]}
                radius={radius}
              />
              <ClockHand
                x={app.screen.width / 2}
                y={app.screen.height / 2}
                width={radius * 0.01}
                height={radius}
                type="second"
                color={0xff0000}
                filters={[
                  new DropShadowFilter({
                    offset: { x: 0, y: 0 },
                    resolution: 5,
                    alpha: 0.5,
                    blur: 1,
                  }),
                ]}
                radius={radius}
              />
              <Circle
                x={app.screen.width / 2}
                y={app.screen.height / 2}
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
            </Container>
          );
        }}
      </AppConsumer>
    </Stage>
  );
};

export default App;