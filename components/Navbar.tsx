"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { Search, X, Loader2, Menu, ShoppingBag, Landmark } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, isMounted } = useCart();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navItems = [
    { label: "Grand Pavilions", href: "/collections" },
    { label: "Literary Avenues", href: "/genres" },
    { label: "Master Scribes", href: "/authors" },
    { label: "Bazaar Archives", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 md:px-12 py-4 flex justify-between items-center ${
        isScrolled || isMobileMenuOpen ? "bg-[#F9F6F0]/95 backdrop-blur-md shadow-sm border-b border-[#D8CEBE]" : "bg-[#F9F6F0]/85 backdrop-blur-xs border-b border-[#D8CEBE]/40"
      }`}
    >
      {/* Brand Logo & Name */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-full bg-[#2C3437] text-[#C5A059] p-2 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform border border-[#C5A059]/40">
          <Landmark className="w-5 h-5 text-[#C5A059]" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#2C3437] leading-none">
            Book<span className="text-[#C5A059] italic font-normal">Bazaar</span>
          </span>
          <span className="text-[9px] font-sans font-bold tracking-widest text-[#2C3437]/70 uppercase mt-0.5">European Classic Marketplace</span>
        </div>
      </Link>

      {/* Header Search Bar */}
      <div className="relative hidden lg:block w-72 xl:w-96" ref={searchRef}>
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#C5A059]" />
          <input
            type="text"
            placeholder="Search pavilions, manuscripts, authors..."
            value={searchQuery}
            onFocus={handleSearchFocus}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs bg-white text-[#2C3437] rounded-full border border-[#D8CEBE] focus:border-[#C5A059] focus:outline-none transition-all placeholder:text-[#2C3437]/50 font-sans"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 p-1 text-[#2C3437]/40 hover:text-[#2C3437]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results */}
        {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#F9F6F0] border border-[#D8CEBE] rounded-2xl shadow-xl overflow-hidden z-50 p-2 font-sans">
            {isLoadingBooks ? (
              <div className="p-4 text-center text-xs text-[#2C3437]/70 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" /> Searching pavilions...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-serif font-bold uppercase tracking-widest text-[#C5A059]">
                  Pavilion Matches ({searchResults.length})
                </div>
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    href={`/products/${book.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-white rounded-xl transition-colors group"
                  >
                    <div className="w-9 h-12 bg-[#2C3437] rounded overflow-hidden flex-shrink-0 border border-[#D8CEBE]">
                      {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-serif font-bold text-[#2C3437] truncate group-hover:text-[#C5A059]">
                        {book.title}
                      </div>
                      <div className="text-[11px] text-[#2C3437]/70 truncate">by {book.author}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-[#2C3437]/50">No pavilion titles found.</div>
            )}
          </div>
        )}
      </div>

      {/* Nav Links & Commercial Cart */}
      <div className="flex items-center gap-4 sm:gap-6 font-sans">
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-[#2C3437]/80 uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-[#C5A059] transition-colors py-1 ${
                pathname === item.href ? "text-[#C5A059] border-b-2 border-[#C5A059]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/cart"
          className="bg-[#2C3437] hover:bg-[#C5A059] text-[#F9F6F0] p-2.5 sm:px-4 sm:py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-sm hover:scale-105 border border-[#C5A059]/40"
        >
          <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
          <span className="hidden sm:inline">Pavilion Cart</span>
          {isMounted && (
            <span className="bg-[#C5A059] text-[#2C3437] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              ${cartTotal.toFixed(2)} ({cartCount})
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#2C3437]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
