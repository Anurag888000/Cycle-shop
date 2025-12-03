"use client";
import { useState } from "react";
import { Bicycle } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  initialData?: Bicycle;
  isEdit?: boolean;
}

export default function BicycleForm({ initialData, isEdit }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Bicycle>(
    initialData || {
      name: "",
      price: 0,
      description: "",
      features: "",
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/bicycles/${initialData?.id}` : "/api/bicycles";
      const method = isEdit ? "PUT" : "POST";

      console.log("Submitting to:", url, "with data:", formData);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      console.log("Response:", responseData);

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const errorMsg = responseData.error || "Error saving data";
        alert(`Error: ${errorMsg}`);
        console.error("Error saving:", errorMsg);
      }
    } catch (error) {
      console.error("Exception:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow"
    >
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200">Name</label>
        <input
          type="text"
          required
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200">Price</label>
        <input
          type="number"
          required
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          required
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200">
          Features
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="e.g. Alloy Frame, 21 Speed"
          value={formData.features}
          onChange={(e) =>
            setFormData({ ...formData, features: e.target.value })
          }
        />
      </div>
      <button
        disabled={loading}
        className="w-full bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white p-2 rounded font-medium transition disabled:opacity-50"
      >
        {loading ? "Saving..." : isEdit ? "Update Bicycle" : "Add Bicycle"}
      </button>
    </form>
  );
}
