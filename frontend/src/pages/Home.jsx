import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="bg-miller-yellow text-black p-10 rounded-xl text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Miller Excavation</h1>
        <p className="text-xl mb-6">Reliable Digging. Solid Foundations. Expert Service.</p>
        <Link to="/services" className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:opacity-80">
          Get a Quote
        </Link>
      </div>
      
      {/* Mobile Priority Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Residential</h2>
          <p>Pools, driveways, and landscaping prep.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Commercial</h2>
          <p>Site clearing, grading, and utility trenching.</p>
        </div>
      </div>
    </div>
  );
}