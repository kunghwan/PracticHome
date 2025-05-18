import { NextRequest } from "next/server";

const fakeItems = Array.from({ length: 1000 }).map((_, idx) => ({
  id: idx + 1,
  title: `Item ${idx + 1}`,
}));

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const pageSize = 10;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pagedItems = fakeItems.slice(start, end);

  return Response.json({
    items: pagedItems,
    hasNextPage: end < fakeItems.length,
  });
}
