"use client";

import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { ShoppingBag, Heart, Check } from "lucide-react";

export default function AddToCartActions({ bookId }: { bookId: string }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(bookId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2 font-jakarta">
      <button 
        onClick={handleAdd}
        className="bg-[#0C4A60] hover:bg-[#083344] text-white px-8 py-3.5 rounded-xs font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center space-x-2.5 flex-1"
      >
        {added ? (
          <>
            <Check className="w-4 h-4 text-emerald-300 stroke-[2.5]" />
            <span>Added to Basket</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Basket (Instant EPUB)</span>
          </>
        )}
      </button>
      
      <button className="border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 px-6 py-3.5 rounded-xs font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-[#0C4A60]" />
        <span>Add to Wishlist</span>
      </button>
    </div>
  );
}
