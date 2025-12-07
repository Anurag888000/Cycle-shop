"use client";
import { useState, useMemo, useRef } from "react";
import { Bicycle } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Trash2,
  Printer,
  X,
  Receipt,
  Percent,
  ChevronDown,
  Send,
  Save,
  Check,
  Loader2,
} from "lucide-react";

interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ReceiptGeneratorProps {
  bicycles: Bicycle[];
  onClose: () => void;
}

const SHOP_DETAILS = {
  name: "WAHEED Cycle Shop",
  address: "Main Market Road, City Center",
  phone: "+91 98765 43210",
  gstin: "29XXXXX1234X1ZX",
};

export default function ReceiptGenerator({
  bicycles,
  onClose,
}: ReceiptGeneratorProps) {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [gstEnabled, setGstEnabled] = useState(true);
  const [gstRate, setGstRate] = useState(18);
  const [selectedBicycle, setSelectedBicycle] = useState("");
  const [customItemName, setCustomItemName] = useState("");
  const [customItemPrice, setCustomItemPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Generate receipt number
  const receiptNo = useMemo(() => {
    const date = new Date();
    return `WCS-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
  }, []);

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    return showDiscount ? (subtotal * discountPercent) / 100 : 0;
  }, [subtotal, discountPercent, showDiscount]);

  const taxableAmount = subtotal - discountAmount;

  const gstAmount = useMemo(() => {
    return gstEnabled ? (taxableAmount * gstRate) / 100 : 0;
  }, [taxableAmount, gstRate, gstEnabled]);

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  const grandTotal = taxableAmount + gstAmount;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Add item from bicycle selection
  const addBicycleItem = () => {
    if (!selectedBicycle) return;
    const bicycle = bicycles.find((b) => b.id === selectedBicycle);
    if (!bicycle) return;

    const existingItem = items.find((item) => item.id === bicycle.id);
    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === bicycle.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          id: bicycle.id!,
          name: bicycle.name,
          price: bicycle.price,
          quantity: 1,
        },
      ]);
    }
    setSelectedBicycle("");
  };

  // Add custom item
  const addCustomItem = () => {
    if (!customItemName || !customItemPrice) return;
    const price = parseFloat(customItemPrice);
    if (isNaN(price) || price <= 0) return;

    setItems([
      ...items,
      {
        id: `custom-${Date.now()}`,
        name: customItemName,
        price: price,
        quantity: 1,
      },
    ]);
    setCustomItemName("");
    setCustomItemPrice("");
  };

  // Update quantity
  const updateQuantity = (id: string, delta: number) => {
    setItems(
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Print receipt
  const handlePrint = () => {
    const printContent = receiptRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${receiptNo}</title>
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
            .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .items-table th, .items-table td { padding: 8px 4px; text-align: left; font-size: 12px; }
            .items-table th { border-bottom: 1px solid #000; }
            .items-table td { border-bottom: 1px dashed #ccc; }
            .items-table .amount { text-align: right; }
            .totals { margin-top: 15px; border-top: 2px dashed #000; padding-top: 15px; }
            .total-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; }
            .grand-total { font-size: 18px; font-weight: bold; border-top: 1px solid #000; margin-top: 10px; padding-top: 10px; }
            .footer { text-align: center; margin-top: 25px; font-size: 11px; color: #666; }
            .notes { margin-top: 15px; padding: 10px; background: #f5f5f5; font-size: 11px; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <div class="shop-name">${SHOP_DETAILS.name}</div>
            <div class="shop-details">
              ${SHOP_DETAILS.address}<br/>
              Phone: ${SHOP_DETAILS.phone}<br/>
              GSTIN: ${SHOP_DETAILS.gstin}
            </div>
          </div>
          
          <div class="receipt-info">
            <div>
              <strong>Receipt No:</strong> ${receiptNo}<br/>
              <strong>Date:</strong> ${new Date().toLocaleDateString("en-IN")}
            </div>
            <div style="text-align: right;">
              ${customerName ? `<strong>Customer:</strong> ${customerName}<br/>` : ""}
              ${customerPhone ? `<strong>Phone:</strong> ${customerPhone}` : ""}
            </div>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th class="amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.price)}</td>
                  <td class="amount">${formatCurrency(item.price * item.quantity)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          
          <div class="totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>${formatCurrency(subtotal)}</span>
            </div>
            ${
              showDiscount && discountPercent > 0
                ? `
              <div class="total-row" style="color: #059652;">
                <span>Discount (${discountPercent}%):</span>
                <span>-${formatCurrency(discountAmount)}</span>
              </div>
            `
                : ""
            }
            ${
              gstEnabled
                ? `
              <div class="total-row">
                <span>CGST (${gstRate / 2}%):</span>
                <span>${formatCurrency(cgst)}</span>
              </div>
              <div class="total-row">
                <span>SGST (${gstRate / 2}%):</span>
                <span>${formatCurrency(sgst)}</span>
              </div>
            `
                : ""
            }
            <div class="total-row grand-total">
              <span>Grand Total:</span>
              <span>${formatCurrency(grandTotal)}</span>
            </div>
          </div>
          
          ${notes ? `<div class="notes"><strong>Notes:</strong> ${notes}</div>` : ""}
          
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

  // WhatsApp share
  const handleWhatsAppShare = () => {
    let message = `*${SHOP_DETAILS.name}*\n`;
    message += `📍 ${SHOP_DETAILS.address}\n`;
    message += `📞 ${SHOP_DETAILS.phone}\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `*Receipt No:* ${receiptNo}\n`;
    message += `*Date:* ${new Date().toLocaleDateString("en-IN")}\n`;
    if (customerName) message += `*Customer:* ${customerName}\n`;
    message += `━━━━━━━━━━━━━━━━\n\n`;
    message += `*Items:*\n`;

    items.forEach((item) => {
      message += `• ${item.name} x${item.quantity} = ${formatCurrency(item.price * item.quantity)}\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━\n`;
    message += `*Subtotal:* ${formatCurrency(subtotal)}\n`;

    if (showDiscount && discountPercent > 0) {
      message += `*Discount (${discountPercent}%):* -${formatCurrency(discountAmount)}\n`;
    }

    if (gstEnabled) {
      message += `*GST (${gstRate}%):* ${formatCurrency(gstAmount)}\n`;
    }

    message += `━━━━━━━━━━━━━━━━\n`;
    message += `*Grand Total:* ${formatCurrency(grandTotal)}\n`;
    message += `━━━━━━━━━━━━━━━━\n\n`;
    message += `_Thank you for shopping with us!_ 🚴`;

    const phoneNumber = customerPhone.replace(/\D/g, "");
    const whatsappUrl = phoneNumber
      ? `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  // Save receipt to database
  const handleSaveReceipt = async () => {
    if (items.length === 0) return;

    setIsSaving(true);
    try {
      const receiptData = {
        receipt_no: receiptNo,
        customer_name: customerName || null,
        customer_phone: customerPhone || null,
        subtotal,
        discount_percent: showDiscount ? discountPercent : 0,
        discount_amount: discountAmount,
        gst_enabled: gstEnabled,
        gst_rate: gstEnabled ? gstRate : 0,
        gst_amount: gstAmount,
        grand_total: grandTotal,
        notes: notes || null,
        items: items.map((item) => ({
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
          amount: item.price * item.quantity,
        })),
      };

      const response = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receiptData),
      });

      if (!response.ok) {
        throw new Error("Failed to save receipt");
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error saving receipt:", error);
      alert("Failed to save receipt. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Receipt className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">Receipt Generator</h2>
              <p className="text-sm text-white/80">
                Create and share invoices instantly
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-80px)] overflow-hidden">
          {/* Left Panel - Input Form */}
          <div className="flex-1 p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
            {/* Customer Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Customer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Customer Name (Optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (for WhatsApp)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Add Items */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Add Items
              </h3>

              {/* From Inventory */}
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <select
                    value={selectedBicycle}
                    onChange={(e) => setSelectedBicycle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer transition"
                  >
                    <option value="">Select from inventory...</option>
                    {bicycles.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} - {formatCurrency(b.price)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <button
                  onClick={addBicycleItem}
                  disabled={!selectedBicycle}
                  className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {/* Custom Item */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Custom item name"
                  value={customItemName}
                  onChange={(e) => setCustomItemName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                />
                <input
                  type="number"
                  placeholder="Price ₹"
                  value={customItemPrice}
                  onChange={(e) => setCustomItemPrice(e.target.value)}
                  className="w-28 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button
                  onClick={addCustomItem}
                  disabled={!customItemName || !customItemPrice}
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items List */}
            <AnimatePresence mode="popLayout">
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6"
                >
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Items ({items.length})
                  </h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatCurrency(item.price)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Discount Toggle & Settings */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Discount
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDiscount}
                    onChange={(e) => setShowDiscount(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <AnimatePresence>
                {showDiscount && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                      <Percent className="w-5 h-5 text-emerald-600" />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discountPercent}
                        onChange={(e) =>
                          setDiscountPercent(
                            Math.min(100, Math.max(0, Number(e.target.value)))
                          )
                        }
                        className="w-20 px-3 py-2 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-gray-700 text-center font-bold text-emerald-600 focus:ring-2 focus:ring-emerald-500 transition"
                      />
                      <span className="text-emerald-600 font-medium">
                        % discount
                      </span>
                      {discountAmount > 0 && (
                        <span className="ml-auto text-emerald-600 font-bold">
                          -{formatCurrency(discountAmount)}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GST Settings */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  GST Tax
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gstEnabled}
                    onChange={(e) => setGstEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <AnimatePresence>
                {gstEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          GST Rate:
                        </span>
                        <div className="flex gap-2">
                          {[5, 12, 18, 28].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => setGstRate(rate)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                gstRate === rate
                                  ? "bg-indigo-600 text-white"
                                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                              }`}
                            >
                              {rate}%
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        CGST: {gstRate / 2}% + SGST: {gstRate / 2}% ={" "}
                        <span className="font-bold text-indigo-600">
                          {formatCurrency(gstAmount)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Notes (Optional)
              </h3>
              <textarea
                placeholder="Add any additional notes or terms..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 resize-none transition"
              />
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto">
            <div className="sticky top-0">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live Preview
              </h3>

              {/* Receipt Preview */}
              <div
                ref={receiptRef}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm mx-auto"
              >
                {/* Shop Header */}
                <div className="text-center border-b-2 border-dashed border-gray-200 dark:border-gray-600 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {SHOP_DETAILS.name}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {SHOP_DETAILS.address}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📞 {SHOP_DETAILS.phone}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    GSTIN: {SHOP_DETAILS.gstin}
                  </p>
                </div>

                {/* Receipt Info */}
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div>
                    <p>
                      <span className="font-medium">Receipt:</span> {receiptNo}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date().toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  {customerName && (
                    <div className="text-right">
                      <p>
                        <span className="font-medium">Customer:</span>
                      </p>
                      <p>{customerName}</p>
                    </div>
                  )}
                </div>

                {/* Items */}
                {items.length > 0 ? (
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left pb-2">Item</th>
                          <th className="text-center pb-2">Qty</th>
                          <th className="text-right pb-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-dashed border-gray-100 dark:border-gray-700"
                          >
                            <td className="py-2 text-gray-900 dark:text-white">
                              {item.name}
                            </td>
                            <td className="py-2 text-center text-gray-600 dark:text-gray-400">
                              {item.quantity}
                            </td>
                            <td className="py-2 text-right font-medium text-gray-900 dark:text-white">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Totals */}
                    <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-200 dark:border-gray-600 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(subtotal)}
                        </span>
                      </div>

                      {showDiscount && discountPercent > 0 && (
                        <div className="flex justify-between text-sm text-emerald-600">
                          <span>Discount ({discountPercent}%):</span>
                          <span className="font-medium">
                            -{formatCurrency(discountAmount)}
                          </span>
                        </div>
                      )}

                      {gstEnabled && (
                        <>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>CGST ({gstRate / 2}%):</span>
                            <span>{formatCurrency(cgst)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>SGST ({gstRate / 2}%):</span>
                            <span>{formatCurrency(sgst)}</span>
                          </div>
                        </>
                      )}

                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-gray-900 dark:text-white">
                          Grand Total:
                        </span>
                        <span className="text-indigo-600">
                          {formatCurrency(grandTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-400 dark:text-gray-500">
                    <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Add items to see preview</p>
                  </div>
                )}

                {/* Notes */}
                {notes && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Notes:</span> {notes}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-dashed border-gray-200 dark:border-gray-600 text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Thank you for shopping with us!
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    🚴 Visit again soon!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-6 max-w-sm mx-auto">
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveReceipt}
                    disabled={items.length === 0 || isSaving || isSaved}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition ${
                      isSaved
                        ? "bg-emerald-500 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isSaved ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save"}
                  </button>
                  <button
                    onClick={handlePrint}
                    disabled={items.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    <Printer className="w-5 h-5" />
                    Print
                  </button>
                </div>
                <button
                  onClick={handleWhatsAppShare}
                  disabled={items.length === 0}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition"
                >
                  <Send className="w-5 h-5" />
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
