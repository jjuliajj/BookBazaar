import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Bookmark, ChevronRight, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories & Genres | BookBazaar",
  description: "Browse literature by subject, genre, and category in our Waterstones-inspired digital bookstore.",
};

export default async function GenresPage() {
  const books = await getBooks();

  const genreNames = Array.from(new Set(books.map((b) => b.category).filter(Boolean)));
  
  const genreData = genreNames.map((genre) => {
    const genreBooks = books.filter((b) => b.category === genre);
    return {
      name: genre,
      count: genreBooks.length,
      sampleBooks: genreBooks.slice(0, 3),
    };
  });

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-16">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
            <Link href="/" className="hover:text-[#0C4A60]">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-900 font-bold">Categories & Genres</span>
          </nav>

          {/* Header */}
          <div className="border-b border-neutral-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div>
              <span className="text-[10px] font-bold text-[#0C4A60] uppercase tracking-widest block">
                BROWSE BY SUBJECT
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
                Literary Categories Matrix
              </h1>
              <p className="text-xs text-neutral-600 mt-1">
                Explore our curated digital library organized across {genreData.length} distinct subject avenues.
              </p>
            </div>

            <div className="text-xs text-neutral-600 font-bold bg-[#F8F8F7] px-3.5 py-2 rounded-xs border border-neutral-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0C4A60]" />
              <span>{books.length} Total Curated Volumes</span>
            </div>
          </div>

          {/* Genre Matrix Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genreData.map((genre) => (
              <Link
                key={genre.name}
                href={`/collections?category=${encodeURIComponent(genre.name)}`}
                className="bg-[#F8F8F7] hover:bg-neutral-100 p-6 rounded-xs border border-neutral-200 hover:border-[#0C4A60] transition-all flex flex-col justify-between group space-y-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xs bg-[#0C4A60] text-white flex items-center justify-center shadow-xs">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-neutral-500 bg-white px-2.5 py-1 rounded-xs border border-neutral-200">
                    {genre.count} {genre.count === 1 ? 'Edition' : 'Editions'}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#0C4A60] transition-colors">
                    {genre.name}
                  </h2>
                  <p className="text-xs text-neutral-600 mt-1">
                    Curated {genre.name.toLowerCase()} volumes and digital masterpieces.
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs font-bold text-[#0C4A60]">
                  <span>Explore All {genre.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Curated Shelf of all books */}
          <div className="pt-8 border-t border-neutral-300 space-y-6 text-left">
            <div className="flex items-baseline justify-between border-b border-neutral-300 pb-2">
              <h2 className="text-xl font-serif italic text-[#1A1A1A]">
                Highlighted Catalog Titles
              </h2>
              <Link
                href="/collections"
                className="text-xs font-bold uppercase tracking-wider text-[#0C4A60] hover:underline"
              >
                View All ({books.length})
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {books.slice(0, 6).map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  image={book.cover_url}
                  category={book.category}
                  description={book.description}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

