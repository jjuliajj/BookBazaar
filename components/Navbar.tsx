"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { 
  Search, 
  X, 
  Loader2, 
  Menu, 
  ShoppingBag, 
  MapPin, 
  HelpCircle, 
  Calendar, 
  BookOpen, 
  Gift, 
  User, 
  Heart,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, isMounted } = useCart();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchFocus = async () => {
    setIsSearchFocused(true);
    if (allBooks.length === 0 && !isLoadingBooks) {
      setIsLoadingBooks(true);
      try {
        const books = await getBooks();
        setAllBooks(books);
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setIsLoadingBooks(false);
      }
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const matches = allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.category && b.category.toLowerCase().includes(query))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, allBooks]);

  const categories = [
    { label: "BESTSELLERS", href: "/collections" },
    { label: "NEW BOOKS", href: "/collections?category=Fiction" },
    { label: "HIGHLIGHTS", href: "/collections?category=Non-Fiction" },
    { label: "FICTION", href: "/collections?category=Fiction" },
    { label: "NON-FICTION", href: "/collections?category=Non-Fiction" },
    { label: "GENRES", href: "/genres" },
    { label: "AUTHORS", href: "/authors" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xs font-jakarta">
      
      {/* Tier 1: Waterstones Top Utility Bar */}
      <div className="border-b border-neutral-200 px-4 sm:px-8 md:px-12 py-2.5 flex items-center justify-between gap-4">
        
        {/* Waterstones Classic Serif Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-[#1A1A1A] hover:text-[#0C4A60] transition-colors">
            BookBazaar
          </span>
        </Link>

        {/* Middle Utility Links */}
        <div className="hidden lg:flex items-center gap-5 text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
          <Link href="/contact" className="hover:text-[#0C4A60] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>SHOP FINDER</span>
          </Link>
          <Link href="/about" className="hover:text-[#0C4A60] flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span>HELP</span>
          </Link>
          <Link href="/collections" className="hover:text-[#0C4A60] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>EVENTS</span>
          </Link>
          <Link href="/about" className="hover:text-[#0C4A60] flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
            <span>BLOG</span>
          </Link>
          <Link href="/collections" className="hover:text-[#0C4A60] flex items-center gap-1">
            <Gift className="w-3.5 h-3.5 text-neutral-400" />
            <span>GIFT CARDS</span>
          </Link>
        </div>

        {/* Right Account & Perks */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-bold text-neutral-700">
          <Link href="/about" className="hidden sm:flex items-center gap-1 hover:text-[#0C4A60] uppercase text-[11px] tracking-wider">
            <User className="w-3.5 h-3.5 text-neutral-500" />
            <span>ACCOUNT</span>
          </Link>

          {/* Waterstones Plus Loyalty Badge */}
          <Link href="/about" className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-emerald-100 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-600 block" />
            <span>JOIN PLUS</span>
          </Link>

          <Link href="/collections" className="hidden sm:flex items-center gap-1 hover:text-[#0C4A60] uppercase text-[11px] tracking-wider">
            <Heart className="w-3.5 h-3.5 text-neutral-500" />
            <span>WISHLIST</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Tier 2: Waterstones Category Strip + Search + Basket */}
      <div className="border-b border-neutral-200 px-4 sm:px-8 md:px-12 py-2 flex items-center justify-between gap-4">
        
        {/* Navigation Categories with Vertical Separator Pipes */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-xs font-bold text-neutral-800 uppercase tracking-wider overflow-x-auto">
          {categories.map((cat, idx) => (
            <div key={cat.label} className="flex items-center gap-2 lg:gap-3">
              <Link
                href={cat.href}
                className={`py-1 hover:text-[#0C4A60] transition-colors whitespace-nowrap ${
                  pathname === cat.href ? "text-[#0C4A60] font-black" : ""
                }`}
              >
                {cat.label}
              </Link>
              {idx < categories.length - 1 && (
                <span className="text-neutral-300 font-light select-none">|</span>
              )}
            </div>
          ))}
        </nav>

        {/* Right Search Input & Basket */}
        <div className="flex items-center gap-3 sm:gap-4 flex-grow md:flex-grow-0 justify-end">
          
          {/* Waterstones Inline Search Box */}
          <div className="relative w-full sm:w-64 lg:w-80" ref={searchRef}>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search Title, Author, Keyword..."
                value={searchQuery}
                onFocus={handleSearchFocus}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 text-xs bg-neutral-50 text-[#1A1A1A] rounded border border-neutral-300 focus:bg-white focus:border-[#0C4A60] focus:outline-none transition-all placeholder:text-neutral-400 font-medium"
              />
              <button 
                type="button" 
                className="absolute right-2 text-neutral-500 hover:text-[#0C4A60]"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
              <div className="absolute top-full right-0 left-0 sm:w-96 mt-1 bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden z-50 p-2 text-left">
                {isLoadingBooks ? (
                  <div className="p-4 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0C4A60]" /> Searching catalog...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-50 rounded">
                      Matching Books ({searchResults.length})
                    </div>
                    {searchResults.map((book) => (
                      <Link
                        key={book.id}
                        href={`/products/${book.id}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded transition-colors group"
                      >
                        <div className="w-8 h-11 bg-neutral-100 rounded overflow-hidden flex-shrink-0 border border-neutral-200">
                          {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="text-xs font-serif font-bold text-[#1A1A1A] truncate group-hover:text-[#0C4A60]">
                            {book.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 truncate">{book.author}</div>
                        </div>
                        <div className="text-xs font-bold text-[#0C4A60] whitespace-nowrap">
                          {book.price || "£14.99"}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-neutral-400">No books found matching keyword.</div>
                )}
              </div>
            )}
          </div>

          {/* Waterstones Basket Icon Button */}
          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-neutral-800 hover:text-[#0C4A60] transition-colors p-1 flex-shrink-0"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-neutral-800" />
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#0C4A60] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
              BASKET
            </span>
          </Link>

        </div>

      </div>

      {/* Tier 3: Waterstones Free Delivery Banner */}
      <div className="bg-[#F8F8F7] text-neutral-700 text-xs py-1.5 px-4 text-center border-b border-neutral-200 font-medium">
        <span>Free worldwide delivery on all curated digital EPUB editions • Guaranteed Quality</span>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 p-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="p-2 bg-neutral-50 rounded text-xs font-bold text-neutral-800 hover:bg-neutral-100 hover:text-[#0C4A60]"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}

    </header>
  );
}

