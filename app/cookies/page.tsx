"use client";
import AnimatedHero from "@/components/AnimatedHero";
import { Cookie, Settings, BarChart, ShieldCheck } from "lucide-react";

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatedHero
        title="Cookie Policy"
        subtitle="Understanding how and why we use cookies on our website."
        variant="secondary"
      />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Cookies are small text files that are placed on your computer by
            websites that you visit. They are widely used in order to make
            websites work, or work more efficiently, as well as to provide
            information to the owners of the site.
          </p>
        </div>

        <div className="space-y-6">
          <CookieSection
            icon={<ShieldCheck className="w-5 h-5 text-green-500" />}
            title="Essential Cookies"
            description="These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms."
          />
          <CookieSection
            icon={<BarChart className="w-5 h-5 text-blue-500" />}
            title="Performance Cookies"
            description="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site."
          />
          <CookieSection
            icon={<Settings className="w-5 h-5 text-gray-500" />}
            title="Functional Cookies"
            description="These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages."
          />
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
            <Cookie className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Managing Cookies
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Most web browsers allow some control of most cookies through the
            browser settings. To find out more about cookies, including how to
            see what cookies have been set, visit www.aboutcookies.org or
            www.allaboutcookies.org.
          </p>
        </div>
      </div>
    </main>
  );
}

function CookieSection({ icon, title, description }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
