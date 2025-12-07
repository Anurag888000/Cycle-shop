"use client";
import { Users, Bike, Trophy, Heart, Wrench, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedHero from "@/components/AnimatedHero";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true },
};

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
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <Stat number="10+" label="Years Experience" delay={0} />
          <Stat number="5k+" label="Happy Customers" delay={0.1} />
          <Stat number="500+" label="Bikes Sold" delay={0.2} />
          <Stat number="100%" label="Satisfaction" delay={0.3} />
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-16 space-y-24">
        {/* Mission Section */}
        <motion.section
          {...fadeInUp}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
            >
              To make cycling accessible and enjoyable by offering quality
              bicycles, professional service, and honest guidance — whether
              you're commuting, training, or exploring off-road. We believe
              every ride should be an adventure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4"
            >
              <FeatureTag
                text="Quality Bikes"
                icon={<Bike className="w-4 h-4" />}
              />
              <FeatureTag
                text="Expert Service"
                icon={<Wrench className="w-4 h-4" />}
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gray-200 dark:bg-gray-700 h-80 rounded-2xl overflow-hidden shadow-xl group"
          >
            <img
              src="https://res.cloudinary.com/dbfgpn8ww/image/upload/v1764760236/Support_efvjzg.png"
              alt="Bike Workshop"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </motion.div>
        </motion.section>

        {/* Why Choose Us */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Waheed Cycle Shop?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              More than just a shop, we are a community of riders.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <ValueCard
              icon={<ShieldCheck className="w-8 h-8 text-green-500" />}
              title="Trusted Quality"
              description="We only stock brands and parts that we would ride ourselves. Durability guaranteed."
              delay={0}
            />
            <ValueCard
              icon={<Users className="w-8 h-8 text-blue-500" />}
              title="Community Focus"
              description="Located in Bhognipur, we are proud to serve our local cyclists with a smile."
              delay={0.15}
            />
            <ValueCard
              icon={<Heart className="w-8 h-8 text-red-500" />}
              title="Customer First"
              description="Honest advice without the upsell. We help you find the bike that fits your needs."
              delay={0.3}
            />
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-6xl mb-4"
            >
              🚴‍♂️
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Cycling Journey?</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Visit our shop in Bhognipur or chat with us on WhatsApp to find your perfect ride.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition shadow-lg"
              >
                Browse Bikes
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur text-white font-bold py-3 px-8 rounded-xl hover:bg-white/30 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function Stat({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.1, type: "spring" }}
        className="text-3xl font-black text-indigo-600 dark:text-indigo-400"
      >
        {number}
      </motion.div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </div>
    </motion.div>
  );
}

function FeatureTag({ text, icon }: { text: string; icon: React.ReactNode }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 font-medium text-sm cursor-default"
    >
      {icon} {text}
    </motion.span>
  );
}

function ValueCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="mb-4 bg-gray-50 dark:bg-gray-700/50 w-16 h-16 rounded-xl flex items-center justify-center"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

