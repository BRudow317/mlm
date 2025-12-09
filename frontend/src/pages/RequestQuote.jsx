import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RequestQuote = () => {
  const query = useQuery();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    details: '',
    type: ''
  });

  useEffect(() => {
    const type = query.get('type') || '';
    setForm((f) => ({
      ...f,
      type,
      details: type ? `Project type: ${type}\nPlease provide additional details here...` : f.details,
    }));
  }, [query]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate submission (API/email). For now log.
    console.log('Quote request submitted', form);
    alert('Quote request submitted. We will contact you shortly.');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Request a Quote</h1>
      {form.type && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          Selected service: <span className="font-semibold">{form.type}</span>
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={onChange} className="w-full p-2 border rounded bg-white dark:bg-gray-800" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} className="w-full p-2 border rounded bg-white dark:bg-gray-800" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
          <input id="address" name="address" type="text" value={form.address} onChange={onChange} className="w-full p-2 border rounded bg-white dark:bg-gray-800" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} className="w-full p-2 border rounded bg-white dark:bg-gray-800" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="details">Project Details</label>
          <textarea id="details" name="details" rows={6} value={form.details} onChange={onChange} className="w-full p-2 border rounded bg-white dark:bg-gray-800" required />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-miller-yellow text-black font-semibold rounded hover:opacity-90">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RequestQuote;
