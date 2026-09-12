'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MapPin, Building2, Maximize2, Bed, ShieldCheck, Share2, CheckCircle2, ArrowLeft, Coins, PhoneCall } from 'lucide-react';

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  AED: 'AED ',
  EUR: '€',
  GBP: '£',
  THB: '฿',
  IDR: 'Rp ',
};

export default function ListingDetail() {
  const params = useParams();
  const id = params.id as string;
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then(res => res.json())
      .then(data => {
        setListing(data.listing);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-6">
        <div className="bg-white border-3 border-[#101A2C] p-8 shadow-[6px_6px_0px_0px_#101A2C] font-heading font-extrabold text-xl text-[#101A2C]">
          Loading property details...
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex flex-col items-center justify-center p-6">
        <div className="bg-white border-3 border-[#101A2C] p-8 shadow-[6px_6px_0px_0px_#101A2C] text-center max-w-md">
          <h2 className="font-heading text-3xl font-extrabold mb-4 text-[#101A2C]">Property Not Found</h2>
          <p className="font-sans font-medium text-gray-600 mb-6">The listing you are looking for does not exist or has been removed.</p>
          <a
            href="/listings"
            className="inline-block px-6 py-3 bg-[#00D2D3] text-[#101A2C] font-heading font-extrabold border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C]"
          >
            ← Back to All Listings
          </a>
        </div>
      </div>
    );
  }

  const isGlobal = listing.vertical === 'global';
  const symbol = CURRENCY_SYMBOLS[listing.currency || (isGlobal ? 'USD' : 'INR')] || (isGlobal ? '$' : '₹');

  // Format price nicely
  const formattedPrice = listing.currency === 'INR' || (!listing.currency && !isGlobal)
    ? `${symbol}${(listing.price / 10000000).toFixed(2)} Cr`
    : listing.currency === 'USD' || (!listing.currency && isGlobal)
    ? `${symbol}${(listing.price / 1000000).toFixed(2)}M`
    : `${symbol}${listing.price.toLocaleString()}`;

  const whatsAppNumber = isGlobal ? '917006822051' : '917006822051';
  const whatsAppText = `Hi! I am interested in ${listing.title} in ${listing.city}, ${listing.state}. Price: ${formattedPrice}. Reference ID: ${listing.id}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const images = listing.images && listing.images.length > 0 ? listing.images : [];

  return (
    <div className="bg-[#F7F5EF] min-h-screen text-[#101A2C] relative overflow-hidden pb-24">
      <div className="bg-grid-pattern"></div>

      {/* Top Banner Navigation */}
      <div className="max-w-7xl mx-auto pt-8 px-6 md:px-12 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <a
            href={isGlobal ? '/global' : '/listings'}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#101A2C] font-heading font-extrabold text-sm border-3 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#101A2C] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {isGlobal ? 'Global Collection' : 'Listings'}
          </a>

          <div className="flex items-center gap-3">
            <span className={`px-4 py-1.5 font-heading text-xs font-extrabold text-white border-2 border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C] ${isGlobal ? 'bg-[#C99A3E]' : 'bg-[#3F7D4A]'}`}>
              {isGlobal ? 'GLOBAL LUXURY' : 'INDIA COLLECTION'}
            </span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#101A2C] font-heading font-bold text-xs border-2 border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? 'Copied Link!' : 'Share'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Image Gallery + Description */}
          <div className="lg:col-span-7 space-y-8">

            {/* Main Featured Image */}
            <div className="bg-white border-4 border-[#101A2C] shadow-[8px_8px_0px_0px_#101A2C] overflow-hidden relative">
              <div className="w-full h-[380px] md:h-[480px] bg-gray-200 relative border-b-3 border-[#101A2C]">
                {images.length > 0 ? (
                  <img
                    src={images[activeImageIndex] || images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center font-heading font-bold text-gray-400 bg-gray-100">
                    <Building2 className="w-16 h-16 mb-2 stroke-1" />
                    <span>No image uploaded</span>
                  </div>
                )}
                <div className={`absolute top-4 right-4 px-3 py-1 text-white border-2 border-[#101A2C] text-xs font-extrabold shadow-[2px_2px_0px_0px_#101A2C] uppercase ${isGlobal ? 'bg-[#C99A3E]' : 'bg-[#3F7D4A]'}`}>
                  {listing.propertyType}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 bg-white flex gap-3 overflow-x-auto border-t-2 border-[#101A2C]">
                  {images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 flex-shrink-0 border-2 border-[#101A2C] overflow-hidden cursor-pointer transition-all ${
                        activeImageIndex === idx
                          ? 'ring-3 ring-[#00D2D3] scale-105 shadow-[2px_2px_0px_0px_#101A2C]'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview & Description Card */}
            <div className="bg-white border-3 border-[#101A2C] p-8 shadow-[6px_6px_0px_0px_#101A2C]">
              <h2 className="font-heading text-2xl font-extrabold text-[#101A2C] mb-4 pb-3 border-b-3 border-[#101A2C] flex items-center gap-2">
                <span>About This Property</span>
              </h2>
              <p className="font-sans font-medium text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                {listing.description || 'No detailed description available for this property.'}
              </p>

              {/* Highlights & Features */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <h3 className="font-heading text-lg font-bold text-[#101A2C] mb-4">Property Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-gray-800 bg-[#F7F5EF] p-3 border-2 border-[#101A2C]">
                    <CheckCircle2 className="w-4 h-4 text-[#3F7D4A]" />
                    <span>Prime Location Access</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-sm text-gray-800 bg-[#F7F5EF] p-3 border-2 border-[#101A2C]">
                    <CheckCircle2 className="w-4 h-4 text-[#3F7D4A]" />
                    <span>Clear Legal Title Verified</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-sm text-gray-800 bg-[#F7F5EF] p-3 border-2 border-[#101A2C]">
                    <CheckCircle2 className="w-4 h-4 text-[#3F7D4A]" />
                    <span>Ready for Possession</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-sm text-gray-800 bg-[#F7F5EF] p-3 border-2 border-[#101A2C]">
                    <CheckCircle2 className="w-4 h-4 text-[#3F7D4A]" />
                    <span>ASPIRE Verified Listing</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Sticky Inquiry Sidebar */}
          <div className="lg:col-span-5 space-y-6">

            <div className="bg-white border-4 border-[#101A2C] p-8 shadow-[8px_8px_0px_0px_#101A2C] sticky top-24">

              {/* Badge & Title */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7F5EF] border-2 border-[#101A2C] text-xs font-bold mb-3 text-[#101A2C]">
                  <MapPin className="w-3.5 h-3.5 text-[#006B70]" />
                  <span>{listing.city}, {listing.state}</span>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-[#101A2C] leading-tight">
                  {listing.title}
                </h1>
              </div>

              {/* Price Banner */}
              <div className={`p-5 my-6 border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] ${isGlobal ? 'bg-[#C99A3E]/15' : 'bg-[#3F7D4A]/10'}`}>
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-600 block mb-1">
                  Asking Price ({listing.currency || (isGlobal ? 'USD' : 'INR')})
                </span>
                <div className={`font-heading text-4xl font-extrabold ${isGlobal ? 'text-[#C99A3E]' : 'text-[#3F7D4A]'}`}>
                  {formattedPrice}
                </div>
                <span className="text-xs font-semibold text-gray-500 mt-1 block">
                  Raw amount: {symbol} {listing.price.toLocaleString()}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#F7F5EF] border-2 border-[#101A2C]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1">
                    <Maximize2 className="w-4 h-4 text-[#101A2C]" />
                    <span>TOTAL AREA</span>
                  </div>
                  <div className="font-heading text-xl font-extrabold text-[#101A2C]">
                    {listing.areaSqFt ? listing.areaSqFt.toLocaleString() : 'N/A'} <span className="text-xs font-semibold">sq.ft</span>
                  </div>
                </div>

                {listing.bhk ? (
                  <div className="p-4 bg-[#F7F5EF] border-2 border-[#101A2C]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1">
                      <Bed className="w-4 h-4 text-[#101A2C]" />
                      <span>CONFIG</span>
                    </div>
                    <div className="font-heading text-xl font-extrabold text-[#101A2C]">
                      {listing.bhk} BHK
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#F7F5EF] border-2 border-[#101A2C]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1">
                      <Building2 className="w-4 h-4 text-[#101A2C]" />
                      <span>TYPE</span>
                    </div>
                    <div className="font-heading text-xl font-extrabold text-[#101A2C] capitalize">
                      {listing.propertyType}
                    </div>
                  </div>
                )}
              </div>

              {/* Verification Callout */}
              <div className="mb-8 p-4 bg-[#006B70]/10 border-2 border-[#101A2C] flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#006B70] flex-shrink-0" strokeWidth={2.5} />
                <div>
                  <h4 className="font-heading text-sm font-extrabold text-[#101A2C]">Verified by ASPIRE</h4>
                  <p className="text-xs font-medium text-gray-600">Documentation & ownership checked by our legal advisory team.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <WhatsAppButton
                  phoneNumber={whatsAppNumber}
                  message={whatsAppText}
                  text="Inquire via WhatsApp"
                  variant="primary"
                  className="w-full text-center py-4 bg-[#00D2D3] text-[#101A2C] hover:bg-[#00b8b9] text-base"
                />

                <a
                  href={`tel:+${whatsAppNumber}`}
                  className="block w-full text-center py-3.5 bg-white text-[#101A2C] font-heading font-extrabold text-sm border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <PhoneCall className="w-4 h-4" />
                    Call Direct (+{whatsAppNumber})
                  </span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
