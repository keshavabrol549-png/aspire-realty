'use client';

import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isGlobal = pathname.startsWith('/global');
  // Admin and error pages shouldn't show the main header
  const isExcluded = pathname.startsWith('/admin') || pathname === '/_error' || pathname === '/404';

  if (isExcluded) return null;

  const handleNavigation = (path: string) => {
    if (pathname === path) return;
    router.push(path);
  };

  return (
    <header className="w-full bg-[#F7F5EF] border-b-4 border-[#101A2C] sticky top-0 z-50">
      {/* Tagline Ticker Bar */}
      <div className="bg-[#101A2C] text-[#F7F5EF] py-2.5 px-4 text-center font-heading text-xs md:text-sm font-bold tracking-wider uppercase border-b-2 border-[#101A2C] overflow-x-auto whitespace-nowrap">
        <div className="inline-block text-[#F7F5EF]">
          <span className="text-[#C99A3E]">✨</span> Building Trust. Creating Dreams. <span className="text-[#C99A3E]">✨</span> &nbsp;&nbsp;|&nbsp;&nbsp; Premium Real Estate Advisory &nbsp;&nbsp;|&nbsp;&nbsp; Jammu & Global Destinations
        </div>
      </div>

      <div className="py-3 px-3 sm:px-6 md:px-12 flex items-center justify-between">
        <button onClick={() => handleNavigation(isGlobal ? '/global' : '/')} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          {/* Separate Logo Image for India & Global */}
          <img
            src={isGlobal ? "/logo-global.jpg" : "/logo-india.jpg"}
            alt="Aspire Realty Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              // Hide image tag gracefully if image is missing so text remains intact
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="font-heading text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-[#C99A3E] text-[#101A2C] border-2 sm:border-3 border-[#101A2C] px-2 sm:px-3 py-0.5 shadow-[2px_2px_0px_0px_#101A2C] sm:shadow-[3px_3px_0px_0px_#101A2C] group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 transition-transform group-hover:shadow-[4px_4px_0px_0px_#101A2C]">
            ASPIRE
          </span>
          <span className="font-heading text-base sm:text-lg font-bold tracking-wider text-[#101A2C]">
            REALTY
          </span>
        </button>

        <nav className="flex items-center gap-2 sm:gap-4">
          {/* Neubrutalist Toggle */}
          <div className="flex border-2 sm:border-3 border-[#101A2C] bg-white p-1 sm:p-1.5 shadow-[2px_2px_0px_0px_#101A2C] sm:shadow-[4px_4px_0px_0px_#101A2C]">
            <button
              onClick={() => handleNavigation('/')}
              className={`px-3 sm:px-5 py-1 sm:py-1.5 font-heading text-xs sm:text-sm md:text-base font-extrabold transition-all cursor-pointer border-2 border-transparent ${
                !isGlobal
                  ? 'bg-[#3F7D4A] text-white border-[#101A2C] shadow-[1px_1px_0px_0px_#101A2C] sm:shadow-[2px_2px_0px_0px_#101A2C]'
                  : 'text-[#101A2C] hover:bg-[#101A2C]/10'
              }`}
            >
              India
            </button>

            <button
              onClick={() => handleNavigation('/global')}
              className={`px-3 sm:px-5 py-1 sm:py-1.5 font-heading text-xs sm:text-sm md:text-base font-extrabold transition-all cursor-pointer border-2 border-transparent ${
                isGlobal
                  ? 'bg-[#C99A3E] text-[#101A2C] border-[#101A2C] shadow-[1px_1px_0px_0px_#101A2C] sm:shadow-[2px_2px_0px_0px_#101A2C]'
                  : 'text-[#101A2C] hover:bg-[#101A2C]/10'
              }`}
            >
              Global
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
