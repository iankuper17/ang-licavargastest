import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (err) {
    console.error("POST /api/admin/login error:", err);
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
  }
}
