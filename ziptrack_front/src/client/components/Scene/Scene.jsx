import React, { useState, useEffect, useRef } from "react";
import { useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";

extend({ DragControls });
extend({ OrbitControls });

const Box = React.forwardRef(({ height, width, color }, ref) => {
  const mat = useRef();
  console.log(mat);
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[width, height, 1]} />
      <meshPhongMaterial
        ref={mat}
        attach="material"
        color={color}
        specular={0xffffff}
      />
    </mesh>
  );
});

const Scene = ({ data }) => {
  const {
    height = 3,
    width = 3,
    frameColor = "#000000",
    currentControls = "orbit"
  } = data;
  const three = useThree();
  const {
    camera,
    gl: { domElement }
  } = three;
  const mesh = useRef();
  const [meshLoaded, changeLoaded] = useState(false);

  useEffect(() => {
    if (mesh.current.hasOwnProperty("type") && mesh.current.type === "Mesh")
      changeLoaded(true);
  }, [mesh]);

  return (
    <>
      <Box ref={mesh} height={height} width={width} color={frameColor} />
      <ambientLight />
      <pointLight color={0xff0000} intensity={0.4} position={[10, 10, 10]} />
      <pointLight color={0x00ff00} intensity={0.4} position={[10, -10, 10]} />
      {currentControls === "drag" && meshLoaded && (
        <dragControls args={[[mesh.current], camera, domElement]} />
      )}
      {currentControls === "orbit" && (
        <orbitControls args={[camera, domElement]} />
      )}
    </>
  );
};

export default Scene;
