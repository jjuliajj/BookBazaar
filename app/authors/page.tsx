import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import { getAuthorAvatar } from "@/lib/authorAvatar";
import Link from "next/link";
import { Users, BookOpen, ArrowRight, Award, Feather } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Authors & Visionary Creators | BookBazaar",
  description: "Meet the brilliant minds, essayists, and thinkers behind our digital e-book library collection at BookBazaar.",
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
    <main className="flex min-h-screen flex-col bg-[#FAF6F0] text-[#1C1917]">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl space-y-12">
          
          {/* Header Card Container */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#D97706]/20 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D97706]/10 text-[#D97706] text-xs font-bold rounded-full border border-[#D97706]/30 uppercase tracking-widest">
                <Users className="w-4 h-4 text-[#C85A32]" /> Global Creators & Authors
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1C1917] leading-tight">
                Visionary <span className="text-[#D97706] italic font-normal">Authors & Thinkers</span>
              </h1>
              <p className="text-xs md:text-sm text-[#1C1917]/70 leading-relaxed">
                Discover the researchers, philosophers, and literary creators shaping contemporary thought in our global digital bazaar.
              </p>
            </div>

            {/* Author Stats Badge */}
            <div className="bg-[#1C1917] text-white px-6 py-5 rounded-2xl border-2 border-[#D97706]/40 shadow-xl flex items-center gap-4 flex-shrink-0">
              <div className="w-11 h-11 rounded-xl bg-[#D97706] text-white flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-white">{authorData.length} Master Authors</div>
                <div className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest">
                  {books.length} Published Volumes
                </div>
              </div>
            </div>
          </div>

          {/* Author Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorData.map((author) => (
              <div
                key={author.name}
                className="bg-white rounded-3xl p-6 border border-[#D97706]/20 shadow-sm hover:shadow-2xl hover:border-[#D97706] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-5">
                  {/* Author Portrait Frame */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-[#D97706]/20 shadow-sm bg-[#FAF6F0]">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#1C1917]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {author.category}
                      </span>
                      <span className="text-xs font-bold text-white bg-[#D97706] px-3 py-0.5 rounded-full shadow-sm">
                        {author.count} {author.count === 1 ? 'Book' : 'Books'}
                      </span>
                    </div>
                  </div>

                  {/* Author Bio Section */}
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#1C1917] group-hover:text-[#D97706] transition-colors">
                      {author.name}
                    </h2>
                  </div>

                  {/* Published Titles List */}
                  <div className="pt-3 border-t border-[#D97706]/15 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706] block">
                      Works in Library ({author.count})
                    </span>
                    
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {author.books.map((book) => (
                        <Link
                          key={book.id}
                          href={`/products/${book.id}`}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF6F0] transition-colors group/book border border-transparent hover:border-[#D97706]/30"
                        >
                          <div className="w-7 aspect-[9/16] bg-[#FAF6F0] rounded overflow-hidden flex-shrink-0 border border-[#D97706]/20">
                            {book.cover_url ? (
                              <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="w-2.5 h-2.5 text-[#D97706]" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="text-xs font-serif font-bold text-[#1C1917] truncate group-hover/book:text-[#D97706] transition-colors">
                              {book.title}
                            </div>
                            <div className="text-[10px] font-bold text-[#C85A32]">
                              {book.price}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D97706] group-hover/book:translate-x-0.5 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore Author Link */}
                <Link
                  href={`/collections?search=${encodeURIComponent(author.name)}`}
                  className="w-full py-3.5 bg-[#D97706] text-white hover:bg-[#C85A32] transition-colors rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Explore Author's Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Featured Works Section */}
          <div className="bg-white rounded-3xl p-8 border border-[#D97706]/20 shadow-md space-y-6 pt-8">
            <div className="flex items-center justify-between border-b border-[#D97706]/15 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D97706]">
                  Author Spotlight
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1C1917]">
                  Recent Library Works
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-xs font-bold text-[#D97706] hover:text-[#C85A32] transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>Browse All ({books.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
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
