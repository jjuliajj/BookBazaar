import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function FeaturedBooks({ title = "Everyone's Talking About...", genre }: { title?: string; genre?: string }) {
  const allBooks = await getBooks();
  const books = genre 
    ? allBooks.filter(b => b.category?.toLowerCase() === genre.toLowerCase())
    : allBooks;

  return (
    <section className="py-8 bg-white font-jakarta border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        
        {/* Waterstones Iconic Italic Shelf Header */}
        <div className="flex items-baseline justify-between border-b border-neutral-300 pb-2.5 mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-normal italic text-[#1A1A1A]">
            {title}
          </h2>
          <Link
            href={genre ? `/collections?category=${encodeURIComponent(genre)}` : "/collections"}
            className="text-[11px] font-black font-jakarta text-[#1A1A1A] hover:text-[#0C4A60] uppercase tracking-wider flex items-center gap-0.5 transition-colors"
          >
            <span>SEE MORE</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-6 Column Shelf Rack */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}
