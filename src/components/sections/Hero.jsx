// components/sections/Hero.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative -top-16 min-h-svh grid grid-rows-[1fr_auto] lg:grid-rows-none lg:grid-cols-[1.05fr_1fr] border-b border-brown/10 overflow-hidden">
      {/* ── Image — full bleed on mobile, right column on desktop ── */}
      <div className=" absolute inset-0 lg:relative lg:order-2 overflow-hidden">
        <Image
          src="/images/hero.webp"
          alt="Macro detail of a hand-tufted cream rug in raking sunlight"
          fill
          priority
          className="object-cover lg:absolute lg:inset-0"
          sizes="(max-width: 1024px) 100svw, 50vw"
        />
        {/* Overlay — heavier on mobile so text reads, lifts on desktop */}
        <div className="absolute inset-0 bg-linear-to-t from-brown/90 via-brown/40 to-brown/10 lg:from-brown/15 lg:via-transparent lg:to-transparent" />

        {/* Corner label — sits on image always */}
        <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 flex flex-col items-end gap-1 font-mono text-[9px] tracking-[0.25em] uppercase text-cream/80">
          <span>N° 001</span>
          <span>Wool · Cotton · Hand-Tufted</span>
        </div>
      </div>

      {/* ── Copy — floats over image on mobile, left column on desktop ── */}
      <div
        className="
        relative z-10
        flex flex-col justify-end lg:justify-between
        px-5 sm:px-10 lg:px-14
        pt-10 pb-16 lg:pt-20 lg:pb-16
        lg:order-1 lg:border-r border-brown/10
      "
      >
        {/* Kicker — hidden on small mobile, shows sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-cream lg:text-tan/70 lg:pb-5"
        >
          <span className="w-6 h-px bg-cream lg:bg-brown/30" />
          <span>Vol. 01 — Custom Rug Studio</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="
            font-display font-bold leading-none tracking-[-0.02em]
            text-[clamp(3.2rem,12vw,5rem)]
            text-cream lg:text-brown
            mt-8 lg:mt-0
          "
        >
          The Soft
          <br />
          <span className="italic text-accent pl-[0.2em]">Architecture</span>
          <br />
          <span className="text-white lg:text-brown">of Aba.</span>
        </motion.h1>

        {/* Bottom row — body + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 lg:mt-0 flex flex-col xs:flex-row xs:items-start sm:items-end gap-6 sm:gap-8"
        >
          <p className="max-w-[34ch] text-sm sm:text-base leading-relaxed text-cream lg:text-brown">
            A small studio designing one-of-one hand-tufted rugs in New Zealand
            wool, commissioned, never mass-produced. Conceived for collectors,
            architects, and patient interiors.
          </p>

          <Link
            href="/custom"
            className="
              group shrink-0 inline-flex items-center gap-3
              py-3.5 pl-6 pr-4 w-fit
              bg-cream text-brown lg:bg-brown lg:text-cream
              rounded-full transition-transform active:scale-[0.97]
              whitespace-nowrap
            "
          >
            <span className="text-xs font-medium tracking-tight">
              Start a Custom Rug
            </span>
            <span className="flex items-center justify-center size-6 rounded-full bg-brown/10 lg:bg-cream/15 group-hover:bg-brown/20 lg:group-hover:bg-cream/25 transition-colors">
              <i className="bi bi-arrow-right text-xs" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
