"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { drops } from "@/lib/drops";

const FALLBACK = "/images/rug-fallback.webp";

// Generate years (2023-2025) cycling through the drops
const years = [
  "2023",
  "2024",
  "2025",
  "2024",
  "2025",
  "2023",
  "2024",
  "2025",
  "2023",
  "2024",
];

// Edition numbers that feel real
const editions = [
  "N° 001",
  "N° 002",
  "N° 003",
  "N° 004",
  "N° 005",
  "N° 006",
  "N° 007",
  "N° 008",
  "N° 009",
  "N° 010",
];

// Add year and edition to each drop
const enrichedDrops = drops.map((drop, index) => ({
  ...drop,
  year: years[index % years.length],
  edition: editions[index % editions.length],
}));

const FILTERS = ["All", "Available", "Sold Out"];
const ITEMS_PER_PAGE = 9;

export default function DropsPage() {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredDrops = useMemo(() => {
    if (filter === "All") return enrichedDrops;
    return enrichedDrops.filter((drop) => drop.status === filter);
  }, [filter]);

  const visibleDrops = filteredDrops.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDrops.length;
  const availableCount = enrichedDrops.filter(
    (d) => d.status === "Available",
  ).length;

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, filteredDrops.length),
    );
  };

  return (
    <div className="min-h-screen">
      {/* Archive Header */}
      <section className="pt-16 sm:pt-24 pb-10 sm:pb-14">
        <div className="px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-5">
                The Archive · 2023 — 2026
              </span>
              <h1 className="font-display font-bold leading-[0.92] tracking-[-0.02em] text-[clamp(3rem,9vw,7rem)]">
                Every piece,
                <br />
                <span className="italic text-accent">numbered</span>
                <span className="text-brown/30"> & unique.</span>
              </h1>
            </div>

            <div className="flex flex-col gap-8">
              <p className="text-base sm:text-lg leading-relaxed text-brown/70 max-w-[44ch] text-pretty">
                A record of our studio top rug collections. Most are spoken for,
                a few wait for the right floor.
              </p>
              <div className="grid grid-cols-3 gap-6 font-mono text-[10px] uppercase tracking-[0.2em]">
                <div
                  className="pt-3"
                  style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.08)" }}
                >
                  <p className="text-tan mb-1">Pieces</p>
                  <p className="text-brown text-base font-sans tracking-tight">
                    {enrichedDrops.length}
                  </p>
                </div>
                <div
                  className="pt-3"
                  style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.08)" }}
                >
                  <p className="text-tan mb-1">Available</p>
                  <p className="text-accent text-base font-sans tracking-tight">
                    {availableCount}
                  </p>
                </div>
                <div
                  className="pt-3"
                  style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.08)" }}
                >
                  <p className="text-tan mb-1">Showing</p>
                  <p className="text-brown text-base font-sans tracking-tight">
                    {visibleDrops.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter toggle */}
          <div
            className="mt-14 sm:mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6"
            style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.08)" }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan">
              Filter by status
            </span>
            <div
              className="relative inline-flex items-center gap-1 p-1 rounded-full"
              style={{
                border: "1px solid hsl(24, 15%, 10%, 0.08)",
                backgroundColor: "hsl(28, 18%, 92%, 0.5)",
              }}
            >
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setVisibleCount(ITEMS_PER_PAGE);
                    }}
                    className={`relative px-4 sm:px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                      active
                        ? "bg-brown text-cream"
                        : "text-tan hover:text-brown"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="px-5 sm:px-8">
          {visibleDrops.length === 0 ? (
            <div
              className="py-32 text-center"
              style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.08)" }}
            >
              <p className="font-display italic text-3xl text-brown/60">
                Nothing here yet.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan mt-4">
                Try another filter — or commission a piece.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-14 sm:gap-y-20">
                {visibleDrops.map((drop, i) => {
                  const spans = [
                    "lg:col-span-3",
                    "lg:col-span-3",
                    "lg:col-span-2",
                    "lg:col-span-2",
                    "lg:col-span-2",
                    "lg:col-span-4",
                    "lg:col-span-3",
                    "lg:col-span-3",
                    "lg:col-span-3",
                    "lg:col-span-2",
                  ];
                  const offsets = [
                    "",
                    "lg:translate-y-10",
                    "",
                    "lg:translate-y-8",
                    "",
                    "",
                    "",
                    "lg:translate-y-6",
                    "",
                    "lg:translate-y-10",
                  ];
                  const span = spans[i % spans.length];
                  const offset = offsets[i % offsets.length];
                  const isWide = span.includes("col-span-4");
                  const isTall = span.includes("col-span-2");
                  const aspect = isWide
                    ? "aspect-[16/10]"
                    : isTall
                      ? "aspect-[4/5]"
                      : "aspect-[4/5] sm:aspect-square";

                  return (
                    <DropCard
                      key={drop.name + i}
                      drop={drop}
                      index={i}
                      span={span}
                      offset={offset}
                      aspect={aspect}
                    />
                  );
                })}
              </div>

              {hasMore ? (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={loadMore}
                    className="btn border border-brown/15 text-brown hover:border-accent hover:text-accent bg-transparent"
                  >
                    Load More
                    <i className="bi bi-plus-lg text-xs" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center pt-10 md:pt-20">
                  <div className="h-px w-12 bg-linear-to-r from-transparent via-brown to-brown" />
                  <p className="text-sm italic font-serif text-tan">
                    End of Archive
                  </p>
                  <div className="h-px w-12 bg-linear-to-l from-transparent via-brown to-brown" />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Outro Section */}
      <section
        className="relative overflow-hidden bg-brown"
      >
        <div className="px-5 sm:px-8 py-15">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-20 items-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream block mb-6">
                A Bite Of the Archive
              </span>
              <h2 className="font-display text-cream leading-[0.95] tracking-[-0.02em] text-[clamp(2.5rem,7vw,5.5rem)] text-balance">
                The next piece in the
                <br />
                <span className="italic text-accent">archive</span>
                <span className="text-zinc-400"> could be yours.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-8 lg:pb-3">
              <p className="text-base sm:text-lg leading-relaxed text-tan max-w-[42ch]">
                Every rug here started as a conversation, a sketch on tracing
                paper, and three months of patient work. The studio takes on
                twelve commissions a year.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/custom"
                  className="group inline-flex items-center gap-4 py-4 pl-7 pr-5 bg-cream text-brown rounded-full transition-transform active:scale-[0.97]"
                >
                  <span className="text-sm font-medium tracking-tight">
                    Commission a Rug
                  </span>
                  <span className="flex items-center justify-center size-9 rounded-full bg-black/15 group-hover:bg-black/40 transition-all duration-400">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
                
              </div>
            </div>
          </div>
        </div>

        {/* Oversized watermark numeral */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-5 sm:right-5 font-display italic animate-pulse text-[28vw] text-brown/4 select-none"
        >
          ∞
        </span>
      </section>
    </div>
  );
}

// DropCard Component with InView grayscale
function DropCard({ drop, index, span, offset, aspect }) {
  const [imgSrc, setImgSrc] = useState(drop.image);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  useInView(cardRef, { threshold: 0.3 }, (inView) => {
    setIsInView(inView);
  });

  return (
    <article className={`group space-y-5 ${span} ${offset}`}>
      <div className="relative overflow-hidden rounded-xs bg-warm">
        {/* Status badge */}
        <span
          className={`absolute top-3 left-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 backdrop-blur-sm ${
            drop.status === "Available"
              ? "border border-accent/50 text-accent bg-cream/80"
              : "border border-brown/20 text-brown/50 bg-cream/60"
          }`}
        >
          {drop.status}
        </span>

        {/* Edition number */}
        <span className="absolute top-3 right-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/80 mix-blend-difference">
          {drop.edition}
        </span>

        {/* Year */}
        <span className="absolute bottom-3 left-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/70 mix-blend-difference">
          {drop.year}
        </span>

        <div
          ref={cardRef}
          className="relative overflow-hidden transition-[filter] duration-1500 ease-in-out"
          style={{
            filter: isInView ? "grayscale(0%)" : "grayscale(100%)",
          }}
        >
          <div className={`relative w-full ${aspect}`}>
            <Image
              src={imgSrc}
              alt={drop.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              onError={() => setImgSrc(FALLBACK)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start gap-4 px-1">
        <div>
          <p className="font-display italic text-xl sm:text-2xl leading-tight">
            {drop.name}
          </p>
          <p className="font-mono text-[10px] text-tan mt-2 uppercase tracking-[0.15em]">
            {drop.meta}
          </p>
        </div>
        <Link
          href="/custom"
          className="shrink-0 mt-1 size-8 flex items-center justify-center rounded-full border border-brown/15 text-tan hover:border-accent hover:text-accent transition-all"
        >
          <i className="bi bi-arrow-up-right text-xs" />
        </Link>
      </div>
    </article>
  );
}

// Simple useInView hook implementation
function useInView(ref, options, callback) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      callbackRef.current(entry.isIntersecting);
    }, options);

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);
}
