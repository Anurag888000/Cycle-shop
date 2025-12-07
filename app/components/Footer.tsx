"use client";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-300 pt-10 pb-6 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
      {/* Subtle decorative blob */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-indigo-100 dark:bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      {/* Main Content: 2 columns on mobile, 4 on desktop */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 relative z-10">
        {/* Brand Section - Spans 2 cols on mobile for emphasis */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              🚴
            </span>
            <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
              Waheed <span className="text-indigo-600 dark:text-indigo-500">Cycles</span>
            </h2>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px]">
            Premium bicycles, expert service, and genuine parts.
          </p>
          <div className="flex gap-3">
            <SocialLink href="#" icon={<Facebook className="w-3.5 h-3.5" />} />
            <SocialLink href="#" icon={<Instagram className="w-3.5 h-3.5" />} />
            <SocialLink href="#" icon={<Twitter className="w-3.5 h-3.5" />} />
          </div>
        </div>

        {/* Explore Column */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-3">Explore</h3>
          <ul className="space-y-2 text-xs">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/categories">Categories</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/services">Services</FooterLink>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-3">Support</h3>
          <ul className="space-y-2 text-xs">
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/admin/login">Admin Portal</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-3">Visit Us</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2 text-gray-500 dark:text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-500 shrink-0 mt-0.5" />
              <span className="leading-tight">
                Bhognipur, Kanpur Dehat,
                <br />
                UP, India 209111
              </span>
            </li>
            <li className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-500 shrink-0" />
              <a href="tel:+918090529034">+91 80905 29034</a>
            </li>
            <li className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
              <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-500 shrink-0" />
              <a href="mailto:mr.sam9900@gmail.com" className="truncate">
                mr.sam9900@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-gray-500 dark:text-gray-500 relative z-10">
        <p>© {currentYear} Waheed Cycle Shop. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition">
            Terms of Service
          </Link>
          <Link href="/cookies" className="hover:text-gray-900 dark:hover:text-white transition">
            Cookie Policy
          </Link>
        </div>
      </div>
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
      <Link
        href={href}
        className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-1 transition-all duration-300 inline-block"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}


