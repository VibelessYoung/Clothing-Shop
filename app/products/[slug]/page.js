import { notFound } from "next/navigation";
import { ArrowRight, Check, ShoppingBag, Sparkles } from "lucide-react";

import { products } from "@/app/components/data/products";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "محصول پیدا نشد",
    };
  }

  return {
    title: `${product.name} | AMIR`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 sm:px-8 sm:pt-40 lg:px-12">
        {/* Breadcrumb */}

        <div className="mb-10 flex items-center gap-2 text-[8px] text-black/30 dark:text-white/25">
          <span>فروشگاه</span>

          <ArrowRight className="h-3 w-3" />

          <span>{product.category}</span>

          <ArrowRight className="h-3 w-3" />

          <span className="text-black/60 dark:text-white/50">
            {product.name}
          </span>
        </div>

        {/* Product */}

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Gallery */}

          <div className="grid grid-cols-2 gap-3">
            {product.gallery.map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden rounded-[1.5rem] bg-black/[0.04] dark:bg-white/[0.04] ${
                  index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>

          {/* Info */}

          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="flex items-center justify-between">
              <span className="text-[8px] uppercase tracking-[0.25em] text-black/30 dark:text-white/25">
                {product.category}
              </span>

              {product.discount && (
                <span className="rounded-full bg-black px-3 py-1.5 text-[8px] text-white dark:bg-white dark:text-black">
                  {product.discount}% تخفیف
                </span>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-light tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Price */}

            <div className="mt-7 flex items-center gap-3">
              <span className="text-lg font-medium">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>

              {product.oldPrice && (
                <span className="text-xs text-black/25 line-through dark:text-white/20">
                  {product.oldPrice.toLocaleString("fa-IR")} تومان
                </span>
              )}
            </div>

            {/* Description */}

            <p className="mt-7 text-sm font-light leading-8 text-black/45 dark:text-white/40">
              {product.description}
            </p>

            {/* Colors */}

            <div className="mt-8">
              <p className="mb-3 text-[9px] font-medium">رنگ</p>

              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="rounded-full border border-black/10 px-4 py-2 text-[9px] transition-all hover:border-black hover:bg-black hover:text-white dark:border-white/10 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[9px] font-medium">سایز</p>

                <button
                  type="button"
                  className="text-[8px] text-black/35 underline underline-offset-4 dark:text-white/30"
                >
                  راهنمای سایز
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-black/10 px-3 text-[9px] transition-all hover:border-black hover:bg-black hover:text-white dark:border-white/10 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}

            <button
              type="button"
              className="group mt-8 flex w-full items-center justify-between rounded-2xl bg-black px-5 py-4 text-xs font-medium text-white transition-all duration-300 hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85"
            >
              <span>افزودن به سبد خرید</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 dark:bg-black/10">
                <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </span>
            </button>

            {/* Features */}

            <div className="mt-8 border-t border-black/[0.08] pt-6 dark:border-white/[0.08]">
              <p className="mb-4 text-[9px] font-medium">ویژگی‌های محصول</p>

              <div className="space-y-3">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="h-3.5 w-3.5 text-black/30 dark:text-white/25" />

                    <span className="text-[9px] text-black/45 dark:text-white/35">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-black/[0.07] bg-black/[0.02] px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-[8px] text-black/40 dark:text-white/30">
                {product.available
                  ? "این محصول موجود است"
                  : "این محصول فعلاً ناموجود است"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-24 flex items-center justify-center border-t border-black/[0.08] pt-12 dark:border-white/[0.08]">
          <div className="text-center">
            <Sparkles className="mx-auto h-4 w-4 text-black/20 dark:text-white/15" />

            <p className="mt-4 text-[9px] text-black/30 dark:text-white/25">
              طراحی شده برای استایل شما
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
