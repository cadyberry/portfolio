"use client";
import Script from "next/script";

export default function UnicornBg() {
  return (
    <>
      <Script
        src="https://cdn.unicorn.studio/v1.4.0/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          const w = window as unknown as {
            UnicornStudio?: { addScene: (o: object) => void };
          };
          w.UnicornStudio?.addScene({
            elementId: "unicorn-bg",
            projectId: "lAv9VIcKSBIRuE0AbtY8",
            fps: 60,
            scale: 1,
            dpi: 1.5,
            interactivity: { mouse: { disableMobile: true } },
          });
        }}
      />
      <div
        id="unicorn-bg"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
