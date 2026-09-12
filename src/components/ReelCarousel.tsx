'use client';

import { useState, useRef } from 'react';
import { Instagram, ExternalLink, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Reel {
  id: string;
  title: string;
  videoUrl: string;
  instagramUrl?: string;
  thumbnail?: string;
  views?: string;
  tag: string;
}

export default function ReelCarousel({ reels }: { reels: Reel[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={() => scroll('left')}
          className="w-12 h-12 bg-white border-3 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C] flex items-center justify-center font-bold hover:bg-[#F7F5EF] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-[#101A2C]" strokeWidth={3} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-12 h-12 bg-white border-3 border-[#101A2C] shadow-[3px_3px_0px_0px_#101A2C] flex items-center justify-center font-bold hover:bg-[#F7F5EF] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-[#101A2C]" strokeWidth={3} />
        </button>
      </div>

      {/* Reel Cards Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 px-2 no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reels.map((reel) => {
          const targetInstaUrl = reel.instagramUrl || reel.videoUrl || 'https://www.instagram.com/aspirerealtyglobal/';
          const handle = '@aspirerealtyglobal';
          let cleanUrl = reel.videoUrl.split('?')[0].replace(/\/$/, '');
          if (!cleanUrl.endsWith('/embed')) {
            cleanUrl += '/embed';
          }

          return (
            <div
              key={reel.id}
              className="flex-shrink-0 w-[300px] sm:w-[320px] snap-start group bg-[#F7F5EF] border-3 border-[#101A2C] p-3 shadow-[4px_4px_0px_0px_#101A2C] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#101A2C] transition-all relative flex flex-col justify-between cursor-pointer"
              onClick={() => window.open(targetInstaUrl, '_blank', 'noopener,noreferrer')}
            >
              <div>
                <div className="w-full bg-[#101A2C] border-2 border-[#101A2C] mb-3 relative overflow-hidden flex items-center justify-center h-[420px]">
                  <iframe
                    src={cleanUrl}
                    className="w-full h-full pointer-events-none border-0"
                    title={reel.title}
                  />
                  {/* Click Overlay to guarantee instant redirect */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#E1306C] border-2 border-white flex items-center justify-center text-white shadow-[3px_3px_0px_0px_#101A2C] opacity-90 group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#E1306C] text-white text-[10px] font-extrabold border border-white shadow-[1px_1px_0px_0px_#000] z-10">
                    REEL
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-2.5 py-0.5 bg-[#3F7D4A] text-white font-extrabold text-[11px] border border-[#101A2C]">
                    {reel.tag || 'Featured'}
                  </span>
                  <span className="text-[11px] font-bold text-[#E1306C] flex items-center gap-1">
                    Watch on Instagram ↗
                  </span>
                </div>

                <h4 className="font-heading font-extrabold text-sm text-[#101A2C] line-clamp-2 mb-2 min-h-[2.5rem]">
                  {reel.title}
                </h4>
              </div>

              <div className="pt-2 border-t border-[#101A2C]/20 flex items-center justify-between text-xs font-bold text-[#E1306C]">
                <span className="flex items-center gap-1">
                  <Instagram className="w-3.5 h-3.5" /> {handle}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
