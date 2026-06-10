'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100svh-64px)] flex flex-col items-center justify-center relative overflow-hidden">

                      {/* Main content */}
            <div className="relative z-10 text-center px-5 sm:px-8 py-5 max-w-300 mx-auto">
                {/* 404 number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <span className="font-display italic text-[clamp(8rem,20vw,16rem)] leading-none text-brown/10 select-none">
                        404
                    </span>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
                        This route {`doesn't`}
                        <br />
                        <span className="italic text-accent">exist in our archive.</span>
                    </h1>

                    <p className="text-tan text-base sm:text-lg max-w-[42ch] mx-auto mt-6 mb-10">
                        The page {`you're`} looking for {`doesn't`} exist, moved,
                        or {`it's`} is being updated.
                    </p>

                    {/* Navigation options */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3 px-6 py-3 bg-brown text-cream rounded-full transition-all hover:scale-95 active:scale-95"
                        >
                            <i className="bi bi-arrow-left text-sm" />
                            <span className="text-sm font-medium tracking-tight">Return to Home</span>
                        </Link>

                        <Link
                            href="/drops"
                            className="group inline-flex items-center gap-3 px-6 py-3 bg-cream border border-brown/15 text-brown rounded-full transition-all hover:border-accent hover:text-accent"
                        >
                            <span className="text-sm font-medium tracking-tight">Browse Archive</span>
                            <i className="bi bi-grid-3x2 text-sm" />
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-4 mt-16 mb-8">
                        <span className="h-px w-12" style={{ backgroundColor: "hsl(24, 15%, 10%, 0.1)" }} />
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-tan">Or</span>
                        <span className="h-px w-12" style={{ backgroundColor: "hsl(24, 15%, 10%, 0.1)" }} />
                    </div>

                    {/* Custom commission prompt */}
                    <Link
                        href="/custom"
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-tan hover:text-accent transition-colors group"
                    >
                        <span>Commission something new</span>
                        <i className="bi bi-arrow-right text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            {/* Decorative bottom element */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(28, 45%, 45%, 0.3), transparent)" }} />
        </div>
    );
}