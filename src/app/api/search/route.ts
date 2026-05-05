import { searchPosts, buildSearchIndex } from "@/utils/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], total: 0 });
  }

  try {
    buildSearchIndex();
    const results = searchPosts(query, limit);

    return NextResponse.json({
      results,
      total: results.length,
      query,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed", results: [], total: 0 },
      { status: 500 },
    );
  }
}
