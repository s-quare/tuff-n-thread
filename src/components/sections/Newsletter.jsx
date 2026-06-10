"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success("You're on the list!");
        setEmail("");
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  return (
    <section className="border-t border-zinc-200">
      <div className="px-5 sm:px-8 py-15">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-24 items-start">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent block mb-5">
              The Dispatch
            </span>
            <h2 className="font-display italic text-4xl sm:text-5xl lg:text-6xl tracking-[-0.01em] leading-[1.05] mb-6">
              Four letters a year.
              <br />
              Nothing more.
            </h2>
            <p className="text-base text-tan leading-relaxed max-w-[44ch]">
              New drops, studio films, and notes from our workshop. No
              spam, just first access to pieces before they
              reach the archive.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <label
              htmlFor="newsletter"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan block mb-3"
            >
              Email address
            </label>
            <div className="flex items-center border-b border-brown/30 focus-within:border-accent transition-colors">
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                disabled={isLoading}
                className="flex-1 bg-transparent py-4 text-lg font-display placeholder:text-brown/30 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="font-mono text-[10px] uppercase tracking-[0.25em] py-4 px-1 hover:text-accent transition-colors disabled:opacity-50 disabled:hover:text-current"
              >
                {isLoading ? "Sending..." : "Subscribe →"}
              </button>
            </div>
            <p className="font-mono text-[10px] tracking-[0.15em] text-tan mt-4">
              We treat your inbox like our studio — sacred.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
