"use client";

import { useState } from "react";
import { ArrowUpLeft, ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    id: 1,
    question: "چطور می‌توانم سفارشم را ثبت کنم؟",
    answer:
      "محصول موردنظر خود را انتخاب کنید، رنگ و سایز را مشخص کرده و آن را به سبد خرید اضافه کنید. سپس از طریق سبد خرید وارد مرحله پرداخت شوید و اطلاعات ارسال را تکمیل کنید.",
  },
  {
    id: 2,
    question: "چقدر زمان می‌برد تا سفارش به دستم برسد؟",
    answer:
      "زمان ارسال بسته به شهر مقصد متفاوت است. سفارش‌ها پس از ثبت و تأیید، در کوتاه‌ترین زمان ممکن آماده ارسال می‌شوند و اطلاعات پیگیری سفارش نیز برای شما ارسال خواهد شد.",
  },
  {
    id: 3,
    question: "آیا امکان تعویض یا مرجوع کردن کالا وجود دارد؟",
    answer:
      "بله. در صورت رعایت شرایط بازگشت کالا، امکان تعویض یا مرجوع کردن محصول وجود دارد. لطفاً قبل از ارسال کالا، قوانین و شرایط بازگشت را مطالعه کنید.",
  },
  {
    id: 4,
    question: "چطور سایز مناسب خودم را انتخاب کنم؟",
    answer:
      "برای هر محصول راهنمای سایز اختصاصی قرار داده‌ایم. پیشنهاد می‌کنیم قبل از ثبت سفارش، اندازه‌های خود را با جدول سایز همان محصول مقایسه کنید.",
  },
  {
    id: 5,
    question: "آیا محصولات دوباره موجود می‌شوند؟",
    answer:
      "بعضی از محصولات و سایزهای محبوب دوباره شارژ می‌شوند. اگر محصولی ناموجود باشد، می‌توانید اعلان موجود شدن آن را فعال کنید تا هنگام شارژ مطلع شوید.",
  },
  {
    id: 6,
    question: "چطور می‌توانم وضعیت سفارش خود را پیگیری کنم؟",
    answer:
      "پس از ارسال سفارش، کد پیگیری برای شما ارسال می‌شود. همچنین می‌توانید از بخش سفارش‌های حساب کاربری، وضعیت سفارش خود را مشاهده کنید.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      dir="rtl"
      className="relative overflow-hidden bg-white py-24 text-black transition-colors duration-500 dark:bg-black dark:text-white sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-48 top-20 h-[450px] w-[450px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.025]" />

        <div className="absolute -bottom-48 left-0 h-[450px] w-[450px] rounded-full bg-black/[0.02] blur-3xl dark:bg-white/[0.02]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex items-center justify-between border-b border-black/[0.08] pb-5 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.05] dark:bg-white/[0.06]">
              <HelpCircle className="h-3.5 w-3.5" />
            </span>

            <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-black/40 dark:text-white/35">
              سوالات متداول
            </span>
          </div>

          <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
            FAQ / 06
          </span>
        </div>
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/25">
              راهنمای خرید
            </p>

            <h2 className="mt-5 max-w-md text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1.05] tracking-[-0.055em]">
              سوالی
              <span className="mr-2 block font-semibold">داری؟</span>
            </h2>

            <p className="mt-7 max-w-sm text-sm font-light leading-8 text-black/45 dark:text-white/40">
              همه چیز را ساده و شفاف توضیح داده‌ایم. اگر پاسخ سوالت را اینجا
              پیدا نکردی، تیم پشتیبانی ما آماده کمک به توست.
            </p>

            {/* Support CTA */}
            <Link href="#contact">
              <button
                type="button"
                className="group mt-8 flex items-center gap-3 rounded-full border border-black/10 px-5 py-3 text-[9px] font-medium text-black/60 transition-all duration-300 hover:border-black/25 hover:bg-black/[0.03] hover:text-black dark:border-white/10 dark:text-white/55 dark:hover:border-white/25 dark:hover:bg-white/[0.04] dark:hover:text-white"
              >
                <span>ارتباط با ما</span>

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/[0.05] transition-transform duration-300 group-hover:-translate-x-1 dark:bg-white/[0.07]">
                  <ArrowUpLeft className="h-3 w-3" />
                </span>
              </button>
            </Link>

            {/* Mini Info */}

            <div className="mt-12 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />

                <span className="relative h-2 w-2 rounded-full bg-green-500" />
              </span>

              <span className="text-[8px] uppercase tracking-[0.15em] text-black/30 dark:text-white/25">
                آنلاین هستیم
              </span>
            </div>
          </div>
          <div className="border-t border-black/[0.08] dark:border-white/[0.08]">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="border-b border-black/[0.08] dark:border-white/[0.08]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-6 text-right sm:py-7"
                  >
                    {/* Number */}

                    <span className="w-7 shrink-0 font-mono text-[8px] text-black/20 dark:text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}

                    <span
                      className={`flex-1 text-sm font-medium transition-colors duration-300 sm:text-[15px] ${
                        isOpen
                          ? "text-black dark:text-white"
                          : "text-black/60 group-hover:text-black dark:text-white/55 dark:group-hover:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Icon */}

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen
                          ? "rotate-180 border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                          : "border-black/10 text-black/40 group-hover:border-black/25 dark:border-white/10 dark:text-white/35 dark:group-hover:border-white/25"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Answer */}

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-7 pr-12 sm:pr-12">
                        <div className="max-w-2xl border-r border-black/10 pr-5 dark:border-white/10">
                          <p className="text-xs font-light leading-7 text-black/45 dark:text-white/40 sm:text-[13px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "ارسال سریع",
              text: "سفارش‌ها با دقت بسته‌بندی و ارسال می‌شوند.",
            },
            {
              title: "پرداخت امن",
              text: "پرداخت سفارش‌ها در محیطی امن انجام می‌شود.",
            },
            {
              title: "پشتیبانی",
              text: "در تمام مراحل خرید کنار شما هستیم.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-black/[0.07] bg-black/[0.015] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-black/[0.03] dark:border-white/[0.07] dark:bg-white/[0.015] dark:hover:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-medium">{item.title}</span>

                <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 text-[10px] leading-6 text-black/35 dark:text-white/30">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-24 flex flex-col items-center text-center">
          <Sparkles className="h-4 w-4 text-black/20 dark:text-white/20" />
          <p className="mt-5 max-w-lg text-xs leading-7 text-black/35 dark:text-white/30">
            هنوز سوالی داری؟
            <br />
            ما اینجاییم تا تجربه خریدت را ساده‌تر کنیم.
          </p>
        </div>
      </div>
    </section>
  );
}
