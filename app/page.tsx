"use client";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BicycleList from "@/components/BicycleList";
import SearchFilterBar from "@/components/SearchFilterBar";
import CompareBicyclesModal from "@/components/CompareBicyclesModal";
import { Bicycle, BikeCategory } from "@/types";
import AnimatedHero from "@/components/AnimatedHero";
import { Scale, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroImageSrc =
  "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1400&q=70&fm=webp";

export default function Home() {
  const searchParams = useSearchParams();
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BikeCategory | null>(
    (searchParams.get("category") as BikeCategory) || null
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  // Compare state
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(new Set());
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    fetch("/api/bicycles")
      .then((res) => res.json())
      .then((data) => {
        setBicycles(data);
        // Set max price based on data
        const maxPrice = Math.max(...data.map((b: Bicycle) => b.price), 100000);
        setPriceRange([0, Math.ceil(maxPrice / 10000) * 10000]);
        setLoading(false);
      });
  }, []);

  // Update category from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") as BikeCategory | null;
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Calculate max price for filter
  const maxPrice = useMemo(() => {
    if (bicycles.length === 0) return 100000;
    return Math.ceil(Math.max(...bicycles.map((b) => b.price)) / 10000) * 10000;
  }, [bicycles]);

  // Filter bicycles
  const filteredBicycles = useMemo(() => {
    return bicycles.filter((bike) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          bike.name.toLowerCase().includes(query) ||
          bike.description.toLowerCase().includes(query) ||
          bike.features.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && bike.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (bike.price < priceRange[0] || bike.price > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [bicycles, searchQuery, selectedCategory, priceRange]);

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== null ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice;

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceRange([0, maxPrice]);
  };

  // Compare functions
  const handleToggleSelect = (id: string) => {
    setSelectedForCompare((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else if (newSet.size < 3) {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleClearCompare = () => {
    setSelectedForCompare(new Set());
    setIsCompareMode(false);
  };

  const selectedBikesForCompare = bicycles.filter((b) =>
    selectedForCompare.has(b.id!)
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Animated Hero Banner */}
      <AnimatedHero
        title="Ride Your Dream"
        subtitle="Discover our premium collection of bicycles engineered for performance, comfort, and style."
        variant="primary"
        backgroundImage={heroImageSrc}
      />

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 mt-10 relative z-0">
        {/* Search & Filter Bar */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          maxPrice={maxPrice}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Compare Mode Toggle & Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  Showing{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {filteredBicycles.length}
                  </span>{" "}
                  {filteredBicycles.length === 1 ? "bicycle" : "bicycles"}
                </>
              )}
            </p>
          </div>

          <button
            onClick={() => {
              setIsCompareMode(!isCompareMode);
              if (isCompareMode) {
                setSelectedForCompare(new Set());
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
              isCompareMode
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <Scale className="w-4 h-4" />
            {isCompareMode ? "Exit Compare Mode" : "Compare Bikes"}
          </button>
        </div>

        {/* Compare Mode Instructions */}
        <AnimatePresence>
          {isCompareMode && selectedForCompare.size === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-700 dark:text-indigo-300 text-sm"
            >
              👆 Click on bikes to select them for comparison (up to 3 bikes)
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bicycle List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredBicycles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
              No bicycles found matching your criteria
            </p>
            <button
              onClick={handleClearFilters}
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <BicycleList
            bicycles={filteredBicycles}
            isSelectionMode={isCompareMode}
            selectedIds={selectedForCompare}
            onToggleSelect={handleToggleSelect}
          />
        )}
      </div>

      {/* Floating Compare Bar */}
      <AnimatePresence>
        {isCompareMode && selectedForCompare.size > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedForCompare.size} selected
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCompareModal(true)}
                  disabled={selectedForCompare.size < 2}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition"
                >
                  Compare Now
                </button>
                <button
                  onClick={handleClearCompare}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <CompareBicyclesModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        bicycles={selectedBikesForCompare}
        onRemove={(id) => {
          setSelectedForCompare((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }}
        onClearAll={handleClearCompare}
      />
    </main>
  );
}

