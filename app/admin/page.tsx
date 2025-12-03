"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BicycleList from "@/components/BicycleList";
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

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-gray-600 self-center">
            View Site
          </Link>
          <Link
            href="/admin/add"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Bicycle
          </Link>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <BicycleList bicycles={bicycles} isAdmin onDelete={handleDelete} />
      </div>
    </div>
  );
}
