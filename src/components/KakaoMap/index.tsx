"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
        clearInterval(interval); // 로딩되면 반복 중지

        window.kakao.maps.load(() => {
          if (mapRef.current) {
            const map = new window.kakao.maps.Map(mapRef.current, {
              center: new window.kakao.maps.LatLng(37.5665, 126.978),
              level: 3,
            });

            new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(37.5665, 126.978),
              map,
            });
          }
        });
      }
    }, 300); // 300ms 간격으로 체크

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default KakaoMap;
