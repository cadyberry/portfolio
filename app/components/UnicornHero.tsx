"use client";

import dynamic from "next/dynamic";

const UnicornScene = dynamic(
  () => import("unicornstudio-react"),
  { ssr: false }
);

export default function UnicornHero() {
  return (
    <div style={{
      width: "100%",
      overflow: "hidden",
      lineHeight: 0,
    }}>
      <UnicornScene
        projectId="4n2MsQ2mYGv92SengCUd"
        width="100%"
        height="560px"
        scale={1}
        dpi={1.5}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.11/dist/unicornStudio.umd.js"
      />
    </div>
  );
}
