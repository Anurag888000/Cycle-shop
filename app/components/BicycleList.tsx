"use client";
import { Bicycle } from "@/types";
import Link from "next/link";

interface Props {
  bicycles: Bicycle[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export default function BicycleList({ bicycles, isAdmin, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bicycles.map((bike) => (
        <div
          key={bike.id}
          className="border rounded-lg shadow-sm p-5 hover:shadow-md transition bg-white"
        >
          <h3 className="text-xl font-bold text-gray-800">{bike.name}</h3>
          <p className="text-green-600 font-semibold text-lg mt-1">
            ${bike.price}
          </p>
          <p className="text-gray-600 mt-2 text-sm">{bike.description}</p>
          <div className="mt-3">
            <span className="text-xs font-bold text-gray-500 uppercase">
              Features:
            </span>
            <p className="text-sm text-gray-700">{bike.features}</p>
          </div>

          {isAdmin && (
            <div className="mt-4 flex gap-2">
              <Link
                href={`/admin/edit/${bike.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete && onDelete(bike.id!)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
