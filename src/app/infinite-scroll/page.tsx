"use client";

import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import axios from "axios";

interface Item {
  id: number;
  title: string;
}

// ✅ fetchItems 함수
const fetchItems = async (
  pageParam: number = 1
): Promise<{ items: Item[]; nextPage?: number }> => {
  const res = await axios.get(`/api/items?page=${pageParam}`);
  const { items, hasNextPage } = res.data;
  return {
    items,
    nextPage: hasNextPage ? pageParam + 1 : undefined,
  };
};

export default function InfiniteScrollPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<{ items: Item[]; nextPage?: number }>({
      queryKey: ["items"],
      queryFn: ({ pageParam }: QueryFunctionContext) =>
        fetchItems(typeof pageParam === "number" ? pageParam : 1),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.items.map((item) => (
            <div key={item.id} className="border p-2 my-2">
              {item.title}
            </div>
          ))}
        </div>
      ))}
      <div ref={loadMoreRef} style={{ height: 30 }} />
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}
