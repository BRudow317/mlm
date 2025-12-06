import { useState } from 'react';
import { Phone, Mail, MapPin, AlertTriangle, ChevronDown, ChevronUp, Send } from 'lucide-react';

export default function Support() {
  // State for the Contact Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend or email service (like EmailJS)
    console.log('Form Submitted:', formData);
    alert('Thank you! We have received your message and will respond shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* --- HEADER --- */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-miller-yellow mb-4">Customer Support</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Have a question or facing an issue? We are here to help.
        </p>
      </div>

      {/* --- EMERGENCY BANNER --- */}
      <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-6 rounded-r-lg flex items-start gap-4">
        <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0" size={32} />
        <div>
          <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Emergency Excavation Services</h3>
          <p className="text-red-800 dark:text-red-200 text-sm mt-1">
            If you have an urgent issue (e.g., utility line break, storm damage blocking access), please do not use the form. Call our 24/7 Emergency Line immediately.
          </p>
          <a href="tel:555-0199" className="inline-block mt-3 font-bold text-red-700 dark:text-red-400 hover:underline">
            Call (555) 123-4567
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* --- LEFT COLUMN: CONTACT INFO & FAQ --- */}
        <div className="space-y-8">
          
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-100 dark:border-gray-700">
              <Phone className="text-miller-yellow mb-2" />
              <h3 className="font-bold">Phone</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">(555) 123-4567</p>
              <p className="text-xs text-gray-400">Mon-Fri, 7am - 5pm</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-100 dark:border-gray-700">
              <Mail className="text-miller-yellow mb-2" />
              <h3 className="font-bold">Email</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">support@millerexc.com</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-miller-yellow" />
                <h3 className="font-bold">Office Location</h3>
             </div>
             <p className="text-sm text-gray-500 dark:text-gray-400 ml-9">
               1234 Industrial Parkway<br/>
               Excavation City, ST 98765
             </p>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <FaqItem 
                question="Do you offer free estimates?" 
                answer="Yes! Navigate to our Services page and select the specific service you need to request a free quote." 
              />
              <FaqItem 
                question="What areas do you serve?" 
                answer="We currently serve the greater metro area and surrounding counties within a 50-mile radius." 
              />
              <FaqItem 
                question="Are you licensed and insured?" 
                answer="Absolutely. We carry full liability insurance and workers' compensation for all our projects." 
              />
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: CONTACT FORM --- */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-fit">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-miller-yellow focus:outline-none transition"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-miller-yellow focus:outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-miller-yellow focus:outline-none transition"
                  placeholder="(555) 555-5555"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">How can we help?</label>
              <textarea 
                name="message" 
                rows="4" 
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-miller-yellow focus:outline-none transition"
                placeholder="Describe your issue or question..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-miller-yellow text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition flex justify-center items-center gap-2"
            >
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENT: FAQ ITEM (Accordion) ---
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50 dark:hover:bg-gray-750 transition"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {/* Logic to show/hide answer */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-900/50">
          {answer}
        </div>
      )}
    </div>
  );
}