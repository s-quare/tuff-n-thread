"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Design Approval",
    body: "We co-author the brief palette, scale, references, and the final cartoon you sign off on.",
    image:
      "https://images.unsplash.com/photo-1585346077228-9deaf370683a?w=600&h=400&fit=crop",
    alt: "Designer sketching rug pattern on paper",
  },
  {
    step: "02",
    title: "Framing & Setup",
    body: "A bespoke wooden frame is built and primary cotton backing is hand-stretched in-studio.",
    image:
      "https://images.unsplash.com/photo-1770572274716-1bae682c48f7?w=1000&h=400&fit=crop",
    alt: "Wooden frame being assembled in workshop",
  },
  {
    step: "03",
    title: "Hand Tufting",
    body: "New Zealand wool is guided through the backing tuft by tuft typically 60–120 hours per piece.",
    image:
      "https://images.unsplash.com/photo-1735380673311-a21b6fb610cc?w=1000&&h=400&fit=crop", 
    alt: "Artisan hands working a tufting gun",
  },
  {
    step: "04",
    title: "Carving & Binding",
    body: "The pile is sheared, carved for depth, latex-sealed and finished with a soft cotton backing.",
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&h=400&fit=crop",
    alt: "Close-up of rug surface being carved and finished",
  },
  {
    step: "05",
    title: "White-Glove Delivery",
    body: "Photographed, rolled in archival paper, and delivered anywhere in Nigeria or shipped worldwide.",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=400&fit=crop",
    alt: "Finished rug being carefully packaged for delivery",
  },
];

export function ProcessTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      ref={ref}
      className="py-24 sm:py-32 border-t border-brown/10 overflow-hidden"
    >
      {/* Section header */}
      <div className="px-5 sm:px-10 lg:px-14 mb-14 sm:mb-20">
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-3"
        >
          02 / Craft
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-4xl sm:text-5xl tracking-tight mb-5"
        >
          From Sketch to Floor
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-brown/60 leading-relaxed max-w-[52ch]"
        >
          Five deliberate stages. Six to ten weeks. One artisan from beginning
          to end.
        </motion.p>
      </div>

      {/* ── Mobile: vertical steps with image peek ── */}
      <div className="lg:hidden px-5 sm:px-10 space-y-0">
        {steps.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="grid grid-cols-[auto_1fr] gap-5 border-b border-brown/10 last:border-0 py-8"
          >
            {/* Step number + connector line */}
            <div className="flex flex-col items-center gap-2 pt-1">
              <span className="font-display text-accent/25 text-5xl leading-none">
                {p.step}
              </span>
              {i < steps.length - 1 && (
                <span className="flex-1 w-px bg-brown/10 mt-2" />
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-[0.2em]">
                {p.title}
              </h3>
              <p className="text-tan text-sm leading-relaxed">{p.body}</p>
              {/* Image peek on mobile */}
              <div className="relative h-36 rounded-[2px] overflow-hidden bg-warm mt-4">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    e.currentTarget.src = "/images/rug-fallback.webp";
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Desktop: alternating image + text rows ── */}
      <div className="hidden lg:block px-14 space-y-0">
        {steps.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`
              grid grid-cols-[1fr_80px_1fr] items-center gap-0
              border-b border-brown/10 last:border-0
              ${i % 2 === 0 ? "" : ""}
            `}
          >
            {/* Left — image or text depending on even/odd */}
            <div
              className={`py-12 pr-12 ${i % 2 !== 0 ? "order-3 pl-12 pr-0" : ""}`}
            >
              {i % 2 === 0 ? (
                <div className="relative aspect-[16/9] rounded-[2px] overflow-hidden bg-warm">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/rug-fallback.webp";
                    }}
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] mb-4">
                    {p.title}
                  </h3>
                  <p className="text-tan text-sm leading-relaxed max-w-[38ch]">
                    {p.body}
                  </p>
                </div>
              )}
            </div>

            {/* Centre — big step number + dot */}
            <div className="flex flex-col items-center gap-3 self-stretch justify-center border-x border-brown/10">
              <span className="font-display text-accent/20 text-7xl leading-none">
                {p.step}
              </span>
              <span className="size-2 rounded-full bg-accent" />
            </div>

            {/* Right */}
            <div
              className={`py-12 pl-12 ${i % 2 !== 0 ? "order-1 pl-0 pr-12" : ""}`}
            >
              {i % 2 !== 0 ? (
                <div className="relative aspect-[16/9] rounded-[2px] overflow-hidden bg-warm">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/rug-fallback.webp";
                    }}
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] mb-4">
                    {p.title}
                  </h3>
                  <p className="text-tan text-sm leading-relaxed max-w-[38ch]">
                    {p.body}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
