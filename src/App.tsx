import React from "react";
import { Stage, AppConsumer } from "@pixi/react";
import Clock from "./Clock";

const App: React.FC = () => {
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
          return <Clock app={app} />;
        }}
      </AppConsumer>
    </Stage>
  );
};

export default App;
