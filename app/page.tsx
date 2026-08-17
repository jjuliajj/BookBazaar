import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Award } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <Navbar />
      <Hero />

      {/* Rack 1: Waterstones Iconic "Everyone's Talking About..." */}
      <FeaturedBooks title="Everyone's Talking About..." />

      {/* Mid-Page Editorial Feature Banner */}
      <section className="py-8 bg-[#F8F8F7] border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
          <div className="bg-white border border-neutral-200 p-6 sm:p-10 rounded-xs flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-bold text-[#0C4A60] uppercase tracking-widest block">
                WATERSTONES PLUS CURATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] leading-tight">
                Discover Books of Exceptional Craft & Resonant Prose
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Explore hand-curated digital EPUB titles, verified for high-resolution typography, complete illustrations, and DRM-free readability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link 
                href="/collections"
                className="bg-[#0C4A60] hover:bg-[#083344] text-white px-6 py-3 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-xs text-center"
              >
                BROWSE ALL EDITIONS
              </Link>
              <Link 
                href="/genres"
                className="bg-white hover:bg-neutral-50 text-[#1A1A1A] border border-neutral-300 px-6 py-3 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors text-center"
              >
                CATEGORIES MATRIX
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rack 2: Fiction Highlights */}
      <FeaturedBooks title="Best in Fiction & Literary Masterpieces" genre="Fiction" />

      {/* Rack 3: Non-Fiction & Essential Thought */}
      <FeaturedBooks title="Insightful Non-Fiction & Biography" genre="Non-Fiction" />

      <Footer />
    </main>
  );
}

