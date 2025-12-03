"use client";
import BicycleForm from "@/components/BicycleForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddBicycle() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/admin/login");
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Bicycle</h1>
      <BicycleForm />
    </div>
  );
}
