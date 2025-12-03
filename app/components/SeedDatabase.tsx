"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeedDatabase() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  const handleSeed = async () => {
    setLoading(true);
    setMessage("");
    setIsSuccess(false);
    setAddedCount(0);

    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      });

      const data = await response.json();
      console.log("Seed response:", data);

      if (response.ok) {
        const count = data.bicycles?.length || 0;
        setAddedCount(count);
        const displayMessage =
          count > 0
            ? `✓ Successfully added ${count} bicycles to your shop!`
            : `✓ ${data.message || "Database updated"}`;
        setMessage(displayMessage);
        setIsSuccess(true);

        // Refresh page after 2 seconds to show new data
        setTimeout(() => {
          router.refresh();
        }, 2000);
      } else {
        setMessage(`✗ ${data.message || data.error}`);
        setIsSuccess(false);
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to seed database";
      console.error("Seed error:", errorMsg);
      setMessage(`✗ Error: ${errorMsg}`);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (
      !confirm(
        "Are you sure you want to delete all bicycles? This cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    setMessage("");
    setIsSuccess(false);
    setAddedCount(0);

    try {
      const response = await fetch("/api/seed", {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✓ ${data.message}`);
        setIsSuccess(true);

        // Refresh page after 2 seconds to show updated data
        setTimeout(() => {
          router.refresh();
        }, 2000);
      } else {
        setMessage(`✗ Error: ${data.error}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(
        `✗ Error: ${
          error instanceof Error ? error.message : "Failed to clear database"
        }`
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Database Management
      </h3>

      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Add 10 demo bicycles to your database or clear all bicycles.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleSeed}
            disabled={loading}
            className="flex-1 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {loading ? "Adding..." : "Add Demo Data (10 Bikes)"}
          </button>
          <button
            onClick={handleClear}
            disabled={loading}
            className="flex-1 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {loading ? "Clearing..." : "Clear All"}
          </button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg text-sm font-medium ${
              isSuccess
                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{message}</span>
              {isSuccess && addedCount > 0 && (
                <span className="text-lg font-bold">{addedCount} ✓</span>
              )}
            </div>
            {isSuccess && (
              <p className="text-xs mt-2 opacity-75">
                Refreshing page in 2 seconds...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
