import { useState } from "react";
import WebFont from "webfontloader";

const useWebfont = (families: [string]) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  WebFont.load({
    google: {
      families,
    },
    active: () => setFontLoaded(true),
  });

  return fontLoaded;
};

export default useWebfont;
