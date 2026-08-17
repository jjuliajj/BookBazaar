import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/api";
import { Landmark } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const books = await getBooks();
  const { genre } = await searchParams;

  const categories = Array.from(new Set(books.map((b) => b.category)));
  const filteredBooks = genre
    ? books.filter((b) => b.category.toLowerCase() === genre.toLowerCase())
    : books;

  return (
    <main className="flex min-h-screen flex-col bg-[#F9F6F0] text-[#2C3437] font-sans">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="bg-[#2C3437] text-[#C5A059] text-xs font-serif font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#C5A059]/40 inline-flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#C5A059]" /> European Classic Pavilion Archives
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2C3437]">
              Special Collections & <span className="text-[#C5A059] italic font-normal">Digital Pavilion</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#2C3437]/70">
              Traverse our curated classical literary pavilions, rare manuscripts, and timeless treatises.
            </p>
          </div>

          {/* Pavilion Category Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/collections"
              className={`px-5 py-2 rounded-full font-serif font-bold text-xs uppercase tracking-wider border transition-all ${
                !genre ? "bg-[#2C3437] text-[#C5A059] border-[#C5A059]" : "bg-white text-[#2C3437] border-[#D8CEBE] hover:border-[#C5A059]"
              }`}
            >
              All Pavilions ({books.length})
            </a>
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/collections?genre=${encodeURIComponent(cat)}`}
                className={`px-5 py-2 rounded-full font-serif font-bold text-xs uppercase tracking-wider border transition-all ${
                  genre?.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#2C3437] text-[#C5A059] border-[#C5A059]"
                    : "bg-white text-[#2C3437] border-[#D8CEBE] hover:border-[#C5A059]"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* 3-Column Arched Pavilion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
