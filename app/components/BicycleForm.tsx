"use client";
import { useState } from "react";
import { Bicycle } from "@/types";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client

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
      image_url: "", // Initialize image_url
    }
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageUrl = formData.image_url;

      // 1. Handle Image Upload if a new file is selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("bicycles") // Ensure this bucket exists in Supabase Storage
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Get the Public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("bicycles").getPublicUrl(filePath);

        uploadedImageUrl = publicUrl;
      }

      // 2. Prepare data for API
      const dataToSubmit = { ...formData, image_url: uploadedImageUrl };

      const url = isEdit ? `/api/bicycles/${initialData?.id}` : "/api/bicycles";
      const method = isEdit ? "PUT" : "POST";

      console.log("Submitting to:", url, "with data:", dataToSubmit);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const responseData = await res.json();

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const errorMsg = responseData.error || "Error saving data";
        alert(`Error: ${errorMsg}`);
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

      {/* Image Upload Field */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 mb-2">
          Image
        </label>
        {formData.image_url && (
          <div className="mb-2">
            <img
              src={formData.image_url}
              alt="Preview"
              className="h-32 w-auto object-cover rounded border border-gray-300 dark:border-gray-600"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="w-full text-gray-700 dark:text-gray-200"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
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
