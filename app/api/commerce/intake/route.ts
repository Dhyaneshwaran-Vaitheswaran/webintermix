import { NextRequest, NextResponse } from "next/server";
import { IntakeSchema } from "@/lib/commerce/intake.schema";
import { qualifyIntake } from "@/lib/commerce/qualify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = IntakeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: result.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    // Run qualification scoring
    const qualify = qualifyIntake(result.data);

    return NextResponse.json(qualify, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Allow": "POST, OPTIONS",
    },
  });
}
