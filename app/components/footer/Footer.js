"use client";

import {
  ArrowUpLeft,
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

const footerLinks = {
  shop: [
    { label: "جدیدترین‌ها", href: "#products" },
    { label: "پرفروش‌ها", href: "#products" },
    { label: "لباس‌های مردانه", href: "#products" },
    { label: "لباس‌های زنانه", href: "#products" },
    { label: "اکسسوری", href: "#products" },
  ],

  company: [
    { label: "درباره ما", href: "#about" },
    { label: "داستان برند", href: "#about" },
    { label: "مجله", href: "#articles" },
    { label: "تماس با ما", href: "#contact" },
    { label: "سؤالات متداول", href: "#faq" },
  ],

  support: [
    { label: "راهنمای سایز", href: "#faq" },
    { label: "پیگیری سفارش", href: "#faq" },
    { label: "شرایط بازگشت", href: "#faq" },
    { label: "قوانین و مقررات", href: "#faq" },
  ],
};

export default function Footer() {
  const scrollToSection = (href) => {
    if (!href.startsWith("#")) return;

    const section = document.querySelector(href);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      dir="rtl"
      className="relative overflow-hidden bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.025]" />

        <div className="absolute -left-40 bottom-20 h-[500px] w-[500px] rounded-full bg-black/[0.02] blur-3xl dark:bg-white/[0.02]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="border-y border-black/[0.08] py-16 dark:border-white/[0.08] sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            {/* Text */}

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.05] dark:bg-white/[0.06]">
                  <Sparkles className="h-3 w-3" />
                </span>

                <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-black/40 dark:text-white/35">
                  Stay in the loop
                </span>
              </div>

              <h2 className="max-w-3xl text-4xl font-light leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                بخشی از
                <span className="mr-2 font-semibold">داستان ما</span>
                باش.
              </h2>

              <p className="mt-6 max-w-xl text-xs leading-7 text-black/40 dark:text-white/35 sm:text-sm">
                برای اطلاع از کالکشن‌های جدید، محصولات محدود و اتفاقات تازه
                برند، عضو خبرنامه ما شو.
              </p>
            </div>

            {/* Newsletter */}

            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full lg:w-[380px]"
            >
              <div className="group flex items-center rounded-2xl border border-black/10 bg-black/[0.025] p-1.5 transition-all duration-300 focus-within:border-black/25 focus-within:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.025] dark:focus-within:border-white/25 dark:focus-within:bg-white/[0.04]">
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Mail className="h-4 w-4 shrink-0 text-black/25 dark:text-white/25" />

                  <input
                    type="email"
                    placeholder="ایمیل شما..."
                    aria-label="ایمیل"
                    className="w-full bg-transparent py-3 text-xs text-black outline-none placeholder:text-black/25 dark:text-white dark:placeholder:text-white/20"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="عضویت در خبرنامه"
                  className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white transition-all duration-300 hover:scale-[0.97] dark:bg-white dark:text-black"
                >
                  <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              <p className="mt-3 text-[8px] leading-5 text-black/25 dark:text-white/20">
                با عضویت، با دریافت ایمیل‌های مرتبط با محصولات و اخبار برند
                موافقت می‌کنید.
              </p>
            </form>
          </div>
        </div>
        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.3fr_2fr] lg:gap-20">
          <div>
            {/* Logo */}

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-3"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] transition-all duration-300 group-hover:border-black/20 group-hover:bg-black/[0.07] dark:border-white/10 dark:bg-white/[0.03] dark:group-hover:border-white/20 dark:group-hover:bg-white/[0.07]">
                <span className="text-sm font-semibold tracking-[-0.05em]">
                  A.
                </span>

                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/70" />
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold tracking-[-0.04em]">AMIR</p>

                <p className="mt-0.5 text-[7px] uppercase tracking-[0.3em] text-black/30 dark:text-white/25">
                  Fashion Studio
                </p>
              </div>
            </button>

            {/* Description */}

            <p className="mt-7 max-w-sm text-xs leading-7 text-black/40 dark:text-white/35">
              طراحی برای کسانی که به جزئیات اهمیت می‌دهند. لباس‌هایی ساده،
              ماندگار و ساخته‌شده برای سبک زندگی امروز.
            </p>

            {/* Location */}

            <div className="mt-7 flex items-center gap-3 text-black/35 dark:text-white/30">
              <MapPin className="h-3.5 w-3.5" />

              <span className="text-[9px]">تهران، ایران</span>
            </div>

            {/* Socials */}

            <div className="mt-8 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] transition-all duration-300 hover:bg-black hover:text-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white dark:hover:text-black"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Email"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] transition-all duration-300 hover:bg-black hover:text-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white dark:hover:text-black"
              >
                <Mail className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {/* Shop */}

            <FooterColumn
              title="فروشگاه"
              links={footerLinks.shop}
              onNavigate={scrollToSection}
            />

            {/* Company */}

            <FooterColumn
              title="برند"
              links={footerLinks.company}
              onNavigate={scrollToSection}
            />

            {/* Support */}

            <FooterColumn
              title="پشتیبانی"
              links={footerLinks.support}
              onNavigate={scrollToSection}
            />
          </div>
        </div>
        <div className="border-y border-black/[0.08] py-12 dark:border-white/[0.08] sm:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[8px] tracking-[0.2em] text-black/20 dark:text-white/15">
                EST. 2026
              </p>

              <p className="mt-4 max-w-2xl text-2xl font-light leading-tight tracking-[-0.04em] sm:text-3xl lg:text-4xl">
                Less noise.
                <span className="mr-2 font-semibold">More style.</span>
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-black/40 transition-colors hover:text-black dark:text-white/35 dark:hover:text-white"
            >
              <span>بازگشت به بالا</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-black/25 dark:border-white/10 dark:group-hover:border-white/25">
                <ArrowUpLeft className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}

          <p className="text-[8px] text-black/25 dark:text-white/20">
            © 2026 AMIR Fashion Studio. تمامی حقوق محفوظ است.
          </p>

          {/* Legal */}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              className="text-[8px] text-black/25 transition-colors hover:text-black dark:text-white/20 dark:hover:text-white"
            >
              حریم خصوصی
            </button>

            <button
              type="button"
              className="text-[8px] text-black/25 transition-colors hover:text-black dark:text-white/20 dark:hover:text-white"
            >
              قوانین استفاده
            </button>

            <button
              type="button"
              className="text-[8px] text-black/25 transition-colors hover:text-black dark:text-white/20 dark:hover:text-white"
            >
              شرایط خرید
            </button>
          </div>

          {/* Developer */}

          <a
            href="#"
            className="group flex items-center gap-2 text-[8px] text-black/25 transition-colors hover:text-black dark:text-white/20 dark:hover:text-white"
          >
            ساخته شده با
            <span className="font-medium text-black/50 dark:text-white/40">
              ♥
            </span>
            برای استایل بهتر
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
      <div className="pointer-events-none overflow-hidden px-5 pb-[-10px] sm:px-8 lg:px-12">
        <div className="select-none whitespace-nowrap text-center text-[18vw] font-semibold leading-[0.7] tracking-[-0.08em] text-black/[0.035] dark:text-white/[0.035]">
          AMIR
        </div>
      </div>
    </footer>
  );
}
function FooterColumn({ title, links, onNavigate }) {
  return (
    <div>
      <h3 className="mb-6 text-[9px] font-medium uppercase tracking-[0.2em] text-black/50 dark:text-white/40">
        {title}
      </h3>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <button
              type="button"
              onClick={() => onNavigate(link.href)}
              className="group flex items-center gap-2 text-right text-[10px] text-black/35 transition-colors duration-300 hover:text-black dark:text-white/30 dark:hover:text-white"
            >
              <span>{link.label}</span>

              <ArrowUpRight className="h-2.5 w-2.5 translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-50" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
