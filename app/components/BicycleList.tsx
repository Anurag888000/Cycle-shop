"use client";
import { Bicycle } from "@/types";
import Link from "next/link";
import {
  Edit2,
  Trash2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Props {
  bicycles: Bicycle[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

// Fallback image if user hasn't uploaded one
const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1485965120184-e224f7a1d7f6?auto=format&fit=crop&q=80&w=500";

const ITEMS_PER_PAGE = 9;

export default function BicycleList({ bicycles, isAdmin, onDelete }: Props) {
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
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12 pb-8">
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
        </div>
      )}
    </div>
  );
}

function BicycleCard({ bike, index, isAdmin, onDelete }: any) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col"
    >
      {/* Image Section with Skeleton */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
        )}
        <img
          src={bike.image_url || PLACEHOLDER_IMG}
          alt={bike.name}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        />
        {!isAdmin && (
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
            In Stock
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {bike.name}
          </h3>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            ₹{bike.price}
          </span>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
          {bike.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {bike.features
            .split(",")
            .slice(0, 2)
            .map((feature: string, i: number) => (
              <span
                key={i}
                className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded border border-gray-100 dark:border-gray-600"
              >
                {feature.trim()}
              </span>
            ))}
        </div>

        {isAdmin ? (
          <div className="flex gap-2 mt-auto">
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
        ) : (
          <Link
            href={`/bicycles/${bike.id}`}
            className="mt-auto w-full bg-gray-900 dark:bg-indigo-700 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
