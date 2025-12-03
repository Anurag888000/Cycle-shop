import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// PUT: Update bicycle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { error } = await supabaseServer
    .from("bicycles")
    .update(body)
    .eq("id", params.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Updated successfully" });
}

// DELETE: Remove bicycle
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabaseServer
    .from("bicycles")
    .delete()
    .eq("id", params.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted successfully" });
}
