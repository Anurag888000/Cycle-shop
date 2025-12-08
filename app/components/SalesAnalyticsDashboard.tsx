"use client";
import { useState, useEffect, useCallback } from "react";
import { Receipt } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Receipt as ReceiptIcon,
  IndianRupee,
  Calendar,
  Download,
  Search,
  ChevronDown,
  BarChart3,
  ArrowLeft,
  RefreshCw,
  Printer,
  Filter,
  X,
  Eye,
  Share2,
} from "lucide-react";
import Link from "next/link";

interface AnalyticsData {
  summary: {
    totalRevenue: number;
    totalReceipts: number;
    averageOrderValue: number;
    totalDiscount: number;
    totalGST: number;
  };
  chartData: { date: string; revenue: number; count: number }[];
  receipts: Receipt[];
  period: string;
  dateRange: { start: string; end: string };
}

type PeriodType = "today" | "week" | "month" | "custom";

export default function SalesAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<PeriodType>("today");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewReceipt, setViewReceipt] = useState<Receipt | null>(null);

  // Fetch analytics data
  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      let url = `/api/receipts/analytics?period=${period}`;
      if (period === "custom" && customStartDate && customEndDate) {
        url += `&startDate=${customStartDate}&endDate=${customEndDate}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch analytics");

      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [period, customStartDate, customEndDate]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Export to Excel (CSV)
  const handleExportExcel = () => {
    if (!analytics?.receipts?.length) return;

    const headers = [
      "Receipt No",
      "Date",
      "Customer Name",
      "Customer Phone",
      "Subtotal",
      "Discount %",
      "Discount Amount",
      "GST Rate",
      "GST Amount",
      "Grand Total",
      "Notes",
    ];

    const rows = analytics.receipts.map((r) => [
      r.receipt_no,
      new Date(r.created_at!).toLocaleDateString("en-IN"),
      r.customer_name || "",
      r.customer_phone || "",
      r.subtotal,
      r.discount_percent,
      r.discount_amount,
      r.gst_rate,
      r.gst_amount,
      r.grand_total,
      r.notes || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `sales_report_${period}_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter receipts by search, date, and amount
  const filteredReceipts =
    analytics?.receipts?.filter((r) => {
      // Text search (receipt no or customer name)
      const matchesText =
        r.receipt_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.customer_name?.toLowerCase().includes(searchQuery.toLowerCase());

      // Date filter
      const matchesDate = filterDate
        ? new Date(r.created_at!).toISOString().split("T")[0] === filterDate
        : true;

      // Amount filters
      const amount = r.grand_total;
      const matchesMinAmount = minAmount ? amount >= parseFloat(minAmount) : true;
      const matchesMaxAmount = maxAmount ? amount <= parseFloat(maxAmount) : true;

      return matchesText && matchesDate && matchesMinAmount && matchesMaxAmount;
    }) || [];

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilterDate("");
    setMinAmount("");
    setMaxAmount("");
  };

  // Check if any filter is active
  const hasActiveFilters = searchQuery || filterDate || minAmount || maxAmount;

  // Download/Print single receipt
  const handleDownloadReceipt = (receipt: Receipt) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${receipt.receipt_no}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, sans-serif; 
              padding: 20px;
              max-width: 350px;
              margin: 0 auto;
            }
            .receipt-header { text-align: center; margin-bottom: 20px; border-bottom: 2px dashed #000; padding-bottom: 15px; }
            .shop-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .shop-details { font-size: 12px; color: #555; }
            .receipt-info { display: flex; justify-content: space-between; margin: 15px 0; font-size: 12px; }
            .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 12px; }
            .items-table th { text-align: left; padding: 8px 4px; border-bottom: 1px solid #000; }
            .items-table th:last-child { text-align: right; }
            .items-table td { padding: 6px 4px; border-bottom: 1px dashed #ccc; }
            .items-table td:last-child { text-align: right; }
            .items-table .qty { text-align: center; }
            .totals { margin-top: 15px; border-top: 2px dashed #000; padding-top: 15px; }
            .total-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; }
            .grand-total { font-size: 18px; font-weight: bold; border-top: 1px solid #000; margin-top: 10px; padding-top: 10px; }
            .footer { text-align: center; margin-top: 25px; font-size: 11px; color: #666; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <div class="shop-name">WAHEED Cycle Shop</div>
            <div class="shop-details">
              Main Market Road, City Center<br/>
              Phone: +91 98765 43210<br/>
              GSTIN: 29XXXXX1234X1ZX
            </div>
          </div>
          
          <div class="receipt-info">
            <div>
              <strong>Receipt No:</strong> ${receipt.receipt_no}<br/>
              <strong>Date:</strong> ${new Date(receipt.created_at!).toLocaleDateString("en-IN")}
            </div>
            <div style="text-align: right;">
              ${receipt.customer_name ? `<strong>Customer:</strong> ${receipt.customer_name}<br/>` : ""}
              ${receipt.customer_phone ? `<strong>Phone:</strong> ${receipt.customer_phone}` : ""}
            </div>
          </div>
          
          ${receipt.items && receipt.items.length > 0 ? `
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th class="qty">Qty</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${receipt.items.map(item => `
                  <tr>
                    <td>${item.item_name}</td>
                    <td class="qty">${item.quantity}</td>
                    <td>${formatCurrency(item.price)}</td>
                    <td>${formatCurrency(item.amount)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : ''}
          
          <div class="totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>${formatCurrency(receipt.subtotal)}</span>
            </div>
            ${receipt.discount_amount > 0 ? `
              <div class="total-row" style="color: #059652;">
                <span>Discount (${receipt.discount_percent}%):</span>
                <span>-${formatCurrency(receipt.discount_amount)}</span>
              </div>
            ` : ""}
            ${receipt.gst_enabled ? `
              <div class="total-row">
                <span>CGST (${receipt.gst_rate / 2}%):</span>
                <span>${formatCurrency(receipt.gst_amount / 2)}</span>
              </div>
              <div class="total-row">
                <span>SGST (${receipt.gst_rate / 2}%):</span>
                <span>${formatCurrency(receipt.gst_amount / 2)}</span>
              </div>
            ` : ""}
            <div class="total-row grand-total">
              <span>Grand Total:</span>
              <span>${formatCurrency(receipt.grand_total)}</span>
            </div>
          </div>
          
          ${receipt.notes ? `<div style="margin-top: 15px; padding: 10px; background: #f5f5f5; font-size: 11px;"><strong>Notes:</strong> ${receipt.notes}</div>` : ""}
          
          <div class="footer">
            Thank you for shopping with us!<br/>
            Visit again soon.
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Period labels
  const periodLabels: Record<PeriodType, string> = {
    today: "Today",
    week: "This Week",
    month: "This Month",
    custom: "Custom Range",
  };

  // Calculate max revenue for chart scaling
  const maxRevenue = Math.max(
    ...(analytics?.chartData?.map((d) => d.revenue) || [0]),
    1
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/admin"
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                <span className="hidden xs:inline">Sales</span> Analytics
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Track revenue and analyze sales
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchAnalytics}
              disabled={loading}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <RefreshCw
                className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={handleExportExcel}
              disabled={!analytics?.receipts?.length}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Export</span> Excel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Period Selector */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:border-indigo-500 transition"
            >
              <Calendar className="w-4 h-4 text-indigo-600" />
              {periodLabels[period]}
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {showPeriodDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  {(Object.keys(periodLabels) as PeriodType[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPeriod(p);
                        setShowPeriodDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                        period === p
                          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 font-medium"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {periodLabels[p]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {period === "custom" && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white/80">
                Total Revenue
              </span>
              <div className="p-2 bg-white/20 rounded-lg">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold">
              {loading ? "..." : formatCurrency(analytics?.summary.totalRevenue || 0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Receipts
              </span>
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <ReceiptIcon className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {loading ? "..." : analytics?.summary.totalReceipts || 0}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Avg Order Value
              </span>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {loading
                ? "..."
                : formatCurrency(analytics?.summary.averageOrderValue || 0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total GST Collected
              </span>
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <IndianRupee className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {loading ? "..." : formatCurrency(analytics?.summary.totalGST || 0)}
            </p>
          </motion.div>
        </div>

        {/* Revenue Chart */}
        {analytics?.chartData && analytics.chartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Daily Revenue
            </h3>
            <div className="h-64 flex items-end gap-2">
              {analytics.chartData.map((day, index) => (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {formatCurrency(day.revenue)}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: `${Math.max((day.revenue / maxRevenue) * 180, 4)}px`,
                      }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg min-h-[4px]"
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Receipt List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Receipt History
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
                      showFilters || hasActiveFilters
                        ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700 text-indigo-600"
                        : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                    )}
                  </button>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <X className="w-4 h-4" />
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {/* Text Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Receipt no or customer..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      {/* Date Filter */}
                      <div>
                        <input
                          type="date"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      {/* Min Amount */}
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                        <input
                          type="number"
                          placeholder="Min amount"
                          value={minAmount}
                          onChange={(e) => setMinAmount(e.target.value)}
                          className="w-full pl-8 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      {/* Max Amount */}
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                        <input
                          type="number"
                          placeholder="Max amount"
                          value={maxAmount}
                          onChange={(e) => setMaxAmount(e.target.value)}
                          className="w-full pl-8 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Receipt No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
                      </div>
                    </td>
                  </tr>
                ) : filteredReceipts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      <ReceiptIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No receipts found</p>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="mt-2 text-indigo-600 hover:underline text-sm"
                        >
                          Clear filters
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredReceipts.map((receipt) => (
                    <tr
                      key={receipt.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {receipt.receipt_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(receipt.created_at!).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {receipt.customer_name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-indigo-600">
                        {formatCurrency(receipt.grand_total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() => setViewReceipt(receipt)}
                            className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-xs sm:text-sm font-medium transition"
                            title="View Receipt"
                          >
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                          {/* Share PDF on mobile, Print on desktop */}
                          <button
                            onClick={() => handleDownloadReceipt(receipt)}
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-gray-700 dark:text-gray-300 hover:text-indigo-600 rounded-lg text-sm font-medium transition"
                            title="Print Receipt"
                          >
                            <Printer className="w-4 h-4" />
                            Print
                          </button>
                          <button
                            onClick={() => {
                              // Open share-friendly view on mobile
                              const shareWindow = window.open("", "_blank");
                              if (shareWindow) {
                                shareWindow.document.write(`
                                  <!DOCTYPE html>
                                  <html>
                                    <head>
                                      <title>Receipt - ${receipt.receipt_no}</title>
                                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                      <style>
                                        * { margin: 0; padding: 0; box-sizing: border-box; }
                                        body { font-family: system-ui, sans-serif; padding: 15px; background: #fff; }
                                        .receipt { max-width: 350px; margin: 0 auto; }
                                        .header { text-align: center; border-bottom: 2px dashed #333; padding-bottom: 12px; margin-bottom: 12px; }
                                        .shop-name { font-size: 18px; font-weight: bold; }
                                        .shop-details { font-size: 10px; color: #666; margin-top: 4px; }
                                        .info { font-size: 11px; margin-bottom: 12px; }
                                        .totals { border-top: 2px dashed #333; padding-top: 10px; }
                                        .row { display: flex; justify-content: space-between; padding: 3px 0; font-size: 12px; }
                                        .total { font-size: 16px; font-weight: bold; border-top: 1px solid #333; margin-top: 8px; padding-top: 8px; }
                                        .footer { text-align: center; margin-top: 15px; font-size: 10px; color: #888; }
                                        .share-btn { display: block; width: 100%; padding: 12px; background: #4F46E5; color: white; border: none; border-radius: 8px; font-size: 14px; margin-top: 20px; }
                                        @media print { .share-btn { display: none; } }
                                      </style>
                                    </head>
                                    <body>
                                      <div class="receipt">
                                        <div class="header">
                                          <div class="shop-name">WAHEED Cycle Shop</div>
                                          <div class="shop-details">Main Market Road • 📞 +91 98765 43210</div>
                                        </div>
                                        <div class="info">
                                          <strong>Receipt:</strong> ${receipt.receipt_no}<br/>
                                          <strong>Date:</strong> ${new Date(receipt.created_at!).toLocaleDateString("en-IN")}<br/>
                                          ${receipt.customer_name ? `<strong>Customer:</strong> ${receipt.customer_name}` : ""}
                                        </div>
                                        
                                        <!-- Items Table -->
                                        <table style="width:100%; border-collapse: collapse; margin-bottom: 12px; font-size: 12px;">
                                          <thead>
                                            <tr style="background:#f3f4f6; text-align:left;">
                                              <th style="padding:4px; border-bottom:1px solid #ddd;">Item</th>
                                              <th style="padding:4px; border-bottom:1px solid #ddd; text-align:center;">Qty</th>
                                              <th style="padding:4px; border-bottom:1px solid #ddd; text-align:right;">Price</th>
                                              <th style="padding:4px; border-bottom:1px solid #ddd; text-align:right;">Amt</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            ${(receipt.items || []).map(item => `
                                              <tr>
                                                <td style="padding:4px; border-bottom:1px solid #eee;">${item.item_name}</td>
                                                <td style="padding:4px; border-bottom:1px solid #eee; text-align:center;">${item.quantity}</td>
                                                <td style="padding:4px; border-bottom:1px solid #eee; text-align:right;">${item.price}</td>
                                                <td style="padding:4px; border-bottom:1px solid #eee; text-align:right;">${item.amount}</td>
                                              </tr>
                                            `).join('')}
                                          </tbody>
                                        </table>

                                        <div class="totals">
                                          <div class="row"><span>Subtotal:</span><span>${formatCurrency(receipt.subtotal)}</span></div>
                                          ${receipt.discount_amount > 0 ? `<div class="row" style="color:#059652"><span>Discount:</span><span>-${formatCurrency(receipt.discount_amount)}</span></div>` : ""}
                                          ${receipt.gst_enabled ? `<div class="row"><span>GST (${receipt.gst_rate}%):</span><span>${formatCurrency(receipt.gst_amount)}</span></div>` : ""}
                                          <div class="row total"><span>Total:</span><span>${formatCurrency(receipt.grand_total)}</span></div>
                                        </div>
                                        <div class="footer">Thank you! 🚴</div>
                                        <button class="share-btn" onclick="window.print()">Save as PDF</button>
                                      </div>
                                    </body>
                                  </html>
                                `);
                                shareWindow.document.close();
                              }
                            }}
                            className="sm:hidden inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium transition"
                            title="Share Receipt"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            Share
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Results count */}
          {!loading && filteredReceipts.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredReceipts.length} of {analytics?.receipts?.length || 0} receipts
            </div>
          )}
        </motion.div>
      </div>

      {/* View Receipt Modal */}
      <AnimatePresence>
        {viewReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setViewReceipt(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ReceiptIcon className="w-5 h-5" />
                  <div>
                    <h3 className="font-bold">Receipt Details</h3>
                    <p className="text-xs text-white/80">{viewReceipt.receipt_no}</p>
                  </div>
                </div>
                <button
                  onClick={() => setViewReceipt(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Receipt Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Shop Header */}
                <div className="text-center border-b-2 border-dashed border-gray-200 dark:border-gray-600 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    WAHEED Cycle Shop
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Main Market Road, City Center
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📞 +91 98765 43210
                  </p>
                </div>

                {/* Receipt Info */}
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(viewReceipt.created_at!).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {viewReceipt.customer_name && (
                    <div className="text-right">
                      <p className="text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Customer:</span> {viewReceipt.customer_name}
                      </p>
                      {viewReceipt.customer_phone && (
                        <p className="text-gray-500 dark:text-gray-400">
                          {viewReceipt.customer_phone}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Items List */}
                {viewReceipt.items && viewReceipt.items.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Purchased Items
                    </h4>
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Item</th>
                            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Qty</th>
                            <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Price</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                          {viewReceipt.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-3 py-2 text-gray-900 dark:text-white">{item.item_name}</td>
                              <td className="px-2 py-2 text-center text-gray-600 dark:text-gray-400">{item.quantity}</td>
                              <td className="px-2 py-2 text-right text-gray-600 dark:text-gray-400">{formatCurrency(item.price)}</td>
                              <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-white">{formatCurrency(item.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(viewReceipt.subtotal)}
                    </span>
                  </div>

                  {viewReceipt.discount_amount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Discount ({viewReceipt.discount_percent}%):</span>
                      <span className="font-medium">-{formatCurrency(viewReceipt.discount_amount)}</span>
                    </div>
                  )}

                  {viewReceipt.gst_enabled && viewReceipt.gst_amount > 0 && (
                    <>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>CGST ({viewReceipt.gst_rate / 2}%):</span>
                        <span>{formatCurrency(viewReceipt.gst_amount / 2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>SGST ({viewReceipt.gst_rate / 2}%):</span>
                        <span>{formatCurrency(viewReceipt.gst_amount / 2)}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-gray-900 dark:text-white">Grand Total:</span>
                    <span className="text-indigo-600">{formatCurrency(viewReceipt.grand_total)}</span>
                  </div>
                </div>

                {/* Notes */}
                {viewReceipt.notes && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Notes:</span> {viewReceipt.notes}
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex gap-3">
                  <button
                    onClick={() => {
                      handleDownloadReceipt(viewReceipt);
                      setViewReceipt(null);
                    }}
                    className="hidden sm:flex flex-1 items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
                  >
                    <Printer className="w-4 h-4" />
                    Print Receipt
                  </button>
                  <button
                    onClick={() => {
                      handleDownloadReceipt(viewReceipt);
                      setViewReceipt(null);
                    }}
                    className="flex sm:hidden flex-1 items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
                  >
                    <Share2 className="w-4 h-4" />
                    Share PDF
                  </button>
                <button
                  onClick={() => setViewReceipt(null)}
                  className="px-4 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
