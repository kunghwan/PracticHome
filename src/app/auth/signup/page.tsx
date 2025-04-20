"use client";

import { useState } from "react";

interface User {
  uid: string;
  email: string;
  password: string;
  name: string;
  tel: string;
  birth: string;
  agreeLocation: boolean;
}

const Signup = () => {
  const [user, setUser] = useState<User>({
    uid: "",
    email: "",
    password: "",
    name: "",
    tel: "",
    birth: "",
    agreeLocation: false,
  });

  const handleChange = (key: keyof User, value: string | boolean) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("회원가입 정보:", user);
    // TODO: Firebase나 백엔드에 전송
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="border border-gray-200 rounded-lg w-full max-w-md bg-white divide-y divide-gray-200">
        {/* 이름 */}
        <div className="flex items-center p-4">
          <label className="w-32 text-gray-700">이름</label>
          <input
            className="flex-1 border-none focus:outline-none"
            placeholder="이름을 입력하세요"
            value={user.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* 이메일 + 중복확인 버튼 */}
        <div className="flex items-center p-4">
          <label className="w-32 text-gray-700">이메일</label>
          <input
            className="flex-1 border-none focus:outline-none"
            placeholder="이메일을 입력하세요"
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <button className="ml-2 px-2 py-1 text-sm rounded bg-[#C5E3DB] text-gray-700">
            중복확인
          </button>
        </div>

        {/* 비밀번호 */}
        <div className="flex items-center p-4">
          <label className="w-32 text-gray-700">비밀번호</label>
          <input
            type="password"
            className="flex-1 border-none focus:outline-none"
            placeholder="비밀번호 입력"
            value={user.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        {/* 생년월일 */}
        <div className="flex items-center p-4">
          <label className="w-32 text-gray-700">생년월일(8자리)</label>
          <input
            className="flex-1 border-none focus:outline-none"
            placeholder="예: 19980101"
            value={user.birth}
            onChange={(e) => handleChange("birth", e.target.value)}
          />
        </div>

        {/* 전화번호 */}
        <div className="flex items-center p-4">
          <label className="w-32 text-gray-700">전화번호</label>
          <input
            className="flex-1 border-none focus:outline-none"
            placeholder="010-0000-0000"
            value={user.tel}
            onChange={(e) => handleChange("tel", e.target.value)}
          />
        </div>

        {/* 위치정보 제공 동의 */}
        <div className="flex items-center p-4">
          <label className="w-32 text-gray-700">위치정보 동의</label>
          <input
            type="checkbox"
            checked={user.agreeLocation}
            onChange={(e) => handleChange("agreeLocation", e.target.checked)}
            className="w-5 h-5 accent-green-500"
          />
        </div>
      </div>

      {/* 가입 버튼 */}
      <button
        className="mt-6 w-full max-w-md bg-green-400 hover:bg-green-500 text-white font-bold py-3 rounded"
        onClick={handleSubmit}
      >
        가입
      </button>
    </div>
  );
};

export default Signup;
