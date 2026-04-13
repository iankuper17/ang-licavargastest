import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// POST: Save a new diagnostic (server-side, uses service role key to bypass RLS)
export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, patron_dominante, puntaje_espejo, puntaje_niebla, puntaje_peso, puntaje_laberinto, respuestas } = body;

    if (!nombre || !email || !patron_dominante || !respuestas) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase.from("diagnosticos").insert([
      {
        nombre,
        email,
        telefono: telefono || null,
        patron_dominante,
        puntaje_espejo: puntaje_espejo || 0,
        puntaje_niebla: puntaje_niebla || 0,
        puntaje_peso: puntaje_peso || 0,
        puntaje_laberinto: puntaje_laberinto || 0,
        respuestas,
      },
    ]).select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data?.[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /api/diagnosticos error:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// GET: List all diagnostics (admin only, uses service role key)
export async function GET(request) {
  try {
    const password = request.headers.get("x-admin-password");
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("diagnosticos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET /api/diagnosticos error:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
