"use client";
import { useState } from "react";
import { X, Ruler, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BikeType = "road" | "mountain" | "hybrid";
type Unit = "cm" | "ft";

const SIZE_CHART = {
  road: [
    { height: [152, 160], frame: '48-50cm (XS)', inseam: '69-73cm' },
    { height: [160, 168], frame: '51-53cm (S)', inseam: '74-78cm' },
    { height: [168, 175], frame: '54-55cm (M)', inseam: '79-82cm' },
    { height: [175, 183], frame: '56-58cm (L)', inseam: '83-86cm' },
    { height: [183, 191], frame: '58-60cm (XL)', inseam: '87-90cm' },
    { height: [191, 210], frame: '61-63cm (XXL)', inseam: '91-95cm' },
  ],
  mountain: [
    { height: [152, 162], frame: '14-15" (XS)', inseam: '66-71cm' },
    { height: [162, 170], frame: '15-16" (S)', inseam: '71-76cm' },
    { height: [170, 178], frame: '17-18" (M)', inseam: '76-81cm' },
    { height: [178, 185], frame: '18-19" (L)', inseam: '81-86cm' },
    { height: [185, 193], frame: '19-20" (XL)', inseam: '86-91cm' },
    { height: [193, 210], frame: '21-22" (XXL)', inseam: '91-97cm' },
  ],
  hybrid: [
    { height: [152, 162], frame: '14-15" (XS)', inseam: '69-73cm' },
    { height: [162, 170], frame: '15-16" (S)', inseam: '74-78cm' },
    { height: [170, 178], frame: '17-18" (M)', inseam: '79-82cm' },
    { height: [178, 185], frame: '18-19" (L)', inseam: '83-86cm' },
    { height: [185, 193], frame: '19-21" (XL)', inseam: '87-91cm' },
    { height: [193, 210], frame: '21-23" (XXL)', inseam: '92-97cm' },
  ],
};

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [bikeType, setBikeType] = useState<BikeType>("road");
  const [unit, setUnit] = useState<Unit>("cm");
  const [heightCm, setHeightCm] = useState<number>(170);
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(7);

  const getHeightInCm = (): number => {
    if (unit === "cm") return heightCm;
    return Math.round(feet * 30.48 + inches * 2.54);
  };

  const getRecommendation = () => {
    const height = getHeightInCm();
    const chart = SIZE_CHART[bikeType];
    const match = chart.find(
      (row) => height >= row.height[0] && height < row.height[1]
    );
    return match || null;
  };

  const recommendation = getRecommendation();

  if (!isOpen) return null;

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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Ruler className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Size Guide
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Find your perfect frame size
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Bike Type Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                Bike Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["road", "mountain", "hybrid"] as BikeType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setBikeType(type)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                      bikeType === type
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Height Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                  Your Height
                </label>
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setUnit("cm")}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                      unit === "cm"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    cm
                  </button>
                  <button
                    onClick={() => setUnit("ft")}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                      unit === "ft"
                        ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    ft/in
                  </button>
                </div>
              </div>

              {unit === "cm" ? (
                <div className="relative">
                  <input
                    type="number"
                    min={140}
                    max={220}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-lg font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    cm
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      min={4}
                      max={7}
                      value={feet}
                      onChange={(e) => setFeet(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-lg font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                      ft
                    </span>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      min={0}
                      max={11}
                      value={inches}
                      onChange={(e) => setInches(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-lg font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Recommendation */}
            {recommendation ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white"
              >
                <p className="text-sm font-medium text-indigo-200 mb-1">
                  Recommended Frame Size
                </p>
                <p className="text-3xl font-bold mb-3">{recommendation.frame}</p>
                <p className="text-sm text-indigo-200">
                  For riders {recommendation.height[0]}-{recommendation.height[1]}cm
                  (inseam: {recommendation.inseam})
                </p>
              </motion.div>
            ) : (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-yellow-800 dark:text-yellow-200 text-sm">
                Please enter a valid height between 152cm and 210cm
              </div>
            )}

            {/* Size Chart */}
            <div>
              <button
                onClick={() => {}}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-3"
              >
                <ChevronDown className="w-4 h-4" />
                View Full Size Chart
              </button>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-2 px-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        Height
                      </th>
                      <th className="py-2 px-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        Frame
                      </th>
                      <th className="py-2 px-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        Inseam
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART[bikeType].map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-gray-100 dark:border-gray-700/50 ${
                          recommendation?.frame === row.frame
                            ? "bg-indigo-50 dark:bg-indigo-900/20"
                            : ""
                        }`}
                      >
                        <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                          {row.height[0]}-{row.height[1]}cm
                        </td>
                        <td className="py-2 px-3 text-gray-900 dark:text-white font-medium">
                          {row.frame}
                        </td>
                        <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                          {row.inseam}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
