'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  state: string;
  vertical: string;
  propertyType: string;
  bhk: number | null;
  areaSqFt: number;
  images: string[];
  status: string;
}

const CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'INR (₹ - Indian Rupee)' },
  { code: 'USD', symbol: '$', label: 'USD ($ - US Dollar)' },
  { code: 'AED', symbol: 'AED', label: 'AED (د.إ - UAE Dirham)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€ - Euro)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£ - British Pound)' },
  { code: 'THB', symbol: '฿', label: 'THB (฿ - Thai Baht)' },
  { code: 'IDR', symbol: 'Rp', label: 'IDR (Rp - Indonesian Rupiah)' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'listings' | 'edit' | 'add'>('listings');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const [editForm, setEditForm] = useState<Partial<Listing>>({});
  const [filterVertical, setFilterVertical] = useState<'all' | 'india' | 'global'>('all');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await fetch('/api/listings?admin=true');
      const data = await res.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setListings(listings.filter(l => l.id !== id));
        alert('Listing deleted successfully');
      }
    } catch (error) {
      alert('Error deleting listing');
    }
  };

  const handleEditClick = (listing: Listing) => {
    setSelectedListing(listing);
    setEditForm({ ...listing, currency: listing.currency || (listing.vertical === 'global' ? 'USD' : 'INR') });
    setActiveTab('edit');
  };

  const handleSaveEdit = async () => {
    if (!selectedListing) return;
    try {
      const res = await fetch(`/api/listings/${selectedListing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        await fetchListings();
        setActiveTab('listings');
        alert('Listing updated successfully!');
      } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to update listing'}`);
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Error updating listing');
    }
  };

  const handleAddNew = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editForm,
          currency: editForm.currency || (editForm.vertical === 'global' ? 'USD' : 'INR'),
        }),
      });

      if (res.ok) {
        await fetchListings();
        setEditForm({});
        setActiveTab('listings');
        alert('Listing created successfully!');
      } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to create listing'}`);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Error creating listing');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  const formatPriceWithCurrency = (price: number, currencyCode?: string, vertical?: string) => {
    const code = currencyCode || (vertical === 'global' ? 'USD' : 'INR');
    const curr = CURRENCIES.find(c => c.code === code) || { symbol: code === 'global' ? '$' : '₹' };
    return `${curr.symbol} ${price.toLocaleString()}`;
  };

  const filteredListings = filterVertical === 'all'
    ? listings
    : listings.filter(l => l.vertical === filterVertical);

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#101A2C] relative overflow-hidden">
      <div className="bg-grid-pattern"></div>

      {/* Neubrutalist Header */}
      <header className="bg-[#C99A3E] text-[#101A2C] border-b-4 border-[#101A2C] py-6 px-6 md:px-12 sticky top-0 z-50 shadow-[0_4px_0_0_#101A2C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl font-extrabold bg-[#F7F5EF] text-[#101A2C] border-3 border-[#101A2C] px-3 py-1 shadow-[3px_3px_0px_0px_#C99A3E]">
              ASPIRE
            </span>
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-[#101A2C]">
              Admin Management Portal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="px-4 py-2 bg-[#00D2D3] text-[#101A2C] font-heading font-extrabold border-3 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm"
            >
              Live Site ↗
            </a>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-[#00D2D3] text-[#101A2C] font-heading font-extrabold border-3 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C] hover:bg-[#00b8b9] transition-all text-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto py-10 px-6 md:px-12 relative z-10">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-6 py-3 font-heading font-extrabold text-base border-3 border-[#101A2C] transition-all cursor-pointer ${
              activeTab === 'listings'
                ? 'bg-[#00D2D3] text-[#101A2C] border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C]'
                : 'bg-[#F7F5EF] text-[#101A2C] border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C] hover:bg-[#101A2C]/10'
            }`}
          >
            🏠 Properties ({filteredListings.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('add');
              setEditForm({
                title: '',
                description: '',
                price: 0,
                currency: 'INR',
                city: '',
                state: '',
                vertical: 'india',
                propertyType: 'apartment',
                bhk: null,
                areaSqFt: 0,
                images: [],
                status: 'active',
              });
            }}
            className={`px-6 py-3 font-heading font-extrabold text-base border-3 border-[#101A2C] transition-all cursor-pointer ${
              activeTab === 'add'
                ? 'bg-[#3F7D4A] text-white border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C]'
                : 'bg-[#F7F5EF] text-[#101A2C] border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C] hover:bg-[#101A2C]/10'
            }`}
          >
            + Add Property
          </button>
        </div>

        {/* Global Filter bar */}
        {activeTab === 'listings' && (
          <div className="mb-8 flex flex-wrap gap-3 items-center bg-white border-3 border-[#101A2C] p-4 shadow-[4px_4px_0px_0px_#101A2C]">
            <span className="font-heading font-extrabold text-sm uppercase mr-2">Filter Market:</span>
            <button
              onClick={() => setFilterVertical('all')}
              className={`px-4 py-1.5 font-heading text-sm font-bold border-2 border-[#101A2C] transition-all cursor-pointer ${
                filterVertical === 'all'
                  ? 'bg-[#101A2C] text-white border-[#101A2C] shadow-[2px_2px_0px_0px_#006B70]'
                  : 'bg-[#F7F5EF] text-[#101A2C] border-[#101A2C] hover:bg-[#101A2C]/10'
              }`}
            >
              All Regions
            </button>
            <button
              onClick={() => setFilterVertical('india')}
              className={`px-4 py-1.5 font-heading text-sm font-bold border-2 border-[#101A2C] transition-all cursor-pointer ${
                filterVertical === 'india'
                  ? 'bg-[#3F7D4A] text-white border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C]'
                  : 'bg-[#F7F5EF] text-[#101A2C] border-[#101A2C] hover:bg-[#101A2C]/10'
              }`}
            >
              India Market
            </button>
            <button
              onClick={() => setFilterVertical('global')}
              className={`px-4 py-1.5 font-heading text-sm font-bold border-2 border-[#101A2C] transition-all cursor-pointer ${
                filterVertical === 'global'
                  ? 'bg-[#C99A3E] text-[#101A2C] border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C]'
                  : 'bg-[#F7F5EF] text-[#101A2C] border-[#101A2C] hover:bg-[#101A2C]/10'
              }`}
            >
              Global Luxury
            </button>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            {loading ? (
              <div className="bg-white border-3 border-[#101A2C] p-12 text-center shadow-[6px_6px_0px_0px_#101A2C] font-bold">
                Loading property database...
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="bg-white border-3 border-[#101A2C] p-12 text-center shadow-[6px_6px_0px_0px_#101A2C]">
                <p className="font-heading text-2xl font-bold mb-2">No listings found in this collection.</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="mt-4 px-6 py-2 bg-[#3F7D4A] text-white font-bold border-2 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C]"
                >
                  Create One Now
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredListings.map(listing => (
                  <div
                    key={listing.id}
                    className="bg-white border-3 border-[#101A2C] p-6 shadow-[6px_6px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#101A2C] transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-0.5 text-xs font-extrabold border-2 border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C] ${
                            listing.vertical === 'global' ? 'bg-[#C99A3E] text-[#101A2C]' : 'bg-[#3F7D4A] text-white'
                          }`}>
                            {listing.vertical.toUpperCase()}
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#F7F5EF] text-[#101A2C] text-xs font-bold border-2 border-[#101A2C]">
                            {listing.propertyType.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl font-extrabold text-[#101A2C] line-clamp-1 mb-1">
                          {listing.title}
                        </h3>
                        <p className="text-sm font-semibold text-gray-600">
                          {listing.city}, {listing.state} {listing.bhk ? `• ${listing.bhk} BHK` : ''} • {listing.areaSqFt} sq ft
                        </p>
                      </div>

                      <div>
                        <span className="text-xs font-extrabold text-gray-500 uppercase block mb-1">List Price</span>
                        <div className="font-heading text-2xl font-extrabold text-[#006B70]">
                          {formatPriceWithCurrency(listing.price, listing.currency, listing.vertical)}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(listing)}
                          className="flex-1 px-4 py-2.5 bg-[#00D2D3] text-[#101A2C] font-heading font-extrabold text-sm border-2 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="px-4 py-2.5 bg-red-600 text-white font-heading font-extrabold text-sm border-2 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Edit/Add Listing Form */}
        {(activeTab === 'edit' || activeTab === 'add') && (
          <div className="bg-white border-4 border-[#101A2C] p-8 md:p-12 shadow-[8px_8px_0px_0px_#101A2C]">
            <div className="flex justify-between items-center mb-8 pb-4 border-b-3 border-[#101A2C]">
              <div>
                <span className="text-xs font-extrabold uppercase px-3 py-1 bg-[#101A2C] text-white border-2 border-[#101A2C]">
                  {activeTab === 'edit' ? 'MODIFY RECORD' : 'CREATE RECORD'}
                </span>
                <h2 className="font-heading text-3xl font-extrabold text-[#101A2C] mt-2">
                  {activeTab === 'edit' ? 'Edit Property Listing' : 'Add New Property Listing'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('listings')}
                className="px-4 py-2 bg-gray-200 font-bold border-2 border-[#101A2C] text-sm hover:bg-gray-300 cursor-pointer"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={activeTab === 'add' ? handleAddNew : (e) => { e.preventDefault(); handleSaveEdit(); }} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="e.g. Ultra-Luxury Villa on Palm Jumeirah"
                    className="w-full text-base font-semibold"
                    required
                  />
                </div>

                {/* Vertical */}
                <div>
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    Market Division *
                  </label>
                  <select
                    value={editForm.vertical || 'india'}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEditForm({
                        ...editForm,
                        vertical: v,
                        currency: v === 'global' ? 'USD' : 'INR'
                      });
                    }}
                    className="w-full text-base font-semibold"
                    required
                  >
                    <option value="india">India Market</option>
                    <option value="global">Global Luxury Market</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    Price Amount *
                  </label>
                  <input
                    type="number"
                    value={editForm.price || ''}
                    onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                    placeholder="e.g. 2500000"
                    className="w-full text-base font-semibold"
                    required
                  />
                </div>

                {/* Multiple Currency Support */}
                <div>
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    Currency Code *
                  </label>
                  <select
                    value={editForm.currency || (editForm.vertical === 'global' ? 'USD' : 'INR')}
                    onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })}
                    className="w-full text-base font-semibold bg-[#F7F5EF]"
                    required
                  >
                    {CURRENCIES.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    Property Type *
                  </label>
                  <select
                    value={editForm.propertyType || 'apartment'}
                    onChange={(e) => setEditForm({ ...editForm, propertyType: e.target.value })}
                    className="w-full text-base font-semibold"
                    required
                  >
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="house">Independent House</option>
                    <option value="commercial">Commercial Space</option>
                    <option value="plot">Plot / Land</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    value={editForm.city || ''}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    placeholder="e.g. Dubai, Jammu, Bali"
                    className="w-full text-base font-semibold"
                    required
                  />
                </div>

                {/* State / Country */}
                <div>
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    State / Country *
                  </label>
                  <input
                    type="text"
                    value={editForm.state || ''}
                    onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                    placeholder="e.g. UAE, J&K, Indonesia"
                    className="w-full text-base font-semibold"
                    required
                  />
                </div>

                {/* BHK */}
                <div>
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    BHK Config (Optional)
                  </label>
                  <input
                    type="number"
                    value={editForm.bhk ?? ''}
                    onChange={(e) => setEditForm({ ...editForm, bhk: e.target.value ? Number(e.target.value) : null })}
                    placeholder="e.g. 3"
                    className="w-full text-base font-semibold"
                  />
                </div>

                {/* Area Sq Ft */}
                <div>
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    Area (Sq Ft) *
                  </label>
                  <input
                    type="number"
                    value={editForm.areaSqFt || ''}
                    onChange={(e) => setEditForm({ ...editForm, areaSqFt: Number(e.target.value) })}
                    placeholder="e.g. 2400"
                    className="w-full text-base font-semibold"
                    required
                  />
                </div>

                {/* Images (Comma Separated URLs) */}
                <div className="md:col-span-3">
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    Image URLs (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(editForm.images) ? editForm.images.join(', ') : (editForm.images || '')}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      images: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    placeholder="https://images.unsplash.com/..., https://images.unsplash.com/..."
                    className="w-full text-base font-semibold"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-3">
                  <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                    Description & Key Highlights *
                  </label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={5}
                    placeholder="Enter comprehensive property specifications..."
                    className="w-full text-base font-semibold"
                    required
                  />
                </div>

              </div>

              {/* Form Action Buttons */}
              <div className="pt-6 border-t-3 border-[#101A2C] flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#00D2D3] text-[#101A2C] font-heading font-extrabold text-lg border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  {activeTab === 'edit' ? 'Save Changes' : 'Publish Property'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('listings')}
                  className="px-8 py-4 bg-[#F7F5EF] text-[#101A2C] font-heading font-extrabold text-lg border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

      </main>
    </div>
  );
}
