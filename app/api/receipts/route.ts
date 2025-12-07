import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET: Fetch receipts with optional date filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const search = searchParams.get("search");

  let query = supabaseServer
    .from("receipts")
    .select(`
      *,
      receipt_items (*)
    `)
    .order("created_at", { ascending: false });

  // Apply date filters
  if (startDate) {
    query = query.gte("created_at", startDate);
  }
  if (endDate) {
    // Add 1 day to include the end date fully
    const endDateObj = new Date(endDate);
    endDateObj.setDate(endDateObj.getDate() + 1);
    query = query.lt("created_at", endDateObj.toISOString());
  }

  // Apply search filter
  if (search) {
    query = query.or(`receipt_no.ilike.%${search}%,customer_name.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Create new receipt with items
export async function POST(request: Request) {
  const body = await request.json();
  const { items, ...receiptData } = body;

  // Insert receipt
  const { data: receipt, error: receiptError } = await supabaseServer
    .from("receipts")
    .insert([receiptData])
    .select()
    .single();

  if (receiptError) {
    return NextResponse.json({ error: receiptError.message }, { status: 500 });
  }

  // Insert receipt items
  if (items && items.length > 0) {
    const itemsWithReceiptId = items.map((item: { item_name: string; price: number; quantity: number; amount: number }) => ({
      ...item,
      receipt_id: receipt.id,
    }));

    const { error: itemsError } = await supabaseServer
      .from("receipt_items")
      .insert(itemsWithReceiptId);

    if (itemsError) {
      // Rollback: delete the receipt if items failed
      await supabaseServer.from("receipts").delete().eq("id", receipt.id);
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }
  }

  return NextResponse.json(receipt, { status: 201 });
}
