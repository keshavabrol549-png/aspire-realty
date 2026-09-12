'use client';

import { useState } from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>(['1']);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const faqs = [
    {
      id: '1',
      question: 'How do I browse and purchase a property?',
      answer: 'Browse our listings, select your preferred property, and click on it for detailed information. Express interest directly via WhatsApp to connect with our verified local or global agents who will arrange private viewings and guide you through the process.'
    },
    {
      id: '2',
      question: 'Can I sell my property through Aspire Realty?',
      answer: 'Yes! Click on "Sell Property" and fill out our streamlined submission form. Our team will review the details, conduct market valuation, verify documents, and publish your listing to active buyers.'
    },
    {
      id: '3',
      question: 'What documents do I need to list my property?',
      answer: 'You will need property title deeds, registry/mutation certificates, approved building plans (if applicable), tax records, and recent utility receipts. Our legal advisors assist with verifying all paperwork.'
    },
    {
      id: '4',
      question: 'How long does the buying or selling process typically take?',
      answer: 'Most transactions conclude within 30-45 days depending on documentation completeness, title verification, and mortgage financing approval.'
    },
    {
      id: '5',
      question: 'Do you handle international luxury properties?',
      answer: 'Yes! Our Global vertical specializes in prime luxury villas, penthouses, and investment plots in Dubai, Bali, Thailand, Maldives, and leading international destinations.'
    },
    {
      id: '6',
      question: 'Are there any hidden fees or surprise brokerage costs?',
      answer: 'None. We operate with 100% pricing transparency. All advisory, brokerage, and legal coordination terms are established and agreed upon upfront.'
    },
  ];

  return (
    <div className="bg-[#F7F5EF] min-h-screen text-[#101A2C]">
      {/* Hero */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#F7F5EF] border-b-4 border-[#101A2C] relative overflow-hidden">
        <div className="bg-grid-pattern"></div>
        <div className="decorative-star -top-10 -left-10 rotate-12">✦</div>
        <div className="decorative-star top-20 -right-8 rotate-[-15deg]">✧</div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center px-6 py-2 bg-[#D99A2B] text-[#101A2C] border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] mb-6 rotate-[-1deg]">
            <span className="font-accent text-xl font-bold">Answers & Direct Support</span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-[#101A2C]">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-xl font-medium max-w-2xl mx-auto border-2 border-[#101A2C] p-4 bg-white shadow-[4px_4px_0px_0px_#101A2C]">
            Everything you need to know about buying, selling, and investing with Aspire Realty.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="max-w-4xl mx-auto py-20 px-6 md:px-12">
        <div className="space-y-6">
          {faqs.map(faq => {
            const isOpen = openItems.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="border-3 border-[#101A2C] bg-white shadow-[6px_6px_0px_0px_#101A2C] overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-[#F7F5EF] transition-colors text-left font-heading font-extrabold text-lg md:text-xl text-[#101A2C] cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <span className={`w-9 h-9 flex items-center justify-center border-2 border-[#101A2C] font-bold text-lg shadow-[2px_2px_0px_0px_#101A2C] transition-colors ${
                    isOpen ? 'bg-[#00D2D3] text-[#101A2C]' : 'bg-[#D99A2B] text-[#101A2C]'
                  }`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="p-6 border-t-3 border-[#101A2C] bg-[#F7F5EF] font-sans font-medium text-gray-800 leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#006B70] text-white border-4 border-[#101A2C] p-10 md:p-12 shadow-[8px_8px_0px_0px_#101A2C]">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-3 text-white">
            Still have questions?
          </h2>
          <p className="font-sans font-semibold text-lg mb-8 text-[#F7F5EF]">
            Our advisory team is available directly on WhatsApp to answer your inquiries in real time.
          </p>
          <WhatsAppButton
            text="Chat on WhatsApp"
            variant="primary"
            size="lg"
            message="Hi! I have a question regarding Aspire Realty properties."
          />
        </div>
      </section>
    </div>
  );
}
