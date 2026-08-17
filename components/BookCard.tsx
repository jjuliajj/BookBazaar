"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus, Landmark, ArrowRight } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image, description }: BookCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
  };

  return (
    <Link href={`/products/${id}`} className="group cursor-pointer block h-full">
      <div className="bg-white border-2 border-[#D8CEBE] rounded-t-[4rem] rounded-b-2xl p-5 shadow-sm hover:shadow-xl hover:border-[#C5A059] transition-all duration-300 flex flex-col h-full group-hover:-translate-y-1">
        
        {/* Arch Shaped Pavilion Header Cover */}
        <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#2C3437] rounded-t-[3.5rem] rounded-b-xl border border-[#D8CEBE]/40 flex-shrink-0">
          {image ? (
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#C5A059] font-serif text-xs px-3 text-center">
              {title}
            </div>
          )}

          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <span className="bg-[#F9F6F0] text-[#2C3437] border border-[#C5A059] px-3 py-1 text-[9px] font-serif font-bold uppercase tracking-widest rounded-full shadow-xs">
              {category || "PAVILION"}
            </span>
          </div>
        </div>

        {/* Info Content */}
        <div className="flex flex-col flex-grow justify-between space-y-3 font-sans text-left">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#2C3437] line-clamp-1 group-hover:text-[#C5A059] transition-colors">
              {title}
            </h3>
            <p className="text-xs text-[#2C3437]/70 italic mt-0.5">by {author}</p>
            {description && (
              <p className="text-[11px] text-[#2C3437]/70 line-clamp-2 mt-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-[#D8CEBE]/60 flex items-center justify-between">
            <span className="text-sm font-serif font-bold text-[#C5A059]">{price}</span>
            
            <button 
              onClick={handleQuickAdd}
              className="bg-[#2C3437] hover:bg-[#C5A059] text-[#F9F6F0] px-3.5 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3 h-3 text-[#C5A059]" /> Add to Cart
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}
