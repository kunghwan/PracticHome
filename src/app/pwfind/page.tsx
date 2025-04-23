"use client";

import { useEffect, useState } from "react";

interface ValidationResult {
  isValid: boolean; // 유효한지 여부
  message?: string; // 오류메세지
}

// 비밀번호 재설정 시 입력받는 폼 구조
interface FindPasswordForm {
  newPassword: string; // 새 비밀번호
  confirmPassword: string; // 새 비밀번호 확인
}

// 비밀번호 재설정 폼의 유효성 검사 결과
interface FindPasswordValidation {
  newPassword?: ValidationResult; // 새 비밀번호 유효성 검사 결과
  confirmPassword?: ValidationResult; // 새 비밀번호 확인 유효성 검사 결과
}

const IdFindResult = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("realEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <>
      <div className="p-2">
        <h2 className="text-2xl font-bold  mb-4">비밀번호 재설정</h2>
        <div className="border h-80 justify-center flex items-center">
          <div>
            {email ? (
              <p className="text-xl text-black">
                이메일 :{" "}
                <span className="font-bold text-blue-600">{email}</span>
              </p>
            ) : (
              <p className="text-lg text-gray-500">이메일 정보가 없습니다.</p>
            )}
            <div className="flex flex-col mt-5 ">
              <input
                type="text"
                placeholder="새비밀번호"
                className="border p-2 border-emerald-300"
              />
              <input
                type="text"
                placeholder="새 비밀번호 확인"
                className="border p-2 border-emerald-300"
              />
            </div>
          </div>
        </div>
        <div className=" flex justify-center">
          <button className=" bg-gray-300 rounded-2xl p-5 mt-3 flex justify-center w-50 items-center lg:w-80 lg:flex ">
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default IdFindResult;
