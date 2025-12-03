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
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white dark:text-white flex items-center gap-2">
            🚴 Waheed Cycle Shop
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Premium bicycles for every terrain. Experience the ride of your life
            with our curated collection of high-performance cycles.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white dark:text-white font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-400 dark:hover:text-indigo-300 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white dark:text-white font-semibold mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              Bhognipur, Kanpur Dehat, Uttar Pradesh, India 209111
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              8090529034
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              mr.sam9900@gmail.com
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white dark:text-white font-semibold mb-4">
            Stay Updated
          </h3>
          <p className="text-sm mb-3">
            Subscribe for the latest arrivals and offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-gray-800 dark:bg-gray-800 border border-gray-700 dark:border-gray-600 rounded px-3 py-2 text-sm w-full text-white dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
            />
            <button className="bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-3 py-2 rounded text-sm transition">
              Go
            </button>
          </div>
          <div className="flex gap-4 mt-6">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-white dark:hover:text-indigo-400 transition" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white dark:hover:text-indigo-400 transition" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white dark:hover:text-indigo-400 transition" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 dark:text-gray-600">
        © {newXZDate().getFullYear()} Waheed Cycle Shop. All rights reserved.
      </div>
    </footer>
  );
}

function newXZDate() {
  return new Date();
}
