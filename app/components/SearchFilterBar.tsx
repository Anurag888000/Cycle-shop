"use client";
import { useState, useCallback } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BikeCategory, BIKE_CATEGORIES } from "@/types";

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: BikeCategory | null;
  onCategoryChange: (category: BikeCategory | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  onClearFilters,
  hasActiveFilters,
}: SearchFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  return (
    <div className="mb-8">
      {/* Main Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bicycles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900 dark:text-white placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition min-w-[160px] justify-between ${
              selectedCategory
                ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <span className="text-sm font-medium">
              {selectedCategory
                ? BIKE_CATEGORIES.find((c) => c.id === selectedCategory)?.name
                : "All Categories"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20"
              >
                <button
                  onClick={() => {
                    onCategoryChange(null);
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                    !selectedCategory
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  All Categories
                </button>
                {BIKE_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
            isExpanded || hasActiveFilters
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          )}
        </button>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Price Range
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[80px]">
                    {formatPrice(priceRange[0])}
                  </span>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      step={1000}
                      value={priceRange[0]}
                      onChange={(e) =>
                        onPriceRangeChange([
                          Math.min(Number(e.target.value), priceRange[1] - 1000),
                          priceRange[1],
                        ])
                      }
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <input
                      type="range"
                      min={0}
                      max={maxPrice}
                      step={1000}
                      value={priceRange[1]}
                      onChange={(e) =>
                        onPriceRangeChange([
                          priceRange[0],
                          Math.max(Number(e.target.value), priceRange[0] + 1000),
                        ])
                      }
                      className="absolute top-0 left-0 w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[80px] text-right">
                    {formatPrice(priceRange[1])}
                  </span>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Pills */}
      {hasActiveFilters && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex flex-wrap gap-2"
        >
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm">
              {BIKE_CATEGORIES.find((c) => c.id === selectedCategory)?.icon}{" "}
              {BIKE_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
              <button
                onClick={() => onCategoryChange(null)}
                className="ml-1 hover:text-indigo-900 dark:hover:text-indigo-100"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              <button
                onClick={() => onPriceRangeChange([0, maxPrice])}
                className="ml-1 hover:text-green-900 dark:hover:text-green-100"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm">
              "{searchQuery}"
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 hover:text-purple-900 dark:hover:text-purple-100"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}
