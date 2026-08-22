"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { products } from "../components/data/products";

const CART_KEY = "amir_cart";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

      if (Array.isArray(stored)) {
        setCart(stored);
      }
    } catch (error) {
      console.error("Cart error:", error);
      setCart([]);
    }

    setMounted(true);
  }, []);

  const cartItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((product) => product.id === item.id);

        if (!product) return null;

        return {
          ...product,
          quantity: item.quantity || 1,
          selectedColor: item.selectedColor || null,
          selectedSize: item.selectedSize || null,
        };
      })
      .filter(Boolean);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(String(item.price).replace(/[^0-9]/g, ""));

      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const shipping = subtotal >= 5000000 ? 0 : 150000;

  const total = subtotal + shipping;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const updateCart = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCart((current) => {
      const updated = current.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      );

      localStorage.setItem(CART_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  const removeItem = (productId) => {
    setCart((current) => {
      const updated = current.filter((item) => item.id !== productId);

      localStorage.setItem(CART_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCart([]);
  };

  if (!mounted) {
    return <main dir="rtl" className="min-h-screen bg-white dark:bg-black" />;
  }

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        overflow-hidden
        bg-white
        text-black
        transition-colors
        duration-500
        dark:bg-black
        dark:text-white
      "
    >
      <div className="pointer-events-none fixed inset-0">
        <div
          className="
            absolute
            -right-40
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-black/[0.025]
            blur-3xl
            dark:bg-white/[0.025]
          "
        />

        <div
          className="
            absolute
            -left-40
            bottom-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-black/[0.02]
            blur-3xl
            dark:bg-white/[0.02]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <header className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-black/[0.05]
                dark:bg-white/[0.06]
              "
            >
              <ShoppingBag className="h-3.5 w-3.5" />
            </span>

            <span
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-black/40
                dark:text-white/35
              "
            >
              Shopping Bag
            </span>
          </div>

          <div className="flex flex-col justify-between gap-6 border-b border-black/[0.08] pb-7 sm:flex-row sm:items-end dark:border-white/[0.08]">
            <div>
              <h1 className="text-4xl font-light tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                سبد
                <span className="mr-2 font-semibold">خرید</span>
              </h1>

              <p className="mt-4 max-w-md text-xs leading-6 text-black/40 dark:text-white/35">
                انتخاب‌های شما آماده‌اند. قبل از نهایی کردن سفارش، محصولات و
                تعداد آن‌ها را بررسی کنید.
              </p>
            </div>

            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="
                  flex
                  items-center
                  gap-2
                  self-start
                  text-[9px]
                  text-black/35
                  transition-colors
                  hover:text-red-500
                  sm:self-auto
                  dark:text-white/30
                "
              >
                <Trash2 className="h-3.5 w-3.5" />
                خالی کردن سبد
              </button>
            )}
          </div>
        </header>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
                  محصولات
                </span>

                <span className="font-mono text-[9px] text-black/25 dark:text-white/20">
                  {String(totalItems).padStart(2, "0")} آیتم
                </span>
              </div>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={() => updateCart(item.id, item.quantity + 1)}
                    onDecrease={() => updateCart(item.id, item.quantity - 1)}
                    onRemove={() => removeItem(item.id)}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>

              {/* Continue Shopping */}

              <Link
                href="/products"
                className="
                  group
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  text-[9px]
                  font-medium
                  text-black/45
                  transition-colors
                  hover:text-black
                  dark:text-white/40
                  dark:hover:text-white
                "
              >
                <ArrowRight
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
                ادامه خرید
              </Link>
            </section>
            <aside>
              <div
                className="
                  sticky
                  top-8
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  border-black/[0.08]
                  bg-black/[0.025]
                  p-6
                  dark:border-white/[0.08]
                  dark:bg-white/[0.035]
                "
              >
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">خلاصه سفارش</p>

                    <p className="mt-1 text-[8px] text-black/30 dark:text-white/25">
                      ORDER SUMMARY
                    </p>
                  </div>

                  <Sparkles className="h-4 w-4 text-black/25 dark:text-white/20" />
                </div>

                <div className="space-y-4 border-b border-black/[0.07] pb-6 dark:border-white/[0.07]">
                  <SummaryRow
                    label="تعداد محصولات"
                    value={`${formatPrice(totalItems)} عدد`}
                  />

                  <SummaryRow
                    label="مبلغ محصولات"
                    value={`${formatPrice(subtotal)} تومان`}
                  />

                  <SummaryRow
                    label="هزینه ارسال"
                    value={
                      shipping === 0
                        ? "رایگان"
                        : `${formatPrice(shipping)} تومان`
                    }
                    highlight={shipping === 0}
                  />
                </div>

                {/* Total */}

                <div className="flex items-end justify-between py-6">
                  <span className="text-xs font-medium">مبلغ نهایی</span>

                  <div className="text-left">
                    <p className="text-xl font-semibold tracking-tight">
                      {formatPrice(total)}
                    </p>

                    <span className="text-[8px] text-black/30 dark:text-white/25">
                      تومان
                    </span>
                  </div>
                </div>

                {/* Checkout */}

                <button
                  type="button"
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    bg-black
                    px-5
                    py-4
                    text-[10px]
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:bg-black/90
                    active:scale-[0.99]
                    dark:bg-white
                    dark:text-black
                    dark:hover:bg-white/90
                  "
                >
                  <span>ادامه و پرداخت</span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                      dark:bg-black/10
                    "
                  >
                    <ArrowLeft
                      className="
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-300
                        group-hover:-translate-x-0.5
                      "
                    />
                  </span>
                </button>

                {/* Benefits */}

                <div className="mt-6 space-y-3">
                  <Benefit
                    icon={Truck}
                    title="ارسال سریع"
                    description="تحویل امن و سریع سفارش"
                  />

                  <Benefit
                    icon={ShieldCheck}
                    title="پرداخت امن"
                    description="پرداخت مطمئن و محافظت‌شده"
                  />
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
function CartItem({ item, onIncrease, onDecrease, onRemove, formatPrice }) {
  const price = Number(String(item.price).replace(/[^0-9]/g, ""));

  return (
    <article
      className="
        group
        flex
        gap-4
        rounded-[1.5rem]
        border
        border-black/[0.08]
        bg-black/[0.02]
        p-3
        transition-all
        duration-300
        hover:border-black/[0.14]
        dark:border-white/[0.08]
        dark:bg-white/[0.025]
        dark:hover:border-white/[0.14]
        sm:p-4
      "
    >
      {/* Image */}

      <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 sm:h-40 sm:w-32">
        <img
          src={item.image}
          alt={item.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {item.badge && (
          <span
            className="
              absolute
              right-2
              top-2
              rounded-full
              bg-white/90
              px-2
              py-1
              text-[7px]
              text-black
              backdrop-blur-xl
              dark:bg-black/80
              dark:text-white
            "
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Content */}

      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
              {item.category}
            </p>

            <h2 className="mt-1 truncate text-sm font-medium">{item.name}</h2>

            {item.englishName && (
              <p className="mt-1 text-[8px] text-black/25 dark:text-white/20">
                {item.englishName}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onRemove}
            aria-label="حذف محصول"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              text-black/25
              transition-all
              hover:bg-red-500/10
              hover:text-red-500
              dark:text-white/20
            "
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          {/* Quantity */}

          <div
            className="
              flex
              items-center
              rounded-xl
              border
              border-black/[0.08]
              bg-white/50
              dark:border-white/[0.08]
              dark:bg-black/30
            "
          >
            <button
              type="button"
              onClick={onDecrease}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                text-black/40
                transition-colors
                hover:text-black
                dark:text-white/40
                dark:hover:text-white
              "
            >
              <Minus className="h-3 w-3" />
            </button>

            <span className="w-7 text-center font-mono text-[9px]">
              {String(item.quantity).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={onIncrease}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                text-black/40
                transition-colors
                hover:text-black
                dark:text-white/40
                dark:hover:text-white
              "
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}

          <div className="text-left">
            <p className="text-xs font-semibold">
              {formatPrice(price * item.quantity)}
            </p>

            <p className="mt-1 text-[8px] text-black/25 dark:text-white/20">
              تومان
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
function SummaryRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between gap-4 text-[9px]">
      <span className="text-black/35 dark:text-white/30">{label}</span>

      <span
        className={
          highlight
            ? "font-medium text-green-600 dark:text-green-400"
            : "text-black/70 dark:text-white/70"
        }
      >
        {value}
      </span>
    </div>
  );
}
function Benefit({ icon: Icon, title, description }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-black/[0.05]
          dark:bg-white/[0.06]
        "
      >
        <Icon className="h-3.5 w-3.5" />
      </span>

      <div>
        <p className="text-[9px] font-medium">{title}</p>

        <p className="mt-0.5 text-[7px] text-black/25 dark:text-white/20">
          {description}
        </p>
      </div>
    </div>
  );
}
function EmptyCart() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center rounded-[2rem] border border-black/[0.08] bg-black/[0.02] px-6 py-20 text-center dark:border-white/[0.08] dark:bg-white/[0.025]">
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-black/[0.05]
          dark:bg-white/[0.06]
        "
      >
        <ShoppingBag className="h-6 w-6 text-black/40 dark:text-white/40" />
      </div>

      <p className="mt-6 text-lg font-medium">سبد خرید شما خالی است</p>

      <p className="mt-2 max-w-sm text-[10px] leading-6 text-black/35 dark:text-white/30">
        هنوز محصولی به سبد خرید اضافه نکرده‌اید. مجموعه جدید ما را ببینید و
        محصول مورد علاقه‌تان را انتخاب کنید.
      </p>

      <Link
        href="/products"
        className="
          group
          mt-7
          flex
          items-center
          gap-3
          rounded-2xl
          bg-black
          px-5
          py-3.5
          text-[9px]
          font-medium
          text-white
          transition-all
          hover:bg-black/90
          dark:bg-white
          dark:text-black
          dark:hover:bg-white/90
        "
      >
        <span>مشاهده محصولات</span>

        <ArrowLeft
          className="
            h-3.5
            w-3.5
            transition-transform
            duration-300
            group-hover:-translate-x-1
          "
        />
      </Link>
    </section>
  );
}
