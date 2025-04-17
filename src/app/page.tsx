"use client";

import dynamic from "next/dynamic";

// SSR 방지
const KakaoMap = dynamic(() => import("../components/KakaoMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ padding: 0 }}>
      <KakaoMap />
    </main>
  );
}
