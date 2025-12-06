"use client";
import { useEffect, useState } from "react";
import BicycleList from "@/components/BicycleList";
import { Bicycle } from "@/types";
import AnimatedHero from "@/components/AnimatedHero";

const heroImageSrc =
  "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1400&q=70&fm=webp";

export default function Home() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);

  useEffect(() => {
    fetch("/api/bicycles")
      .then((res) => res.json())
      .then((data) => setBicycles(data));
  }, []);

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
        <BicycleList bicycles={bicycles} />
      </div>
    </main>
  );
}
