"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const materials = [
  {
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&h=1200&fit=crop",
    alt: "Close-up of New Zealand wool fibres in warm natural light",
    kicker: "Material 01",
    title: "New Zealand Wool",
    body: "Long-staple, low-VM, naturally lanolin-rich. Resilient under decades of foot traffic, soft enough to sit on the floor with a book.",
    specs: [
      "1,800 gsm pile weight",
      "Hand-dyed in studio",
      "Mothproofed naturally",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&h=1200&fit=crop",
    alt: "Tight-weave cotton backing fabric from a Nigerian mill",
    kicker: "Material 02",
    title: "Cotton Primary Backing",
    body: "A tight-weave 12oz cotton substrate, sourced from a family mill in Kano. The frame that holds every tuft in place for the next thirty years.",
    specs: [
      "12oz woven cotton",
      "Latex-sealed in two passes",
      "Soft cotton secondary",
    ],
  },
];

function MaterialCard({ m, i }) {
  const [imgSrc, setImgSrc] = useState(m.image);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="
        grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-[1fr_1.1fr]
        border-b lg:border-b-0 lg:last:border-r-0
        border-brown/10
        lg:[&:first-child]:border-r
      "
    >
      {/* Image */}
      <div
        className={`
        relative overflow-hidden bg-warm
        aspect-[4/5] sm:aspect-auto lg:aspect-[4/5] xl:aspect-auto
        min-h-[260px]
        ${i % 2 !== 0 ? "sm:order-2 xl:order-2" : ""}
      `}
      >
        <img
          src={imgSrc}
          alt={m.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgSrc("/images/rug-fallback.webp")}
        />
      </div>

      {/* Content */}
      <div
        className={`
        flex flex-col justify-between gap-10 p-8 sm:p-10 lg:p-14
        ${i % 2 !== 0 ? "sm:order-1 xl:order-1" : ""}
      `}
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent block mb-4">
            {m.kicker}
          </span>
          <h3 className="font-display italic text-3xl sm:text-4xl tracking-tight mb-6">
            {m.title}
          </h3>
          <p className="text-sm sm:text-base text-brown/65 leading-relaxed max-w-[42ch]">
            {m.body}
          </p>
        </div>

        <ul className="space-y-3 border-t border-brown/10 pt-6">
          {m.specs.map((s) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-brown/75"
            >
              <span className="text-accent font-bold">+</span>
              {s}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Materials() {
  return (
    <section className="border-t border-brown/10">
      <div className="grid lg:grid-cols-2">
        {materials.map((m, i) => (
          <MaterialCard key={m.title} m={m} i={i} />
        ))}
      </div>
    </section>
  );
}
