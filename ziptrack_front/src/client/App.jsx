import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import SideBar from "./components/SideBar/SideBar";
import Scene from "./components/Scene/Scene";
import AppContext from "./AppContext";
import "./App.scss";

const App = () => {
  const [currentControls, changeControls] = useState("orbit");
  const [height, changeHeight] = useState(3);
  const [width, changeWidth] = useState(3);
  const [frameColor, changeFrameColor] = useState("#000000");

  const data = {
    height,
    changeHeight,
    width,
    changeWidth,
    frameColor,
    changeFrameColor,
    currentControls,
    changeControls
  };

  return (
    <AppContext.Provider value={data}>
      <SideBar changeControls={changeControls} />
      <Canvas>
        <Scene data={data} />
      </Canvas>
    </AppContext.Provider>
  );
};

export default App;
