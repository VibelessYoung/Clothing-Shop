"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { products } from "@/app/components/data/products";

const STORAGE_KEY = "amir_wishlist";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }

    setMounted(true);
  }, []);

  const wishlistProducts = useMemo(() => {
    return products.filter((product) => wishlistIds.includes(product.id));
  }, [wishlistIds]);

  const removeFromWishlist = (productId) => {
    const updated = wishlistIds.filter((id) => id !== productId);

    setWishlistIds(updated);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearWishlist = () => {
    setWishlistIds([]);

    localStorage.removeItem(STORAGE_KEY);
  };

  if (!mounted) {
    return <main dir="rtl" className="min-h-screen bg-white dark:bg-black" />;
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white"
    >
      <header className="border-b border-black/[0.07] dark:border-white/[0.07]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          {/* Logo */}

          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] transition-all duration-300 group-hover:bg-black/[0.07] dark:border-white/10 dark:bg-white/[0.03] dark:group-hover:bg-white/[0.07]">
              <span className="text-xs font-semibold">A.</span>

              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white" />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold">AMIR</p>

              <p className="text-[7px] uppercase tracking-[0.3em] text-black/25 dark:text-white/20">
                Fashion Studio
              </p>
            </div>
          </Link>

          {/* Back */}

          <Link
            href="/products"
            className="group flex items-center gap-2 text-[9px] text-black/40 transition-colors hover:text-black dark:text-white/35 dark:hover:text-white"
          >
            <span>بازگشت به فروشگاه</span>

            <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </header>
      <section className="relative overflow-hidden px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12 lg:pt-20">
        {/* Ambient */}

        <div className="pointer-events-none absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.02]" />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                  <Heart className="h-4 w-4" />
                </span>

                <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
                  WISHLIST / 01
                </span>
              </div>

              <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-none tracking-[-0.07em]">
                علاقه‌مندی
                <span className="mr-3 font-semibold">های من</span>
              </h1>

              <p className="mt-6 max-w-xl text-xs leading-7 text-black/40 dark:text-white/35 sm:text-sm">
                محصولاتی که برای بعد ذخیره کرده‌ای اینجا منتظر تو هستند.
              </p>
            </div>

            {/* Count */}

            <div className="sm:text-left">
              <span className="font-mono text-4xl font-light tracking-[-0.05em]">
                {wishlistProducts.length.toString().padStart(2, "0")}
              </span>

              <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-black/25 dark:text-white/20">
                Saved Items
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {wishlistProducts.length > 0 ? (
            <>
              {/* Toolbar */}

              <div className="mb-8 flex items-center justify-between border-b border-black/[0.07] pb-5 dark:border-white/[0.07]">
                <p className="text-[9px] text-black/30 dark:text-white/25">
                  {wishlistProducts.length.toLocaleString("fa-IR")} محصول ذخیره
                  شده
                </p>

                <button
                  type="button"
                  onClick={clearWishlist}
                  className="group flex items-center gap-2 text-[8px] text-black/30 transition-colors hover:text-red-500 dark:text-white/25 dark:hover:text-red-400"
                >
                  <Trash2 className="h-3 w-3" />

                  <span>پاک کردن همه</span>
                </button>
              </div>

              {/* Grid */}

              <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlistProducts.map((product) => (
                  <WishlistCard
                    key={product.id}
                    product={product}
                    onRemove={removeFromWishlist}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyWishlist />
          )}
        </div>
      </section>
    </main>
  );
}
function WishlistCard({ product, onRemove }) {
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

        {/* Remove */}

        <button
          type="button"
          onClick={() => onRemove(product.id)}
          aria-label="حذف از علاقه‌مندی‌ها"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-red-500"
        >
          <Heart className="h-3.5 w-3.5" fill="currentColor" />
        </button>

        {/* Discount */}

        {product.discount && (
          <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-[8px] text-white dark:bg-white dark:text-black">
            {product.discount}%-
          </div>
        )}

        {/* View */}

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
            <p className="text-[8px] uppercase tracking-[0.2em] text-black/25 dark:text-white/20">
              {product.category}
            </p>

            <Link href={`/products/${product.slug}`}>
              <h3 className="mt-2 text-sm font-medium tracking-[-0.02em] transition-colors hover:text-black/50 dark:hover:text-white/50">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Add To Cart */}

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/40 transition-all duration-300 hover:bg-black hover:text-white dark:border-white/10 dark:text-white/40 dark:hover:bg-white dark:hover:text-black"
            aria-label="افزودن به سبد خرید"
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
      </div>
    </article>
  );
}
function EmptyWishlist() {
  return (
    <div className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-black/[0.07] bg-black/[0.015] dark:border-white/[0.07] dark:bg-white/[0.015]">
      {/* Decorative Circle */}

      <div className="absolute h-64 w-64 rounded-full border border-black/[0.05] dark:border-white/[0.05]" />

      <div className="absolute h-44 w-44 rounded-full border border-black/[0.05] dark:border-white/[0.05]" />

      {/* Icon */}

      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-xl shadow-black/5 dark:border-white/10 dark:bg-black dark:shadow-black/30">
        <Heart className="h-6 w-6 text-black/30 dark:text-white/25" />
      </div>

      <h2 className="relative mt-7 text-lg font-medium">
        هنوز چیزی ذخیره نکردی
      </h2>

      <p className="relative mt-3 max-w-sm text-center text-[9px] leading-6 text-black/30 dark:text-white/25">
        محصولاتی که دوست داری را به لیست علاقه‌مندی‌ها اضافه کن تا بعداً راحت‌تر
        پیدایشان کنی.
      </p>

      <Link
        href="/products"
        className="group relative mt-7 flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-[9px] font-medium text-white transition-all duration-300 hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
      >
        <span>مشاهده محصولات</span>

        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
