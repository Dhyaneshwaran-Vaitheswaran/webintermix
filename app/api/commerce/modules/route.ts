import { NextResponse } from "next/server";
import { MODULES, getModuleCategories } from "@/lib/commerce/modules.data";

/** GET /api/commerce/modules — Return the full module catalog */
export async function GET() {
  return NextResponse.json(
    {
      modules: MODULES,
      categories: getModuleCategories(),
      totalModules: MODULES.length,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
