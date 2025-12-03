"use client";
import { useEffect, useState } from "react";
import BicycleForm from "@/components/BicycleForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Bicycle } from "@/types";
import { use } from "react";

export default function EditBicycle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Bicycle | null>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    if (!user) router.push("/admin/login");
    // Fetch individual bicycle data
    fetch(`/api/bicycles`)
      .then((res) => res.json())
      .then((items) => {
        const found = items.find((b: Bicycle) => b.id === resolvedParams.id);
        if (found) setData(found);
      });
  }, [user, router, resolvedParams.id]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Edit Bicycle
      </h1>
      <BicycleForm initialData={data} isEdit />
    </div>
  );
}
