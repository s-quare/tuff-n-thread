"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Crafts", href: "/drops" },
    { name: "Custom", href: "/custom" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check on initial load too
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/75 backdrop-blur-xl shadow h-16 grid items-center ">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 w-full max-w-350 mx-auto">
          {/* Left — location tag */}
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-tan">
            Aba · NG
          </span>

          {/* Centre — wordmark */}
          <Link
            href="/"
            className="font-display font-semibold opacity-85 italic text-xl sm:text-2xl leading-none"
          >
            Tuft &amp; Thread
          </Link>

          {/* Right — desktop links + hamburger */}
          <div className="flex items-center justify-end gap-8">
            <div className="hidden sm:flex gap-5 md:gap-8">
              {navLinks
                .filter((link) => link.href !== pathname)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex flex-col justify-center items-center font-mono text-[10px] tracking-[0.2em] uppercase hover:text-accent transition-colors group"
                  >
                    {link.name}
                    <div className="h-px w-1 bg-brown/50 group-hover:w-full group-hover:bg-accent transition-all duration-400" />
                  </Link>
                ))}
            </div>

            {/* Hamburger — always visible on mobile */}
            <button
              onClick={() => setOpen(true)}
              className="sm:hidden flex flex-col gap-1.5"
              aria-label="Open menu"
            >
              <span className="w-5 h-px bg-brown block" />
              <span className="w-3 h-px bg-brown block ml-auto" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ───────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-brown/10 backdrop-blur-sm sm:hidden"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full overflow-x-auto no-scrollbar w-3/4 max-w-xs bg-cream flex flex-col px-8 py-10 sm:hidden"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="self-end mb-12 text-tan hover:text-accent transition-colors"
              >
                <i className="bi bi-x-lg text-xl" />
              </button>

              {/* Links */}
              <nav className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`font-display italic text-3xl tracking-tight transition-colors hover:text-accent ${
                        pathname === link.href ? "text-accent" : "text-brown"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer note */}
              <p className="mt-auto font-mono text-[10px] uppercase flex items-center justify-between tracking-[0.2em] text-tan">
                <span>Tuff & Thread</span> Aba · NG
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
