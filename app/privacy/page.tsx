"use client";
import AnimatedHero from "@/components/AnimatedHero";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatedHero
        title="Privacy Policy"
        subtitle="We value your trust. Here is how we protect and manage your data."
        variant="secondary"
      />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            At Waheed Cycle Shop, we are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your
            information when you visit our website or use our services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <PolicyCard
            icon={<Eye className="w-6 h-6 text-blue-500" />}
            title="Information We Collect"
            content="We collect information you provide directly to us, such as when you contact us, request a quote, or sign up for our newsletter. This includes your name, email address, phone number, and message contents."
          />
          <PolicyCard
            icon={<FileText className="w-6 h-6 text-green-500" />}
            title="How We Use Information"
            content="We use your information to provide, maintain, and improve our services, respond to your comments and questions, and send you related information, including invoices and updates."
          />
          <PolicyCard
            icon={<Lock className="w-6 h-6 text-orange-500" />}
            title="Data Security"
            content="We implement appropriate technical and organizational measures to protect the security of your personal information against accidental or unlawful destruction, loss, change, or damage."
          />
          <PolicyCard
            icon={<Shield className="w-6 h-6 text-purple-500" />}
            title="Your Rights"
            content="You have the right to access, correct, or delete your personal data. You may also object to the processing of your data or request data portability."
          />
        </div>

        <div className="prose dark:prose-invert max-w-none border-t border-gray-200 dark:border-gray-800 pt-8">
          <h3>Contact Us About Privacy</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
            <br />
            <strong>Email:</strong> mr.sam9900@gmail.com
            <br />
            <strong>Phone:</strong> +91 80905 29034
          </p>
        </div>
      </div>
    </main>
  );
}

function PolicyCard({ icon, title, content }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="mb-4 bg-gray-50 dark:bg-gray-700/50 w-12 h-12 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {content}
      </p>
    </div>
  );
}
