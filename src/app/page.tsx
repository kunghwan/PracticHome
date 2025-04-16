"use client";

import dynamic from "next/dynamic";

// ✅ SSR 방지 + 경로 수정
const KakaoMap = dynamic(() => import("../components/KakaoMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>🗺 카카오 지도 React 버전</h1>
      <KakaoMap />
    </main>
  );
}
