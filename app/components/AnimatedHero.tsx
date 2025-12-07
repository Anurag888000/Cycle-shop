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
                x: [0, 30, -20, 15, 0],
                y: [0, -25, 15, -10, 0],
              }
            : {}
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40 bg-linear-to-br ${selectedVariant.accentBg1}`}
      />
      <motion.div
        animate={
          imageLoaded
            ? {
                x: [0, -30, 25, -15, 0],
                y: [0, 25, -15, 10, 0],
              }
            : {}
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 bg-linear-to-br ${selectedVariant.accentBg2}`}
      />

      {/* Extra floating accent orbs for liquid effect */}
      <motion.div
        animate={
          imageLoaded
            ? {
                x: [0, 25, -15, 20, 0],
                y: [0, 15, -20, 10, 0],
              }
            : {}
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-25 bg-linear-to-br from-pink-500/25 to-purple-500/15`}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-black mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
        {children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Shimmer effect with liquid flow */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating liquid bubbles */}
      {imageLoaded && (
        <>
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          />
          <motion.div
            animate={{ y: [0, -40, 0], x: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-indigo-300/10 backdrop-blur-sm border border-indigo-300/20"
          />
          <motion.div
            animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full bg-purple-300/10 backdrop-blur-sm border border-purple-300/20"
          />
        </>
      )}
    </section>
  );
}
