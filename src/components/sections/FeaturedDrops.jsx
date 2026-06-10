"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { drops } from "@/lib/drops";

const FALLBACK = "/images/rug-fallback.webp";

function DropCard({ drop, index }) {
  const [imgSrc, setImgSrc] = useState(drop.image);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    margin: "-10% 0px -10% 0px", 
    amount: 0.5, 
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group space-y-5 ${index === 1 ? "lg:translate-y-10" : index === 0 ? "lg:-translate-y-10" : ""} `}
    >
      <div className="relative overflow-hidden rounded-xs bg-warm">
        {/* Status badge */}
        <span
          className={`
          absolute top-3 left-3 z-10
          font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1
          ${
            drop.status === "Available"
              ? "border border-accent/50 text-accent bg-cream/80"
              : "border border-brown/20 text-brown/50 bg-cream/60"
          }
          backdrop-blur-sm
        `}
        >
          {drop.status}
        </span>

        {/* Edition number */}
        <span className="absolute top-3 right-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/80 mix-blend-difference">
          N° 00{index + 1}
        </span>

        <div
          ref={cardRef}
          className="relative aspect-square overflow-hidden transition-[filter] duration-1500 ease-in-out"
          style={{
            filter: isInView ? "grayscale(0%)" : "grayscale(100%)",
          }}
        >
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

      <div className="flex justify-between items-start gap-4 px-1">
        <div>
          <p className="font-display italic text-xl leading-tight">
            {drop.name}
          </p>
          <p className="font-mono text-[10px] text-tan mt-2 uppercase tracking-[0.15em]">
            {drop.meta}
          </p>
        </div>
        <Link
          href="/drops"
          className="shrink-0 mt-1 size-8 flex items-center justify-center rounded-full border border-brown/15 text-tan hover:border-accent hover:text-accent transition-all"
        >
          <i className="bi bi-arrow-up-right text-xs" />
        </Link>
      </div>
    </motion.article>
  );
}

export function FeaturedDrops() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const preview = drops.slice(0, 3);

  return (
    <section
      id="drops"
      ref={ref}
      className="px-5 sm:px-10 lg:px-14 py-15 bg-warm/40 border-t border-brown/10"
    >
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-3">
            01 / Archive
          </span>
          <h2 className="font-display italic text-4xl sm:text-5xl tracking-tight">
            Featured Drops
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/drops"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-tan hover:text-accent transition-colors"
          >
            View Full Archive
            <i className="bi bi-arrow-right transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {preview.map((drop, i) => (
          <DropCard key={drop.name} drop={drop} index={i} />
        ))}
      </div>
    </section>
  );
}
