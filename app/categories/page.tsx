import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedHero from "@/components/AnimatedHero";
import { BIKE_CATEGORIES } from "@/types";

export default function CategoriesPage() {
  const categoryImages: Record<string, string> = {
    mountain:
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&w=600&q=80",
    road: "https://images.unsplash.com/photo-1485965120184-e224f7a1d7f6?auto=format&fit=crop&w=600&q=80",
    kids: "https://images.unsplash.com/photo-1595432541891-a461c0fa4e41?auto=format&fit=crop&w=600&q=80",
    electric:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=80",
    city: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600&q=80",
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Animated Hero Header */}
      <AnimatedHero
        title="Explore Categories"
        subtitle="Find the perfect bike for your riding style. From mountain trails to city streets, we've got you covered."
        variant="secondary"
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BIKE_CATEGORIES.map((category, index) => (
            <Link
              key={category.id}
              href={`/?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${categoryImages[category.id]}')`,
                }}
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <span className="text-4xl mb-2">{category.icon}</span>
                <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm mb-4">
                  {getCategoryDescription(category.id)}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  Browse Collection <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform rotate-0 group-hover:rotate-180 transition-transform duration-700">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          ))}

          {/* View All Card */}
          <Link
            href="/"
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-white"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🚴
            </div>
            <h3 className="text-2xl font-bold mb-2">View All Bikes</h3>
            <p className="text-gray-400 text-sm mb-4">Browse our complete collection</p>
            <div className="flex items-center gap-2 text-indigo-400 font-medium">
              Explore Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Bike Models", value: "50+", icon: "🚲" },
            { label: "Happy Customers", value: "10K+", icon: "😊" },
            { label: "Years Experience", value: "15+", icon: "🏆" },
            { label: "Cities Served", value: "100+", icon: "🌍" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function getCategoryDescription(id: string): string {
  const descriptions: Record<string, string> = {
    mountain: "Conquer any trail with our rugged mountain bikes",
    road: "Speed and efficiency for serious road cyclists",
    kids: "Safe and fun bikes for young riders",
    electric: "Effortless riding with powerful electric motors",
    city: "Comfortable commuting for urban adventures",
  };
  return descriptions[id] || "Explore our collection";
}
