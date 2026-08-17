import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-neutral-300 pt-12 pb-10 border-t border-neutral-800 font-jakarta text-left">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        
        {/* Newsletter Signup Row */}
        <div className="border-b border-neutral-800 pb-10 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif font-bold text-lg text-white">
              Join the BookBazaar Literary Circle
            </h3>
            <p className="text-xs text-neutral-400">
              Sign up for author interviews, signed edition releases, and exclusive member discounts.
            </p>
          </div>

          <div className="flex w-full md:w-auto max-w-md gap-2">
            <input 
              type="email" 
              placeholder="Enter your email address..."
              className="bg-neutral-900 border border-neutral-700 text-white text-xs px-4 py-2.5 rounded-xs w-full focus:outline-none focus:border-[#0C4A60]"
            />
            <button className="bg-[#0C4A60] hover:bg-[#083344] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs transition-colors flex-shrink-0">
              SIGN UP
            </button>
          </div>
        </div>

        {/* 4 Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800 text-xs">
          
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px]">
              Explore Editions
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><Link href="/collections" className="hover:text-white transition-colors">Bestsellers</Link></li>
              <li><Link href="/collections?category=Fiction" className="hover:text-white transition-colors">Fiction Highlights</Link></li>
              <li><Link href="/collections?category=Non-Fiction" className="hover:text-white transition-colors">Non-Fiction Essentials</Link></li>
              <li><Link href="/genres" className="hover:text-white transition-colors">Categories & Genres</Link></li>
              <li><Link href="/authors" className="hover:text-white transition-colors">Author Directory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Help & Contact Us</Link></li>
              <li><Link href="/refund" className="hover:text-white transition-colors">Digital Returns & Refunds</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Basket & Orders</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Delivery FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px]">
              About BookBazaar
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story & Curators</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy & Security</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Press & Partnerships</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-[11px]">
              Guaranteed Security
            </h4>
            <p className="text-neutral-400 leading-relaxed mb-3">
              All transactions are encrypted with 256-bit SSL technology powered by Stripe.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 bg-neutral-900 p-2.5 rounded-xs border border-neutral-800 text-[11px] font-bold">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Verified 256-Bit SSL Checkout</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Badges */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} BookBazaar Ltd. Inspired by classic British bookselling. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-400">
            <span className="bg-neutral-900 px-2 py-1 rounded">STRIPE</span>
            <span className="bg-neutral-900 px-2 py-1 rounded">VISA / MC</span>
            <span className="bg-neutral-900 px-2 py-1 rounded">APPLE PAY</span>
            <span className="bg-neutral-900 px-2 py-1 rounded">DRM-FREE EPUB</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

