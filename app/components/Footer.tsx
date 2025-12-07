"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Github,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-10 pb-6 border-t border-gray-800 relative overflow-hidden">
      {/* Animated decorative blob */}
      <motion.div 
        className="absolute top-0 left-1/4 w-48 h-48 bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content: 2 columns on mobile, 4 on desktop */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 relative z-10">
        {/* Brand Section - Spans 2 cols on mobile for emphasis */}
        <motion.div 
          className="col-span-2 md:col-span-1 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <motion.span 
              className="text-2xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.2 }}
            >
              🚴
            </motion.span>
            <h2 className="text-lg font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Waheed <span className="text-indigo-500">Cycles</span>
            </h2>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed max-w-[200px]">
            Premium bicycles, expert service, and genuine parts.
          </p>
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.2, y: -5 }} transition={{ duration: 0.2 }}>
              <SocialLink href="#" icon={<Facebook className="w-3.5 h-3.5" />} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, y: -5 }} transition={{ duration: 0.2 }}>
              <SocialLink href="#" icon={<Instagram className="w-3.5 h-3.5" />} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, y: -5 }} transition={{ duration: 0.2 }}>
              <SocialLink href="#" icon={<Twitter className="w-3.5 h-3.5" />} />
            </motion.div>
          </div>
        </motion.div>

        {/* Explore Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-white font-bold text-sm mb-3 hover:text-indigo-400 transition-colors">Explore</h3>
          <ul className="space-y-2 text-xs">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/services">Services</FooterLink>
          </ul>
        </motion.div>

        {/* Support Column - "Next Column" for Contact & Admin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-white font-bold text-sm mb-3 hover:text-indigo-400 transition-colors">Support</h3>
          <ul className="space-y-2 text-xs">
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/admin/login">Admin Portal</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
          </ul>
        </motion.div>

        {/* Contact Info - Compact View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-white font-bold text-sm mb-3 hover:text-indigo-400 transition-colors">Visit Us</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2 text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span className="leading-tight">
                Bhognipur, Kanpur Dehat,
                <br />
                UP, India 209111
              </span>
            </li>
            <motion.li 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <a href="tel:+918090529034">+91 80905 29034</a>
            </motion.li>
            <motion.li 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <a href="mailto:mr.sam9900@gmail.com" className="truncate">
                mr.sam9900@gmail.com
              </a>
            </motion.li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-gray-500 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>© {currentYear} Waheed Cycle Shop. All rights reserved.</p>
        <div className="flex gap-4">
          <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
            <Link href="/cookies" className="hover:text-white transition">
              Cookie Policy
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <motion.div
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={href}
          className="text-gray-400 hover:text-indigo-400 transition-all duration-300 inline-block"
        >
          {children}
        </Link>
      </motion.div>
    </li>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
    </motion.a>
  );
}
