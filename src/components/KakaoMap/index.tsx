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
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [keyword, setKeyword] = useState("관광지");
  const [inputValue, setInputValue] = useState("관광지");
  const markers = useRef<any[]>([]);

  // ✅ 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      const center = new window.kakao.maps.LatLng(36.3324, 127.4345);
      const mapInstance = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 7,
      });

      setMap(mapInstance);
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
    }
  }, []);

  // ✅ 장소 검색
  const searchPlaces = (keyword: string) => {
    if (!map) return;

    const { maps } = window.kakao;
    const ps = new maps.services.Places();

    const bounds = new maps.LatLngBounds(
      new maps.LatLng(36.175, 127.29),
      new maps.LatLng(36.48, 127.58)
    );

    ps.keywordSearch(
      keyword,
      (data: Place[], status: string) => {
        if (status !== maps.services.Status.OK) return;

        setPlaces(data);
        markers.current.forEach((m) => m.setMap(null));
        markers.current = [];

        data.forEach((place) => {
          const position = new maps.LatLng(Number(place.y), Number(place.x));
          const marker = new maps.Marker({ position, map });

          maps.event.addListener(marker, "click", () => {
            handlePlaceClick(place);
          });

          markers.current.push(marker);
        });
      },
      { bounds }
    );
  };

  useEffect(() => {
    if (keyword) {
      searchPlaces(keyword);
    }
  }, [map, keyword]);

  // ✅ 장소 클릭 시 지도 이동 + 정보 패널 업데이트
  const handlePlaceClick = (place: Place) => {
    if (!map) return;

    const latlng = new window.kakao.maps.LatLng(
      Number(place.y),
      Number(place.x)
    );
    map.panTo(latlng);
    setSelectedPlace(place); // 왼쪽 상세정보 표시
  };

  const handleSearch = () => {
    setKeyword(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 검색창 */}
      <div
        style={{
          padding: 10,
          borderBottom: "1px solid #ccc",
          background: "#fafafa",
        }}
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="장소 검색 (예: 공원, 박물관, 맛집)"
          style={{ padding: 8, fontSize: 16, width: "70%", marginRight: 10 }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "8px 16px", fontSize: 16 }}
        >
          검색
        </button>
      </div>

      {/* 지도 & 리스트 & 상세정보 */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* 왼쪽 상세정보 패널 */}
        <div
          style={{
            width: "300px",
            height: "100%",
            overflowY: "auto",
            borderRight: "1px solid #ddd",
            padding: "16px",
            backgroundColor: "#f1f1f1",
          }}
        >
          <h2>📌 상세 정보</h2>
          {selectedPlace ? (
            <div>
              <strong>{selectedPlace.place_name}</strong>
              <p>
                {selectedPlace.road_address_name || selectedPlace.address_name}
              </p>
              <p>☎ {selectedPlace.phone || "전화번호 없음"}</p>
            </div>
          ) : (
            <p>마커를 클릭하면 정보가 표시됩니다.</p>
          )}
        </div>

        {/* 지도 */}
        <div ref={mapRef} style={{ flex: 1, height: "100vh" }} />

        {/* 오른쪽 검색 결과 리스트 */}
        <div
          style={{
            width: "300px",
            height: "100%",
            overflowY: "auto",
            borderLeft: "1px solid #ddd",
            padding: "16px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>📍 검색 결과</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {places.map((place) => (
              <li
                key={place.id}
                onClick={() => handlePlaceClick(place)}
                style={{
                  marginBottom: "16px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
              >
                <strong>{place.place_name}</strong>
                <br />
                <span style={{ fontSize: "12px" }}>
                  {place.road_address_name || place.address_name}
                </span>
                <br />
                <span style={{ fontSize: "12px", color: "#666" }}>
                  {place.phone || "전화번호 없음"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
