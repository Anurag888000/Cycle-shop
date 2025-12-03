"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BicycleList from "@/components/BicycleList";
import SeedDatabase from "@/components/SeedDatabase";
import { Bicycle } from "@/types";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);

  useEffect(() => {
    if (!user) {
      // Small delay to allow auth state to resolve, handled by context primarily but double check here
      // Logic handled in Context typically, but for safety:
      // router.push('/admin/login');
    }
    fetch("/api/bicycles")
      .then((res) => res.json())
      .then(setBicycles);
  }, [user]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await fetch(`/api/bicycles/${id}`, { method: "DELETE" });
      setBicycles(bicycles.filter((b) => b.id !== id));
    }
  };

  const refreshBicycles = () => {
    fetch("/api/bicycles")
      .then((res) => res.json())
      .then(setBicycles);
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white self-center"
          >
            View Site
          </Link>
          <Link
            href="/admin/add"
            className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            + Add Bicycle
          </Link>
          <button
            onClick={signOut}
            className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <SeedDatabase onRefresh={refreshBicycles} />
      </div>

      <div className="max-w-6xl mx-auto">
        <BicycleList bicycles={bicycles} isAdmin onDelete={handleDelete} />
      </div>
    </div>
  );
}
