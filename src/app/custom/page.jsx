// app/custom/page.jsx
"use client";

import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

// ── Data -----
const SHAPES = [
  {
    id: "Rectangle",
    label: "Rectangle",
    hint: "Classic. Anchors a living or dining room.",
    svg: (
      <svg
        viewBox="0 0 80 60"
        className="h-10 w-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <rect x="4" y="6" width="72" height="48" />
      </svg>
    ),
  },
  {
    id: "Circle",
    label: "Circle",
    hint: "Softens a reading nook or entryway.",
    svg: (
      <svg
        viewBox="0 0 80 60"
        className="h-10 w-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <circle cx="40" cy="30" r="24" />
      </svg>
    ),
  },
  {
    id: "Custom",
    label: "Free-form",
    hint: "Sculpted edges, organic silhouettes.",
    svg: (
      <svg
        viewBox="0 0 80 60"
        className="h-10 w-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M10 30 C 10 8, 35 4, 50 12 S 78 22, 70 42 S 35 60, 20 50 S 10 42, 10 30 Z" />
      </svg>
    ),
  },
];

const STANDARD_SIZES = [
  { label: "Small", dims: "150 × 200 cm" },
  { label: "Medium", dims: "180 × 240 cm" },
  { label: "Large", dims: "200 × 300 cm" },
  { label: "Statement", dims: "240 × 340 cm" },
];

const PALETTES = [
  {
    id: "natural",
    label: "Natural",
    swatches: ["#e8dfd1", "#c9b89a", "#7a6a52", "#2b2620"],
  },
  {
    id: "terracotta",
    label: "Terracotta",
    swatches: ["#f1e5d6", "#d99878", "#a85a3c", "#3a221a"],
  },
  {
    id: "monochrome",
    label: "Monochrome",
    swatches: ["#f4f1ec", "#bdb6ad", "#5a554d", "#15110d"],
  },
  {
    id: "verde",
    label: "Verde",
    swatches: ["#ecead8", "#9aa978", "#4d5c3a", "#1f2418"],
  },
];

const STEPS = [
  { n: 1, label: "References", hint: "Upload up to 6 images" },
  { n: 2, label: "Shape & size", hint: "Pick form and footprint" },
  { n: 3, label: "Your details", hint: "How we reach you" },
];

const FAQS = [
  [
    "How long does a commission take?",
    "From signed cartoon to delivery: typically 6–10 weeks. Larger or denser pieces take longer; we always confirm before tufting begins.",
  ],
  [
    "What does it cost?",
    "Hand-tufted pieces start at roughly ₦450,000 / $300 per square metre and scale with density, carving complexity, and yarn choice. Your quote is itemised.",
  ],
  [
    "Can you work from my photograph or painting?",
    "Yes most commissions begin with a single reference. We translate it into a tufting cartoon and send it back for approval before any wool is cut.",
  ],
  [
    "Do you ship outside Nigeria?",
    "We ship worldwide via insured freight. Lead time is 7–14 days; we handle all export documentation.",
  ],
  [
    "Can I see it in progress?",
    "We send weekly photos and a final studio shoot before the rug leaves us.",
  ],
];

// ── Variants ─────────────────────────────────────────────────────
const panelVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

// ── Page ----
export default function CustomPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Step 1
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  // Step 2
  const [shape, setShape] = useState(null);
  const [size, setSize] = useState(null);
  const [customSize, setCustomSize] = useState("");
  const [palette, setPalette] = useState(null);

  // Step 3
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");

  // Scroll-to-top ref
  const formTopRef = useRef(null);

  const scrollToForm = () => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goTo = (n) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    setTimeout(scrollToForm, 50);
  };

  const canAdvance =
    step === 1
      ? files.length > 0
      : step === 2
        ? !!shape && (!!size || customSize.trim().length > 0)
        : true;

  const handleFiles = useCallback((list) => {
    if (!list) return;
    const next = [];
    Array.from(list)
      .slice(0, 6)
      .forEach((f) => {
        if (!f.type.startsWith("image/")) return;
        next.push({
          name: f.name,
          size: f.size,
          preview: URL.createObjectURL(f),
        });
      });
    setFiles((prev) => [...prev, ...next].slice(0, 6));
  }, []);

  const removeFile = (idx) => {
    setFiles((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[idx].preview);
      copy.splice(idx, 1);
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setTimeout(()=>{
        setSubmitted(true);
        toast("Submitted! We will get back to you soon");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000)    
  };

  if (submitted) return <SuccessScreen name={name} email={email} />;

  return (
    <div className="min-h-screen">
      {/* ── Page hero ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 pb-14 border-b border-brown/10"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] lg:items-end gap-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-5">
              Commission · Est. 5 working days for quote
            </span>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.93] tracking-[-0.02em]">
              Begin a piece that{" "}
              <em className="italic text-accent">does not yet exist.</em>
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-base sm:text-lg leading-relaxed text-brown/65 max-w-[44ch]">
              Every rug we make is a private edition of one. Share a reference, 
              a painting, a photograph, a fabric swatch. and {`we'll`} respond
              with a hand-drawn cartoon, a material plan, and a fixed quote.
            </p>
            {/* Process mini-grid */}
            <div className="grid grid-cols-2 gap-px bg-brown/10 border border-brown/10">
              {[
                ["01", "Upload references"],
                ["02", "Shape & size"],
                ["03", "Your details"],
                ["04", "We respond"],
              ].map(([n, t]) => (
                <div key={n} className="bg-cream p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan">
                    {n}
                  </p>
                  <p className="mt-2 font-display text-base italic">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Form area ──────────────────────────────── */}
      <section
        ref={formTopRef}
        className="px-5 sm:px-10 lg:px-14 py-14 sm:py-20 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
          {/* Stepper rail */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan mb-4">
              Step {step} of {STEPS.length}
            </p>
            {/* Progress bar */}
            <div className="h-px w-full bg-brown/10 mb-6">
              <motion.div
                className="h-px bg-accent"
                animate={{ width: `${(step / STEPS.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <ol className="space-y-5">
              {STEPS.map((s) => {
                const active = step === s.n;
                const done = step > s.n;
                return (
                  <li key={s.n}>
                    <button
                      type="button"
                      onClick={() => done && goTo(s.n)}
                      className={`flex items-start gap-3 w-full text-left ${done ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <span
                        className={`
                        mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full
                        font-mono text-[10px] border transition-all duration-300
                        ${
                          active
                            ? "border-accent bg-accent text-cream"
                            : done
                              ? "border-brown bg-brown text-cream"
                              : "border-brown/20 text-tan"
                        }
                      `}
                      >
                        {done ? <i className="bi bi-check text-xs" /> : s.n}
                      </span>
                      <span>
                        <span
                          className={`block font-display italic text-lg leading-tight transition-colors ${active ? "text-brown" : "text-tan"}`}
                        >
                          {s.label}
                        </span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-tan mt-0.5">
                          {s.hint}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </motion.aside>

          {/* Panel */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="border border-brown/10 bg-cream p-6 sm:p-10 overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* ── Step 1: References ── */}
                    {step === 1 && (
                      <div className="space-y-8">
                        <StepHeader
                          kicker="01 — References"
                          title="Show us the feeling."
                          sub="Mood photos, sketches, a paint chip. The looser the better — we'll refine it together."
                        />

                        {/* Drop zone */}
                        <label
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            handleFiles(e.dataTransfer.files);
                          }}
                          className={`
                            relative flex min-h-65 cursor-pointer flex-col items-center justify-center
                            border-2 border-dashed p-10 text-center transition-all duration-300
                            ${dragOver ? "border-accent bg-accent/5" : "border-brown/15 bg-warm/30 hover:border-brown/30 hover:bg-warm/50"}
                          `}
                        >
                          <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="sr-only"
                            onChange={(e) => handleFiles(e.target.files)}
                          />
                          <motion.div
                            animate={{ y: dragOver ? -6 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-center gap-4"
                          >
                            <i
                              className={`bi bi-cloud-arrow-up text-4xl transition-colors ${dragOver ? "text-accent" : "text-brown/30"}`}
                            />
                            <div>
                              <p className="font-display italic text-2xl">
                                Drop references here
                              </p>
                              <p className="mt-1 text-sm text-tan">
                                or click to browse · JPG, PNG, HEIC · max 6
                                files
                              </p>
                            </div>
                          </motion.div>
                        </label>

                        {/* File previews */}
                        {files.length > 0 && (
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan mb-4">
                              {files.length} / 6 attached
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                              {files.map((f, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="group relative aspect-square overflow-hidden rounded-[2px] bg-warm border border-brown/10"
                                >
                                  <img
                                    src={f.preview}
                                    alt={f.name}
                                    className="h-full w-full object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeFile(i)}
                                    className="absolute inset-0 flex items-center justify-center bg-brown/60 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label={`Remove ${f.name}`}
                                  >
                                    <i className="bi bi-x-lg text-cream text-lg" />
                                  </button>
                                </motion.div>
                              ))}
                              {/* Add more slot */}
                              {files.length < 6 && (
                                <label className="aspect-square flex items-center justify-center border border-dashed border-brown/15 rounded-xs cursor-pointer hover:border-accent transition-colors">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="sr-only"
                                    onChange={(e) =>
                                      handleFiles(e.target.files)
                                    }
                                  />
                                  <i className="bi bi-plus-lg text-tan text-xl" />
                                </label>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── Step 2: Shape & size ── */}
                    {step === 2 && (
                      <div className="space-y-10">
                        <StepHeader
                          kicker="02 — Shape & size"
                          title="Give it a footprint."
                        />

                        {/* Shape */}
                        <fieldset>
                          <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan mb-4 block">
                            Shape
                          </legend>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {SHAPES.map((s) => {
                              const active = shape === s.id;
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => setShape(s.id)}
                                  className={`
                                    flex flex-col items-start gap-4 border p-5 text-left transition-all duration-200
                                    ${
                                      active
                                        ? "border-brown bg-brown text-cream"
                                        : "border-brown/15 hover:border-brown/40"
                                    }
                                  `}
                                >
                                  <span
                                    className={
                                      active ? "text-cream/70" : "text-accent"
                                    }
                                  >
                                    {s.svg}
                                  </span>
                                  <span>
                                    <span className="block font-display italic text-xl">
                                      {s.label}
                                    </span>
                                    <span
                                      className={`mt-1 block text-xs ${active ? "text-cream/65" : "text-tan"}`}
                                    >
                                      {s.hint}
                                    </span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>

                        {/* Size */}
                        <fieldset>
                          <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan mb-4 block">
                            Standard sizes
                          </legend>
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                            {STANDARD_SIZES.map((s) => {
                              const active = size === s.label;
                              return (
                                <button
                                  key={s.label}
                                  type="button"
                                  onClick={() => {
                                    setSize(s.label);
                                    setCustomSize("");
                                  }}
                                  className={`flex flex-col items-start border p-4 text-left transition-all duration-200 ${active ? "border-brown bg-brown text-cream" : "border-brown/15 hover:border-brown/40"}`}
                                >
                                  <span className="font-display italic text-lg">
                                    {s.label}
                                  </span>
                                  <span
                                    className={`mt-1 font-mono text-[10px] uppercase tracking-[0.2em] ${active ? "text-cream/65" : "text-tan"}`}
                                  >
                                    {s.dims}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-5">
                            <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-2">
                              Or specify (cm)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 220 × 310"
                              value={customSize}
                              onChange={(e) => {
                                setCustomSize(e.target.value);
                                if (e.target.value) setSize(null);
                              }}
                              className="w-full max-w-xs border-0 border-b border-brown/20 bg-transparent py-3 font-display text-xl italic outline-none transition-colors focus:border-accent placeholder:text-brown/25"
                            />
                          </div>
                        </fieldset>

                        {/* Palette */}
                        <fieldset>
                          <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan mb-4 block">
                            Palette direction{" "}
                            <span className="normal-case tracking-normal text-tan/60">
                              (optional)
                            </span>
                          </legend>
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {PALETTES.map((p) => {
                              const active = palette === p.id;
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() =>
                                    setPalette(active ? null : p.id)
                                  }
                                  className={`border p-4 text-left transition-all duration-200 ${active ? "border-brown" : "border-brown/15 hover:border-brown/40"}`}
                                >
                                  <div className="flex h-8 overflow-hidden rounded-[1px]">
                                    {p.swatches.map((c) => (
                                      <div
                                        key={c}
                                        className="flex-1"
                                        style={{ backgroundColor: c }}
                                      />
                                    ))}
                                  </div>
                                  <p
                                    className={`mt-3 font-display italic text-base ${active ? "text-brown" : "text-brown/70"}`}
                                  >
                                    {p.label}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                      </div>
                    )}

                    {/* ── Step 3: Contact ── */}
                    {step === 3 && (
                      <div className="space-y-8">
                        <StepHeader
                          kicker="03 — Contact"
                          title="Where do we send the quote?"
                        />

                        <div className="grid gap-7 sm:grid-cols-2">
                          <Field label="Full name" required>
                            <input
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              maxLength={100}
                              className="w-full border-0 border-b border-brown/20 bg-transparent py-3 font-display text-xl italic outline-none transition-colors focus:border-accent"
                            />
                          </Field>
                          <Field label="Email" required>
                            <input
                              required
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              maxLength={255}
                              className="w-full border-0 border-b border-brown/20 bg-transparent py-3 font-display text-xl italic outline-none transition-colors focus:border-accent"
                            />
                          </Field>
                          <Field label="Phone / WhatsApp">
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+234 …"
                              maxLength={30}
                              className="w-full border-0 border-b border-brown/20 bg-transparent py-3 font-display text-xl italic outline-none transition-colors focus:border-accent placeholder:text-brown/25"
                            />
                          </Field>
                          <Field label="Timeline (optional)">
                            <input
                              type="text"
                              value={timeline}
                              onChange={(e) => setTimeline(e.target.value)}
                              placeholder="e.g. before December"
                              className="w-full border-0 border-b border-brown/20 bg-transparent py-3 font-display text-xl italic outline-none transition-colors focus:border-accent placeholder:text-brown/25"
                            />
                          </Field>
                        </div>

                        <Field label="Anything we should know?">
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={1000}
                            rows={4}
                            placeholder="Room context, intended placement, references that didn't upload…"
                            className="w-full resize-none border border-brown/15 bg-transparent p-4 text-sm outline-none transition-colors focus:border-accent placeholder:text-brown/25"
                          />
                        </Field>

                        {/* Brief summary */}
                        <div className="border border-brown/10 bg-warm/30 p-6">
                          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan mb-4">
                            Your brief
                          </p>
                          <dl className="grid gap-4 sm:grid-cols-3 text-sm">
                            <SummaryItem
                              k="References"
                              v={`${files.length} image${files.length === 1 ? "" : "s"}`}
                            />
                            <SummaryItem k="Shape" v={shape ?? "—"} />
                            <SummaryItem
                              k="Size"
                              v={customSize || size || "—"}
                            />
                            {palette && (
                              <SummaryItem
                                k="Palette"
                                v={
                                  PALETTES.find((p) => p.id === palette)
                                    ?.label ?? "—"
                                }
                              />
                            )}
                          </dl>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* ── Nav buttons ── */}
                <div className="mt-12 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 pt-8 border-t border-brown/10">
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    disabled={step === 1}
                    className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan hover:text-brown transition-colors disabled:opacity-30 flex items-center gap-2 w-fit"
                  >
                    <i className="bi bi-arrow-left text-xs" /> Back
                  </button>

                  {step < STEPS.length ? (
                    <button
                      type="button"
                      onClick={() => canAdvance && goTo(step + 1)}
                      disabled={!canAdvance}
                      className="group inline-flex items-center gap-3 py-4 pl-7 pr-5 bg-brown text-cream rounded-full transition-transform active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <span className="text-sm font-medium tracking-tight">
                        Continue
                      </span>
                      <span className="flex items-center justify-center size-8 rounded-full bg-cream/15 group-hover:bg-cream/25 transition-colors">
                        <i className="bi bi-arrow-right text-xs" />
                      </span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!name.trim() || !/\S+@\S+\.\S+/.test(email)}
                      className="group inline-flex items-center gap-3 py-4 pl-7 pr-5 bg-accent text-cream rounded-full transition-transform active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <span className="text-sm font-medium tracking-tight">
                        Send commission
                      </span>
                      <span className="flex items-center justify-center size-8 rounded-full bg-cream/15 group-hover:bg-cream/25 transition-colors">
                        <i className="bi bi-arrow-up-right text-xs" />
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Reassurance strip */}
              <div className="mt-4 grid gap-px bg-brown/10 border border-brown/10 sm:grid-cols-3">
                {[
                  [
                    "bi-shield-check",
                    "No commitment",
                    "Quotes are free and non-binding.",
                  ],
                  [
                    "bi-clock",
                    "5-day response",
                    "A real human replies, never a form letter.",
                  ],
                  [
                    "bi-box-seam",
                    "Worldwide shipping",
                    "Insured, archival-rolled, tracked door-to-door.",
                  ],
                ].map(([icon, t, b]) => (
                  <div key={t} className="bg-cream p-5 flex items-start gap-3">
                    <i className={`bi ${icon} text-accent mt-0.5`} />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brown">
                        {t}
                      </p>
                      <p className="mt-1 text-sm text-tan">{b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="px-5 sm:px-10 lg:px-14 py-20 sm:py-28 border-t border-brown/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-4">
              Frequently asked
            </span>
            <h2 className="font-display italic text-4xl sm:text-5xl leading-[1] tracking-tight">
              Before you send it.
            </h2>
            <div className="mt-10 relative aspect-[4/5] overflow-hidden rounded-[2px] bg-warm hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop"
                alt="Raw New Zealand wool on the studio table"
                className="absolute inset-0 w-full h-full object-cover grayscale"
                onError={(e) => {
                  e.currentTarget.src = "/images/rug-fallback.webp";
                }}
              />
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="divide-y divide-brown/10 border-y border-brown/10"
          >
            {FAQS.map(([q, a]) => (
              <details key={q} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-display italic text-xl sm:text-2xl list-none [&::-webkit-details-marker]:hidden">
                  <span>{q}</span>
                  <i className="bi bi-plus-lg text-accent transition-transform duration-300 group-open:rotate-45 shrink-0" />
                </summary>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-tan max-w-2xl">
                  {a}
                </p>
              </details>
            ))}
          </motion.dl>
        </div>
      </section>
    </div>
  );
}

// ── Success screen ────────────────────────────────────────────────
function SuccessScreen({ name, email }) {
  const [commissionNo, setCommissionNo] = useState("");
  const firstName = name.trim().split(" ")[0] || "there";
  //const commissionNo = useRef(Math.floor(Math.random() * 9000) + 1000);

  useEffect(() => {
    const num = Math.floor(Math.random() * 9000) + 1000;
    setCommissionNo(num);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[calc(100vh-80px)] px-5 sm:px-10 lg:px-14 py-20 flex flex-col justify-center"
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-20 items-start">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent block mb-6">
            <i className="bi bi-check-circle mr-2" />
            Commission #{commissionNo}
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.93] tracking-[-0.02em]">
            Thank you, <em className="italic text-accent">{firstName}.</em>
          </h1>
          <p className="mt-8 text-base sm:text-lg leading-relaxed text-brown/65 max-w-[44ch]">
            Your brief is on the studio table. {`We'll`} review your references this
            week and reply to{" "}
            <span className="text-brown font-medium">{email}</span> within five
            working days with a hand-drawn cartoon, a material plan, and a fixed
            quote.
          </p>
          <div className="mt-10 flex flex-col xs:flex-row items-start xs:items-center gap-6">
            <Link
              href="/drops"
              className="group inline-flex items-center gap-3 py-4 pl-7 pr-5 bg-brown text-cream rounded-full"
            >
              <span className="text-sm font-medium tracking-tight">
                Browse the archive
              </span>
              <span className="flex items-center justify-center size-8 rounded-full bg-cream/15 group-hover:bg-cream/25 transition-colors">
                <i className="bi bi-arrow-right text-xs" />
              </span>
            </Link>
            <Link
              href="/"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan hover:text-brown transition-colors"
            >
              ← Return home
            </Link>
          </div>
        </div>

        <ol className="space-y-px border border-brown/10 bg-brown/10">
          {[
            ["Today", "Brief logged & references archived."],
            ["Within 48h", "A studio note confirming we've started."],
            ["By day 5", "Cartoon, palette, and full quote in your inbox."],
            ["On approval", "Frame is built, tufting begins within 10 days."],
          ].map(([when, what]) => (
            <li key={when} className="bg-cream p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                {when}
              </p>
              <p className="mt-2 font-display italic text-xl">{what}</p>
            </li>
          ))}
        </ol>
      </div>
    </motion.main>
  );
}

// ── Small helpers ─────────────────────────────────────────────────
function StepHeader({ kicker, title, sub }) {
  return (
    <header className="border-b border-brown/10 pb-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan">
        {kicker}
      </p>
      <h2 className="mt-3 font-display italic text-3xl sm:text-4xl tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-2 text-sm text-tan max-w-md">{sub}</p>}
    </header>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function SummaryItem({ k, v }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan">
        {k}
      </dt>
      <dd className="mt-1 font-display italic text-lg">{v}</dd>
    </div>
  );
}
