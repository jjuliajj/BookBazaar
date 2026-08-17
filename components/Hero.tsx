import Link from "next/link";
import { ArrowRight, Sparkles, Compass, BookOpen, Star, ShieldCheck } from "lucide-react";

export default function Hero() {
  const bazaarCategories = ["Philosophy", "Rare Manuscripts", "Global Classics", "Poetry", "History"];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#FAF6F0] border-b border-[#D97706]/20">
      {/* Background Arch Overlay & Ambient Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D97706]/10 via-[#C85A32]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Asymmetric Hero Banner */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D97706] text-white text-xs font-bold rounded-full shadow-md uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#FAF6F0]" /> Grand Silk & Gold Bazaar
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-[#1C1917] leading-[1.05] tracking-tight">
              Traverse The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#C85A32] to-[#B45309] italic font-normal">
                Global Bazaar of Knowledge
              </span>
            </h1>

            <p className="text-sm sm:text-base font-sans text-[#1C1917]/80 leading-relaxed max-w-xl">
              An extraordinary digital marketplace curating rare manuscripts, ancient philosophy, and artisanal EPUB e-books gathered from grand literary bazaars worldwide.
            </p>

            {/* Direct Category Pill Quick Links */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] block">
                Explore Bazaar Pavilions:
              </span>
              <div className="flex flex-wrap gap-2">
                {bazaarCategories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/collections?genre=${encodeURIComponent(cat)}`}
                    className="px-3.5 py-1.5 bg-white hover:bg-[#D97706] text-[#1C1917] hover:text-white rounded-xl border border-[#D97706]/30 text-xs font-bold transition-all duration-200 shadow-xs hover:shadow-md"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/collections" 
                className="bg-gradient-to-r from-[#D97706] to-[#C85A32] hover:from-[#C85A32] hover:to-[#D97706] text-white rounded-full px-9 py-4 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#D97706]/20 flex items-center gap-2.5 hover:scale-105"
              >
                <span>Enter The Bazaar Vault</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/about" 
                className="bg-white hover:bg-[#1C1917] text-[#1C1917] hover:text-[#FAF6F0] rounded-full px-8 py-4 border-2 border-[#D97706]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
              >
                <Compass className="w-4 h-4 text-[#D97706]" />
                <span>Bazaar Story</span>
              </Link>
            </div>
          </div>

          {/* Right Side: 3D Stacked Overlapping Book Covers Gallery */}
          <div className="lg:col-span-5 relative flex justify-center py-8">
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              
              {/* Back Stack Book Card 1 */}
              <div className="absolute top-4 left-4 w-48 aspect-[9/14] bg-[#1C1917] rounded-2xl border-2 border-[#D97706] shadow-xl rotate-[-12deg] opacity-80 overflow-hidden transform hover:rotate-[-6deg] transition-all duration-500 hidden sm:block">
                <div className="p-4 text-white font-serif space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-[#D97706]">Manuscript</span>
                  <div className="text-sm font-bold">The Oriental Codex</div>
                  <div className="text-[10px] text-white/60">Vol. 01</div>
                </div>
              </div>

              {/* Back Stack Book Card 2 */}
              <div className="absolute top-8 right-4 w-48 aspect-[9/14] bg-[#C85A32] rounded-2xl border-2 border-[#FAF6F0] shadow-xl rotate-[12deg] opacity-90 overflow-hidden transform hover:rotate-[6deg] transition-all duration-500 hidden sm:block">
                <div className="p-4 text-white font-serif space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/80">Philosophy</span>
                  <div className="text-sm font-bold">Timeless Wisdom</div>
                  <div className="text-[10px] text-white/80">Rare Edition</div>
                </div>
              </div>

              {/* Main Center Featured Book Card */}
              <div className="relative z-20 w-64 aspect-[9/14] bg-white rounded-2xl border-4 border-[#D97706] shadow-2xl p-4 flex flex-col justify-between transform hover:scale-105 transition-transform duration-500">
                <div className="flex justify-between items-center border-b border-[#D97706]/20 pb-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-2.5 py-0.5 rounded-full">
                    BAZAAR TOP PICK
                  </span>
                  <div className="flex items-center gap-1 text-[#D97706]">
                    <Star className="w-3.5 h-3.5 fill-[#D97706]" />
                    <span className="text-[10px] font-bold">4.9</span>
                  </div>
                </div>

                <div className="my-auto text-center space-y-2 py-4">
                  <div className="w-12 h-12 rounded-full bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mx-auto">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1C1917]">The Archival Library</h3>
                  <p className="text-[11px] text-[#1C1917]/70 font-sans">Over 10,000+ timeless EPUB volumes instant delivery.</p>
                </div>

                <div className="pt-3 border-t border-[#D97706]/20 flex items-center justify-between text-[10px] font-bold">
                  <span className="text-[#C85A32]">EPUB FORMAT</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">INSTANT</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
