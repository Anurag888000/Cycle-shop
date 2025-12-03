import {
  ShoppingBag,
  Wrench,
  Settings,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import AnimatedHero from "@/components/AnimatedHero";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Animated Hero Header */}
      <AnimatedHero
        title="Our Services"
        subtitle="Professional service with genuine parts and honest pricing. We keep you riding comfortably and safely."
        variant="tertiary"
      />

      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-16">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <ServiceCard
            icon={<ShoppingBag className="w-8 h-8 text-indigo-600" />}
            title="Bicycle Sales"
            description="We offer a curated selection of new and used bicycles across all categories."
            features={[
              "Mountain & Road Bikes",
              "Kids & Electric Bicycles",
              "Professional Sizing",
              "Test Rides Available",
            ]}
          />
          <ServiceCard
            icon={<Wrench className="w-8 h-8 text-orange-500" />}
            title="Repairs & Maintenance"
            description="Expert tune-ups and repairs to keep your bike running like new."
            features={[
              "Full Tune-ups",
              "Brake & Gear Adjustments",
              "Wheel Truing",
              "Flat Tire Fixes",
            ]}
          />
          <ServiceCard
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            title="Parts & Accessories"
            description="Upgrade your ride with our wide range of quality components."
            features={[
              "High-quality Tires & Tubes",
              "Lights, Locks & Helmets",
              "Comfort Saddles",
              "Cargo Racks & Baskets",
            ]}
          />
          <ServiceCard
            icon={<Settings className="w-8 h-8 text-blue-500" />}
            title="Custom Builds"
            description="Want something unique? We can build a bike tailored to your specs."
            features={[
              "Frame Upgrades",
              "Component Selection",
              "Custom Assembly",
              "Performance Tuning",
            ]}
          />
        </div>

        {/* Pricing Table (Optional/Example) */}
        <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>

          <h2 className="text-3xl font-bold mb-6 relative z-10">
            Ready to Service Your Bike?
          </h2>
          <p className="text-indigo-200 mb-8 max-w-xl mx-auto relative z-10">
            Visit our shop for a free inspection. We'll give you an honest quote
            before doing any work.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg relative z-10"
          >
            Contact Us Today <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function ServiceCard({ icon, title, description, features }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature: string, i: number) => (
          <li
            key={i}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
