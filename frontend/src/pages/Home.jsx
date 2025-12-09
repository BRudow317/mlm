import { ShieldCheck, HardHat, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* HEADER SECTION (without the word "About") */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-miller-yellow">
          About Miller Excavation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Building the future on a foundation of hard work, honest pricing, and heavy machinery.
        </p>
      </div>

      {/* COMPANY STORY (Text + Image Placeholder) */}
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Miller Excavation started with a single backhoe and a commitment to doing the job right the first time. Over the years, we have grown into a full-service excavation company, serving both residential and commercial clients.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We understand that excavation is the first step in any major project. If the digging isn't precise, the foundation won't hold. That is why we treat every site—whether it's a backyard pool or a commercial lot—with the same level of precision and respect.
          </p>
        </div>
        <div className="h-64 w-full bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600">
          <span className="text-gray-500 dark:text-gray-400 font-medium">[Insert Team/Equipment Photo Here]</span>
        </div>
      </div>

      {/* CORE VALUES */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-miller-yellow">
            <ShieldCheck size={40} className="text-miller-yellow mb-4" />
            <h3 className="text-xl font-bold mb-2">Safety First</h3>
            <p className="text-gray-600 dark:text-gray-300">We adhere to strict safety protocols to protect our crew, your property, and the public. We don't cut corners on safety.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-miller-yellow">
            <HardHat size={40} className="text-miller-yellow mb-4" />
            <h3 className="text-xl font-bold mb-2">Experienced Crew</h3>
            <p className="text-gray-600 dark:text-gray-300">Our operators are licensed, insured, and highly trained to handle complex terrain and heavy machinery with precision.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-miller-yellow">
            <Clock size={40} className="text-miller-yellow mb-4" />
            <h3 className="text-xl font-bold mb-2">On Time, On Budget</h3>
            <p className="text-gray-600 dark:text-gray-300">Construction delays are costly. We pride ourselves on reliable scheduling and transparent communication.</p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-miller-yellow text-black p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to break ground?</h2>
        <p className="mb-6 font-medium">Let's discuss your project requirements.</p>
        <a href="/services" className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors inline-block">View Our Services</a>
      </div>
    </div>
  );
}