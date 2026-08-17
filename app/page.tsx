import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight, BookOpen, Landmark } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F9F6F0] text-[#2C3437]">
      <Navbar />
      <Hero />

      {/* Featured Books Section */}
      <FeaturedBooks />

      {/* Atelier Philosophy Section */}
      <section className="py-16 px-4 sm:px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-3xl border border-[#D8CEBE] p-8 md:p-14 shadow-sm grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Image Atelier Frame */}
            <div className="order-2 md:order-1">
              <div className="aspect-[4/3] bg-[#F9F6F0] rounded-3xl overflow-hidden shadow-md border border-[#D8CEBE] relative group">
                <img 
                  src="/philosophy.jpg" 
                  alt="Our Atelier" 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3437]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-2xl border border-[#C5A059]/40 shadow-md flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2C3437] text-[#C5A059] flex items-center justify-center flex-shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2C3437] font-serif">European Classic Pavilion</div>
                    <div className="text-[10px] text-[#2C3437]/70 font-semibold">Hand-selected literature for global readers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="order-1 md:order-2 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#2C3437] text-[#C5A059] text-xs font-serif font-bold rounded-full border border-[#C5A059]/30 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#C5A059]" /> Pavilion Heritage
              </div>

              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2C3437] leading-tight">
                The Art of <br />
                <span className="text-[#C5A059] italic font-normal">Classic Pavilion Selection</span>
              </h2>

              <div className="space-y-4 text-xs md:text-sm text-[#2C3437]/80 leading-relaxed font-sans">
                <p>
                  In an age of digital noise, we curate timeless European classic literature, rare manuscripts, and archival EPUB volumes.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-3 bg-[#F9F6F0] p-3.5 rounded-2xl border border-[#D8CEBE]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#2C3437] block text-xs">Curated Classic Merit:</strong>
                      <span className="text-[11px] text-[#2C3437]/70">Verified for excellence, formatting, and historical significance.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#F9F6F0] p-3.5 rounded-2xl border border-[#D8CEBE]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#2C3437] block text-xs">Instant Direct Delivery:</strong>
                      <span className="text-[11px] text-[#2C3437]/70">Immediate access to EPUB downloads following checkout.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:text-[#2C3437] transition-colors group font-sans"
                >
                  <span>Explore Pavilion History</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
