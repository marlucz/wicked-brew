import { PerspectiveCamera } from "@react-three/drei";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  Noise,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";

export const Settings = () => {
  const { x, y, z, zoom } = useControls("Camera", {
    x: { min: -20, max: 20, value: 1.18, step: 0.01, label: "x" },
    y: { min: -20, max: 20, value: 4.46, step: 0.01, label: "y" },
    z: { min: -20, max: 20, value: -4.55, step: 0.01, label: "z" },
    zoom: { min: 0, max: 5, value: 1, step: 0.01, label: "zoom" },
    fov: { min: 0, max: 180, value: 45, step: 1, label: "fov" },
  });

  const { intensity, angle } = useControls("Lighting", {
    intensity: {
      min: 0,
      max: 100,
      value: 5,
      step: 0.01,
      label: "intensity",
    },
    angle: { min: 0, max: 1, value: 0.6, step: 0.01, label: "angle" },
  });

  return (
    <>
      <color attach="background" args={[0x000000]} />
      <hemisphereLight args={[0x552200, "#220011", 5]} />;
      <hemisphereLight args={[0x552200, 0, 1]} />;
      <directionalLight position={[5, 1, 0]} castShadow />
      <spotLight
        position={[0, 10, 0]}
        intensity={intensity}
        color={0xff4500}
        castShadow
        angle={angle}
        penumbra={1}
        decay={0}
      />
      <fog attach="fog" args={["#220011", 5, 10]} />
      <PerspectiveCamera
        makeDefault
        position={[x, y, z]}
        fov={45}
        zoom={zoom}
        far={20}
      />
      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
        <Noise opacity={0.05} />
        <Bloom
          intensity={2}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.1}
          mipmapBlur
        />
        <ToneMapping averageLuminance={0.5} middleGrey={3} />
        <BrightnessContrast brightness={-0.03} contrast={-0.05} />
      </EffectComposer>
    </>
  );
};
