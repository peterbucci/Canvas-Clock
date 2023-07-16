import React, { useEffect, useState } from "react";
import { Stage, AppConsumer } from "@pixi/react";
import WebFont from "webfontloader";
import Clock from "./Clock";

const App: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateDimensions = () =>
    setSize({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  WebFont.load({
    google: {
      families: ["Orbitron"],
    },
    active: () => setFontLoaded(true),
  });

  return fontLoaded ? (
    <Stage
      width={size.width}
      height={size.height}
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
          return <Clock app={app} size={size} />;
        }}
      </AppConsumer>
    </Stage>
  ) : (
    <></>
  );
};

export default App;
