import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-16 bg-[#F9F6F0]">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b-2 border-[#C5A059]/40 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C3437] text-[#C5A059] text-xs font-serif font-bold rounded-full uppercase tracking-widest mb-3 border border-[#C5A059]/40">
              <Landmark className="w-4 h-4 text-[#C5A059]" /> Grand European Pavilion Display
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2C3437]">
              European Classic <span className="text-[#C5A059] italic font-normal">Avenues</span>
            </h2>
          </div>
          <Link 
            href="/collections"
            className="bg-[#2C3437] hover:bg-[#C5A059] text-[#F9F6F0] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow flex items-center gap-2"
          >
            <span>Browse All ({books.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Arched Pavilion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}
