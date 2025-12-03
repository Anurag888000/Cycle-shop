import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// Demo data for bicycles
const DEMO_BICYCLES = [
  {
    name: "Mountain Blaze Pro",
    price: 1299,
    description:
      "Professional-grade mountain bike with full suspension and advanced shock absorption for extreme terrain.",
    features:
      'Full Suspension, 29" Wheels, Hydraulic Disc Brakes, Carbon Frame, Lightweight',
  },
  {
    name: "Urban Commuter X",
    price: 599,
    description:
      "Perfect for city commuting with lightweight frame and comfortable riding position.",
    features: '26" Wheels, Aluminum Frame, 21 Speed, Fenders, Cargo Rack',
  },
  {
    name: "Road Racer Elite",
    price: 1599,
    description:
      "High-performance road bike designed for speed and efficiency on paved surfaces.",
    features: "Drop Bars, 700c Wheels, 16 Speed, Carbon Frame, Lightweight",
  },
  {
    name: "Kids Adventure",
    price: 299,
    description:
      "Safe and fun bicycle designed specifically for children aged 6-12.",
    features:
      'Training Wheels, 20" Wheels, Single Speed, Steel Frame, Colorful',
  },
  {
    name: "Hybrid Explorer",
    price: 799,
    description:
      "Versatile bike suitable for both road and light trail riding.",
    features:
      '27.5" Wheels, Front Suspension, 21 Speed, Hybrid Tires, Comfortable Seat',
  },
  {
    name: "BMX Stunt King",
    price: 399,
    description:
      "Durable BMX bike perfect for tricks, stunts, and freestyle riding.",
    features:
      '20" Wheels, Steel Frame, Single Speed, Pegs Included, Trick Ready',
  },
  {
    name: "Cruiser Vintage Style",
    price: 549,
    description:
      "Classic vintage-inspired cruiser for relaxed, comfortable rides.",
    features:
      '26" Wheels, Comfortable Seat, 7 Speed, Fenders, Basket Compatible',
  },
  {
    name: "Electric Thunder",
    price: 2199,
    description:
      "Powerful electric bicycle with long-range battery for effortless commuting.",
    features:
      "Electric Motor, 50km Range, USB Charging, LCD Display, Pedal Assist",
  },
  {
    name: "Gravel Adventure",
    price: 899,
    description: "Perfect for gravel roads and mixed terrain adventures.",
    features: "Gravel Tires, Aluminum Frame, 18 Speed, Disc Brakes, Drop Bars",
  },
  {
    name: "Folding Compact",
    price: 449,
    description:
      "Portable folding bike ideal for travel and multi-modal commuting.",
    features:
      'Folds Compact, 20" Wheels, 8 Speed, Lightweight, Carry Bag Included',
  },
];

// POST: Seed database with demo bicycles
export async function POST() {
  try {
    // Filter out any empty or invalid data
    const cleanedData = DEMO_BICYCLES.map((bike) => ({
      name: bike.name || "",
      price: bike.price || 0,
      description: bike.description || "",
      features: bike.features || "",
    })).filter((bike) => bike.name); // Only include bikes with a name

    if (cleanedData.length === 0) {
      return NextResponse.json(
        { error: "No valid bike data to insert" },
        { status: 400 }
      );
    }

    // Insert demo bicycles
    const { data, error } = await supabaseServer
      .from("bicycles")
      .insert(cleanedData)
      .select();

    if (error) {
      console.error("Insert error:", error);
      // If it's a duplicate key error, that's okay - just skip
      if (error.code === "23505" || error.message.includes("duplicate")) {
        return NextResponse.json(
          {
            message: "Demo data already exists. Skipping insertion.",
            bicycles: [],
          },
          { status: 200 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: `Successfully added ${data?.length || 0} demo bicycles`,
        bicycles: data || [],
      },
      { status: 201 }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("POST error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE: Clear all bicycles (optional, for testing)
export async function DELETE() {
  try {
    const { error } = await supabaseServer
      .from("bicycles")
      .delete()
      .gt("id", ""); // Delete all rows where id is not empty/null

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "All bicycles have been cleared" },
      { status: 200 }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("DELETE error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
