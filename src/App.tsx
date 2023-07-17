import React from "react";
import { Stage, AppConsumer } from "@pixi/react";
import Clock from "./components/Clock";
import useWindowDimensions from "./hooks/useWindowDimensions";
import useWebfont from "./hooks/useWebFont";

const App: React.FC = () => {
  const size = useWindowDimensions();
  const fontLoaded = useWebfont(["Orbitron"]);

  return fontLoaded ? (
    <Stage
      width={size.width}
      height={size.height}
      options={{
        backgroundColor: 0xffffff,
        resolution: window.devicePixelRatio || 1,
        antialias: true,
      }}
    >
      <AppConsumer>
        {(app) => {
          (globalThis as any).__PIXI_APP__ = app; // for debugging
          return <Clock app={app} size={size} />;
        }}
      </AppConsumer>
    </Stage>
  ) : (
    <></>
  );
};

export default App;
