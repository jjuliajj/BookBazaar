"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Loader2, 
  BookOpen, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, allBooks, cartCount, cartTotal, isMounted } = useCart();
  const [loading, setLoading] = useState(false);

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const itemsForStripe = cartItems.map(item => {
        const book = allBooks.find(b => b.id === item.id);
        return { ...book, quantity: item.quantity };
      }).filter(item => item.title);

      if (itemsForStripe.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
        (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://logbook-snowy-gamma.vercel.app/api');

      const response = await fetch(`${API_BASE_URL}/checkout/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itemsForStripe }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      console.error("Checkout failed:", error);
      alert(`Checkout Error: ${error.message || "Payment failed to initialize"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <Navbar />
      
      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl text-left">
          
          {/* Back link */}
          <Link href="/cart" className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-[#0C4A60] transition-colors mb-6 uppercase tracking-wider gap-1.5 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Basket
          </Link>

          {/* Main Card Container */}
          <div className="bg-[#F8F8F7] rounded-xs p-6 md:p-10 border border-neutral-200 shadow-xs grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Shipping & Payment Form */}
            <div className="md:col-span-7 space-y-6 w-full min-w-0">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-4 flex items-center gap-2 border-b border-neutral-200 pb-3">
                  <span className="w-5 h-5 rounded-full bg-[#0C4A60] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                  Recipient Details (EPUB Delivery)
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane"
                      className="w-full bg-white border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0C4A60] transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Austen"
                      className="w-full bg-white border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0C4A60] transition-colors" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-600 mb-1">Email Address for EPUB Download Link</label>
                    <input 
                      type="email" 
                      placeholder="jane.austen@literary.org"
                      className="w-full bg-white border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#0C4A60] transition-colors" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-4 flex items-center gap-2 border-b border-neutral-200 pb-3">
                  <span className="w-5 h-5 rounded-full bg-[#0C4A60] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                  Secure Payment Gateway
                </h2>
                
                <div className="bg-white border-2 border-[#0C4A60] p-4 rounded-xs flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xs bg-emerald-50 text-[#0C4A60] flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1A1A1A]">Stripe Verified Checkout</div>
                      <div className="text-[11px] text-neutral-500">Credit / Debit Card, Apple Pay, Google Pay</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#0C4A60]" />
                </div>
              </div>
            </div>

            {/* Right: Order Overview */}
            <div className="md:col-span-5 w-full min-w-0">
              <div className="bg-white text-[#1A1A1A] rounded-xs p-6 shadow-xs border border-neutral-300 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <h3 className="font-serif text-lg font-bold flex items-center gap-2 text-[#1A1A1A]">
                    <Sparkles className="w-4 h-4 text-[#0C4A60]" /> Basket Summary
                  </h3>
                  <span className="text-xs font-bold text-neutral-500">
                    {cartCount} {cartCount === 1 ? 'Title' : 'Titles'}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {fullCartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-2.5 bg-[#F8F8F7] p-2 rounded-xs border border-neutral-200">
                      <div className="w-8 aspect-[3/4] bg-neutral-200 rounded-xs overflow-hidden flex-shrink-0">
                        {item.cover_url ? (
                          <img src={item.cover_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <BookOpen className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow min-w-0 text-xs">
                        <div className="font-bold text-[#1A1A1A] truncate">{item.title}</div>
                        <div className="text-neutral-500 text-[10px] truncate">{item.author}</div>
                      </div>
                      <div className="text-xs font-bold text-[#0C4A60] whitespace-nowrap px-1">
                        {item.price ? (item.price.startsWith("£") ? item.price : `£${item.price.replace("$", "")}`) : "£14.99"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#1A1A1A]">£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Instant Delivery</span>
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-neutral-200">
                    <span className="text-sm font-bold text-[#1A1A1A]">Total Due</span>
                    <span className="text-2xl font-black text-[#0C4A60]">£{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-[#0C4A60] hover:bg-[#083344] text-white py-3.5 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authorizing Stripe...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize Payment (£{cartTotal.toFixed(2)})</span>
                    </>
                  )}
                </button>

                <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 uppercase tracking-wider text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
