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
    <main className="flex min-h-screen flex-col bg-[#FAF6F0] text-[#1C1917]">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          {/* Header & Back link */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-[#C85A32] hover:text-[#D97706] transition-colors mb-2 uppercase tracking-widest gap-2 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Collections
              </Link>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1C1917] flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-[#D97706]" />
                Your Shopping Cart
              </h1>
            </div>
            <span className="text-xs font-bold text-[#D97706] bg-[#D97706]/10 px-4 py-2 rounded-full border border-[#D97706]/20 w-fit">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Volume' : 'Volumes'} Selected
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#D97706]/20 shadow-md max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-[#D97706]/10 text-[#D97706] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D97706]/20">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1C1917] mb-2">Your Cart is Empty</h3>
              <p className="text-xs text-[#1C1917]/70 mb-6">Explore our curated global bazaar library and discover your next book.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#C85A32] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                <span>Browse Bazaar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Cart Item List Container */}
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-4 border border-[#D97706]/20 shadow-xs hover:border-[#D97706] transition-all flex gap-4 items-center group"
                  >
                    {/* Book Cover */}
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[9/16] bg-[#FAF6F0] rounded-xl overflow-hidden flex-shrink-0 shadow-md border border-[#D97706]/20 block group-hover:scale-105 transition-transform duration-300">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#FAF6F0] text-[#D97706] text-[9px] font-serif italic text-center p-1">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    {/* Book Info */}
                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-serif text-base md:text-lg font-bold text-[#1C1917] hover:text-[#D97706] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#C85A32] text-sm whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.00'}`}
                        </span>
                      </div>

                      <p className="text-xs text-[#1C1917]/70 italic">
                        by {item.author}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Pill */}
                        <div className="flex items-center space-x-3 bg-[#FAF6F0] border border-[#D97706]/20 rounded-full px-3 py-1">
                          <button 
                            className="text-[#1C1917]/60 hover:text-[#D97706] transition-colors p-0.5"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#1C1917] w-4 text-center">{item.quantity}</span>
                          <button 
                            className="text-[#1C1917]/60 hover:text-[#D97706] transition-colors p-0.5"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button 
                          className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-lg transition-all"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Box - High Contrast & Crystal Clear Text */}
              <div className="lg:col-span-5">
                <div className="bg-[#1C1917] text-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-[#D97706]/40 space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="font-serif text-xl font-bold flex items-center gap-2 text-white">
                      <Sparkles className="w-5 h-5 text-[#D97706]" /> Order Summary
                    </h2>
                    <span className="text-xs font-bold text-[#D97706] bg-[#D97706]/20 px-2.5 py-1 rounded-full uppercase">EPUB Instant</span>
                  </div>

                  <div className="space-y-3 text-xs text-white">
                    <div className="flex justify-between text-white/90">
                      <span className="font-medium text-white/80">Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-bold text-white text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span className="font-medium text-white/80">Digital Delivery</span>
                      <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">FREE INSTANT DOWNLOAD</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span className="font-medium text-white/80">Estimated Tax</span>
                      <span className="font-bold text-white">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-white/10">
                      <span className="text-base font-bold text-white">Total Due</span>
                      <span className="text-3xl font-extrabold text-[#D97706]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-gradient-to-r from-[#D97706] to-[#C85A32] hover:from-[#C85A32] hover:to-[#D97706] text-white py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#D97706]/30 flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-white/70 uppercase tracking-widest text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Instant Direct Download Access</span>
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
