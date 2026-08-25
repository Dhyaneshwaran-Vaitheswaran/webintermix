import { NextResponse } from "next/server";

/** GET /api/performance — Server-side performance metrics */
export async function GET() {
  const memUsage =
    typeof process !== "undefined" && process.memoryUsage
      ? process.memoryUsage()
      : null;

  return NextResponse.json(
    {
      timestamp: new Date().toISOString(),
      uptime: typeof process !== "undefined" ? Math.floor(process.uptime()) : null,
      memory: memUsage
        ? {
            heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(1)} MB`,
            heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(1)} MB`,
            rss: `${(memUsage.rss / 1024 / 1024).toFixed(1)} MB`,
          }
        : null,
      nodeVersion: process.version,
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
