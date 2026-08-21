"use client";

import Link from "next/link";
import { ArrowUpLeft, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "amir_wishlist";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      setIsFavorite(stored.includes(product.id));
    } catch (error) {
      console.error("Wishlist read error:", error);
      setIsFavorite(false);
    }
  }, [product.id]);

  const toggleWishlist = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      let updated;

      if (stored.includes(product.id)) {
        updated = stored.filter((id) => id !== product.id);
      } else {
        updated = [...stored, product.id];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      setIsFavorite(updated.includes(product.id));

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Wishlist update error:", error);
    }
  };

  return (
    <article className="group">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-black/[0.04] dark:bg-white/[0.04]">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>

        {/* Discount */}
        {product.discount && (
          <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-[8px] font-medium text-white dark:bg-white dark:text-black">
            {product.discount}%-
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={
            isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
          }
          className={`absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
            isFavorite ? "bg-white text-red-500" : "bg-black/30 text-white"
          }`}
        >
          <Heart
            className="h-3.5 w-3.5"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        {/* Quick Action */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-between rounded-xl bg-white/90 px-4 py-3 text-[9px] font-medium text-black opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-black/90 dark:text-white"
        >
          <span>مشاهده محصول</span>
          <ArrowUpLeft className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Info */}
      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[8px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
              {product.category}
            </p>

            <Link href={`/products/${product.slug}`}>
              <h3 className="mt-2 text-sm font-medium tracking-[-0.02em] text-black transition-colors hover:text-black/60 dark:text-white dark:hover:text-white/60">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            aria-label="افزودن به سبد خرید"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 transition-all duration-300 hover:bg-black hover:text-white dark:border-white/10 dark:text-white/40 dark:hover:bg-white dark:hover:text-black"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-medium">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>

          {product.oldPrice && (
            <span className="text-[9px] text-black/25 line-through dark:text-white/20">
              {product.oldPrice.toLocaleString("fa-IR")}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="mt-4 flex items-center gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color}
                className="rounded-full border border-black/10 px-2 py-1 text-[7px] text-black/35 dark:border-white/10 dark:text-white/30"
              >
                {color}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
