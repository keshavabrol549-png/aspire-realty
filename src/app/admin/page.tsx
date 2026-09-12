'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
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
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5EF] p-4 relative overflow-hidden">
      <div className="bg-grid-pattern"></div>

      <div className="bg-white p-8 md:p-10 border-4 border-[#101A2C] shadow-[8px_8px_0px_0px_#101A2C] w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <span className="font-heading text-xl font-extrabold tracking-tight bg-[#C99A3E] text-[#101A2C] border-3 border-[#101A2C] px-3 py-1 shadow-[3px_3px_0px_0px_#101A2C]">
            ASPIRE REALTY
          </span>
          <h1 className="font-heading text-3xl font-extrabold mt-4 text-[#101A2C]">
            Admin Control Panel
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 font-heading font-extrabold text-sm text-[#101A2C]">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full text-base font-semibold border-3 border-[#101A2C] p-3 focus:outline-none focus:bg-[#F7F5EF]"
              placeholder="Enter username or email"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-heading font-extrabold text-sm text-[#101A2C]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full text-base font-semibold border-3 border-[#101A2C] p-3 focus:outline-none focus:bg-[#F7F5EF]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full font-heading font-extrabold text-lg px-6 py-3.5 border-3 bg-[#00D2D3] text-[#101A2C] border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {status === 'submitting' ? 'Authenticating...' : 'Sign In'}
          </button>

          {status === 'error' && (
            <div className="p-3 bg-red-100 border-2 border-red-500 text-red-700 text-sm font-bold text-center">
              Invalid credentials. Please check your username/email and password.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
