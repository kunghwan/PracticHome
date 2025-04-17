"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

// ✅ 로딩 상태 타입 지정
interface LoadingState {
  isLoading: boolean;
  message?: string;
}

const LoadingPage = () => {
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    message: "로딩중입니다...",
  });

  const pathname = usePathname();

  useEffect(() => {
    setLoading({ isLoading: true, message: "로딩중입니다..." });

    const timeset = setTimeout(() => {
      setLoading({ isLoading: false });
    }, 500);

    return () => clearTimeout(timeset);
  }, [pathname]);

  if (!loading.isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/80 z-[9999] flex flex-col items-center justify-center ">
      <CgSpinner className="animate-spin text-4xl mb-2 " />
      <p className="text-xl font-bold">{loading.message}</p>
    </div>
  );
};

export default LoadingPage;
