"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { products } from "../data/products";

export default function ProductSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const STORAGE_KEY = "amir_wishlist";

  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      if (Array.isArray(stored)) {
        setLikedProducts(stored);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  }, []);

  const toggleLike = (productId) => {
    setLikedProducts((current) => {
      const updated = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <section
      id="products"
      dir="rtl"
      className="relative overflow-hidden bg-white py-24 text-black transition-colors duration-500 dark:bg-black dark:text-white sm:py-32 lg:py-40"
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.025]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-black/[0.02] blur-3xl dark:bg-white/[0.02]" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="mb-12 px-5 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-8 border-b border-black/[0.08] pb-6 dark:border-white/[0.08]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.05] dark:bg-white/[0.06]">
                  <Sparkles className="h-3 w-3" />
                </span>

                <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-black/40 dark:text-white/35">
                  Selected Pieces
                </span>
              </div>

              <h2 className="text-3xl font-light tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                انتخاب‌های
                <span className="mr-2 font-semibold">خاص ما</span>
              </h2>

              <p className="mt-4 max-w-md text-xs leading-6 text-black/40 dark:text-white/35">
                قطعات منتخب این فصل؛ طراحی شده برای ساختن استایلی ساده، خاص و
                ماندگار.
              </p>
            </div>

            {/* Desktop Navigation */}

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                className="product-slider-prev group flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] transition-all duration-300 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white dark:hover:text-black"
                aria-label="Previous products"
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                className="product-slider-next group flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] transition-all duration-300 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white dark:hover:text-black"
                aria-label="Next products"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-slider px-5 sm:px-8 lg:px-12">
          <Swiper
            modules={[Navigation, Pagination, A11y, Keyboard]}
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.realIndex);
            }}
            navigation={{
              prevEl: ".product-slider-prev",
              nextEl: ".product-slider-next",
            }}
            pagination={{
              el: ".product-slider-pagination",
              clickable: true,
            }}
            keyboard={{
              enabled: true,
            }}
            grabCursor
            watchOverflow
            spaceBetween={18}
            slidesPerView={1.15}
            breakpoints={{
              640: {
                slidesPerView: 1.8,
                spaceBetween: 20,
              },

              768: {
                slidesPerView: 2.3,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 3.15,
                spaceBetween: 22,
              },

              1280: {
                slidesPerView: 3.45,
                spaceBetween: 24,
              },
            }}
            className="!overflow-visible"
          >
            {products.map((product) => {
              const isLiked = likedProducts.includes(product.id);

              return (
                <SwiperSlide key={product.id}>
                  <article className="group">
                    <div className="relative aspect-[0.78] overflow-hidden rounded-[1.5rem] bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={product.image}
                        alt={product.name}
                        draggable={false}
                        className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />

                      {/* Image Gradient */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/[0.03] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Badge */}

                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-2 text-[8px] font-medium text-black shadow-sm backdrop-blur-xl dark:bg-black/80 dark:text-white">
                          {product.badge}
                        </span>
                      </div>

                      {/* Wishlist */}

                      <button
                        type="button"
                        onClick={() => toggleLike(product.id)}
                        aria-label="افزودن به علاقه‌مندی‌ها"
                        className={`absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 ${
                          isLiked
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "bg-white/80 text-black/60 hover:bg-white hover:text-black dark:bg-black/60 dark:text-white/60 dark:hover:bg-black dark:hover:text-white"
                        }`}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${
                            isLiked ? "fill-current" : ""
                          }`}
                        />
                      </button>

                      {/* Quick Add */}

                      <button
                        type="button"
                        className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-between rounded-xl bg-white/95 px-4 py-3 text-[9px] font-medium text-black opacity-0 shadow-xl backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-black/90 dark:text-white"
                      >
                        <span>افزودن به سبد خرید</span>

                        <ShoppingBag className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="px-1 pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
                            {product.category}
                          </p>

                          <h3 className="mt-2 text-sm font-medium tracking-tight">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-[9px] text-black/30 dark:text-white/25">
                            {product.englishName}
                          </p>
                        </div>

                        <div className="text-left">
                          <p className="whitespace-nowrap text-xs font-medium">
                            {product.price}

                            <span className="mr-1 text-[8px] text-black/35 dark:text-white/30">
                              تومان
                            </span>
                          </p>

                          {product.oldPrice && (
                            <p className="mt-1 text-[9px] text-black/25 line-through dark:text-white/20">
                              {product.oldPrice}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Colors */}

                      <div className="mt-4 flex items-center gap-1.5">
                        {product.colors.map((color, colorIndex) => (
                          <span
                            key={colorIndex}
                            className={`h-3 w-3 rounded-full border border-black/10 ${color} dark:border-white/20`}
                          />
                        ))}

                        <span className="mr-1 text-[8px] text-black/25 dark:text-white/20">
                          {product.colors.length} رنگ
                        </span>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="mt-10 flex items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Pagination */}

          <div className="flex items-center gap-4">
            <span className="font-mono text-[8px] text-black/25 dark:text-white/20">
              {String(activeSlide + 1).padStart(2, "0")}
            </span>

            <div className="product-slider-pagination !static !flex !w-auto items-center gap-1" />

            <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
              {String(products.length).padStart(2, "0")}
            </span>
          </div>

          {/* View All */}
          <Link href="/products">
            <button
              type="button"
              className="group flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em] text-black/50 transition-colors hover:text-black dark:text-white/45 dark:hover:text-white"
            >
              <span className="border-b border-black/20 pb-1 dark:border-white/20">
                مشاهده همه محصولات
              </span>

              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
      <style jsx global>{`
        .product-slider-pagination {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .product-slider-pagination .swiper-pagination-bullet {
          width: 4px;
          height: 4px;
          margin: 0 !important;
          border-radius: 9999px;
          opacity: 0.2;
          background: currentColor;
          transition:
            width 0.35s ease,
            opacity 0.35s ease;
        }

        .product-slider-pagination .swiper-pagination-bullet-active {
          width: 22px;
          opacity: 1;
        }

        .product-slider .swiper-slide {
          height: auto;
        }

        @media (max-width: 639px) {
          .product-slider-pagination .swiper-pagination-bullet-active {
            width: 18px;
          }
        }
      `}</style>
    </section>
  );
}
