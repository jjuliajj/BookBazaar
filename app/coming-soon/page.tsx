"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function ComingSoon() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <Navbar />
      <section className="pt-44 pb-24 flex-grow flex items-center justify-center">
        <div className="text-center max-w-xl px-6 space-y-6">
          <div className="w-14 h-14 bg-neutral-100 text-[#0C4A60] rounded-xs flex items-center justify-center mx-auto border border-neutral-200 shadow-xs">
            <BookOpen className="w-7 h-7" />
          </div>
          
          <span className="text-[#0C4A60] font-bold text-xs uppercase tracking-widest inline-block">
            BookBazaar Edition In Preparation
          </span>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A]">
            Curator Update in Progress
          </h1>
          
          <p className="text-sm text-neutral-600 leading-relaxed font-normal">
            Our editorial team is preparing comprehensive author monographs and archival resources for this page. Please explore our live catalog in the meantime.
          </p>

          <div className="pt-4">
            <Link 
              href="/collections" 
              className="inline-flex items-center gap-2 bg-[#0C4A60] hover:bg-[#083344] text-white px-8 py-3 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore All Catalog Titles</span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

