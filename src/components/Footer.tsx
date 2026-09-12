'use client';

import { usePathname } from 'next/navigation';
import { Instagram } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const isGlobal = pathname.startsWith('/global');

  const instagramLink = isGlobal
    ? 'https://www.instagram.com/aspirerealtyglobal/'
    : 'https://www.instagram.com/aspire_homes_properties?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';

  return (
    <footer className="w-full bg-[#101A2C] border-t-4 border-[#101A2C] text-[#F7F5EF] relative overflow-hidden">
      <div className="bg-grid-pattern opacity-[0.03]"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={isGlobal ? "/logo-global.jpg" : "/logo-india.jpg"}
                alt="Aspire Realty Logo"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="font-heading text-2xl font-extrabold bg-[#C99A3E] text-[#101A2C] border-3 border-white px-3 py-1 shadow-[3px_3px_0px_0px_#fff]">
                ASPIRE
              </span>
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                REALTY
              </span>
            </div>
            <p className="text-sm font-medium text-gray-300 leading-relaxed">
              Premier real estate platform connecting verified residential & commercial properties across India and prime global destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-extrabold uppercase tracking-wider mb-4 border-b-2 border-[#C99A3E] pb-1 inline-block text-white">
              Portfolio
            </h4>
            <ul className="space-y-2.5 font-semibold text-sm">
              <li>
                <a href="/" className="hover:text-[#C99A3E] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3F7D4A] border border-white inline-block"></span>
                  India Collection
                </a>
              </li>
              <li>
                <a href="/global" className="hover:text-[#C99A3E] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#C99A3E] border border-white inline-block"></span>
                  Global Luxury
                </a>
              </li>
              <li>
                <a href="/listings" className="hover:text-[#C99A3E] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#006B70] border border-white inline-block"></span>
                  All Listings
                </a>
              </li>
              <li>
                <a href="/sell-property" className="hover:text-[#C99A3E] transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#D99A2B] border border-white inline-block"></span>
                  List Property
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-base font-extrabold uppercase tracking-wider mb-4 border-b-2 border-[#C99A3E] pb-1 inline-block text-white">
              Company
            </h4>
            <ul className="space-y-2.5 font-semibold text-sm">
              <li>
                <a href="/about" className="hover:text-[#C99A3E] transition-colors">
                  About ASPIRE
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-[#C99A3E] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-extrabold uppercase tracking-wider mb-4 border-b-2 border-[#C99A3E] pb-1 inline-block text-white">
              Direct Inquiries
            </h4>
            <ul className="space-y-3 font-semibold text-sm">
              <li>
                <a
                  href="https://wa.me/917006822051"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#25D366] text-white border-2 border-white shadow-[2px_2px_0px_0px_#fff] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                >
                  <span className="text-xs font-extrabold">WhatsApp Agent</span>
                </a>
              </li>
              <li>
                <a href="tel:+917006077022" className="hover:text-[#C99A3E] transition-colors block text-gray-300">
                  +91-7006077022
                </a>
              </li>
              <li>
                <a href="tel:+917006822051" className="hover:text-[#C99A3E] transition-colors block text-gray-300">
                  +91-7006822051
                </a>
              </li>
              <li>
                <a href="mailto:info@aspirerealty.com" className="hover:text-[#C99A3E] transition-colors block text-gray-300">
                  info@aspirerealty.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Symmetrical Section */}
        <div className="border-t-2 border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 font-semibold text-xs text-gray-400 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} ASPIRE Homes and Properties. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <a href="/about" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a href="/faq" className="hover:text-white transition-colors">
                Terms & Legal
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 sm:border-l-2 sm:border-gray-700 sm:pl-6 pt-2 sm:pt-0">
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E1306C] transition-colors inline-flex items-center gap-1.5 font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-md hover:bg-white/10"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>Instagram {isGlobal ? 'Global' : 'India'}</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61570149943880&ref=PROFILE_EDIT_xav_ig_profile_page_web#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1877F2] transition-colors inline-flex items-center gap-1.5 font-bold px-3 py-1 bg-white/5 border border-white/10 rounded-md hover:bg-white/10"
              >
                <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
