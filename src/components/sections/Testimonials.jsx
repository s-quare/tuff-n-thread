// components/sections/Testimonials.jsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "The piece arrived three weeks ago and clients keep asking where it's from. The weight, the carving, nothing on the market compares.",
    author: "Adaeze Okeke",
    role: "Interior Architect, Lagos",
    initial: "AO",
  },
  {
    quote:
      "I've sourced rugs from Morocco and India for fifteen years. Tuft & Thread is the first studio in West Africa I trust with a hero piece.",
    author: "Marcus Lin",
    role: "Founder, Atelier Lin",
    initial: "ML",
  },
  {
    quote:
      "Quiet, considered, and built to last a generation. The collaboration felt like working with a sculptor, not a vendor.",
    author: "Tomi Adesina",
    role: "Private Collector",
    initial: "TA",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="px-5 sm:px-10 lg:px-14 py-15 sm:py-20 bg-warm/40 border-t border-brown/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-3"
            >
              04 / Voices
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display italic text-4xl sm:text-5xl tracking-tight"
            >
              In Their Words
            </motion.h2>
          </div>
        </div>

        {/* ── Mobile: stacked cards with offset ── */}
        <div className="flex flex-col gap-0 sm:hidden">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`
                flex flex-col justify-between gap-8 p-7 border border-brown/10
                min-h-60 bg-cream
                ${i === 1 ? "ml-5 -mt-3 z-10 relative shadow-sm" : ""}
                ${i === 2 ? "-mt-3" : ""}
              `}
            >
              <i className="bi bi-quote text-2xl text-accent" />
              <blockquote className="font-display text-xl leading-[1.3] tracking-[-0.005em]">
                {`"${t.quote}"`}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="size-8 rounded-full bg-accent/15 flex items-center justify-center font-mono text-[10px] text-accent font-medium">
                  {t.initial}
                </span>
                <div>
                  <p className="text-sm font-medium leading-tight">
                    {t.author}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan mt-0.5">
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* ── sm+: 3-col grid with staggered vertical offset ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brown/10">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`
                bg-warm/40 p-8 sm:p-10
                flex flex-col justify-between gap-10
                min-h-75
                ${i === 1 ? "lg:mt-8" : ""}
                ${i === 2 ? "lg:mt-16" : ""}
              `}
            >
              <i className="bi bi-quote text-2xl text-accent" />
              <blockquote className="font-display text-xl sm:text-[1.55rem] leading-[1.3] tracking-[-0.005em] text-balance">
                {`"${t.quote}"`}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="size-9 rounded-full bg-accent/15 flex items-center justify-center font-mono text-[10px] text-accent font-medium shrink-0">
                  {t.initial}
                </span>
                <div>
                  <p className="text-sm font-medium">{t.author}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan mt-1">
                    {t.role}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
