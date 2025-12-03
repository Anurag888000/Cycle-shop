"use client";
import { useEffect, useState, use } from "react";
import BicycleForm from "@/components/BicycleForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Bicycle } from "@/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    if (!user) {
      // Auth check
    }
    fetch(`/api/bicycles/${resolvedParams.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setData)
      .catch(() => router.push("/admin"));
  }, [user, resolvedParams.id, router]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Bicycle
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Update the details for{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {data.name}
            </span>
          </p>
        </div>

        <BicycleForm initialData={data} isEdit />
      </div>
    </div>
  );
}
