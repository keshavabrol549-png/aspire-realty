'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function SellPropertyContent() {
  const searchParams = useSearchParams();
  const vParam = searchParams.get('v') as string;
  const vertical = vParam === 'global' ? 'global' : 'india';
  const isGlobal = vertical === 'global';

  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    propertyType: 'apartment',
    price: '',
    currency: 'INR',
    bhk: '',
    areaSqFt: '',
    description: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          vertical,
          price: Number(formData.price),
          areaSqFt: Number(formData.areaSqFt),
          bhk: formData.bhk ? Number(formData.bhk) : null,
          images: [],
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', state: '', city: '', propertyType: 'apartment', price: '', currency: 'INR', bhk: '', areaSqFt: '', description: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-24 px-6 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-accentGreen border-3 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center mx-auto mb-4 font-bold text-3xl">
            ✓
          </div>
        </div>
        <h1 className="font-heading text-4xl font-extrabold mb-4">Submission Received</h1>
        <p className="font-sans font-medium text-lg mb-8 leading-relaxed">
          Thank you! Our property evaluation team has received your submission and will contact you within 24 hours.
        </p>
        <a href={isGlobal ? '/global' : '/'}>
          <button className="px-8 py-4 bg-black text-white font-heading font-bold border-3 border-black shadow-[4px_4px_0px_0px_#d92b2b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#d92b2b] transition-all">
            Return to Homepage
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="mb-10 bg-yellow-300 border-4 border-black p-8 shadow-[6px_6px_0px_0px_#000]">
        <h1 className="font-heading text-4xl font-extrabold mb-2">
          List Your Property ({isGlobal ? 'Global' : 'India'})
        </h1>
        <p className="font-medium text-lg">
          Provide your property information below to get connected with verified buyers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border-3 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_#000]">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-extrabold border-b-2 border-black pb-2">Your Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-heading font-bold text-sm mb-2">Full Name *</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-heading font-bold text-sm mb-2">Phone Number *</label>
              <input
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-heading font-bold text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4 pt-4 border-t-3 border-black">
          <h3 className="font-heading text-xl font-extrabold border-b-2 border-black pb-2">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-heading font-bold text-sm mb-2">State / Region *</label>
              <input
                required
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Jammu & Kashmir"
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-heading font-bold text-sm mb-2">City / District *</label>
              <input
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Jammu"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Property Specs */}
        <div className="space-y-4 pt-4 border-t-3 border-black">
          <h3 className="font-heading text-xl font-extrabold border-b-2 border-black pb-2">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-heading font-bold text-sm mb-2">Property Type *</label>
              <select
                required
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full"
              >
                <option value="apartment">Apartment</option>
                <option value="villa">Villa / House</option>
                <option value="penthouse">Penthouse</option>
                <option value="commercial">Commercial Space</option>
                <option value="plot">Plot / Land</option>
              </select>
            </div>

            <div>
              <label className="block font-heading font-bold text-sm mb-2">Currency *</label>
              <select
                required
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full"
              >
                <option value="INR">₹ INR (Indian Rupee)</option>
                <option value="USD">$ USD (US Dollar)</option>
                <option value="AED">AED (UAE Dirham)</option>
                <option value="EUR">€ EUR (Euro)</option>
                <option value="GBP">£ GBP (British Pound)</option>
                <option value="THB">฿ THB (Thai Baht)</option>
                <option value="IDR">Rp IDR (Indonesian Rupiah)</option>
              </select>
            </div>

            <div>
              <label className="block font-heading font-bold text-sm mb-2">Asking Price *</label>
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-heading font-bold text-sm mb-2">Area (Sq Ft) *</label>
              <input
                required
                type="number"
                name="areaSqFt"
                value={formData.areaSqFt}
                onChange={handleChange}
                placeholder="0"
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-heading font-bold text-sm mb-2">BHK / Bedrooms</label>
              <input
                type="number"
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 pt-4 border-t-3 border-black">
          <h3 className="font-heading text-xl font-extrabold border-b-2 border-black pb-2">Description</h3>
          <div>
            <textarea
              required
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property, amenities, condition, facing, etc."
              className="w-full"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-8 py-4 bg-accentRed text-white font-heading font-bold border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer disabled:opacity-50"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Listing →'}
          </button>
          <a href={isGlobal ? '/global' : '/'}>
            <button type="button" className="px-8 py-4 bg-white text-black font-heading font-bold border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-gray-100 transition-all">
              Cancel
            </button>
          </a>
        </div>

        {status === 'error' && (
          <div className="p-4 bg-accentRed text-white border-3 border-black font-bold">
            Failed to submit form. Please check your network and try again.
          </div>
        )}
      </form>
    </div>
  );
}

export default function SellProperty() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto py-24 px-6 text-center font-bold">Loading form...</div>}>
      <SellPropertyContent />
    </Suspense>
  );
}
