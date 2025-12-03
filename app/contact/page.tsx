export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We'd love to hear from you. Reach out for sales, service, or general
          inquiries.
        </p>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <strong>Shop:</strong> Waheed Cycle Shop
          </div>
          <div>
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+918090529034"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              +91 80905 29034
            </a>
          </div>
          <div>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:mr.sam9900@gmail.com"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              mr.sam9900@gmail.com
            </a>
          </div>
          <div>
            <strong>Address:</strong>
            <div>Bhognipur, Kanpur Dehat, Uttar Pradesh, India 209111</div>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Bhognipur+Kanpur+Dehat+Uttar+Pradesh+209111"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </main>
  );
}
