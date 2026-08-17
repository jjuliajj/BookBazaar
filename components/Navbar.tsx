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
    { label: "ALL BOOKS", href: "/collections" },
    { label: "GENRES", href: "/genres" },
    { label: "AUTHORS", href: "/authors" },
    { label: "ABOUT US", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xs font-jakarta">
      
      {/* Tier 1: Waterstones Top Main Bar */}
      <div className="border-b border-neutral-200 px-4 sm:px-8 md:px-12 py-3 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Waterstones Classic Serif Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-[#1A1A1A] hover:text-[#0C4A60] transition-colors">
            BookBazaar
          </span>
        </Link>

        {/* Center: Inline Search Box */}
        <div className="relative flex-grow max-w-xl hidden sm:block" ref={searchRef}>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Title, Author, Keyword..."
              value={searchQuery}
              onFocus={handleSearchFocus}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3.5 pr-9 py-2 text-xs bg-neutral-50 text-[#1A1A1A] rounded-xs border border-neutral-300 focus:bg-white focus:border-[#0C4A60] focus:outline-none transition-all placeholder:text-neutral-400 font-medium"
            />
            <button 
              type="button" 
              className="absolute right-2.5 text-neutral-500 hover:text-[#0C4A60]"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Live Search Suggestions Dropdown */}
          {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
            <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-neutral-200 rounded-xs shadow-xl overflow-hidden z-50 p-2 text-left">
              {isLoadingBooks ? (
                <div className="p-4 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#0C4A60]" /> Searching catalog...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-50 rounded-xs">
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
                      className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-xs transition-colors group"
                    >
                      <div className="w-8 h-11 bg-neutral-100 rounded-xs overflow-hidden flex-shrink-0 border border-neutral-200">
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

        {/* Right Side: Help & Shopping Basket */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link 
            href="/contact" 
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#0C4A60] uppercase tracking-wider transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-neutral-400" />
            <span>Help Desk</span>
          </Link>

          {/* Waterstones Basket Icon Button */}
          <Link
            href="/cart"
            className="flex items-center gap-2 bg-[#F8F8F7] hover:bg-neutral-200 border border-neutral-300 text-neutral-800 hover:text-[#0C4A60] transition-all px-3.5 py-1.5 rounded-xs"
          >
            <div className="relative">
              <ShoppingBag className="w-4.5 h-4.5 text-[#0C4A60]" />
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0C4A60] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              BASKET
            </span>
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

      {/* Mobile Search Box */}
      <div className="sm:hidden px-4 py-2 border-b border-neutral-200 bg-neutral-50" ref={searchRef}>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Title, Author, Keyword..."
            value={searchQuery}
            onFocus={handleSearchFocus}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-8 py-1.5 text-xs bg-white text-[#1A1A1A] rounded-xs border border-neutral-300 focus:border-[#0C4A60] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 absolute right-2.5 text-neutral-400" />
        </div>
      </div>

      {/* Tier 2: Waterstones Clean Category Navigation Strip */}
      <div className="border-b border-neutral-200 px-4 sm:px-8 md:px-12 py-2 flex items-center justify-center bg-white">
        
        {/* Navigation Categories with Vertical Separator Pipes */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-bold text-neutral-800 uppercase tracking-wider">
          {categories.map((cat, idx) => (
            <div key={cat.label} className="flex items-center gap-4 lg:gap-6">
              <Link
                href={cat.href}
                className={`py-1 hover:text-[#0C4A60] transition-colors whitespace-nowrap ${
                  pathname === cat.href ? "text-[#0C4A60] font-black border-b-2 border-[#0C4A60]" : ""
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

      </div>

      {/* Tier 3: Waterstones Free Delivery Ribbon */}
      <div className="bg-[#F8F8F7] text-neutral-700 text-xs py-1.5 px-4 text-center border-b border-neutral-200 font-medium">
        <span>Free worldwide delivery on all curated digital EPUB editions • Guaranteed Quality</span>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 p-4 space-y-2 shadow-lg">
          <div className="flex flex-col space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-colors ${
                  pathname === cat.href ? "bg-[#0C4A60] text-white" : "text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xs text-xs font-bold uppercase tracking-wider text-neutral-800 hover:bg-neutral-100 flex items-center gap-2 pt-2 border-t border-neutral-200"
            >
              <HelpCircle className="w-4 h-4 text-neutral-500" />
              <span>Help Desk & Contact</span>
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}

