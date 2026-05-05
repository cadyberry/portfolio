"use client";
import UnicornScene from "unicornstudio-react";

export default function UnicornWindow() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <UnicornScene
        projectId="RJ8AcNwMobjce9wv78c3"
        width="100%"
        height="100%"
        scale={1}
        dpi={1.5}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.11/dist/unicornStudio.umd.js"
      />
    </div>
  );
}
