"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Bicycle } from "@/types";
import { ArrowLeft, Check, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function BicycleDetail() {
  const params = useParams();
  const router = useRouter();
  const [bike, setBike] = useState<Bicycle | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    fetch(`/api/bicycles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setBike(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-900 dark:text-white">Loading...</p>
      </div>
    );
  if (!bike)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-900 dark:text-white">Bicycle not found</p>
      </div>
    );

  const placeholderImg =
    "https://images.unsplash.com/photo-1485965120184-e224f7a1d7f6?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden lg:flex">
          {/* Image Section */}
          <div className="lg:w-1/2 bg-gray-100 dark:bg-gray-700 relative h-96 lg:h-auto flex items-center justify-center p-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={bike.image_url || placeholderImg}
              alt={bike.name}
              className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-2xl"
            />
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            {/* ... rest of the component remains the same ... */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                New Arrival
              </span>
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4" />
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-sm">
                (4.0)
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {bike.name}
            </h1>

            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
              ${bike.price.toLocaleString()}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              {bike.description}
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {bike.features.split(",").map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mt-auto">
              <button className="flex-1 bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/30">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-600 dark:hover:border-indigo-400 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 font-bold py-4 px-8 rounded-xl transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
