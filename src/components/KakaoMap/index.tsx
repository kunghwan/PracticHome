"use client";
import { useEffect, useRef, useState } from "react";

// ✅ 전역 window에 kakao 타입 정의
declare global {
  interface Window {
    kakao: any;
  }
}

// ✅ 카카오 장소 타입 정의
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
  const mapRef = useRef<HTMLDivElement>(null); // 지도 DOM 참조용
  const [map, setMap] = useState<any>(null); // 지도 객체 상태
  const [places, setPlaces] = useState<Place[]>([]); // 검색된 장소 목록
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null); // 마커 클릭 시 왼쪽에 표시할 장소
  const [keyword, setKeyword] = useState("맛집"); // 실제 검색어
  const [inputValue, setInputValue] = useState("맛집"); // 입력창에 입력 중인 값
  const markers = useRef<any[]>([]); // 생성된 마커 목록 저장

  // ✅ 지도 생성 useEffect (최초 1회 실행)
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;

      // 대전 중심 좌표
      const center = new window.kakao.maps.LatLng(36.3324, 127.4345);

      // 지도 생성
      const mapInstance = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 7,
      });

      setMap(mapInstance);
    };

    // 카카오 스크립트 로딩 후 initMap 호출
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
    }
  }, []);

  // ✅ 장소 검색 함수
  const searchPlaces = (keyword: string) => {
    if (!map) return;

    const { maps } = window.kakao;
    const ps = new maps.services.Places();

    // 대전 전체 범위 설정 (좌하단 ~ 우상단)
    const bounds = new maps.LatLngBounds(
      new maps.LatLng(36.175, 127.29),
      new maps.LatLng(36.48, 127.58)
    );

    // 키워드 검색 요청
    ps.keywordSearch(
      keyword,
      (data: Place[], status: string) => {
        if (status !== maps.services.Status.OK) return;

        // 검색 결과 상태 저장
        setPlaces(data);

        // 기존 마커 제거
        markers.current.forEach((m) => m.setMap(null));
        markers.current = [];

        // 새로운 마커 생성 및 이벤트 등록
        data.forEach((place) => {
          const position = new maps.LatLng(Number(place.y), Number(place.x));
          const marker = new maps.Marker({ position, map });

          // 마커 클릭 시 → 상세 정보 표시
          maps.event.addListener(marker, "click", () => {
            handlePlaceClick(place); // 기본값 true → 왼쪽 정보창 뜸
          });

          markers.current.push(marker);
        });
      },
      { bounds } // 대전 지역으로 제한
    );
  };

  // ✅ 키워드 변경 시 자동 검색 실행
  useEffect(() => {
    if (keyword) {
      searchPlaces(keyword);
    }
  }, [map, keyword]);

  // ✅ 마커 또는 리스트 클릭 시 처리
  const handlePlaceClick = (place: Place, showDetail: boolean = true) => {
    if (!map) return;

    // 클릭된 장소로 지도 이동
    const latlng = new window.kakao.maps.LatLng(
      Number(place.y),
      Number(place.x)
    );
    map.panTo(latlng);

    // showDetail이 true일 때만 상세정보 표시
    if (showDetail) {
      setSelectedPlace(place);
    }
  };

  // ✅ 검색 버튼 클릭
  const handleSearch = () => {
    setKeyword(inputValue.trim());
  };

  // ✅ 엔터키 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 🔍 검색창 */}
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

      {/* 🗺 지도 + 📋 검색결과 + 📌 상세 정보 */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* 📌 왼쪽 상세정보 패널 */}
        {selectedPlace && (
          <div
            style={{
              width: "300px",
              height: "100%",
              overflowY: "auto",
              borderRight: "1px solid #ddd",
              padding: "16px",
              backgroundColor: "#f1f1f1",
              position: "relative",
            }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedPlace(null)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "transparent",
                border: "none",
                fontSize: 18,
                cursor: "pointer",
              }}
              title="닫기"
            >
              ❌
            </button>

            {/* 상세 정보 */}
            <h2>📌 상세 정보</h2>
            <strong>{selectedPlace.place_name}</strong>
            <p>
              {selectedPlace.road_address_name || selectedPlace.address_name}
            </p>
            <p>☎ {selectedPlace.phone || "전화번호 없음"}</p>
          </div>
        )}

        {/* 🗺 지도 */}
        <div
          ref={mapRef}
          style={{
            flex: 1,
            height: "100vh",
            backgroundColor: "#eaeaea",
          }}
        />

        {/* 📋 검색결과 리스트 */}
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
                onClick={() => handlePlaceClick(place, false)} // false → 왼쪽 정보창 X
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
