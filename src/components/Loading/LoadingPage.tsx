"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const LoadingPage = () => {
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timeset = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeset);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/80 z-[9999] flex flex-col items-center justify-center">
      <CgSpinner className="animate-spin text-4xl mb-2" />
      <p className="text-xl font-bold">로딩중입니다...</p>
    </div>
  );
};

export default LoadingPage;
