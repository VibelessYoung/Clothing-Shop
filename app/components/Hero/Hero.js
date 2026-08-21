"use client";

import { ArrowLeft, ArrowUpLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        {/* Top Glow */}

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.025]" />

        {/* Bottom Glow */}

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.02]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-center px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-28">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="order-2 max-w-xl lg:order-1">
            {/* Eyebrow */}

            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
                <Sparkles className="h-3.5 w-3.5" />
              </span>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-black/50 dark:text-white/50">
                  مجموعه جدید
                </p>

                <p className="mt-0.5 text-[8px] text-black/25 dark:text-white/25">
                  پاییز / زمستان ۱۴۰۵
                </p>
              </div>
            </div>

            {/* Heading */}

            <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-light leading-[0.95] tracking-[-0.06em]">
              <span className="block text-black dark:text-white">متفاوت</span>

              <span className="mr-8 block font-semibold tracking-[-0.07em] text-black/90 dark:text-white/90 sm:mr-14">
                بپوش.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-8 max-w-md text-sm font-light leading-8 text-black/50 dark:text-white/45 sm:text-[15px]">
              استایل تو، امضای توست.
              <br />
              مجموعه‌ای از لباس‌های مینیمال و خاص برای کسانی که متفاوت بودن را
              انتخاب می‌کنند.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {/* Primary */}
              <Link href="#products">
                <button
                  type="button"
                  className="group flex items-center gap-4 rounded-full bg-black px-6 py-3.5 text-[10px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 dark:bg-white dark:text-black dark:hover:shadow-white/10"
                >
                  <span>مشاهده محصولات</span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:-translate-x-1 dark:bg-black/10">
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </span>
                </button>
              </Link>
            </div>

            {/* Stats */}

            <div className="mt-12 flex items-center gap-8 border-t border-black/[0.08] pt-6 dark:border-white/[0.08]">
              <div>
                <p className="text-lg font-medium tracking-tight">+۵۰</p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-black/30 dark:text-white/25">
                  محصول جدید
                </p>
              </div>

              <div className="h-8 w-px bg-black/10 dark:bg-white/10" />

              <div>
                <p className="text-lg font-medium tracking-tight">۱۴۰۵</p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-black/30 dark:text-white/25">
                  کالکشن جدید
                </p>
              </div>

              <div className="h-8 w-px bg-black/10 dark:bg-white/10" />

              <div>
                <p className="text-lg font-medium tracking-tight">Premium</p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-black/30 dark:text-white/25">
                  کیفیت ساخت
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[620px]">
              {/* Main Image */}

              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-900">
                {/* Replace this image with your product/model image */}

                <img
                  src="/images/cloth.jpg"
                  alt="مدل پوشیده در لباس‌های جدید"
                  className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-[1.03] group-hover:grayscale-0"
                />

                {/* Image Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />

                {/* Collection Label */}

                <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-xl">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-white">
                    New Collection
                  </span>
                </div>

                {/* Bottom Product Info */}

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div className="text-white">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/60">
                      Essential Collection
                    </p>

                    <p className="mt-2 text-lg font-medium tracking-tight">
                      استایل روزمره
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                    aria-label="مشاهده مجموعه"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Floating Card */}

              <div className="absolute -bottom-5 -left-3 hidden w-40 rounded-2xl border border-black/[0.08] bg-white/90 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/[0.08] dark:bg-black/80 dark:shadow-black/40 sm:block lg:-left-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-black/35 dark:text-white/30">
                    Selected
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                </div>

                <p className="text-xs font-medium">Essential Oversized</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-black/40 dark:text-white/35">
                    مشاهده محصول
                  </span>

                  <ArrowUpLeft className="h-3.5 w-3.5 text-black/40 dark:text-white/35" />
                </div>
              </div>

              {/* Vertical Text */}

              <div className="absolute -right-10 top-1/2 hidden -translate-y-1/2 rotate-90 lg:block">
                <span className="text-[7px] uppercase tracking-[0.5em] text-black/20 dark:text-white/20">
                  AMIR / AUTUMN WINTER 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
        <span className="text-[7px] uppercase tracking-[0.3em] text-black/25 dark:text-white/20">
          Scroll to explore
        </span>

        <div className="h-8 w-px bg-black/15 dark:bg-white/15" />
      </div>
    </section>
  );
}
