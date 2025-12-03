"use client";
import { Bicycle } from "@/types";
import Link from "next/link";
import {
  Edit2,
  Trash2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  bicycles: Bicycle[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  // New props for selection
  isSelectionMode?: boolean;
  selectedIds?: Set<string>;
  onToggleSelect?: (id: string) => void;
}

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1485965120184-e224f7a1d7f6?auto=format&fit=crop&q=80&w=500";

const ITEMS_PER_PAGE = 6;

export default function BicycleList({
  bicycles,
  isAdmin,
  onDelete,
  isSelectionMode,
  selectedIds,
  onToggleSelect,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bicycles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBicycles = bicycles.slice(startIndex, endIndex);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBicycles.map((bike, index) => (
          <BicycleCard
            key={bike.id}
            bike={bike}
            index={index}
            isAdmin={isAdmin}
            onDelete={onDelete}
            isSelectionMode={isSelectionMode}
            isSelected={selectedIds?.has(bike.id!)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-3 mt-12 pb-8"
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition ${
                  currentPage === page
                    ? "bg-indigo-600 dark:bg-indigo-700 text-white"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

function BicycleCard({
  bike,
  index,
  isAdmin,
  onDelete,
  isSelectionMode,
  isSelected,
  onToggleSelect,
}: any) {
  const [isLoading, setIsLoading] = useState(true);

  // Selection handler
  const handleCardClick = (e: React.MouseEvent) => {
    if (isSelectionMode && onToggleSelect) {
      e.preventDefault();
      onToggleSelect(bike.id);
    }
  };

  const optimizeImageUrl = (url: string | null) => {
    if (!url) return PLACEHOLDER_IMG;
    if (url.includes("supabase")) {
      return `${url}?width=400&quality=75`;
    }
    return url;
  };

  const imageUrl = optimizeImageUrl(bike.image_url);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: isSelectionMode ? 0 : -8 }}
      onClick={handleCardClick}
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border transition-all duration-300 flex flex-col ${
        isSelected
          ? "border-indigo-500 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900"
          : "border-gray-100 dark:border-gray-700 hover:shadow-xl"
      } ${isSelectionMode ? "cursor-pointer" : ""}`}
    >
      {/* Selection Checkbox Overlay */}
      {isSelectionMode && (
        <div className="absolute top-4 left-4 z-20">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
              isSelected
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white/80 dark:bg-gray-800/80 backdrop-blur text-gray-400 border border-gray-300 dark:border-gray-600"
            }`}
          >
            {isSelected ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
          </div>
        </div>
      )}

      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse z-10" />
        )}
        <img
          src={imageUrl}
          alt={bike.name}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
            {bike.name}
          </h3>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            ₹{bike.price}
          </span>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
          {bike.description}
        </p>

        {isAdmin && !isSelectionMode ? (
          <div
            className="flex gap-2 mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={`/admin/edit/${bike.id}`}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Edit2 className="w-4 h-4" /> Edit
            </Link>
            <button
              onClick={() => onDelete && onDelete(bike.id!)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-gray-600 hover:text-red-600 dark:hover:text-red-400 transition"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        ) : !isSelectionMode ? (
          <Link
            href={`/bicycles/${bike.id}`}
            className="mt-auto w-full bg-gray-900 dark:bg-indigo-700 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="mt-auto text-center text-xs text-gray-400 font-medium h-10 flex items-center justify-center">
            {isSelected ? "Selected" : "Tap to select"}
          </div>
        )}
      </div>
    </motion.div>
  );
}
