export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          Our Services
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We offer a range of services to keep you riding comfortably and
          safely. Our team provides professional service with genuine parts and
          honest pricing.
        </p>

        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Sales:</strong> New and used bicycles across categories —
            road, mountain, hybrid, electric, and kids.
          </li>
          <li>
            <strong>Repairs & Maintenance:</strong> Tune-ups, brake and gear
            adjustments, wheel truing, and full overhauls.
          </li>
          <li>
            <strong>Parts & Accessories:</strong> Tires, tubes, saddles, lights,
            racks, and more.
          </li>
          <li>
            <strong>Custom Builds:</strong> Frame upgrades and component
            selection for tailored performance.
          </li>
        </ul>
      </div>
    </main>
  );
}
