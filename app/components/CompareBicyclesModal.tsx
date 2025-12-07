"use client";
import { X, Scale, Check, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Bicycle } from "@/types";
import Image from "next/image";

interface CompareBicyclesModalProps {
  isOpen: boolean;
  onClose: () => void;
  bicycles: Bicycle[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1485965120184-e224f7a1d7f6?auto=format&fit=crop&q=80&w=400";

export default function CompareBicyclesModal({
  isOpen,
  onClose,
  bicycles,
  onRemove,
  onClearAll,
}: CompareBicyclesModalProps) {
  if (!isOpen) return null;

  const parseFeatures = (features: string): string[] => {
    return features.split(",").map((f) => f.trim()).filter(Boolean);
  };

  // Get all unique features from all bikes
  const allFeatures = Array.from(
    new Set(bicycles.flatMap((bike) => parseFeatures(bike.features)))
  );

  const hasFeature = (bike: Bicycle, feature: string): boolean => {
    return parseFeatures(bike.features).some(
      (f) => f.toLowerCase() === feature.toLowerCase()
    );
  };

  return (
    <AnimatePresence>
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Compare Bicycles
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {bicycles.length} bikes selected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Bike Images & Names */}
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 w-32">
                    Feature
                  </th>
                  {bicycles.map((bike) => (
                    <th key={bike.id} className="p-4 min-w-[200px]">
                      <div className="relative group">
                        <button
                          onClick={() => onRemove(bike.id!)}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-3">
                          <Image
                            src={bike.image_url || PLACEHOLDER_IMG}
                            alt={bike.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2">
                          {bike.name}
                        </h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-indigo-50/50 dark:bg-indigo-900/10">
                  <td className="p-4 text-sm font-bold text-gray-900 dark:text-white">
                    Price
                  </td>
                  {bicycles.map((bike) => (
                    <td
                      key={bike.id}
                      className="p-4 text-center"
                    >
                      <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                        ₹{bike.price.toLocaleString()}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Category Row */}
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Category
                  </td>
                  {bicycles.map((bike) => (
                    <td
                      key={bike.id}
                      className="p-4 text-center text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 capitalize">
                        {bike.category || "General"}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Description Row */}
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Description
                  </td>
                  {bicycles.map((bike) => (
                    <td
                      key={bike.id}
                      className="p-4 text-sm text-gray-600 dark:text-gray-400 text-center"
                    >
                      <p className="line-clamp-3">{bike.description}</p>
                    </td>
                  ))}
                </tr>

                {/* Feature Rows */}
                {allFeatures.slice(0, 10).map((feature, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {feature}
                    </td>
                    {bicycles.map((bike) => (
                      <td key={bike.id} className="p-4 text-center">
                        {hasFeature(bike, feature) ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700">
                            <Minus className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 p-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition"
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
