import { useProgress } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";
import CauldronIcon from "../assets/cauldron.svg?react";

const dataInterpolation = (p: number) => `Brewing ${p.toFixed(2)}%`;

export const BubbleLoader = () => {
  const { active, progress } = useProgress();
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const progressSpanRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let t: number;
    if (active !== shown) t = setTimeout(() => setShown(active), 300);
    return () => clearTimeout(t);
  }, [shown, active]);

  const updateProgress = useCallback(() => {
    if (!progressSpanRef.current) return;
    progressRef.current += (progress - progressRef.current) / 2;
    if (progressRef.current > 0.95 * progress || progress === 100)
      progressRef.current = progress;
    progressSpanRef.current.innerText = dataInterpolation(progressRef.current);
    if (progressRef.current < progress)
      rafRef.current = requestAnimationFrame(updateProgress);
  }, [progress]);

  useEffect(() => {
    updateProgress();
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProgress]);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-[#140027] flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out z-1000 `}
    >
      <div className="bubble-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="256px"
        width="256px"
        viewBox="0 0 271.71 271.71"
        style={{ filter: "url(#fullFill)" }}
      >
        <defs>
          <filter
            id="fullFill"
            primitiveUnits="objectBoundingBox"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feFlood floodColor="green" />
            <feOffset>
              <animate
                attributeName="dy"
                from="1" // Start at bottom
                to="0" // Fill to top
                dur="3s"
                repeatCount="indefinite"
              />
            </feOffset>
            <feComposite operator="in" in2="SourceGraphic" />
            <feComposite operator="over" in2="SourceGraphic" />
          </filter>
        </defs>
        <g filter={`url(#fullFill)`}>
          <CauldronIcon />
        </g>
      </svg>
      <div className="w-full text-center">
        <span
          ref={progressSpanRef}
          className="inline-block relative font-mono mt-2 text-[#f0f0f0] text-xl whitespace-nowrap"
        />
      </div>
    </div>
  );
};
