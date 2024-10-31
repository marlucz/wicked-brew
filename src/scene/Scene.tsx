import { Suspense } from "react";
import { Settings } from "./Settings";

export const Scene = () => {
  return (
    <>
      <Settings />
      <Suspense fallback={null}></Suspense>
    </>
  );
};
