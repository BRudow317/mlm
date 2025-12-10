import { useEffect, useState } from 'react';

export default function AccountDetails() {
  const [account, setAccount] = useState({ name: 'Acme Construction', industry: 'Excavation', website: 'https://acme.example' });
  const [contact, setContact] = useState({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '555-123-4567', address: '123 Main St, City, ST' });
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const contactId = localStorage.getItem('contactId');
    if (!contactId) return;
    fetch(`/api/private/contact/email/${contactId}`)
      .then(r => r.json())
      .then(data => setEmails(data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Account</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Info</h2>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full p-2 border rounded" value={account.name} onChange={e=>setAccount({...account,name:e.target.value})} />
          <label className="block text-sm mt-3 mb-1">Industry</label>
          <input className="w-full p-2 border rounded" value={account.industry} onChange={e=>setAccount({...account,industry:e.target.value})} />
          <label className="block text-sm mt-3 mb-1">Website</label>
          <input className="w-full p-2 border rounded" value={account.website} onChange={e=>setAccount({...account,website:e.target.value})} />

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Emails</h2>
          <ul className="space-y-2">
            {emails.map((e, idx) => (
              <li key={idx} className="border rounded p-3">
                <div className="text-sm text-gray-600">From: {e.fromAddress} | To: {e.toAddress}</div>
                <div className="font-medium">{e.subject}</div>
              </li>
            ))}
          </ul>
        </div>

        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Primary Contact</h2>
          <label className="block text-sm mb-1">First Name</label>
          <input className="w-full p-2 border rounded" value={contact.firstName} onChange={e=>setContact({...contact,firstName:e.target.value})} />
          <label className="block text-sm mt-3 mb-1">Last Name</label>
          <input className="w-full p-2 border rounded" value={contact.lastName} onChange={e=>setContact({...contact,lastName:e.target.value})} />
          <label className="block text-sm mt-3 mb-1">Email</label>
          <input className="w-full p-2 border rounded" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} />
          <label className="block text-sm mt-3 mb-1">Phone</label>
          <input className="w-full p-2 border rounded" value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})} />
          <label className="block text-sm mt-3 mb-1">Address</label>
          <input className="w-full p-2 border rounded" value={contact.address} onChange={e=>setContact({...contact,address:e.target.value})} />
        </div>
      </div>
    </div>
  );
}
