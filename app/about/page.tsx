import { Users, Bike, Trophy, Heart, Wrench, ShieldCheck } from "lucide-react";
import AnimatedHero from "@/components/AnimatedHero";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Animated Hero Section */}
      <AnimatedHero
        title="Driven by Passion, Built for Riders."
        subtitle="Waheed Cycle Shop has been serving cyclists with high-quality bicycles, parts, and friendly service in Bhognipur since 2010."
        variant="secondary"
      />

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat number="10+" label="Years Experience" />
          <Stat number="5k+" label="Happy Customers" />
          <Stat number="500+" label="Bikes Sold" />
          <Stat number="100%" label="Satisfaction" />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-16 space-y-24">
        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              To make cycling accessible and enjoyable by offering quality
              bicycles, professional service, and honest guidance — whether
              you're commuting, training, or exploring off-road. We believe
              every ride should be an adventure.
            </p>
            <div className="flex gap-4">
              <FeatureTag
                text="Quality Bikes"
                icon={<Bike className="w-4 h-4" />}
              />
              <FeatureTag
                text="Expert Service"
                icon={<Wrench className="w-4 h-4" />}
              />
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 h-80 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1559056961-1f4dbbf9d36a?auto=format&fit=crop&q=80&w=800"
              alt="Bike Workshop"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Waheed Cycle Shop?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              More than just a shop, we are a community of riders.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={<ShieldCheck className="w-8 h-8 text-green-500" />}
              title="Trusted Quality"
              description="We only stock brands and parts that we would ride ourselves. Durability guaranteed."
            />
            <ValueCard
              icon={<Users className="w-8 h-8 text-blue-500" />}
              title="Community Focus"
              description="Located in Bhognipur, we are proud to serve our local cyclists with a smile."
            />
            <ValueCard
              icon={<Heart className="w-8 h-8 text-red-500" />}
              title="Customer First"
              description="Honest advice without the upsell. We help you find the bike that fits your needs."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
        {number}
      </div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

function FeatureTag({ text, icon }: { text: string; icon: any }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 font-medium text-sm">
      {icon} {text}
    </span>
  );
}

function ValueCard({ icon, title, description }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
      <div className="mb-4 bg-gray-50 dark:bg-gray-700/50 w-16 h-16 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
