"use client";
import { useState } from "react";
import { Bicycle } from "@/types";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Upload, X, Save, Image as ImageIcon } from "lucide-react";

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
      image_url: "",
    }
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    initialData?.image_url || ""
  );
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageUrl = formData.image_url;

      // Handle Image Upload
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("bicycles")
          .upload(filePath, imageFile);

        if (uploadError) throw new Error(uploadError.message);

        const {
          data: { publicUrl },
        } = supabase.storage.from("bicycles").getPublicUrl(filePath);

        uploadedImageUrl = publicUrl;
      }

      const dataToSubmit = { ...formData, image_url: uploadedImageUrl };
      const url = isEdit ? `/api/bicycles/${initialData?.id}` : "/api/bicycles";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Error saving data");
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Image Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-200">
            Bicycle Image
          </label>

          <div
            className={`relative w-full h-64 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-colors ${
              previewUrl
                ? "border-indigo-500 bg-gray-50 dark:bg-gray-900"
                : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain p-4"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setPreviewUrl("");
                    setFormData({ ...formData, image_url: "" });
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="text-center p-6 pointer-events-none">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Right Column: Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mountain Trekker 3000"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition dark:text-white"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                required
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition dark:text-white"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                Features
              </label>
              <input
                type="text"
                placeholder="Alloy, 7-Speed..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition dark:text-white"
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe the bicycle..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition dark:text-white resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-100 dark:border-gray-700" />

      <div className="flex justify-end">
        <button
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Save className="w-5 h-5" />{" "}
              {isEdit ? "Update Bicycle" : "Save Bicycle"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
