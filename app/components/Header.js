"use client";

import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

const navItems = [
  {
    id: "new-arrivals",
    label: "درباره ما",
  },
  {
    id: "women",
    label: "محصولات",
  },
  {
    id: "men",
    label: "سوالات متداول",
  },
  {
    id: "collections",
    label: "تماس با ما",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 30);

      const sections = [
        "home",
        "new-arrivals",
        "women",
        "men",
        "collections",
        "sale",
      ];

      const currentPosition = scrollY + 160;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);

        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (currentPosition >= top && currentPosition < bottom) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const shouldLock = isMobileOpen || isSearchOpen;

    document.body.style.overflow = shouldLock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, isSearchOpen]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(sectionId);
    setIsMobileOpen(false);
  };

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveSection("home");
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? "px-3 pt-3 sm:px-5 lg:px-6" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto flex h-[68px] items-center justify-between px-4 transition-all duration-500 sm:px-6 ${
            isScrolled
              ? "max-w-[1440px] rounded-2xl border border-black/[0.08] bg-white/80 shadow-xl shadow-black/[0.06] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-black/75 dark:shadow-black/20"
              : "max-w-none border-transparent bg-white/95 shadow-none backdrop-blur-xl dark:bg-black/95"
          }`}
        >
          <button
            type="button"
            onClick={scrollToHome}
            aria-label="Go to home"
            className="group flex shrink-0 items-center gap-3"
          >
            {/* Logo Mark */}

            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg dark:border-white/10 dark:bg-white dark:text-black">
              <span className="text-[11px] font-bold tracking-[-0.08em]">
                C
              </span>
            </div>

            {/* Brand */}

            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold tracking-[0.12em] text-black dark:text-white">
                Clothing
              </p>

              <p className="mt-0.5 text-[7px] uppercase tracking-[0.35em] text-black/35 dark:text-white/30">
                Clothing
              </p>
            </div>
          </button>
          <nav className="hidden items-center lg:flex">
            <div className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                      isActive
                        ? "text-black dark:text-white"
                        : "text-black/45 hover:text-black dark:text-white/45 dark:hover:text-white"
                    }`}
                  >
                    {item.label}

                    {/* Active Line */}

                    <span
                      className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-black transition-all duration-300 dark:bg-white ${
                        isActive
                          ? "w-5 opacity-100"
                          : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </nav>
          <div className="flex items-center gap-1.5">
            {/* Search */}

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="group flex h-10 w-10 items-center justify-center rounded-full text-black/55 transition-all duration-300 hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              <Search className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110" />
            </button>

            {/* Account */}

            <button
              type="button"
              aria-label="Account"
              className="group hidden h-10 w-10 items-center justify-center rounded-full text-black/55 transition-all duration-300 hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white sm:flex"
            >
              <UserRound className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110" />
            </button>

            {/* Wishlist */}

            <button
              type="button"
              aria-label="Wishlist"
              className="group hidden h-10 w-10 items-center justify-center rounded-full text-black/55 transition-all duration-300 hover:bg-black/[0.05] hover:text-black dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white md:flex"
            >
              <Heart className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110" />
            </button>

            {/* Cart */}

            <button
              type="button"
              aria-label="Shopping bag"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-black transition-all duration-300 hover:bg-black/[0.05] dark:text-white dark:hover:bg-white/[0.06]"
            >
              <ShoppingBag className="h-[17px] w-[17px] transition-transform duration-300 group-hover:-translate-y-0.5" />

              {/* Cart Count */}

              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[7px] font-semibold text-white dark:bg-white dark:text-black">
                2
              </span>
            </button>

            {/* Divider */}

            <div className="mx-1 hidden h-6 w-px bg-black/[0.08] dark:bg-white/[0.08] sm:block" />

            {/* Shop Now */}

            <button
              type="button"
              onClick={() => scrollToSection("new-arrivals")}
              className="group hidden items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85 xl:flex"
            >
              خرید کنید
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Menu */}

            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.03] text-black/65 transition-all duration-300 hover:bg-black/[0.07] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/65 dark:hover:bg-white/[0.07] lg:hidden"
            >
              {isMobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          isSearchOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        {/* Backdrop */}

        <div
          onClick={() => setIsSearchOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ${
            isSearchOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Search Panel */}

        <div
          className={`absolute left-0 right-0 top-0 border-b border-black/10 bg-white px-5 pb-8 pt-5 shadow-2xl transition-transform duration-500 dark:border-white/10 dark:bg-black ${
            isSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="mx-auto max-w-3xl">
            {/* Search Header */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-black dark:text-white">
                  Search
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
                  Find your next piece
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.05] text-black/60 transition-colors hover:bg-black/10 dark:bg-white/[0.06] dark:text-white/60 dark:hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search Input */}

            <div className="flex items-center gap-3 border-b border-black/15 pb-4 dark:border-white/15">
              <Search className="h-5 w-5 shrink-0 text-black/35 dark:text-white/35" />

              <input
                autoFocus
                type="text"
                placeholder="Search products, collections..."
                className="w-full bg-transparent text-lg font-light tracking-tight text-black outline-none placeholder:text-black/25 dark:text-white dark:placeholder:text-white/25"
              />

              <span className="hidden rounded-md border border-black/10 px-2 py-1 font-mono text-[8px] text-black/30 dark:border-white/10 dark:text-white/25 sm:block">
                ESC
              </span>
            </div>

            {/* Popular Searches */}

            <div className="mt-6">
              <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
                Popular
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Oversized T-Shirts",
                  "Hoodies",
                  "New Collection",
                  "Jackets",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="rounded-full border border-black/10 px-3 py-2 text-[9px] text-black/55 transition-all hover:border-black/25 hover:bg-black/[0.03] hover:text-black dark:border-white/10 dark:text-white/50 dark:hover:border-white/25 dark:hover:bg-white/[0.04] dark:hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}

        <div
          onClick={() => setIsMobileOpen(false)}
          className={`absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-500 dark:bg-black/75 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}

        <div
          className={`absolute left-3 right-3 top-[82px] max-h-[calc(100vh-96px)] overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-2xl transition-all duration-500 dark:border-white/10 dark:bg-black ${
            isMobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-5 opacity-0"
          }`}
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-5 dark:border-white/[0.07]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-black dark:text-white">
                Menu
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-black/30 dark:text-white/25">
                Discover the collection
              </p>
            </div>

            <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
              05 ITEMS
            </span>
          </div>

          {/* Navigation */}

          <nav className="p-3">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-4 py-4 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-black/[0.06] dark:bg-white/[0.06]"
                      : "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[8px] text-black/20 dark:text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`text-sm ${
                        isActive
                          ? "font-medium text-black dark:text-white"
                          : "text-black/45 dark:text-white/45"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  <ArrowUpRight
                    className={`h-4 w-4 transition-all duration-300 ${
                      isActive
                        ? "text-black/50 dark:text-white/50"
                        : "translate-y-1 -translate-x-1 text-black/10 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-black/50 dark:text-white/10 dark:group-hover:text-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Mobile Actions */}

          <div className="grid grid-cols-3 gap-2 border-t border-black/[0.07] p-4 dark:border-white/[0.07]">
            {/* Account */}

            <button
              type="button"
              className="flex flex-col items-center gap-2 rounded-xl border border-black/[0.07] py-3 text-black/55 transition-colors hover:bg-black/[0.03] dark:border-white/[0.07] dark:text-white/55 dark:hover:bg-white/[0.03]"
            >
              <UserRound className="h-4 w-4" />

              <span className="text-[8px] uppercase tracking-wider">
                Account
              </span>
            </button>

            {/* Wishlist */}

            <button
              type="button"
              className="flex flex-col items-center gap-2 rounded-xl border border-black/[0.07] py-3 text-black/55 transition-colors hover:bg-black/[0.03] dark:border-white/[0.07] dark:text-white/55 dark:hover:bg-white/[0.03]"
            >
              <Heart className="h-4 w-4" />

              <span className="text-[8px] uppercase tracking-wider">
                Wishlist
              </span>
            </button>

            {/* Bag */}

            <button
              type="button"
              className="relative flex flex-col items-center gap-2 rounded-xl border border-black/[0.07] py-3 text-black/55 transition-colors hover:bg-black/[0.03] dark:border-white/[0.07] dark:text-white/55 dark:hover:bg-white/[0.03]"
            >
              <ShoppingBag className="h-4 w-4" />

              <span className="text-[8px] uppercase tracking-wider">Bag</span>

              <span className="absolute right-3 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[7px] text-white dark:bg-white dark:text-black">
                2
              </span>
            </button>
          </div>

          {/* CTA */}

          <div className="px-4 pb-4">
            <button
              type="button"
              onClick={() => {
                scrollToSection("new-arrivals");
              }}
              className="group flex w-full items-center justify-between rounded-xl bg-black px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white dark:bg-white dark:text-black"
            >
              <span>Explore New Arrivals</span>

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
