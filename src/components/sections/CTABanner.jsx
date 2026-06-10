// components/sections/CTABanner.jsx
"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function CTABanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [imgSrc, setImgSrc] = useState(
    "https://images.unsplash.com/photo-1540518614847-7f36f1f1d6f0?w=1600&h=900&fit=crop"
  );

  return (
    <section
      ref={ref}
      className="relative border-t border-brown/10 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={imgSrc}
          alt=""
          aria-hidden
          loading="lazy"
          className="w-full h-full object-cover opacity-15"
          onError={() => setImgSrc("/images/rug-fallback.webp")}
        />
        <div className="absolute inset-0 bg-linear-to-r from-cream via-cream/90 to-cream/50" />
      </div>

      <div className="relative px-5 sm:px-10 lg:px-14 py-18 sm:py-25">
        <div className="max-w-4xl">

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent block mb-6"
          >
            Commission · 6–10 weeks
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 text-balance"
          >
            Have a design{" "}
            <span className="italic text-accent">in mind</span>?
            <br />
            {`Let's`} build it.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col xs:flex-row items-start xs:items-center gap-6"
          >
            <Link
              href="/custom"
              className="group inline-flex items-center gap-3 py-4 pl-7 pr-4 bg-brown text-cream rounded-full transition-transform active:scale-[0.97]"
            >
              <span className="text-sm font-medium tracking-tight whitespace-nowrap">
                Begin a Commission
              </span>
              <span className="flex items-center justify-center size-9 rounded-full bg-cream/15 group-hover:bg-cream/25 transition-colors">
                <i className="bi bi-arrow-right text-sm" />
              </span>
            </Link>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-tan max-w-[36ch]">
              Or DM us on Instagram — we reply to every brief within 48 hours.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Decorative corner stamp */}
      <motion.div
        initial={{ opacity: 0, rotate: -8, }}
        animate={inView ? { opacity: 1, rotate: -25, } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-4 right-8 sm:bottom-12 sm:right-12 flex flex-col items-center justify-center size-20 scale-50 xs:scale-75 sm:scale-100 rounded-full border border-brown/20 text-center transition-all duration-400"
      >
        <span className="relative font-mono font-bold text-[8px] uppercase tracking-wide text-tan leading-relaxed">
          Aba<br />Studio<br />Est. 2024
        </span>
      </motion.div>

    </section>
  );
}