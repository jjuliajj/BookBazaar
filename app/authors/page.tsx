import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import { getAuthorAvatar } from "@/lib/authorAvatar";
import Link from "next/link";
import { BookOpen, ChevronRight, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Author Directory | BookBazaar",
  description: "Explore the esteemed writers, essayists, and creators in our curated bookstore catalog.",
};

export default async function AuthorsPage() {
  const books = await getBooks();

  const authorNames = Array.from(new Set(books.map((b) => b.author).filter(Boolean)));
  
  const authorData = authorNames.map((name) => {
    const authorBooks = books.filter((b) => b.author === name);
    const categories = authorBooks.map(b => b.category).filter(Boolean);
    const mainCategory = categories[0] || "Featured Author";

    return {
      name,
      avatar: getAuthorAvatar(name),
      category: mainCategory,
      count: authorBooks.length,
      books: authorBooks,
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
            <span className="text-neutral-900 font-bold">Authors Directory</span>
          </nav>

          {/* Header */}
          <div className="border-b border-neutral-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div>
              <span className="text-[10px] font-bold text-[#0C4A60] uppercase tracking-widest block">
                MEET THE WRITERS
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
                Master Authors & Essayists
              </h1>
              <p className="text-xs text-neutral-600 mt-1">
                Explore works from {authorData.length} master authors available across our digital library.
              </p>
            </div>

            <div className="text-xs text-neutral-600 font-bold bg-[#F8F8F7] px-3.5 py-2 rounded-xs border border-neutral-200 flex items-center gap-2">
              <User className="w-4 h-4 text-[#0C4A60]" />
              <span>{authorData.length} Featured Authors</span>
            </div>
          </div>

          {/* Author Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorData.map((author) => (
              <div
                key={author.name}
                className="bg-[#F8F8F7] rounded-xs p-5 border border-neutral-200 hover:border-[#0C4A60] transition-all flex flex-col justify-between group space-y-5 text-left"
              >
                <div className="space-y-4">
                  {/* Author Portrait */}
                  <div className="aspect-[16/9] rounded-xs overflow-hidden relative border border-neutral-200 bg-neutral-200">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-end">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 px-2.5 py-0.5 rounded-xs">
                        {author.category}
                      </span>
                      <span className="text-xs font-bold text-white bg-[#0C4A60] px-2.5 py-0.5 rounded-xs">
                        {author.count} {author.count === 1 ? 'Title' : 'Titles'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#0C4A60] transition-colors">
                      {author.name}
                    </h2>
                  </div>

                  {/* Bibliography List */}
                  <div className="pt-2 border-t border-neutral-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                      Published Editions ({author.count})
                    </span>
                    
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {author.books.map((book) => (
                        <Link
                          key={book.id}
                          href={`/products/${book.id}`}
                          className="flex items-center gap-2.5 p-1.5 rounded-xs hover:bg-white transition-colors group/book border border-transparent hover:border-neutral-200"
                        >
                          <div className="w-6 aspect-[3/4] bg-neutral-200 rounded-xs overflow-hidden flex-shrink-0">
                            {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="text-xs font-serif font-bold text-[#1A1A1A] truncate group-hover/book:text-[#0C4A60]">
                              {book.title}
                            </div>
                            <div className="text-[10px] font-bold text-[#0C4A60]">
                              {book.price || "£14.99"}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore Author Collection */}
                <Link
                  href={`/collections?category=${encodeURIComponent(author.category)}`}
                  className="w-full py-2.5 bg-[#0C4A60] text-white hover:bg-[#083344] transition-colors rounded-xs font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Explore Author Works</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Curated Shelf */}
          <div className="pt-8 border-t border-neutral-300 space-y-6 text-left">
            <div className="flex items-baseline justify-between border-b border-neutral-300 pb-2">
              <h2 className="text-xl font-serif italic text-[#1A1A1A]">
                Recent Catalog Additions
              </h2>
              <Link
                href="/collections"
                className="text-xs font-bold uppercase tracking-wider text-[#0C4A60] hover:underline"
              >
                Browse All ({books.length})
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

