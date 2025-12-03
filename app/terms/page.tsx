"use client";
import AnimatedHero from "@/components/AnimatedHero";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatedHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services."
        variant="secondary"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 prose dark:prose-invert max-w-none">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement. In addition,
            when using these particular services, you shall be subject to any
            posted guidelines or rules applicable to such services.
          </p>

          <h3>2. Use of Services</h3>
          <p>
            You agree to use our website and services for lawful purposes only.
            You are prohibited from violating or attempting to violate the
            security of the website, including, without limitation, accessing
            data not intended for you or logging into a server or account which
            you are not authorized to access.
          </p>

          <h3>3. Product Information</h3>
          <p>
            We attempt to be as accurate as possible with our product
            descriptions and pricing. However, we do not warrant that product
            descriptions or other content of this site is accurate, complete,
            reliable, current, or error-free. Prices and availability are
            subject to change without notice.
          </p>

          <h3>4. Limitation of Liability</h3>
          <p>
            In no event shall Waheed Cycle Shop or its suppliers be liable for
            any damages (including, without limitation, damages for loss of data
            or profit, or due to business interruption) arising out of the use
            or inability to use the materials on Waheed Cycle Shop's website.
          </p>

          <h3>5. Changes to Terms</h3>
          <p>
            We reserve the right to update or modify these Terms and Conditions
            at any time without prior notice. Your use of this website following
            any such change constitutes your agreement to follow and be bound by
            the Terms and Conditions as changed.
          </p>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </main>
  );
}
