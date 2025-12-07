import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WAHEED Cycle Shop | Premium Bicycles in Bhognipur",
  description: "Discover premium bicycles, expert repairs, and genuine parts at WAHEED Cycle Shop. Serving cyclists in Bhognipur since 2010.",
  keywords: "bicycle shop, cycle shop, bikes, mountain bikes, road bikes, electric bikes, Bhognipur, Kanpur",
  openGraph: {
    title: "WAHEED Cycle Shop | Premium Bicycles",
    description: "Quality bicycles, expert service, and genuine parts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <Header />
          <div className="grow">{children}</div>
          <Footer />
          <WhatsAppWidget />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}

