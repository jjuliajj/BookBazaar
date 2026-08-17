"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 sm:pt-36 pb-8 bg-white font-jakarta">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl relative">
        
        {/* Navigation Arrow Left */}
        <button 
          aria-label="Previous slide"
          className="hidden md:flex absolute -left-2 lg:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/90 hover:bg-white text-[#0C4A60] rounded-full shadow-md items-center justify-center border border-neutral-200 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* 3-Tile Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          
          {/* Tile 1: Book / Pick of the Month */}
          <div className="bg-[#EAE8E3] rounded-sm p-6 flex flex-col justify-between relative overflow-hidden border border-neutral-300 min-h-[320px] text-left">
            <div className="flex items-start justify-between">
              {/* Circular Stamp */}
              <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-white flex flex-col items-center justify-center text-center p-1 leading-tight flex-shrink-0 shadow-xs">
                <span className="text-[8px] font-bold uppercase tracking-wider text-amber-300">BOOK</span>
                <span className="text-[7px] text-neutral-300">OF THE</span>
                <span className="text-[8px] font-black uppercase text-amber-300">MONTH</span>
              </div>
              
              {/* Book Graphic */}
              <div className="w-32 aspect-[3/4] bg-white rounded shadow-md border border-neutral-200 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform">
                <div className="w-full h-full bg-gradient-to-br from-teal-800 to-slate-900 flex flex-col items-center justify-center p-3 text-center text-white">
                  <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-amber-300">CURATED</span>
                  <span className="text-sm font-serif font-black italic mt-1">WINGSPAN</span>
                  <span className="text-[9px] text-neutral-300 mt-2">CLASSIC EDITION</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-base font-serif font-bold text-[#1A1A1A] leading-snug">
                Build up your digital library with this soaring curated edition
              </h3>
              <Link 
                href="/collections"
                className="inline-block bg-[#1A1A1A] hover:bg-[#0C4A60] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-xs transition-colors"
              >
                FIND OUT MORE
              </Link>
            </div>
          </div>

          {/* Tile 2: Signed & Exclusive Edition */}
          <div className="bg-gradient-to-br from-[#00A896] via-[#028090] to-[#F0F3F4] rounded-sm p-6 flex flex-col justify-between relative overflow-hidden border border-teal-600 min-h-[320px] text-left text-white">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl lg:text-3xl font-serif font-black tracking-tight block text-amber-300 drop-shadow-sm">
                  Irvine
                </span>
                <span className="text-3xl lg:text-4xl font-serif font-black tracking-tight block text-white drop-shadow-sm">
                  Welsh
                </span>
              </div>

              {/* Signed Edition Badge */}
              <div className="bg-white text-[#1A1A1A] text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-neutral-300">
                SIGNED EDITION
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <p className="text-xs font-medium text-slate-100 leading-snug max-w-[200px]">
                Viva Las Vegas with the bestselling Trainspotting author's digital masterwork.
              </p>
              <Link 
                href="/collections"
                className="inline-block bg-white hover:bg-amber-300 text-[#1A1A1A] text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xs transition-colors shadow-sm"
              >
                SHOP NOW
              </Link>
            </div>
          </div>

          {/* Tile 3: Spotlight Bestseller / Exclusive */}
          <div className="bg-[#E7D7C1] rounded-sm p-6 flex flex-col justify-between relative overflow-hidden border border-neutral-300 min-h-[320px] text-left">
            <div className="flex items-start justify-between">
              {/* Book Cover */}
              <div className="w-28 aspect-[3/4] bg-white rounded shadow-md border border-neutral-200 overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform">
                <div className="w-full h-full bg-gradient-to-b from-amber-600 to-amber-900 flex flex-col items-center justify-center p-3 text-center text-white">
                  <span className="text-[9px] font-serif uppercase tracking-widest text-amber-200">EXCLUSIVE</span>
                  <span className="text-xs font-serif font-bold mt-1">Yesteryear</span>
                  <span className="text-[8px] text-amber-200 mt-2">Caro Claire Burke</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest block">FEATURED</span>
                <span className="text-xs font-serif font-bold text-[#1A1A1A]">AUTUMN HIGHLIGHT</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-base font-serif font-bold text-[#1A1A1A] leading-snug">
                The good old days with the filter off — essential modern memoir.
              </h3>
              <Link 
                href="/collections"
                className="inline-block bg-[#1A1A1A] hover:bg-[#0C4A60] text-white text-[11px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-xs transition-colors"
              >
                SHOP NOW
              </Link>
            </div>
          </div>

        </div>

        {/* Navigation Arrow Right */}
        <button 
          aria-label="Next slide"
          className="hidden md:flex absolute -right-2 lg:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/90 hover:bg-white text-[#0C4A60] rounded-full shadow-md items-center justify-center border border-neutral-200 transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
}
