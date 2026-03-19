import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// PATCH: Update a diagnostic (e.g., mark WhatsApp click)
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("diagnosticos")
      .update(body)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data?.[0] });
  } catch (err) {
    console.error("PATCH /api/diagnosticos/[id] error:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
