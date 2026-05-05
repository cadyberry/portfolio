"use client";
import UnicornScene from "unicornstudio-react";

export default function UnicornBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <UnicornScene
        projectId="RJ8AcNwMobjce9wv78c3"
        width="100vw"
        height="100vh"
        scale={1}
        dpi={1.5}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.11/dist/unicornStudio.umd.js"
      />
    </div>
  );
}
