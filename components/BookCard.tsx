"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ShoppingBag, Check, BookOpen, Eye } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image }: BookCardProps) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formattedPrice = price ? (price.startsWith("$") ? price.replace("$", "£") : (price.startsWith("£") ? price : `£${price}`)) : "£14.99";
  const numericPrice = parseFloat(formattedPrice.replace(/[^0-9.]/g, "")) || 14.99;
  const originalPrice = (numericPrice + 4.00).toFixed(2);

  return (
    <div className="bg-white p-3 font-jakarta flex flex-col justify-between h-full group text-left relative select-none">
      
      {/* Book Cover Container with Waterstones Hover Actions */}
      <div className="relative mb-3 flex justify-center">
        <Link 
          href={`/products/${id}`} 
          className="block relative w-full aspect-[3/4] max-h-56 max-w-[170px] bg-neutral-100 rounded-xs overflow-hidden shadow-sm group-hover:shadow-md transition-shadow"
        >
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-neutral-100 text-neutral-400">
              <BookOpen className="w-8 h-8 mb-1 opacity-40 text-[#0C4A60]" />
              <span className="text-xs font-serif font-bold italic line-clamp-2 text-neutral-700">{title}</span>
            </div>
          )}

          {/* Waterstones Hover Dual Action Button Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1.5 z-20">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`w-full py-1.5 px-2 text-[10px] font-black uppercase tracking-wider transition-all rounded-xs flex items-center justify-center gap-1 shadow-sm ${
                added 
                  ? "bg-emerald-600 text-white" 
                  : "bg-[#0C4A60] hover:bg-[#083344] text-white"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3 stroke-[2.5]" /> ADDED
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3" /> ADD TO BASKET
                </>
              )}
            </button>

            <Link
              href={`/products/${id}`}
              className="w-full py-1.5 px-2 bg-[#8C7355] hover:bg-[#755F45] text-white text-[10px] font-black uppercase tracking-wider rounded-xs text-center transition-colors shadow-sm flex items-center justify-center gap-1"
            >
              <Eye className="w-3 h-3" /> QUICK VIEW
            </Link>
          </div>
        </Link>
      </div>

      {/* Book Metadata */}
      <div className="flex-grow flex flex-col justify-between space-y-1.5">
        <div>
          <Link href={`/products/${id}`}>
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A] hover:text-[#0C4A60] transition-colors line-clamp-2 leading-snug min-h-[2.25rem]">
              {title}
            </h3>
          </Link>
          <Link href={`/authors`} className="text-xs text-[#0C4A60] hover:underline block mt-0.5 truncate font-medium">
            {author}
          </Link>
          <span className="text-[11px] text-neutral-500 block">
            Digital EPUB • {category || "Paperback"}
          </span>
        </div>

        {/* Pricing Block */}
        <div className="pt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-bold text-[#1A1A1A] font-sans">
            {formattedPrice}
          </span>
          <span className="text-[11px] text-neutral-400 line-through font-sans">
            £{originalPrice}
          </span>
        </div>
      </div>

    </div>
  );
}
