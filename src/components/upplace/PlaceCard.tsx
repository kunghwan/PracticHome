// components/PlaceCard.tsx

import React from "react";

interface Place {
  contentid: string;
  title: string;
  addr1: string;
  firstimage: string;
  likeCount: number; // ✅ 추가
}

const PlaceCard: React.FC<{ place?: Place }> = ({ place }) => {
  if (!place) return null; // ⛔️ place가 undefined면 렌더링 X

  const defaultImage = "/image/logoc.PNG";
  const validImage =
    place.firstimage && place.firstimage.trim() !== ""
      ? place.firstimage.trim()
      : defaultImage;

  return (
    <div className="border p-4 rounded-lg shadow">
      <img
        src={validImage}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultImage;
        }}
        alt={place.title}
        className="w-full h-48 object-cover rounded"
        loading="lazy"
      />
      <h2 className="text-lg font-bold mt-2">{place.title}</h2>
      <p className="text-sm text-gray-600">{place.addr1}</p>
      <p className="text-sm text-gray-500">❤️ 좋아요: {place.likeCount}</p>
    </div>
  );
};

export default PlaceCard;
