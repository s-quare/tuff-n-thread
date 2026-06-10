// components/sections/Manifesto.jsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  [
    "One Studio",
    "Every piece tufted in our Aba workshop, by same set of hands.",
  ],
  ["One Edition", "Numbered. Never reproduced. Never mass-printed."],
  ["One Lifetime", "Built for thirty years of bare feet and afternoon light."],
];

export function Manifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="px-5 sm:px-10 lg:px-14 pb-18 sm:pb-22 lg:pt-18"
    >
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-10"
        >
          Manifesto
        </motion.span>

        {/* The big statement */}
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(1.6rem,4.2vw,3.5rem)] leading-[1.15] tracking-[-0.01em] text-balance"
        >
          We believe a rug is the slowest object in a room. It should{" "}
          <span className="italic text-accent">outlive trends</span>, hold the
          weight of a family, and be made by the same pair of hands from{" "}
          <span className="italic text-accent">first sketch</span> to final
          knot.
        </motion.p>

        <div className="mt-16 sm:mt-20 grid sm:grid-cols-3 gap-6 sm:gap-4 max-w-3xl">
          {pillars.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                // the stagger shift on sm+ — each col sinks a bit more
                marginTop: undefined,
              }}
              className={`
                border-l-2 border-accent/30 pl-5 py-1
                sm:border-l-0 sm:pl-0 sm:border-t-2 sm:pt-5
                ${i === 1 ? "sm:mt-6" : ""}
                ${i === 2 ? "sm:mt-12" : ""}
              `}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                {k}
              </p>
              <p className="text-sm leading-relaxed text-brown/65">{v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
