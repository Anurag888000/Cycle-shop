"use client";
import { useEffect, useState } from "react";
import BicycleList from "@/components/BicycleList";
import { Bicycle } from "@/types";
import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function Home() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);

  useEffect(() => {
    fetch("/api/bicycles")
      .then((res) => res.json())
      .then((data) => setBicycles(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero / Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🚴</span>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              Cycle Shop
            </h1>
          </div>
          <Link
            href="/admin/login"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition bg-gray-100 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 px-4 py-2 rounded-full"
          >
            <UserCircle className="w-4 h-4" />
            Admin Login
          </Link>
        </div>
      </div>

      {/* Banner Area */}
      <div className="bg-indigo-600 dark:bg-indigo-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ride Your Dream
          </h2>
          <p className="text-indigo-100 dark:text-indigo-200 text-lg max-w-2xl mx-auto">
            Discover our premium collection of bicycles engineered for
            performance, comfort, and style.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 mt-10 relative z-0">
        <BicycleList bicycles={bicycles} />
      </div>
    </main>
  );
}
