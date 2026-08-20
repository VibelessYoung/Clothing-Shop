"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import ProductCard from "@/app/components/products/ProductCard";
import { products } from "@/app/components/data/products";

const categories = [
  "همه",
  ...new Set(products.map((product) => product.category)),
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");
  const [sort, setSort] = useState("newest");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "همه") {
      result = result.filter((product) => product.category === category);
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((product) =>
        `${product.name} ${product.category}`.toLowerCase().includes(query),
      );
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;

      default:
        break;
    }

    return result;
  }, [category, search, sort]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white"
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="relative overflow-hidden px-5 pb-12 pt-32 sm:px-8 sm:pt-40 lg:px-12">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.02]" />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-[8px] uppercase tracking-[0.3em] text-black/30 dark:text-white/25">
                Collection / 2026
              </p>

              <h1 className="mt-5 text-[clamp(3rem,7vw,7rem)] font-light leading-none tracking-[-0.065em]">
                فروشگاه
                <span className="mr-3 font-semibold">محصولات</span>
              </h1>

              <p className="mt-6 max-w-xl text-xs leading-7 text-black/40 dark:text-white/35 sm:text-sm">
                مجموعه‌ای از لباس‌های مینیمال و مدرن برای ساختن استایل شخصی شما.
              </p>
            </div>

            <div className="hidden text-left sm:block">
              <span className="font-mono text-[9px] text-black/20 dark:text-white/15">
                {products.length.toString().padStart(2, "0")}
              </span>

              <p className="mt-1 text-[8px] text-black/25 dark:text-white/20">
                PRODUCTS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <section className="sticky top-16 z-30 border-y border-black/[0.07] bg-white/85 backdrop-blur-xl dark:border-white/[0.07] dark:bg-black/85">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          {/* Categories */}

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-[9px] transition-all duration-300 ${
                    active
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border border-black/10 text-black/40 hover:border-black/20 hover:text-black dark:border-white/10 dark:text-white/35 dark:hover:border-white/20 dark:hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Search + Sort */}

          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] px-3 dark:border-white/10 dark:bg-white/[0.02]">
              <Search className="h-3.5 w-3.5 text-black/30 dark:text-white/25" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجوی محصول..."
                className="w-full bg-transparent py-2.5 text-[10px] outline-none placeholder:text-black/25 dark:placeholder:text-white/20"
              />

              {search && (
                <button type="button" onClick={() => setSearch("")}>
                  <X className="h-3 w-3 text-black/30 dark:text-white/25" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-black/10 px-3 dark:border-white/10">
              <SlidersHorizontal className="h-3 w-3 text-black/30 dark:text-white/25" />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent py-2.5 text-[9px] outline-none"
              >
                <option value="newest">جدیدترین</option>

                <option value="price-low">ارزان‌ترین</option>

                <option value="price-high">گران‌ترین</option>

                <option value="discount">بیشترین تخفیف</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          {/* Result count */}

          <div className="mb-8 flex items-center justify-between">
            <p className="text-[9px] text-black/30 dark:text-white/25">
              {filteredProducts.length.toLocaleString("fa-IR")} محصول
            </p>

            <p className="font-mono text-[8px] text-black/20 dark:text-white/15">
              SHOP / 01
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-black/[0.07] dark:border-white/[0.07]">
              <Search className="h-5 w-5 text-black/20 dark:text-white/15" />

              <h2 className="mt-5 text-sm font-medium">محصولی پیدا نشد</h2>

              <p className="mt-2 text-[9px] text-black/30 dark:text-white/25">
                عبارت جستجو یا دسته‌بندی را تغییر دهید.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("همه");
                }}
                className="mt-6 rounded-full bg-black px-5 py-2.5 text-[9px] text-white dark:bg-white dark:text-black"
              >
                پاک کردن فیلترها
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
