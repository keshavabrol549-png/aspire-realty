'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.location.href = '/admin/dashboard';
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 border-2 border-india-primary shadow-sticker w-full max-w-md">
        <h1 className="font-heading text-3xl mb-6 text-center text-india-primary">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border-2 border-gray-300"
              placeholder="admin@aspirerealty.com"
            />
          </div>
          <div>
            <label className="block mb-2 font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border-2 border-gray-300"
              placeholder="admin123"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full font-sans font-bold px-6 py-3 border-2 bg-india-primary text-white border-india-primary shadow-sticker hover:shadow-md cursor-pointer transition-all"
          >
            {status === 'submitting' ? 'Logging in...' : 'Log In'}
          </button>
          {status === 'error' && <p className="text-red-600 text-sm">Invalid credentials</p>}
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Demo: admin@aspirerealty.com / admin123
        </p>
      </div>
    </div>
  );
}
