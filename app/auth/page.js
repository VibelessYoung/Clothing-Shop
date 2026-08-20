"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
} from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const [status, setStatus] = useState("idle");

  const isLogin = mode === "login";

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setStatus("idle");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setStatus("error");
      return;
    }

    if (!isLogin) {
      if (!form.name || !form.confirmPassword) {
        setStatus("error");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setStatus("passwordMismatch");
        return;
      }
    }

    setStatus("loading");

    /*
      این قسمت را بعداً به API خودت وصل کن.

      مثال:

      const response = await axios.post("/api/login", {
        email: form.email,
        password: form.password,
      });
    */

    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[550px] w-[550px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.02]" />

        <div className="absolute -bottom-40 -left-40 h-[550px] w-[550px] rounded-full bg-black/[0.02] blur-3xl dark:bg-white/[0.02]" />

        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:80px_80px] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
      </div>

      {/* =========================================================
          HEADER
      ========================================================== */}

      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}

          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-black/[0.03] transition-all duration-300 group-hover:border-black/20 group-hover:bg-black/[0.07] dark:border-white/10 dark:bg-white/[0.03] dark:group-hover:border-white/20 dark:group-hover:bg-white/[0.07]">
              <span className="text-xs font-semibold tracking-[-0.05em]">
                A.
              </span>

              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/70" />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-[-0.04em]">AMIR</p>

              <p className="text-[7px] uppercase tracking-[0.3em] text-black/25 dark:text-white/20">
                Fashion Studio
              </p>
            </div>
          </Link>

          {/* Back */}

          <Link
            href="/"
            className="group flex items-center gap-2 text-[9px] text-black/40 transition-colors hover:text-black dark:text-white/35 dark:hover:text-white"
          >
            <span>بازگشت به فروشگاه</span>

            <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </header>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-center px-5 pb-10 pt-28 sm:px-8 lg:px-12">
        <div className="grid w-full gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
          {/* =====================================================
              BRAND SIDE
          ====================================================== */}

          <div className="hidden lg:block">
            <p className="text-[8px] uppercase tracking-[0.35em] text-black/25 dark:text-white/20">
              AMIR / MEMBERS
            </p>

            <h1 className="mt-7 max-w-xl text-[clamp(4rem,7vw,7rem)] font-light leading-[0.88] tracking-[-0.07em]">
              استایل
              <span className="block font-semibold">تو،</span>
              <span className="block">داستان</span>
              <span className="block font-semibold">توست.</span>
            </h1>

            <p className="mt-8 max-w-md text-sm font-light leading-8 text-black/40 dark:text-white/35">
              وارد حساب کاربری خود شوید تا سفارش‌ها، علاقه‌مندی‌ها و اطلاعات
              خرید خود را مدیریت کنید.
            </p>

            {/* Decorative */}

            <div className="mt-12 flex items-center gap-4">
              <span className="h-px w-16 bg-black/10 dark:bg-white/10" />

              <span className="text-[8px] uppercase tracking-[0.2em] text-black/20 dark:text-white/15">
                Personal Style
              </span>
            </div>
          </div>

          {/* =====================================================
              AUTH CARD
          ====================================================== */}

          <div className="mx-auto w-full max-w-[560px] lg:mr-auto">
            <div className="rounded-[2rem] border border-black/[0.08] bg-black/[0.02] p-5 shadow-2xl shadow-black/[0.03] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-black/30 sm:p-8 lg:p-10">
              {/* Card Header */}

              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  <h2 className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                    {isLogin ? "خوش برگشتی" : "حساب خودت را بساز"}
                  </h2>

                  <p className="mt-3 text-[9px] leading-5 text-black/30 dark:text-white/25">
                    {isLogin
                      ? "برای ادامه وارد حساب کاربری خود شوید."
                      : "عضو خانواده AMIR شوید و تجربه خرید شخصی‌تری داشته باشید."}
                  </p>
                </div>

                <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
                  {isLogin ? "01 / 02" : "02 / 02"}
                </span>
              </div>

              {/* Mode Switch */}

              <div className="mt-8 grid grid-cols-2 rounded-xl border border-black/[0.07] bg-black/[0.02] p-1 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className={`rounded-lg py-2.5 text-[9px] transition-all duration-300 ${
                    isLogin
                      ? "bg-black text-white shadow-lg shadow-black/10 dark:bg-white dark:text-black"
                      : "text-black/35 hover:text-black dark:text-white/30 dark:hover:text-white"
                  }`}
                >
                  ورود
                </button>

                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className={`rounded-lg py-2.5 text-[9px] transition-all duration-300 ${
                    !isLogin
                      ? "bg-black text-white shadow-lg shadow-black/10 dark:bg-white dark:text-black"
                      : "text-black/35 hover:text-black dark:text-white/30 dark:hover:text-white"
                  }`}
                >
                  ثبت‌نام
                </button>
              </div>

              {/* Form */}

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {/* Name */}

                {!isLogin && (
                  <AuthField
                    label="نام و نام خانوادگی"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="مثلاً امیر محمدی"
                    icon={User}
                  />
                )}

                {/* Email */}

                <AuthField
                  label="ایمیل"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  icon={Mail}
                  dir="ltr"
                />

                {/* Password */}

                <PasswordField
                  label="رمز عبور"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  visible={showPassword}
                  onToggle={() => setShowPassword((current) => !current)}
                />

                {/* Confirm Password */}

                {!isLogin && (
                  <PasswordField
                    label="تکرار رمز عبور"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    visible={showConfirmPassword}
                    onToggle={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                  />
                )}

                {/* Login Options */}

                {isLogin && (
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={form.remember}
                        onChange={handleChange}
                        className="h-3.5 w-3.5 rounded border-black/20 accent-black dark:border-white/20 dark:accent-white"
                      />

                      <span className="text-[8px] text-black/35 dark:text-white/25">
                        مرا به خاطر بسپار
                      </span>
                    </label>

                    <button
                      type="button"
                      className="text-[8px] text-black/35 underline underline-offset-4 transition-colors hover:text-black dark:text-white/25 dark:hover:text-white"
                    >
                      رمز عبور را فراموش کردم
                    </button>
                  </div>
                )}

                {/* Register Agreement */}

                {!isLogin && (
                  <label className="flex cursor-pointer items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-black/20 accent-black dark:border-white/20 dark:accent-white"
                    />

                    <span className="text-[8px] leading-5 text-black/30 dark:text-white/25">
                      با قوانین، شرایط استفاده و سیاست حریم خصوصی فروشگاه
                      موافقم.
                    </span>
                  </label>
                )}

                {/* Status */}

                {status === "error" && (
                  <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] px-4 py-3 text-[8px] text-red-600 dark:text-red-400">
                    لطفاً تمام فیلدهای ضروری را تکمیل کنید.
                  </div>
                )}

                {status === "passwordMismatch" && (
                  <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] px-4 py-3 text-[8px] text-red-600 dark:text-red-400">
                    رمز عبور و تکرار آن یکسان نیستند.
                  </div>
                )}

                {status === "success" && (
                  <div className="rounded-xl border border-green-500/15 bg-green-500/[0.04] px-4 py-3 text-[8px] text-green-600 dark:text-green-400">
                    عملیات با موفقیت انجام شد.
                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group flex w-full items-center justify-between rounded-2xl bg-black px-5 py-4 text-[10px] font-medium text-white transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  <span>
                    {status === "loading"
                      ? "لطفاً صبر کنید..."
                      : isLogin
                        ? "ورود به حساب"
                        : "ساخت حساب کاربری"}
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 dark:bg-black/10">
                    <ArrowUpLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </form>

              {/* Divider */}

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-black/[0.07] dark:bg-white/[0.07]" />

                <span className="text-[8px] text-black/20 dark:text-white/15">
                  یا
                </span>

                <div className="h-px flex-1 bg-black/[0.07] dark:bg-white/[0.07]" />
              </div>

              {/* Guest */}

              <Link
                href="/products"
                className="group flex w-full items-center justify-between rounded-2xl border border-black/10 px-5 py-4 text-[9px] text-black/45 transition-all duration-300 hover:border-black/20 hover:bg-black/[0.03] hover:text-black dark:border-white/10 dark:text-white/35 dark:hover:border-white/20 dark:hover:bg-white/[0.03] dark:hover:text-white"
              >
                <span>ادامه بدون ورود</span>

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Bottom */}

            <p className="mt-6 text-center text-[8px] leading-5 text-black/20 dark:text-white/15">
              با ورود یا ثبت‌نام، تجربه خرید شخصی‌سازی‌شده‌تری خواهید داشت.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ===============================================================
   INPUT
================================================================ */

function AuthField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
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

      <div className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-white/50 px-4 transition-all duration-300 focus-within:border-black/25 focus-within:bg-white dark:border-white/10 dark:bg-black/30 dark:focus-within:border-white/25 dark:focus-within:bg-black/50">
        <Icon className="h-3.5 w-3.5 shrink-0 text-black/25 transition-colors group-focus-within:text-black/60 dark:text-white/20 dark:group-focus-within:text-white/60" />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          dir={dir}
          className="w-full bg-transparent py-3.5 text-xs text-black outline-none placeholder:text-black/20 dark:text-white dark:placeholder:text-white/20"
        />
      </div>
    </div>
  );
}

/* ===============================================================
   PASSWORD
================================================================ */

function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder,
  visible,
  onToggle,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[9px] text-black/40 dark:text-white/30"
      >
        {label}
      </label>

      <div className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-white/50 px-4 transition-all duration-300 focus-within:border-black/25 focus-within:bg-white dark:border-white/10 dark:bg-black/30 dark:focus-within:border-white/25 dark:focus-within:bg-black/50">
        <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-black/25 transition-colors group-focus-within:text-black/60 dark:text-white/20 dark:group-focus-within:text-white/60" />

        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          dir="ltr"
          className="w-full bg-transparent py-3.5 text-xs text-black outline-none placeholder:text-black/20 dark:text-white dark:placeholder:text-white/20"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          className="shrink-0 text-black/25 transition-colors hover:text-black dark:text-white/20 dark:hover:text-white"
        >
          {visible ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Eye className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
