import fs from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const postsDirectory = join(process.cwd(), "markdown/blogs");

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const folder = path[0];
  const restPath = path.slice(1).join("/");
  const fileName = restPath.split("/").pop() || "";

  let filePath = join(postsDirectory, folder, restPath);

  if (!fs.existsSync(filePath)) {
    filePath = join(postsDirectory, "imgs", fileName);
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = fileName.split(".").pop()?.toLowerCase() || "";

  const contentTypes: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    webm: "video/webm",
    mp4: "video/mp4",
  };

  const contentType = contentTypes[ext] || "application/octet-stream";

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
