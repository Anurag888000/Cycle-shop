"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import Image from "next/image";

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  backgroundImage?: string;
}

export default function AnimatedHero({
  title,
  subtitle,
  children,
  variant = "primary",
  backgroundImage,
}: AnimatedHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const variants = {
    primary: {
      bg: "bg-linear-to-br from-indigo-600 via-indigo-700 to-indigo-900 dark:from-indigo-700 dark:via-indigo-800 dark:to-black",
      accentBg1: "from-indigo-500/30 to-purple-500/30",
      accentBg2: "from-purple-500/20 to-pink-500/20",
    },
    secondary: {
      bg: "bg-linear-to-br from-slate-900 via-indigo-900 to-black dark:from-black dark:via-slate-900 dark:to-slate-800",
      accentBg1: "from-indigo-600/20 to-cyan-600/20",
      accentBg2: "from-cyan-500/15 to-blue-500/15",
    },
    tertiary: {
      bg: "bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-800 dark:to-pink-900",
      accentBg1: "from-pink-500/30 to-rose-500/30",
      accentBg2: "from-purple-500/20 to-indigo-500/20",
    },
  };

  const selectedVariant = variants[variant];

  return (
    <section
      className={`relative ${selectedVariant.bg} text-white overflow-hidden h-[480px] flex items-center`}
    >
      {/* Hero Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            priority
            quality={85}
            loading="eager"
            decoding="async"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQAAA//9k="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1600px"
            onLoadingComplete={() => setImageLoaded(true)}
            className="object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900/70 via-indigo-800/60 to-black/50" />
        </div>
      )}

      {/* Animated gradient orbs - lighter animation */}
      <motion.div
        animate={
          imageLoaded
            ? {
                x: [0, 20, 0],
                y: [0, -20, 0],
              }
            : {}
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40 bg-linear-to-br ${selectedVariant.accentBg1}`}
      />
      <motion.div
        animate={
          imageLoaded
            ? {
                x: [0, -20, 0],
                y: [0, 20, 0],
              }
            : {}
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 bg-linear-to-br ${selectedVariant.accentBg2}`}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-black mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Shimmer effect */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundSize: "200% 200%",
        }}
      />
    </section>
  );
}
