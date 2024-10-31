import "./App.css";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import { Leva } from "leva";

import SoundIcon from "./assets/sound.svg?react";
import NoSoundIcon from "./assets/no-sound.svg?react";

import { BubbleLoader } from "./components/BubbleLoader";
import { useSound } from "./useSound";
// import { Scene } from "./scene";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  useSound({ play: isPlaying });

  return (
    <>
      <BubbleLoader />
      <Leva collapsed hidden />
      {/* <Canvas
        gl={{
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 0.5,
          preserveDrawingBuffer: true,
        }}
        shadows
        dpr={[0.5, 1]}
      >
        <Scene />
      </Canvas> */}
      <div className="absolute bottom-5 right-5 z-50 flex flex-col gap-2 text-xs lg:text-base">
        <div className="flex gap-1 items-center">
          Sound:
          <button
            className="cursor-pointer scale-75 lg:scale-100"
            onClick={() => setIsPlaying((val) => !val)}
          >
            {isPlaying ? <SoundIcon /> : <NoSoundIcon />}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
