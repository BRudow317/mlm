export default function Services() {
  const services = [
    { id: 1, title: 'Site Preparation', desc: 'Clearing land for new construction.' },
    { id: 2, title: 'Trenching', desc: 'Utility lines for water, gas, and electric.' },
    { id: 3, title: 'Demolition', desc: 'Safe removal of old structures.' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-miller-yellow">Our Services</h1>
      <div className="grid gap-6">
        {services.map((s) => (
          <div key={s.id} className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-2 mb-4 text-gray-600 dark:text-gray-300">{s.desc}</p>
            <button className="bg-miller-yellow text-black px-4 py-2 rounded font-semibold w-full sm:w-auto">
              Request Quote for {s.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}