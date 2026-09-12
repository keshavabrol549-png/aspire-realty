'use client';

import WhatsAppButton from '@/components/WhatsAppButton';
import { ShieldCheck, Scale, Zap, Globe } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-[#F7F5EF] min-h-screen text-[#101A2C]">
      {/* Hero Section */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#F7F5EF] border-b-4 border-[#101A2C] relative overflow-hidden">
        <div className="bg-grid-pattern"></div>
        <div className="decorative-star -top-10 -left-10 rotate-12">✦</div>
        <div className="decorative-star top-20 -right-8 rotate-[-15deg]">✧</div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center justify-center px-6 py-2 bg-[#C99A3E] text-[#101A2C] border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] mb-6 rotate-[-1deg]">
            <span className="font-accent text-xl font-bold">★ Established Realty Platform</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-[#101A2C]">
            About Aspire Realty
          </h1>
          <p className="font-sans text-xl font-medium max-w-2xl border-2 border-[#101A2C] p-4 bg-white shadow-[4px_4px_0px_0px_#101A2C]">
            No jargon. No hidden fees. Transparent, high-impact real estate transactions across India and global luxury markets.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-5xl mx-auto py-20 px-6 md:px-12 relative">
        <div className="space-y-16">
          <div className="bg-white border-3 border-[#101A2C] p-8 md:p-12 shadow-[6px_6px_0px_0px_#101A2C]">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-6 border-b-3 border-[#101A2C] pb-4 text-[#101A2C]">
              Our Mission & Vision
            </h2>
            <div className="space-y-4 font-sans font-medium text-lg leading-relaxed text-gray-800">
              <p>
                Aspire Realty was created to eliminate opacity and friction from traditional real estate transactions. Starting in Jammu and expanding to international luxury hubs, we connect property sellers directly with qualified buyers through verified data and personalized advisory.
              </p>
              <p>
                Every listing on our platform undergoes rigorous title verification and valuation assessments before going live.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-8 text-[#101A2C]">
              Core Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border-3 border-[#101A2C] bg-white shadow-[6px_6px_0px_0px_#101A2C] transform hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-[#3F7D4A] text-white font-heading font-extrabold flex items-center justify-center border-2 border-[#101A2C] mb-4 shadow-[2px_2px_0px_0px_#101A2C]">
                  <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2 text-[#101A2C]">100% Verification</h3>
                <p className="font-sans font-medium text-gray-700">
                  Every property undergoes rigorous legal and on-ground title checks before being approved for public view.
                </p>
              </div>

              <div className="p-8 border-3 border-[#101A2C] bg-white shadow-[6px_6px_0px_0px_#101A2C] transform hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-[#C99A3E] text-[#101A2C] font-heading font-extrabold flex items-center justify-center border-2 border-[#101A2C] mb-4 shadow-[2px_2px_0px_0px_#101A2C]">
                  <Scale className="w-6 h-6 text-[#101A2C]" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2 text-[#101A2C]">Transparent Pricing</h3>
                <p className="font-sans font-medium text-gray-700">
                  No hidden brokerage surprises or obscure charges. All financial and advisory terms are upfront and clear.
                </p>
              </div>

              <div className="p-8 border-3 border-[#101A2C] bg-white shadow-[6px_6px_0px_0px_#101A2C] transform hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-[#00D2D3] text-[#101A2C] font-heading font-extrabold flex items-center justify-center border-2 border-[#101A2C] mb-4 shadow-[2px_2px_0px_0px_#101A2C]">
                  <Zap className="w-6 h-6 text-[#101A2C]" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2 text-[#101A2C]">Swift Closures</h3>
                <p className="font-sans font-medium text-gray-700">
                  Streamlined documentation and rapid communication expedite sales cycles and legal registrations.
                </p>
              </div>

              <div className="p-8 border-3 border-[#101A2C] bg-white shadow-[6px_6px_0px_0px_#101A2C] transform hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-[#006B70] text-white font-heading font-extrabold flex items-center justify-center border-2 border-[#101A2C] mb-4 shadow-[2px_2px_0px_0px_#101A2C]">
                  <Globe className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2 text-[#101A2C]">Global Network</h3>
                <p className="font-sans font-medium text-gray-700">
                  Direct access to high-net-worth investors across Dubai, Bali, Thailand, Maldives, and leading international hubs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Buy or Sell Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 md:px-12">
        <div className="bg-[#006B70] text-white border-4 border-[#101A2C] p-10 md:p-16 shadow-[8px_8px_0px_0px_#101A2C]">
          <div className="max-w-3xl">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Ready to Buy or Sell?
            </h2>
            <p className="font-sans text-lg md:text-xl font-semibold mb-8 text-[#F7F5EF]">
              Talk to an expert advisor directly or submit your property for a prompt valuation.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/sell-property">
                <button className="px-8 py-4 bg-[#00D2D3] text-[#101A2C] font-heading font-bold border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#101A2C] transition-all text-lg cursor-pointer">
                  Submit Property
                </button>
              </a>
              <WhatsAppButton
                text="WhatsApp Agent"
                variant="primary"
                size="lg"
                message="Hi! I want to speak with an Aspire Realty advisor."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
