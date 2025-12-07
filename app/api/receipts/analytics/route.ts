import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET: Fetch analytics data with date filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "today";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let dateFilter: { start: Date; end: Date };
  const now = new Date();

  // Calculate date range based on period
  switch (period) {
    case "today":
      dateFilter = {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      };
      break;
    case "week":
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      dateFilter = {
        start: startOfWeek,
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      };
      break;
    case "month":
      dateFilter = {
        start: new Date(now.getFullYear(), now.getMonth(), 1),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      };
      break;
    case "custom":
      if (startDate && endDate) {
        const endDateObj = new Date(endDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        dateFilter = {
          start: new Date(startDate),
          end: endDateObj,
        };
      } else {
        // Default to today if custom dates not provided
        dateFilter = {
          start: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        };
      }
      break;
    default:
      dateFilter = {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      };
  }

  // Fetch receipts with their items for the period
  const { data: receipts, error } = await supabaseServer
    .from("receipts")
    .select("*, receipt_items(*)")
    .gte("created_at", dateFilter.start.toISOString())
    .lt("created_at", dateFilter.end.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map receipt_items to items for frontend compatibility
  const receiptsWithItems = receipts?.map((receipt) => ({
    ...receipt,
    items: receipt.receipt_items || [],
    receipt_items: undefined, // Remove the raw field
  })) || [];

  // Calculate analytics
  const totalRevenue = receipts?.reduce((sum, r) => sum + Number(r.grand_total), 0) || 0;
  const totalReceipts = receipts?.length || 0;
  const averageOrderValue = totalReceipts > 0 ? totalRevenue / totalReceipts : 0;
  const totalDiscount = receipts?.reduce((sum, r) => sum + Number(r.discount_amount), 0) || 0;
  const totalGST = receipts?.reduce((sum, r) => sum + Number(r.gst_amount), 0) || 0;

  // Daily breakdown for charts
  const dailyData: Record<string, { revenue: number; count: number }> = {};
  receipts?.forEach((receipt) => {
    const date = new Date(receipt.created_at).toISOString().split("T")[0];
    if (!dailyData[date]) {
      dailyData[date] = { revenue: 0, count: 0 };
    }
    dailyData[date].revenue += Number(receipt.grand_total);
    dailyData[date].count += 1;
  });

  const chartData = Object.entries(dailyData)
    .map(([date, data]) => ({
      date,
      revenue: data.revenue,
      count: data.count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({
    summary: {
      totalRevenue,
      totalReceipts,
      averageOrderValue,
      totalDiscount,
      totalGST,
    },
    chartData,
    receipts: receiptsWithItems,
    period,
    dateRange: {
      start: dateFilter.start.toISOString(),
      end: dateFilter.end.toISOString(),
    },
  });
}
