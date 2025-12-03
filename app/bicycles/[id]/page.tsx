"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Bicycle } from "@/types";
import { ArrowLeft, Check, Star, MessageCircle } from "lucide-react"; // Added MessageCircle
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
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
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Shop
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden lg:flex">
          {/* Image Section */}
          <div className="lg:w-1/2 bg-gray-100 dark:bg-gray-700 relative h-96 lg:h-auto flex items-center justify-center p-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={bike.image_url || placeholderImg}
              alt={bike.name}
              className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl"
            />
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Premium
              </span>
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4" />
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-sm">
                (4.9 Review)
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {bike.name}
            </h1>

            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-baseline gap-2">
              ₹{bike.price.toLocaleString()}
              <span className="text-lg text-gray-400 dark:text-gray-600 font-normal line-through">
                ₹{(bike.price * 1.2).toLocaleString()}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              {bike.description}
            </p>

            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b dark:border-gray-700 pb-2">
                Technical Specifications
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bike.features.split(",").map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300 text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <button
                onClick={() => {
                  const phone = "918090529034";
                  const message = `Hi Waheed Cycle Shop, I'm interested in buying the "${
                    bike.name
                  }" priced at ₹${bike.price.toLocaleString()}. Is it still available?`;
                  const url = `https://wa.me/${phone}?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Buy Now via WhatsApp
              </button>
              <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
                Instant response • Secure transaction • Direct from shop
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
