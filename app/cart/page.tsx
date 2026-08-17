"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-white text-[#1A1A1A] font-jakarta">
      <Navbar />
      
      <section className="pt-32 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl text-left">
          
          {/* Header & Back link */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-neutral-300 pb-4">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-[#0C4A60] transition-colors mb-2 uppercase tracking-wider gap-1.5 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Continue Browsing Books
              </Link>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2.5">
                <ShoppingBag className="w-7 h-7 text-[#0C4A60]" />
                Your Shopping Basket
              </h1>
            </div>
            <span className="text-xs font-bold text-[#0C4A60] bg-[#F8F8F7] px-3.5 py-1.5 rounded-xs border border-neutral-200 w-fit">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Title' : 'Titles'} Selected
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-[#F8F8F7] rounded-xs p-12 text-center border border-neutral-200 shadow-xs max-w-lg mx-auto my-8">
              <div className="w-14 h-14 bg-neutral-200 text-[#0C4A60] rounded-xs flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">Your Basket is Empty</h3>
              <p className="text-xs text-neutral-600 mb-6">Explore our curated bookstore collection and discover your next read.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#0C4A60] hover:bg-[#083344] text-white px-8 py-3 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Basket Item List Container */}
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-[#F8F8F7] rounded-xs p-4 border border-neutral-200 shadow-xs hover:border-[#0C4A60] transition-all flex gap-4 items-center group"
                  >
                    {/* Book Cover */}
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[3/4] bg-white rounded-xs overflow-hidden flex-shrink-0 shadow-xs border border-neutral-200 block group-hover:scale-102 transition-transform duration-300">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-[#0C4A60] text-[9px] font-serif italic text-center p-1">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    {/* Book Info */}
                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-serif text-base font-bold text-[#1A1A1A] hover:text-[#0C4A60] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#0C4A60] text-sm whitespace-nowrap">
                          {item.price && item.price.startsWith('£') ? item.price : `£${item.price || '14.99'}`}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-600">
                        by {item.author} • <span className="font-medium text-neutral-500">Digital EPUB</span>
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Pill */}
                        <div className="flex items-center space-x-3 bg-white border border-neutral-300 rounded-xs px-2.5 py-1">
                          <button 
                            className="text-neutral-500 hover:text-[#0C4A60] transition-colors p-0.5"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#1A1A1A] w-4 text-center">{item.quantity}</span>
                          <button 
                            className="text-neutral-500 hover:text-[#0C4A60] transition-colors p-0.5"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button 
                          className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 p-1.5 rounded-xs transition-all text-xs font-medium flex items-center gap-1"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Box */}
              <div className="lg:col-span-5">
                <div className="bg-[#F8F8F7] text-[#1A1A1A] rounded-xs p-6 md:p-8 shadow-xs border border-neutral-300 space-y-6 sticky top-36">
                  <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
                    <h2 className="font-serif text-xl font-bold flex items-center gap-2 text-[#1A1A1A]">
                      <Sparkles className="w-5 h-5 text-[#0C4A60]" /> Basket Summary
                    </h2>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs uppercase">Instant EPUB</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-bold text-[#1A1A1A] text-sm">£{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Worldwide Delivery</span>
                      <span className="text-emerald-700 font-bold uppercase tracking-wider text-[10px]">FREE INSTANT DOWNLOAD</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Estimated VAT/Taxes</span>
                      <span className="font-bold text-[#1A1A1A]">£0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-neutral-300">
                      <span className="text-base font-bold text-[#1A1A1A]">Total Due</span>
                      <span className="text-2xl font-black text-[#0C4A60]">£{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#0C4A60] hover:bg-[#083344] text-white py-3.5 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 group"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-neutral-300 flex items-center justify-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Instant Direct Download • DRM-Free</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
