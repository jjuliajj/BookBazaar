import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; genre?: string; search?: string }>;
}) {
  const books = await getBooks();
  const { category, genre, search } = await searchParams;
  const currentFilter = category || genre;

  const categories = Array.from(new Set(books.map((b) => b.category).filter(Boolean)));
  let filteredBooks = books;

  if (currentFilter) {
    filteredBooks = filteredBooks.filter((b) => b.category && b.category.toLowerCase() === currentFilter.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    filteredBooks = filteredBooks.filter((b) => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s));
  }


  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <Navbar />

      <section className="pt-32 sm:pt-36 pb-16">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6 font-medium">
            <Link href="/" className="hover:text-[#0C4A60]">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <Link href="/collections" className="hover:text-[#0C4A60]">Collections</Link>
            {currentFilter && (
              <>
                <ChevronRight className="w-3 h-3 text-neutral-400" />
                <span className="text-neutral-900 font-bold">{currentFilter}</span>
              </>
            )}
          </nav>

          {/* Department Header */}
          <div className="border-b border-neutral-300 pb-4 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
                {currentFilter ? `${currentFilter} Editions` : "Bestsellers & Curated Catalog"}
              </h1>
              <p className="text-xs text-neutral-600 mt-1">
                Showing {filteredBooks.length} curated volumes available for immediate high-resolution digital download.
              </p>
            </div>

            <div className="text-xs text-neutral-500 font-medium flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#0C4A60]" />
              <span>Format: <strong>Digital EPUB (DRM-Free)</strong></span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-neutral-200 mb-8">
            <Link
              href="/collections"
              className={`px-3.5 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-colors ${
                !currentFilter 
                  ? "bg-[#0C4A60] text-white" 
                  : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              All Editions ({books.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/collections?category=${encodeURIComponent(cat)}`}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-colors ${
                  currentFilter?.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#0C4A60] text-white"
                    : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Waterstones 5-6 Column Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

