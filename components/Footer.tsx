import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1F1912] text-[#FFFBEB] pt-16 pb-12 border-t border-[#D97706]/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#FFFBEB]/10">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D97706] text-white flex items-center justify-center font-bold">
                B
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-[#FFFBEB]">
                Book<span className="text-[#D97706]">Bazaar</span>
              </span>
            </div>
            <p className="text-xs text-[#FFFBEB]/70 leading-relaxed max-w-sm">
              The premier global literary bazaar. Curating timeless wisdom, artisanal EPUB books, and rare manuscripts for book lovers worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4">Bazaar Navigation</h4>
            <ul className="space-y-2 text-xs text-[#FFFBEB]/80">
              <li><Link href="/collections" className="hover:text-[#D97706] transition-colors">Collections</Link></li>
              <li><Link href="/genres" className="hover:text-[#D97706] transition-colors">Genres & Categories</Link></li>
              <li><Link href="/authors" className="hover:text-[#D97706] transition-colors">Featured Authors</Link></li>
              <li><Link href="/about" className="hover:text-[#D97706] transition-colors">About BookBazaar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D97706] mb-4">Customer Care</h4>
            <ul className="space-y-2 text-xs text-[#FFFBEB]/80">
              <li><Link href="/privacy" className="hover:text-[#D97706] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#D97706] transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-[#D97706] transition-colors">Refund Policy</Link></li>
              <li><Link href="/contact" className="hover:text-[#D97706] transition-colors">Contact Support</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#FFFBEB]/50 gap-4">
          <p>© {new Date().getFullYear()} BookBazaar. All rights reserved. Global Literary Archive.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#D97706] cursor-pointer">Global Shipping</span>
            <span>•</span>
            <span className="hover:text-[#D97706] cursor-pointer">Instant Download</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
