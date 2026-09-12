'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import WhatsAppButton from '@/components/WhatsAppButton';

function ListingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialVertical = searchParams.get('vertical') || 'india';
  const initialPropertyType = searchParams.get('propertyType') || 'all';

  const [vertical, setVertical] = useState(initialVertical);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [propertyType, setPropertyType] = useState(initialPropertyType);
  const [bhk, setBhk] = useState('all');
  const [city, setCity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('vertical', vertical);
    if (propertyType !== 'all') params.set('propertyType', propertyType);
    if (bhk !== 'all') params.set('bhk', bhk);
    if (city.trim() !== '') params.set('city', city.trim());
    if (maxPrice) params.set('maxPrice', maxPrice);

    fetch(`/api/listings?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setListings(data.listings || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [vertical, propertyType, bhk, city, maxPrice]);

  const handleVerticalSwitch = (v: string) => {
    setVertical(v);
    router.push(`/listings?vertical=${v}`);
  };

  return (
    <div className="bg-[#F7F5EF] min-h-screen text-[#101A2C] relative overflow-hidden">
      <div className="bg-grid-pattern"></div>

      {/* Header Banner */}
      <section className="w-full py-16 px-6 md:px-12 border-b-4 border-[#101A2C] bg-[#F7F5EF] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 text-xs font-extrabold text-white border-2 border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C] ${vertical === 'global' ? 'bg-[#C99A3E]' : 'bg-[#3F7D4A]'}`}>
                {vertical === 'global' ? 'GLOBAL COLLECTION' : 'INDIA COLLECTION'}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-[#101A2C] tracking-tight">
              Explore Verified Properties
            </h1>
            <p className="font-accent text-xl mt-2 text-[#C99A3E]">
              {vertical === 'global' ? 'Exclusive worldwide luxury real estate' : "Jammu & Kashmir's premier residential & commercial properties"}
            </p>
          </div>

          {/* Vertical Toggle */}
          <div className="flex border-3 border-[#101A2C] bg-white p-1 shadow-[4px_4px_0px_0px_#101A2C]">
            <button
              onClick={() => handleVerticalSwitch('india')}
              className={`px-5 py-2 font-heading font-extrabold text-sm transition-all cursor-pointer ${
                vertical === 'india'
                  ? 'bg-[#3F7D4A] text-white border-2 border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C]'
                  : 'text-[#101A2C] hover:bg-gray-100'
              }`}
            >
              India
            </button>
            <button
              onClick={() => handleVerticalSwitch('global')}
              className={`px-5 py-2 font-heading font-extrabold text-sm transition-all cursor-pointer ${
                vertical === 'global'
                  ? 'bg-[#C99A3E] text-[#101A2C] border-2 border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C]'
                  : 'text-[#101A2C] hover:bg-gray-100'
              }`}
            >
              Global
            </button>
          </div>
        </div>
      </section>

      {/* Main Content & Filters */}
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">

        {/* Filter Sidebar */}
        <div className="lg:col-span-1 bg-white border-3 border-[#101A2C] p-6 shadow-[6px_6px_0px_0px_#101A2C] h-fit sticky top-24">
          <h2 className="font-heading text-2xl font-extrabold mb-6 pb-3 border-b-3 border-[#101A2C] flex items-center justify-between">
            <span>Filters</span>
            <button
              onClick={() => {
                setPropertyType('all');
                setBhk('all');
                setCity('');
                setMaxPrice('');
              }}
              className="text-xs font-bold underline text-gray-500 hover:text-[#101A2C]"
            >
              Reset
            </button>
          </h2>

          <div className="space-y-6">
            {/* City Search */}
            <div>
              <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                Search City / Location
              </label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="e.g. Jammu, Dubai, Bali"
                className="w-full text-sm font-semibold"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                Property Category
              </label>
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
                className="w-full text-sm font-semibold"
              >
                <option value="all">All Categories</option>
                {vertical === 'india' ? (
                  <>
                    <option value="plot">Plots / Land</option>
                    <option value="houses">Houses & Villas</option>
                    <option value="commercial">Commercial Properties</option>
                  </>
                ) : (
                  <>
                    <option value="residential">Residential Properties</option>
                    <option value="commercial">Commercial & Investment</option>
                  </>
                )}
              </select>
            </div>

            {/* BHK */}
            <div>
              <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                Configuration (BHK)
              </label>
              <select
                value={bhk}
                onChange={e => setBhk(e.target.value)}
                className="w-full text-sm font-semibold"
              >
                <option value="all">Any BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <label className="block font-heading text-sm font-extrabold mb-2 text-[#101A2C]">
                Max Budget ({vertical === 'global' ? '$ USD' : '₹ INR'})
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                placeholder={vertical === 'global' ? 'e.g. 2000000' : 'e.g. 50000000'}
                className="w-full text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-24 bg-white border-3 border-[#101A2C] shadow-[6px_6px_0px_0px_#101A2C]">
              <div className="inline-block p-4 border-3 border-[#101A2C] bg-[#F7F5EF] shadow-[4px_4px_0px_0px_#101A2C] font-bold">
                Loading properties...
              </div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-24 bg-white border-3 border-[#101A2C] shadow-[6px_6px_0px_0px_#101A2C] p-8">
              <h3 className="font-heading text-2xl font-bold mb-2">No properties found</h3>
              <p className="text-gray-600 font-medium mb-6">Try adjusting your filters to find available listings.</p>
              <button
                onClick={() => {
                  setPropertyType('all');
                  setBhk('all');
                  setCity('');
                  setMaxPrice('');
                }}
                className="px-6 py-3 bg-[#00D2D3] text-[#101A2C] font-heading font-extrabold border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((l: any) => (
                <a key={l.id} href={`/listings/${l.id}`} className="group">
                  <div className="bg-white border-3 border-[#101A2C] shadow-[6px_6px_0px_0px_#101A2C] overflow-hidden group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all flex flex-col h-full">
                    <div className="w-full h-48 bg-gray-200 relative border-b-3 border-[#101A2C]">
                      {l.images && l.images[0] ? (
                        <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">
                          No image
                        </div>
                      )}
                      <div className={`absolute top-3 right-3 px-3 py-1 text-white border-2 border-[#101A2C] text-xs font-extrabold shadow-[2px_2px_0px_0px_#101A2C] ${vertical === 'global' ? 'bg-[#C99A3E]' : 'bg-[#3F7D4A]'}`}>
                        {l.propertyType.toUpperCase()}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-heading text-lg font-bold mb-2 line-clamp-2 text-[#101A2C]">
                          {l.title}
                        </h3>
                        <p className="text-sm font-semibold text-gray-600 mb-4">
                          {l.city}, {l.state}
                        </p>
                      </div>
                      <div className="pt-4 border-t-2 border-[#101A2C] flex items-center justify-between">
                        <span className={`font-heading text-xl font-extrabold ${vertical === 'global' ? 'text-[#C99A3E]' : 'text-[#3F7D4A]'}`}>
                          {vertical === 'global' ? `$${(l.price / 1000000).toFixed(1)}M` : `₹${(l.price / 10000000).toFixed(1)}Cr`}
                        </span>
                        {l.bhk && (
                          <span className="text-xs font-extrabold bg-gray-100 border-2 border-[#101A2C] px-2.5 py-1">
                            {l.bhk} BHK
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center font-bold text-xl">
        Loading listings...
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
