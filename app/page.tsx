"use client";
import { useEffect, useState } from "react";
import BicycleList from "@/components/BicycleList";
import { Bicycle } from "@/types";
import Link from "next/link";

export default function Home() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);

  useEffect(() => {
    fetch("/api/bicycles")
      .then((res) => res.json())
      .then((data) => setBicycles(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">🚴 Cycle Shop</h1>
        <Link href="/admin/login" className="text-indigo-600 hover:underline">
          Admin Login
        </Link>
      </div>
      <div className="max-w-6xl mx-auto">
        <BicycleList bicycles={bicycles} />
      </div>
    </main>
  );
}
