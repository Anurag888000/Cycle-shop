import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET: Fetch all bicycles
export async function GET() {
  const { data, error } = await supabaseServer
    .from("bicycles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Add new bicycle
export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabaseServer
    .from("bicycles")
    .insert([body])
    .select();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0], { status: 201 });
}
