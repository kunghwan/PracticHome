"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

type Place = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string;
  y: string;
};

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState("카페");
  const [places, setPlaces] = useState<Place[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);

  // ✅ 지도 객체 생성
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        typeof window !== "undefined" &&
        window.kakao &&
        window.kakao.maps &&
        window.kakao.maps.services
      ) {
        clearInterval(interval);

        window.kakao.maps.load(() => {
          if (!mapRef.current) {
            console.warn("❌ mapRef.current 없음");
            return;
          }

          const mapInstance = new window.kakao.maps.Map(mapRef.current, {
            center: new window.kakao.maps.LatLng(37.5665, 126.978),
            level: 4,
          });

          console.log("🗺️ 지도 생성 완료");
          setMap(mapInstance);
        });
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // ✅ 장소 검색 및 마커 표시
  useEffect(() => {
    if (!map || !keyword) return;

    const { maps } = window.kakao;
    const ps = new maps.services.Places();
    const bounds = new maps.LatLngBounds();

    const markers: any[] = [];

    ps.keywordSearch(keyword, (data: Place[], status: string) => {
      if (status !== maps.services.Status.OK) return;

      setPlaces(data);

      markers.forEach((m) => m.setMap(null));
      markers.length = 0;

      data.forEach((place) => {
        const position = new maps.LatLng(place.y, place.x);
        bounds.extend(position);

        const marker = new maps.Marker({
          map,
          position,
        });

        maps.event.addListener(marker, "click", () => {
          setSelected(place);
        });

        markers.push(marker);
      });

      map.setBounds(bounds);
    });
  }, [map, keyword]);

  return (
    <div style={{ display: "flex" }}>
      {/* 왼쪽 정보창 */}
      <aside
        style={{
          width: "300px",
          padding: "20px",
          borderRight: "1px solid #ddd",
          backgroundColor: "#f4f4f4",
        }}
      >
        <h2>📍 장소 정보</h2>
        {selected ? (
          <div>
            <h3>{selected.place_name}</h3>
            <p>{selected.road_address_name || selected.address_name}</p>
            <p>📞 {selected.phone || "전화번호 없음"}</p>
          </div>
        ) : (
          <p>마커를 클릭해보세요</p>
        )}
      </aside>

      {/* 지도 + 검색 */}
      <div style={{ flex: 1 }}>
        <div style={{ padding: 10 }}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어 입력 (예: 편의점)"
            style={{
              padding: 8,
              fontSize: 16,
              width: "70%",
              marginRight: 8,
              backgroundColor: "#f4f4f4",
            }}
          />
          <button
            onClick={() => setKeyword(keyword)}
            style={{ padding: 8, fontSize: 16 }}
          >
            검색
          </button>
        </div>

        {/* ✅ 지도 컨테이너 - 반드시 닫힘 태그 사용 */}
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "500px",
            minHeight: "400px",
            backgroundColor: "#eee", // 배경색은 디버깅용
          }}
        ></div>
      </div>
    </div>
  );
};

export default KakaoMap;
