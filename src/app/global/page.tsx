'use client';

import { useEffect, useState } from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';
import ReelCarousel from '@/components/ReelCarousel';
import { Globe, Building2, Scale, Instagram, ExternalLink } from 'lucide-react';

export default function GlobalHome() {
  const [listings, setListings] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState<string | null>('1');

  const fetchFilteredListings = (type: string) => {
    setLoading(true);
    fetch(`/api/listings?vertical=global&limit=8${type !== 'all' ? `&propertyType=${type}` : ''}`)
      .then(res => res.json())
      .then(data => {
        setListings(data.listings || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFilteredListings('all');
    fetch('/api/reels?vertical=global')
      .then(res => res.json())
      .then(data => setReels(data.reels || []))
      .catch(err => console.error(err));
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    fetchFilteredListings(filter);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => (prev === id ? null : id));
  };

  const faqs = [
    {
      id: '1',
      question: 'Which international locations do you cover?',
      answer: 'We feature prime luxury villas, commercial spaces, and beachfront estates in Dubai, Bali, Thailand, Maldives, London, and select European markets.',
    },
    {
      id: '2',
      question: 'How do cross-border property transactions work?',
      answer: 'Our international legal desks coordinate escrow accounts, residency-by-investment visas, foreign ownership laws, and multi-currency transfers smoothly.',
    },
    {
      id: '3',
      question: 'Can non-residents purchase property through Aspire Global?',
      answer: 'Yes. Most featured destinations (e.g. Dubai freehold zones, Bali leaseholds, Thailand luxury condos) offer full non-resident buying rights. We assist with legal qualification.',
    },
    {
      id: '4',
      question: 'How do I list my international property with Aspire Realty?',
      answer: 'Click "List Global Property", submit your asset details and location. Our global advisory desk performs market valuation and introduces qualified international investors.',
    },
    {
      id: '5',
      question: 'What currencies are accepted for international listings?',
      answer: 'We support transactions in USD, EUR, GBP, AED, THB, IDR, and INR with real-time currency conversion advisory.',
    },
  ];

  return (
    <div className="bg-[#F7F5EF] min-h-screen text-[#101A2C]">
      {/* Hero Section */}
      <section className="w-full py-32 px-6 md:px-12 flex items-center justify-center text-center bg-[#F7F5EF] border-b-4 border-[#101A2C] relative overflow-hidden">
        {/* Decorative Grid & Elements */}
        <div className="bg-grid-pattern"></div>
        <div className="decorative-star -top-10 -left-10 rotate-12">✦</div>
        <div className="decorative-star top-20 -right-8 rotate-[-15deg]">✧</div>

        <div className="max-w-4xl relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center justify-center px-8 py-3 bg-[#101A2C] text-white border-3 border-[#101A2C] shadow-[6px_6px_0px_0px_#C99A3E] transform rotate-[1deg]">
              <span className="font-heading text-lg md:text-xl font-extrabold text-white">★ Worldwide Prime Investment Opportunities</span>
            </div>
          </div>
          <div className="mb-8">
            <span className="font-heading font-extrabold text-xs md:text-sm tracking-[0.2em] uppercase bg-[#00D2D3] text-[#101A2C] px-5 py-2 border-3 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C]">
              Building Trust. Creating Dreams.
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl mb-6 font-extrabold tracking-tight text-[#101A2C]">
            Global Luxury Properties
          </h1>
          <p className="font-sans text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto border-2 border-[#101A2C] p-4 bg-white shadow-[4px_4px_0px_0px_#101A2C]">
            Exceptional properties in Dubai, Bali, Thailand, Maldives & prime destinations worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/listings?vertical=global">
              <button className="px-8 py-4 bg-[#C99A3E] text-white font-heading font-bold border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all text-lg cursor-pointer">
                Explore Global Listings
              </button>
            </a>
            <a href="/sell-property?v=global">
              <button className="px-8 py-4 bg-[#00D2D3] text-[#101A2C] font-heading font-bold border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all text-lg cursor-pointer">
                Sell Property Globally
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="bg-dot-pattern absolute inset-0 opacity-[0.04]"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="bg-white border-3 border-[#101A2C] p-8 shadow-[6px_6px_0px_0px_#101A2C] transform hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 bg-[#C99A3E] border-3 border-[#101A2C] flex items-center justify-center font-bold mb-6 text-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C]">
              <Globe className="w-7 h-7 text-[#101A2C]" strokeWidth={2.5} />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-[#101A2C]">Global Reach</h3>
            <p className="font-sans font-medium text-gray-700">
              Access premium properties across Dubai, Bali, Thailand, Maldives, and top investment hubs.
            </p>
          </div>
          <div className="bg-white border-3 border-[#101A2C] p-8 shadow-[6px_6px_0px_0px_#101A2C] transform hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 bg-[#006B70] border-3 border-[#101A2C] flex items-center justify-center font-bold mb-6 text-white shadow-[3px_3px_0px_0px_#101A2C]">
              <Building2 className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-[#101A2C]">Curated Luxury</h3>
            <p className="font-sans font-medium text-gray-700">
              Rigorous quality standards to ensure exceptional architectural and lifestyle standards.
            </p>
          </div>
          <div className="bg-white border-3 border-[#101A2C] p-8 shadow-[6px_6px_0px_0px_#101A2C] transform hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 bg-[#D9B15A] border-3 border-[#101A2C] flex items-center justify-center font-bold mb-6 text-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C]">
              <Scale className="w-7 h-7 text-[#101A2C]" strokeWidth={2.5} />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-[#101A2C]">Cross-Border Legal</h3>
            <p className="font-sans font-medium text-gray-700">
              Complete international legal and escrow coordination for smooth overseas acquisitions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Global Listings */}
      <section className="max-w-7xl mx-auto py-24 px-6 md:px-12 border-t-4 border-[#101A2C] relative">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-3 text-[#101A2C]">
              Featured Global Listings
            </h2>
            <p className="font-accent text-2xl text-[#C99A3E]">Exclusive worldwide properties</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-3 border-[#101A2C] bg-white p-2 shadow-[4px_4px_0px_0px_#101A2C]">
            {[
              { id: 'all', label: 'All' },
              { id: 'residential', label: 'Residential Properties' },
              { id: 'commercial', label: 'Commercial & Investment' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-4 py-2 font-heading font-extrabold text-sm transition-all cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-[#C99A3E] text-[#101A2C] border-2 border-[#101A2C] shadow-[2px_2px_0px_0px_#101A2C]'
                    : 'text-[#101A2C] hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <a href={`/listings?vertical=global${activeFilter !== 'all' ? `&propertyType=${activeFilter}` : ''}`} className="hidden md:inline-block px-6 py-3 bg-[#00D2D3] text-[#101A2C] font-heading font-extrabold border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all">
            View All →
          </a>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="inline-block p-4 border-3 border-[#101A2C] bg-[#F7F5EF] shadow-[4px_4px_0px_0px_#101A2C] font-bold">
              Loading luxury properties...
            </div>
          </div>
        ) : listings.length === 0 ? (
          <p className="text-center font-bold py-24 text-lg">No global listings available at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {listings.slice(0, 8).map((l: any) => (
              <a key={l.id} href={`/listings/${l.id}`} className="group">
                <div className="bg-white border-3 border-[#101A2C] shadow-[6px_6px_0px_0px_#101A2C] overflow-hidden group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all">
                  <div className="w-full h-48 bg-gray-200 relative border-b-3 border-[#101A2C]">
                    {l.images && l.images[0] ? (
                      <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">
                        No image
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#C99A3E] text-white border-2 border-[#101A2C] text-xs font-extrabold shadow-[2px_2px_0px_0px_#101A2C]">
                      {l.propertyType.toUpperCase()}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold mb-2 line-clamp-2 text-[#101A2C]">
                      {l.title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-600 mb-4">
                      {l.city}, {l.state}
                    </p>
                    <div className="pt-4 border-t-2 border-[#101A2C] flex items-center justify-between">
                      <span className="font-heading text-xl font-extrabold text-[#C99A3E]">
                        ${(l.price / 1000000).toFixed(1)}M
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
      </section>

      {/* Global Instagram Reels & Showcase */}
      <section className="max-w-7xl mx-auto py-20 px-6 md:px-12 border-t-4 border-[#101A2C] relative">
        <div className="bg-white border-4 border-[#101A2C] p-8 md:p-12 shadow-[8px_8px_0px_0px_#101A2C] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E1306C] text-white border-2 border-[#101A2C] text-xs font-extrabold mb-3 shadow-[2px_2px_0px_0px_#101A2C]">
                <Instagram className="w-3.5 h-3.5" />
                <span>GLOBAL LUXURY INSTAGRAM</span>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[#101A2C] tracking-tight">
                Worldwide Luxury Video Tours & Reels
              </h2>
              <p className="font-sans font-semibold text-gray-700 mt-2 text-base md:text-lg">
                Follow <span className="text-[#E1306C] font-extrabold">@aspirerealtyglobal</span> for beachfront villa tours, Dubai penthouses, Bali retreats, and international property insights.
              </p>
            </div>

            <a
              href="https://www.instagram.com/aspirerealtyglobal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#E1306C] text-white font-heading font-extrabold text-base border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all flex-shrink-0"
            >
              <Instagram className="w-5 h-5" />
              <span>Visit @aspirerealtyglobal</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Reel Carousel */}
          {reels.length > 0 ? (
            <ReelCarousel reels={reels} />
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-[#101A2C] font-bold text-gray-500">
              Loading Reels...
            </div>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="max-w-7xl mx-auto py-24 px-6 md:px-12 border-t-4 border-[#101A2C] relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-1 bg-[#C99A3E] text-[#101A2C] border-2 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C] mb-3">
              <span className="font-accent text-lg font-bold">Frequently Asked Questions</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-[#101A2C]">
              Global Property FAQs
            </h2>
          </div>

          <div className="space-y-5">
            {faqs.map(faq => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border-3 border-[#101A2C] bg-white shadow-[5px_5px_0px_0px_#101A2C] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 md:p-6 flex items-center justify-between hover:bg-[#F7F5EF] transition-colors text-left font-heading font-extrabold text-base md:text-lg text-[#101A2C] cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span
                      className={`w-8 h-8 flex items-center justify-center border-2 border-[#101A2C] font-bold text-base shadow-[2px_2px_0px_0px_#101A2C] transition-colors flex-shrink-0 ${
                        isOpen ? 'bg-[#00D2D3] text-[#101A2C]' : 'bg-[#C99A3E] text-[#101A2C]'
                      }`}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-5 md:p-6 border-t-3 border-[#101A2C] bg-[#F7F5EF] font-sans font-medium text-gray-800 text-base leading-relaxed">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto py-24 px-6 md:px-12 border-t-4 border-[#101A2C]">
        <div className="bg-[#C99A3E] text-[#101A2C] border-4 border-[#101A2C] p-10 md:p-16 shadow-[8px_8px_0px_0px_#101A2C]">
          <div className="max-w-3xl">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 text-[#101A2C]">
              List Your Luxury Property Globally
            </h2>
            <p className="font-sans text-lg md:text-xl font-semibold mb-8 text-[#101A2C]">
              Connect with high-net-worth investors across Dubai, Europe, and Asia.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="/sell-property?v=global" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#00D2D3] text-[#101A2C] font-heading font-bold border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all text-lg cursor-pointer">
                  List Global Asset
                </button>
              </a>
              <WhatsAppButton
                text="WhatsApp Global Agent"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
