import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartActions from "@/components/AddToCartActions";
import BookDescription from "@/components/BookDescription";
import { getBook } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, User, Tag } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    return {
      title: "Book Not Found | eBookMarket Library",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bookpatr.vercel.app";
  const rawDesc = (book.description || "").replace(/<[^>]*>?/gm, "").trim();
  const cleanDescription = rawDesc.slice(0, 160) || `Download ${book.title} by ${book.author} in digital EPUB format from eBookMarket Library.`;

  return {
    title: `${book.title} by ${book.author}`,
    description: cleanDescription,
    keywords: [book.title, book.author, book.category, "EPUB eBook", "Digital Book", "Buy eBook"],
    openGraph: {
      title: `${book.title} by ${book.author}`,
      description: cleanDescription,
      url: `${siteUrl}/products/${book.id}`,
      type: "article",
      images: book.cover_url ? [{ url: book.cover_url, alt: book.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} by ${book.author}`,
      description: cleanDescription,
      images: book.cover_url ? [book.cover_url] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bookpatr.vercel.app";
  const rawPrice = String(book.price || "0.50").replace(/[^0-9.]/g, "");
  const numericPrice = parseFloat(rawPrice) || 0.50;
  const cleanDescription = (book.description || "").replace(/<[^>]*>?/gm, "").trim();

  // Product Schema for Google Search & Stripe Trust verification
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": book.title,
    "image": book.cover_url ? [book.cover_url] : [],
    "description": cleanDescription || `${book.title} by ${book.author}`,
    "category": book.category,
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${book.id}`,
      "priceCurrency": "USD",
      "price": numericPrice.toFixed(2),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "eBookMarket Library"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": book.author
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      
      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl text-left">
          
          {/* Back link */}
          <Link href="/collections" className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-[#0C4A60] transition-colors mb-6 uppercase tracking-wider gap-1.5 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Book Collections
          </Link>

          {/* Main Book Detail Grid */}
          <div className="bg-[#F8F8F7] rounded-xs p-6 md:p-10 border border-neutral-200 shadow-xs grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Book Cover Container */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative aspect-[3/4] w-full max-w-[280px] bg-white rounded-xs overflow-hidden shadow-md border border-neutral-200 group">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-400 font-serif text-xl italic p-6 text-center">
                    <BookOpen className="w-8 h-8 mb-2 opacity-40 text-[#0C4A60]" />
                    <span>{book.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Book Meta & Info */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-xs mb-3">
                  <Tag className="w-3 h-3 text-[#0C4A60]" />
                  {book.category || "General Fiction"}
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight mb-2">
                  {book.title}
                </h1>
                
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <User className="w-4 h-4 text-[#0C4A60]" />
                  <span>By <strong className="text-[#0C4A60]">{book.author}</strong></span>
                </div>
              </div>

              {/* Price & Delivery Badge */}
              <div className="bg-white p-4 rounded-xs border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Waterstones EPUB Edition</span>
                  <span className="text-2xl font-bold text-[#0C4A60] font-sans">{book.price ? (book.price.startsWith("$") ? book.price.replace("$", "£") : (book.price.startsWith("£") ? book.price : `£${book.price}`)) : "£14.99"}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xs inline-flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" /> Instant EPUB Download
                  </span>
                </div>
              </div>

              {/* Add To Cart & Direct Checkout Buttons */}
              <AddToCartActions bookId={book.id} />

              {/* Synopsis & Introduction */}
              <BookDescription description={book.description} />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
