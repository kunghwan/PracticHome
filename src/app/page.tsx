"use client";
import { useState } from "react";

const Page = () => {
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [count, setCount] = useState(0); // 좋아요 수

  const toggleLike = () => {
    if (liked) {
      // 이미 좋아요 누른 상태라면 취소
      setCount((prev) => prev - 1);
    } else {
      // 좋아요 누르기
      setCount((prev) => prev + 1);
    }
    setLiked((prev) => !prev); // 상태 반전
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleLike}
        className={`px-4 py-2 rounded-lg ${
          liked ? "bg-red-500 text-white" : "bg-gray-300"
        }`}
      >
        ❤️ 좋아요: {count}
      </button>
    </div>
  );
};

export default Page;
