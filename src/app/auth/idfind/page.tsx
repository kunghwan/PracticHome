"use client";

import { useState } from "react";
import { FaIdBadge } from "react-icons/fa";
import { FaAsterisk } from "react-icons/fa6";

const FindId = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white border shadow-lg overflow-hidden">
        {/* 상단 탭 */}
        <div className="flex text-sm font-bold">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#D57979] text-white py-2">
            <FaIdBadge className="text-lg" />
            아이디 찾기
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#C5E3DB] text-black py-2">
            <FaAsterisk className="text-blue-900 text-base" />
            비밀번호 찾기
          </button>
        </div>

        {/* 이름 입력 */}
        <div className="flex items-center px-6 py-2">
          <label className="w-24 text-sm text-black font-semibold">이름</label>
          <input
            className="flex-1 px-3 py-2 bg-lime-300 rounded outline-none text-sm"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 전화번호 + 인증번호 받기 */}
        <div className="flex items-center px-6 py-2">
          <label className="w-24 text-sm text-black font-semibold">
            전화번호
          </label>
          <input
            className="flex-1 px-3 py-2 bg-lime-300 rounded outline-none text-sm"
            placeholder="010-0000-0000"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <button className="ml-2 px-2 py-1 text-sm rounded bg-[#C5E3DB] text-black whitespace-nowrap">
            인증번호 받기
          </button>
        </div>

        {/* 인증번호 입력 + 재전송 */}
        <div className="flex items-center px-6 py-2">
          <label className="w-24 text-transparent">-</label>
          <input
            className="flex-1 px-3 py-2 bg-lime-300 rounded outline-none text-sm"
            placeholder="인증번호 6자리 숫자 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="ml-2 px-2 py-1 text-sm rounded bg-[#C5E3DB] text-black">
            재전송
          </button>
        </div>

        {/* 확인 버튼 */}
        <div className="px-6 py-4">
          <button className="w-full bg-[#6EE7B7] hover:bg-[#5ED8A6] text-white font-bold py-2 rounded text-base">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindId;
