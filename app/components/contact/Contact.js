"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowUpLeft,
  Check,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactInfo = [
  {
    icon: Mail,
    label: "ایمیل",
    value: "hello@amirstudio.com",
    href: "mailto:hello@amirstudio.com",
  },
  {
    icon: MessageCircle,
    label: "پشتیبانی",
    value: "پاسخگویی سریع",
    href: "#",
  },
  {
    icon: MapPin,
    label: "موقعیت",
    value: "تهران، ایران",
    href: "#",
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          time: new Date().toLocaleString("fa-IR"),
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        },
      );

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      dir="rtl"
      className="relative overflow-hidden bg-white py-24 text-black transition-colors duration-500 dark:bg-black dark:text-white sm:py-32 lg:py-40"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.025]" />

        <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-black/[0.02] blur-3xl dark:bg-white/[0.02]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* =======================================================
            HEADER
        ======================================================== */}

        <div className="mb-14 flex items-center justify-between border-b border-black/[0.08] pb-5 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.05] dark:bg-white/[0.06]">
              <Sparkles className="h-3 w-3" />
            </span>

            <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-black/40 dark:text-white/35">
              Get In Touch
            </span>
          </div>

          <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
            CONTACT / 01
          </span>
        </div>

        {/* =======================================================
            MAIN
        ======================================================== */}

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/25">
              ارتباط با ما
            </p>

            <h2 className="mt-5 max-w-lg text-[clamp(3rem,6vw,6rem)] font-light leading-[0.95] tracking-[-0.06em]">
              با ما
              <span className="mr-2 block font-semibold">صحبت کن.</span>
            </h2>

            <p className="mt-7 max-w-md text-sm font-light leading-8 text-black/45 dark:text-white/40">
              سوالی درباره محصولات داری؟ برای همکاری، پشتیبانی یا هر موضوع دیگری
              می‌توانی از طریق فرم روبه‌رو با ما در ارتباط باشی.
            </p>

            {/* Availability */}

            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />

                <span className="relative h-2 w-2 rounded-full bg-green-500" />
              </span>

              <span className="text-[8px] uppercase tracking-[0.2em] text-black/35 dark:text-white/25">
                آماده پاسخگویی هستیم
              </span>
            </div>

            {/* Contact Information */}

            <div className="mt-12 space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-black/[0.015] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.15] hover:bg-black/[0.03] dark:border-white/[0.07] dark:bg-white/[0.015] dark:hover:border-white/[0.15] dark:hover:bg-white/[0.03]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.05] dark:bg-white/[0.06]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] uppercase tracking-[0.15em] text-black/25 dark:text-white/20">
                        {item.label}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-black/60 dark:text-white/50">
                        {item.value}
                      </p>
                    </div>

                    <ArrowUpLeft className="h-3.5 w-3.5 text-black/20 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 dark:text-white/20" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              FORM
          ====================================================== */}

          <div className="rounded-[2rem] border border-black/[0.08] bg-black/[0.02] p-5 dark:border-white/[0.08] dark:bg-white/[0.025] sm:p-7 lg:p-10">
            <div className="mb-8 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-medium">فرم تماس</p>

                <p className="mt-2 text-[9px] leading-5 text-black/30 dark:text-white/25">
                  اطلاعات خود را وارد کنید تا در سریع‌ترین زمان ممکن با شما تماس
                  بگیریم.
                </p>
              </div>

              <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
                01 — 04
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="نام و نام خانوادگی"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="مثلاً امیر محمدی"
                  required
                />

                <Field
                  label="ایمیل"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  dir="ltr"
                />
              </div>

              {/* Subject */}

              <Field
                label="موضوع"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="موضوع پیام شما"
              />

              {/* Message */}

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[9px] text-black/40 dark:text-white/30"
                >
                  پیام
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="پیامتان را اینجا بنویسید..."
                  required
                  rows={7}
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white/60 px-4 py-4 text-xs text-black outline-none transition-all duration-300 placeholder:text-black/20 focus:border-black/25 focus:bg-white dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/20 dark:focus:border-white/25"
                />
              </div>

              {/* Status */}

              {status === "success" && (
                <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/[0.05] px-4 py-3 text-[9px] text-green-600 dark:text-green-400">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                    <Check className="h-3 w-3" />
                  </span>
                  پیام شما با موفقیت ارسال شد.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-[9px] text-red-600 dark:text-red-400">
                  لطفاً اطلاعات فرم را بررسی کنید و دوباره تلاش کنید.
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex w-full items-center justify-between rounded-2xl bg-black px-5 py-4 text-[10px] font-medium text-white transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <span>
                  {status === "sending" ? "در حال ارسال..." : "ارسال پیام"}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 dark:bg-black/10">
                  {status === "sending" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </span>
              </button>

              <p className="text-center text-[8px] leading-5 text-black/20 dark:text-white/15">
                با ارسال فرم، با قوانین و شرایط استفاده از سایت موافقت می‌کنید.
              </p>
            </form>
          </div>
        </div>

        {/* =======================================================
            BOTTOM STATEMENT
        ======================================================== */}

        <div className="mt-20 flex flex-col items-center border-t border-black/[0.08] pt-12 text-center dark:border-white/[0.08]">
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-black/20 dark:text-white/15">
            Let's create something meaningful
          </p>

          <p className="mt-4 max-w-xl text-xl font-light tracking-[-0.03em] sm:text-2xl">
            هر پیام، شروع یک
            <span className="mr-2 font-semibold">ارتباط جدید</span>
            است.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   FIELD COMPONENT
================================================================ */

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  dir,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] text-black/40 dark:text-white/30"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        dir={dir}
        className="w-full rounded-2xl border border-black/10 bg-white/60 px-4 py-3.5 text-xs text-black outline-none transition-all duration-300 placeholder:text-black/20 focus:border-black/25 focus:bg-white dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/20 dark:focus:border-white/25"
      />
    </div>
  );
}
