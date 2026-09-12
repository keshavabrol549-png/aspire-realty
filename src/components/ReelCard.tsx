'use client';

import { Instagram, ExternalLink } from 'lucide-react';

interface ReelCardProps {
  reel: {
    id: string;
    title: string;
    videoUrl: string;
    instagramUrl?: string;
    thumbnail?: string;
    views?: string;
    tag: string;
    color?: string;
  };
}

export default function ReelCard({ reel }: ReelCardProps) {
  const isInstagramUrl = reel.videoUrl.includes('instagram.com');
  const targetInstaUrl = reel.instagramUrl || reel.videoUrl || 'https://www.instagram.com/aspirerealtyglobal/';

  const getEmbedUrl = () => {
    let cleanUrl = reel.videoUrl.split('?')[0].replace(/\/$/, '');
    if (!cleanUrl.endsWith('/embed')) {
      cleanUrl += '/embed';
    }
    return `${cleanUrl}/?autoplay=1&muted=1`;
  };

  return (
    <div className="group block bg-[#F7F5EF] border-3 border-[#101A2C] p-3 shadow-[4px_4px_0px_0px_#101A2C] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#101A2C] transition-all relative">
      <div className="w-full bg-[#101A2C] border-2 border-[#101A2C] mb-3 relative overflow-hidden flex items-center justify-center min-h-[450px]">
        {isInstagramUrl ? (
          <div className="w-full h-full relative">
            <iframe
              src={getEmbedUrl()}
              className="w-full h-full min-h-[450px] border-0"
              allow="autoplay; encrypted-media"
              title={reel.title}
            />
            {/* Transparent Overlay to handle redirect on click */}
            <div
              className="absolute inset-0 z-20 cursor-pointer"
              onClick={() => window.open(targetInstaUrl, '_blank', 'noopener,noreferrer')}
            />
          </div>
        ) : reel.thumbnail ? (
          <img
            src={reel.thumbnail}
            alt={reel.title}
            className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-[450px] bg-[#101A2C] flex flex-col items-center justify-center p-4 text-center relative bg-gradient-to-br from-[#101A2C] via-[#1a2942] to-[#E1306C]/20">
            <Instagram className="w-12 h-12 text-[#E1306C] mb-2 animate-pulse" />
            <span className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
              Instagram Reel
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="inline-block px-2.5 py-0.5 bg-[#3F7D4A] text-white font-extrabold text-[11px] border border-[#101A2C]">
          {reel.tag || 'Featured'}
        </span>
      </div>

      <h4 className="font-heading font-extrabold text-sm text-[#101A2C] line-clamp-2 mb-2 min-h-[2.5rem]">
        {reel.title}
      </h4>
    </div>
  );
}
