"use client";

import { ArrowUpLeft, Leaf, Sparkles, Shirt } from "lucide-react";

const brandValues = [
  {
    number: "01",
    icon: Shirt,
    title: "طراحی ماندگار",
    description:
      "طراحی‌هایی ساده، دقیق و قابل استفاده که وابسته به ترندهای زودگذر نیستند.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "جزئیات مهم‌اند",
    description:
      "از انتخاب پارچه تا برش نهایی، هر جزئیات با وسواس و دقت انتخاب می‌شود.",
  },
  {
    number: "03",
    icon: Leaf,
    title: "انتخاب آگاهانه",
    description:
      "تلاش می‌کنیم کیفیت، دوام و زیبایی را در کنار انتخاب‌های مسئولانه قرار دهیم.",
  },
];

export default function BrandStory() {
  return (
    <section
      id="about"
      dir="rtl"
      className="relative overflow-hidden bg-white py-24 text-black transition-colors duration-500 dark:bg-black dark:text-white sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        {/* Soft Glow */}

        <div className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-black/[0.025] blur-3xl dark:bg-white/[0.025]" />

        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-black/[0.02] blur-3xl dark:bg-white/[0.02]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.018] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 flex items-center justify-between border-b border-black/[0.08] pb-5 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />

            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-black/50 dark:text-white/50">
              درباره برند
            </span>
          </div>

          <span className="font-mono text-[8px] text-black/25 dark:text-white/20">
            ABOUT / 01
          </span>
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          {/* Main Text */}

          <div>
            <p className="mb-7 text-[10px] uppercase tracking-[0.3em] text-black/30 dark:text-white/25">
              پوشیدن، فقط انتخاب لباس نیست.
            </p>

            <h2 className="max-w-5xl text-[clamp(2.7rem,6vw,6.5rem)] font-light leading-[1.05] tracking-[-0.055em]">
              ما لباس طراحی نمی‌کنیم،
              <span className="mt-2 block font-semibold">
                سبک زندگی می‌سازیم.
              </span>
            </h2>
          </div>

          {/* Description */}

          <div className="flex flex-col justify-end lg:pb-2">
            <p className="max-w-md text-sm font-light leading-8 text-black/50 dark:text-white/45 sm:text-[15px]">
              AMIR از یک ایده ساده شروع شد؛ ساختن لباس‌هایی که بدون تلاش برای
              جلب توجه، دیده شوند.
              <br />
              <br />
              ما به مینیمالیسم، کیفیت و جزئیات باور داریم و هر مجموعه را با هدف
              ساختن یک استایل ماندگار طراحی می‌کنیم.
            </p>
          </div>
        </div>
        <div className="mt-20 sm:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.07] bg-neutral-100 dark:border-white/[0.08] dark:bg-neutral-950">
            <div className="grid min-h-[360px] lg:grid-cols-2">
              {/* Visual */}

              <div className="relative min-h-[300px] overflow-hidden bg-neutral-200 dark:bg-neutral-900 lg:min-h-[480px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_55%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="select-none text-[clamp(6rem,16vw,14rem)] font-black tracking-[-0.1em] text-black/[0.035] dark:text-white/[0.035]">
                    AMIR
                  </span>
                </div>

                {/* Corner Label */}

                <div className="absolute right-5 top-5">
                  <span className="rounded-full border border-black/10 bg-white/50 px-3 py-2 text-[7px] uppercase tracking-[0.25em] text-black/40 backdrop-blur-md dark:border-white/10 dark:bg-black/30 dark:text-white/40">
                    Est. 2026
                  </span>
                </div>

                {/* Vertical Label */}

                <div className="absolute bottom-5 left-5">
                  <span className="text-[7px] uppercase tracking-[0.4em] text-black/25 dark:text-white/20">
                    Designed with intention
                  </span>
                </div>
              </div>

              {/* Brand Philosophy */}

              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-black/30 dark:text-white/25">
                    فلسفه ما
                  </p>

                  <h3 className="mt-6 max-w-lg text-2xl font-light leading-relaxed tracking-tight sm:text-3xl">
                    کمتر، اما
                    <span className="font-semibold"> بهتر.</span>
                  </h3>

                  <p className="mt-5 max-w-md text-xs leading-7 text-black/45 dark:text-white/40">
                    ما معتقدیم یک لباس خوب لازم نیست فریاد بزند. فرم درست،
                    متریال مناسب و یک جزئیات کوچک کافی است تا یک استایل کامل شکل
                    بگیرد.
                  </p>
                </div>

                <div className="mt-12">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
                      Our Approach
                    </span>

                    <span className="font-mono text-[8px] text-black/20 dark:text-white/20">
                      03 / 03
                    </span>
                  </div>

                  <div className="h-px w-full bg-black/10 dark:bg-white/10">
                    <div className="h-px w-[78%] bg-black dark:bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-black/[0.08] pt-10 dark:border-white/[0.08] sm:mt-28">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.3em] text-black/30 dark:text-white/25">
                چرا AMIR؟
              </p>

              <h3 className="mt-3 text-2xl font-light tracking-tight sm:text-3xl">
                چیزی بیشتر از یک لباس
              </h3>
            </div>

            <span className="hidden font-mono text-[8px] text-black/20 dark:text-white/15 sm:block">
              VALUES / 03
            </span>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.08] dark:border-white/[0.08] dark:bg-white/[0.08] md:grid-cols-3">
            {brandValues.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.number}
                  className="group relative bg-white p-7 transition-colors duration-500 hover:bg-neutral-50 dark:bg-black dark:hover:bg-neutral-950 sm:p-8"
                >
                  {/* Number */}

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] text-black/20 dark:text-white/20">
                      {value.number}
                    </span>

                    <Icon className="h-4 w-4 text-black/25 transition-transform duration-500 group-hover:-translate-y-1 dark:text-white/25" />
                  </div>

                  {/* Content */}

                  <h4 className="mt-12 text-sm font-medium">{value.title}</h4>

                  <p className="mt-3 text-[11px] leading-6 text-black/40 dark:text-white/35">
                    {value.description}
                  </p>

                  {/* Bottom Line */}

                  <div className="mt-8 h-px w-full bg-black/[0.07] dark:bg-white/[0.07]">
                    <div className="h-px w-0 bg-black transition-all duration-500 group-hover:w-full dark:bg-white" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative mt-24 overflow-hidden rounded-[2rem] bg-black px-6 py-16 text-white dark:bg-white dark:text-black sm:px-12 sm:py-20 lg:px-20">
          <div className="relative z-10 max-w-3xl">
            <p className="text-[8px] uppercase tracking-[0.35em] text-white/40 dark:text-black/40">
              AMIR / Philosophy
            </p>

            <p className="mt-7 text-2xl font-light leading-relaxed tracking-tight sm:text-3xl lg:text-4xl">
              «استایل واقعی زمانی شکل می‌گیرد که
              <span className="font-semibold">
                {" "}
                لباس، بخشی از شخصیت تو باشد.
              </span>
              »
            </p>
          </div>

          {/* Decorative Typography */}

          <span className="absolute -bottom-16 left-0 select-none text-[13rem] font-black leading-none tracking-[-0.12em] text-white/[0.035] dark:text-black/[0.04]">
            A
          </span>

          <span className="absolute -right-10 -top-20 select-none text-[13rem] font-black leading-none tracking-[-0.12em] text-white/[0.035] dark:text-black/[0.04]">
            M
          </span>
        </div>
      </div>
    </section>
  );
}
