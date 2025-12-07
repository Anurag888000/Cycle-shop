"use client";
import Link from "next/link";
import { UserCircle, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200/20 dark:border-gray-700/20 py-2"
          : "bg-white dark:bg-gray-900 py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <div className="relative w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <span className="text-2xl">🚴</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shadow-black drop-shadow-sm">
              WAHEED
            </h1>
            <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase">
              Cycle Shop
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`hidden md:flex gap-1 items-center px-2 py-1.5 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-gray-100/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
              : "bg-gray-50 dark:bg-gray-800 border-gray-200"
          }`}
        >
          <NavLink href="/" isScrolled={isScrolled}>
            Home
          </NavLink>
          <NavLink href="/categories" isScrolled={isScrolled}>
            Categories
          </NavLink>
          <NavLink href="/about" isScrolled={isScrolled}>
            About
          </NavLink>
          <NavLink href="/services" isScrolled={isScrolled}>
            Services
          </NavLink>
          <NavLink href="/contact" isScrolled={isScrolled}>
            Contact
          </NavLink>
        </nav>

        {/* Admin & Menu */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className={`hidden md:flex items-center gap-2 text-sm font-semibold transition px-4 py-2 rounded-full ${
              isScrolled
                ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
            }`}
          >
            <UserCircle className="w-5 h-5" />
            <span className="hidden lg:inline">Admin</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-full transition relative z-50 ${
              isScrolled
                ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-2xl md:hidden pt-24 pb-8 px-6 flex flex-col gap-4"
          >
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/categories" onClick={() => setIsMenuOpen(false)}>
              Categories
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink
              href="/services"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavLink>

            <hr className="border-gray-100 dark:border-gray-800 my-2" />
            <Link
              href="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-base font-medium text-gray-600 dark:text-gray-300 py-2 hover:text-indigo-600"
            >
              <UserCircle className="w-5 h-5" /> Admin Portal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* Desktop NavLink with Active Highlight */
function NavLink({
  href,
  children,
  isScrolled,
}: {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-5 py-2 text-sm font-medium transition group ${
        isActive
          ? "text-indigo-600 dark:text-indigo-400"
          : isScrolled
          ? "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white"
      }`}
    >
      <span className="relative z-10">{children}</span>

      {isActive ? (
        <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/40 rounded-full scale-100 transition-transform duration-200" />
      ) : (
        <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
      )}
    </Link>
  );
}

/* Mobile NavLink With Active State */
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block text-lg font-semibold p-2 rounded-lg transition ${
        isActive
          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40"
          : "text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </Link>
  );
}
