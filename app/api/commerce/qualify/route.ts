import { NextRequest, NextResponse } from "next/server";
import { IntakeSchema } from "@/lib/commerce/intake.schema";
import { qualifyIntake } from "@/lib/commerce/qualify";

/** POST /api/commerce/qualify — Score an intake payload without submitting it */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = IntakeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const qualify = qualifyIntake(result.data);
    return NextResponse.json(qualify, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
