import { useState } from 'react';

export default function Account() {
  const [form, setForm] = useState({ username: '', password: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate auth API
    alert(`Logging in as ${form.username}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account Login</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-sm">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
          <input id="username" name="username" type="text" value={form.username} onChange={onChange} className="w-full p-2 border rounded bg-white dark:bg-gray-800" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={onChange} className="w-full p-2 border rounded bg-white dark:bg-gray-800" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-miller-yellow text-black font-semibold rounded hover:opacity-90">Login</button>
      </form>
    </div>
  );
}
