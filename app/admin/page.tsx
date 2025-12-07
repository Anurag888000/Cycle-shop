"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BicycleList from "@/components/BicycleList";
import SeedDatabase from "@/components/SeedDatabase";
import ReceiptGenerator from "@/components/ReceiptGenerator";
import { Bicycle } from "@/types";
import Link from "next/link";
import {
  Plus,
  LogOut,
  ExternalLink,
  Trash2,
  CheckSquare,
  XSquare,
  Receipt,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showReceiptGenerator, setShowReceiptGenerator] = useState(false);

  useEffect(() => {
    if (!user) {
      // Auth context handles redirection usually
    }
    fetchBicycles();
  }, [user]);

  const fetchBicycles = () => {
    fetch("/api/bicycles")
      .then((res) => res.json())
      .then(setBicycles);
  };

  const handleSingleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this bicycle?")) {
      await fetch(`/api/bicycles/${id}`, { method: "DELETE" });
      setBicycles((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === bicycles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(bicycles.map((b) => b.id!)));
    }
  };

  const handleBulkDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedIds.size} items? This cannot be undone.`
      )
    ) {
      const idsToDelete = Array.from(selectedIds);
      // Process deletes in parallel
      await Promise.all(
        idsToDelete.map((id) =>
          fetch(`/api/bicycles/${id}`, { method: "DELETE" })
        )
      );

      setBicycles((prev) => prev.filter((b) => !selectedIds.has(b.id!)));
      setSelectedIds(new Set());
      setIsSelectionMode(false);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 relative">
      {/* Header Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-20 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Manage your shop inventory
            </p>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <Link
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              href="/admin/analytics"
              className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BarChart3 className="w-4 h-4" /> Analytics
            </Link>
            <Link
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
=======
              href="/admin/analytics"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BarChart3 className="w-4 h-4" />
            </Link>
            <Link
>>>>>>> Stashed changes
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ExternalLink className="w-4 h-4" /> View Site
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Actions Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start sm:items-center">
          <div className="grid grid-cols-3 sm:flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setIsSelectionMode(!isSelectionMode);
                setSelectedIds(new Set());
              }}
              className={`items-center justify-center gap-1 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-medium transition flex ${
                isSelectionMode
                  ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
              }`}
            >
              {isSelectionMode ? (
                <>
                  <XSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Cancel</span>
                </>
              ) : (
                <>
                  <CheckSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Select</span>
                </>
              )}
            </button>

            {!isSelectionMode && (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <>
                <button
                  onClick={() => setShowReceiptGenerator(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
                >
                  <Receipt className="w-5 h-5" /> Generate Receipt
                </button>
                <Link
                  href="/admin/add"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
                >
                  <Plus className="w-5 h-5" /> Add New
                </Link>
              </>
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
              <Link
                href="/admin/add"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" /> Add New
              </Link>
=======
              <>
                <button
                  onClick={() => setShowReceiptGenerator(true)}
                  className="flex items-center justify-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2 sm:px-5 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20"
                >
                  <Receipt className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Receipt</span>
                </button>
                <Link
                  href="/admin/add"
                  className="flex items-center justify-center gap-1 bg-indigo-600 text-white px-2 sm:px-5 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/20"
                >
                  <Plus className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Add</span>
                </Link>
              </>
>>>>>>> Stashed changes
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            )}
          </div>

          {isSelectionMode && (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
              <span className="text-sm text-gray-500 font-medium">
                {selectedIds.size} Selected
              </span>
              <button
                onClick={handleSelectAll}
                className="text-sm text-indigo-600 hover:underline font-medium"
              >
                {selectedIds.size === bicycles.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
          )}
        </div>

        {/* Database Seed Component */}
        <SeedDatabase onRefresh={fetchBicycles} />

        {/* Bicycle List */}
        <BicycleList
          bicycles={bicycles}
          isAdmin
          onDelete={handleSingleDelete}
          isSelectionMode={isSelectionMode}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
        />
      </div>

      {/* Floating Bulk Action Bar */}
      <AnimatePresence>
        {isSelectionMode && selectedIds.size > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
          >
            <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-6 max-w-md w-full justify-between">
              <span className="font-bold">
                {selectedIds.size} {selectedIds.size === 1 ? "Item" : "Items"}{" "}
                Selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition"
              >
                <Trash2 className="w-4 h-4" /> Delete Selected
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Receipt Generator Modal */}
      <AnimatePresence>
        {showReceiptGenerator && (
          <ReceiptGenerator
            bicycles={bicycles}
            onClose={() => setShowReceiptGenerator(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
