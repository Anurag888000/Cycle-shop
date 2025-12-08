import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// GET: Fetch analytics data with date filters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "today";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let dateFilter: { start: Date; end: Date };
  
  // Helper to get current date/time in IST
  const getISTDate = () => {
    const now = new Date();
    // Convert to IST by adding 5 hours 30 minutes
    const istOffset = 5.5 * 60 * 60 * 1000;
    const utcOffset = now.getTimezoneOffset() * 60 * 1000;
    return new Date(now.getTime() + utcOffset + istOffset);
  };
  
  const istNow = getISTDate();
  const istYear = istNow.getFullYear();
  const istMonth = istNow.getMonth();
  const istDate = istNow.getDate();
  const istDay = istNow.getDay();

  // Calculate date range based on period (using IST dates but converting to UTC for query)
  switch (period) {
    case "today":
      // Start of today in IST, converted to UTC
      dateFilter = {
        start: new Date(Date.UTC(istYear, istMonth, istDate) - (5.5 * 60 * 60 * 1000)),
        end: new Date(Date.UTC(istYear, istMonth, istDate + 1) - (5.5 * 60 * 60 * 1000)),
      };
      break;
    case "week":
      const weekStartDate = istDate - istDay;
      dateFilter = {
        start: new Date(Date.UTC(istYear, istMonth, weekStartDate) - (5.5 * 60 * 60 * 1000)),
        end: new Date(Date.UTC(istYear, istMonth, istDate + 1) - (5.5 * 60 * 60 * 1000)),
      };
      break;
    case "month":
      dateFilter = {
        start: new Date(Date.UTC(istYear, istMonth, 1) - (5.5 * 60 * 60 * 1000)),
        end: new Date(Date.UTC(istYear, istMonth, istDate + 1) - (5.5 * 60 * 60 * 1000)),
      };
      break;
    case "custom":
      if (startDate && endDate) {
        // Custom dates are already in YYYY-MM-DD format (IST), parse them correctly
        const [sYear, sMonth, sDay] = startDate.split('-').map(Number);
        const [eYear, eMonth, eDay] = endDate.split('-').map(Number);
        dateFilter = {
          start: new Date(Date.UTC(sYear, sMonth - 1, sDay) - (5.5 * 60 * 60 * 1000)),
          end: new Date(Date.UTC(eYear, eMonth - 1, eDay + 1) - (5.5 * 60 * 60 * 1000)),
        };
      } else {
        // Default to today if custom dates not provided
        dateFilter = {
          start: new Date(Date.UTC(istYear, istMonth, istDate) - (5.5 * 60 * 60 * 1000)),
          end: new Date(Date.UTC(istYear, istMonth, istDate + 1) - (5.5 * 60 * 60 * 1000)),
        };
      }
      break;
    default:
      dateFilter = {
        start: new Date(Date.UTC(istYear, istMonth, istDate) - (5.5 * 60 * 60 * 1000)),
        end: new Date(Date.UTC(istYear, istMonth, istDate + 1) - (5.5 * 60 * 60 * 1000)),
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
