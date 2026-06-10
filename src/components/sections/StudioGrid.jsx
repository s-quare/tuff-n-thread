// components/sections/StudioGrid.jsx
"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const shots = [
  {
    src: "https://images.unsplash.com/photo-1695898341950-6b78780c1458?w=1200&h=1600&fit=crop",
    alt: "Artisan hands guiding a tufting gun across a stretched wool backing",
    caption: "01 — The tufting gun",
    span: "col-span-6 sm:col-span-4 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1775547307536-e19308ea0a71?w=1600&h=900&fit=crop",
    alt: "Wide interior of the Aba rug studio with frames and wool skeins",
    caption: null,
    span: "col-span-6 sm:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1767390552641-7ca1511eb472?w=900&h=1100&fit=crop",
    alt: "Artisan carving the surface of a finished rug with sharp scissors",
    caption: "03 — Carving",
    span: "col-span-6 sm:col-span-2",
  },
];

export function StudioGrid() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="px-5 sm:px-10 lg:px-14 py-24 sm:py-32 border-t border-brown/10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-3"
          >
            03 / Studio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic text-4xl sm:text-5xl tracking-tight"
          >
            Inside the Workshop
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan max-w-[28ch]"
        >
          Aba, Abia State · Open by appointment · Tues–Sat
        </motion.p>
      </div>

      {/* ── Mobile: editorial vertical strip ── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {shots.map((s, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`
              relative overflow-hidden rounded-xs bg-warm
              ${i === 0 ? "aspect-4/3" : "aspect-3/2"}
            `}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "/images/rug-fallback.webp"; }}
            />
            {/* On mobile, first image gets a diagonal text overlay */}
            {i === 0 && (
              <div className="absolute inset-0 bg-linear-to-tr from-brown/40 via-transparent to-transparent" />
            )}
            {s.caption && (
              <figcaption className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/90">
                {s.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>

      {/* ── sm+: asymmetric collage grid ── */}
      <div className="hidden sm:grid grid-cols-6 grid-rows-[22vw_22vw] lg:grid-rows-[18vw_18vw] gap-3 sm:gap-4">
        {shots.map((s, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`${s.span} relative overflow-hidden rounded-xs bg-warm group`}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              onError={(e) => { e.currentTarget.src = "/images/rug-fallback.webp"; }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-brown/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {s.caption && (
              <figcaption className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/90 mix-blend-difference">
                {s.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>
    </section>
  );
}