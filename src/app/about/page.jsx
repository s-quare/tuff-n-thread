import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Letter />
      <Numbers />
      <StudioBand />
      <Values />
      <Founder />
      <Press />
      <Visit />
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-10 pb-15 border-b border-brown/10">
      <div className="px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-y-12">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider uppercase text-tan">
              <span className="w-4 h-px bg-brown/40" />
              <span>The Tuft & The Thread</span>
            </div>
            <h1 className="mt-12 font-display font-bold leading-[0.9] tracking-[-0.02em] text-[clamp(2.75rem,9vw,6.5rem)]">
              A studio of
              <br />
              <span className="italic text-accent">two hands,</span>
              <br />
              <span className="text-brown/30">a frame, and time.</span>
            </h1>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9 pl-2 lg:pl-8 flex flex-col gap-4 border-l border-brown/20">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan">
              Est. 2021 · Aba, Abia State
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-brown/75 text-pretty">
              Tuft &amp; Thread is a one-room rug studio. We work slowly, with one frame, one tufting
              gun, and a short list of patient clients. Everything you see here was made by us; drawn,
              dyed, tufted, carved, and finished within a single quiet building.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6" style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.08)" }}>
              <Stat k="Since" v="2021" />
              <Stat k="Studio" v="Aba, NG" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-tan mb-2">{k}</p>
      <p className="font-display italic text-2xl">{v}</p>
    </div>
  );
}

function Letter() {
  return (
    <section className="py-10 border-b border-brown/10">
      <div className="px-5 sm:px-8">
        <div className="max-w-3xl ">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-5">
            A short letter
          </span>
          <p className="font-display text-lg  leading-tight text-balance">
            I started Tuft &amp; Thread because I wanted to make the kind of rug that{" "}
            <span className="italic text-accent">remembered</span> the room it was made for. 
            Its light, its proportions, the people who would stand on it barefoot every morning.
            We are not a factory. We will never be a factory. Each rug is a six-to-twelve week
            conversation, and that is the point.
          </p>
          <p className="mt-8 font-display italic text-xl text-brown/60">— Tomi A., Founder</p>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  const items = [
    ["120", "Hrs per rug, avg."],
    ["1 of 1", "Edition size"],
    ["NZ Wool", "Primary fibre"],
    ["6–12", "Weeks lead time"],
  ];
  return (
    <section className="py-15 bg-warm" style={{ borderBottom: "1px solid hsl(24, 15%, 10%, 0.08)" }}>
      <div className="px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {items.map(([n, l]) => (
            <div key={l} className="flex flex-col gap-2 mx-auto">
              <span className="font-display text-[clamp(2.5rem,5vw,3rem)] leading-none tracking-tight">{n}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioBand() {
  return (
    <section className="relative h-[60svh] sm:h-[80svh] overflow-hidden" style={{ borderBottom: "1px solid hsl(24, 15%, 10%, 0.08)" }}>
      <Image
        src="/images/about/about-studio-wide.webp"
        alt="Wide view of the Tuft & Thread studio in Aba, with a hand-tufting frame and wool spools in afternoon light"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-brown/30 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-5 sm:bottom-10 sm:left-10 right-5 sm:right-10 flex flex-wrap justify-between items-end gap-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-cream mix-blend-difference">
        <span>The Tuft · NG</span>``
        <span>05°07′N · 07°22′E</span>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    {
      n: "01",
      title: "Precision",
      body: "We finish two to four rugs a month. Not because we can't go faster, because going faster would change what the rug is.",
    },
    {
      n: "02",
      title: "Same Set of Hands",
      body: "We are a closed team, we tuft, carve, and sign the back. No outsourcing, no white-labelling.",
    },
    {
      n: "03",
      title: "Honest Materials",
      body: "100% New Zealand wool pile on woven cotton primary, latex-sealed and cotton-backed. Nothing synthetic, nothing printed.",
    },
    {
      n: "04",
      title: "Made in Aba",
      body: "Designed, dyed, and tufted in Aba. We're proud of the postcode and we put it on the label.",
    },
  ];
  return (
    <section className="py-24 sm:py-32" style={{ borderBottom: "1px solid hsl(24, 15%, 10%, 0.08)" }}>
      <div className="px-5 sm:px-8">
        <div className="mb-16 sm:mb-20 max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-4">
            What we hold
          </span>
          <h2 className="font-display italic text-4xl sm:text-5xl tracking-tight">Four quiet pillars.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10">
          {values.map((v) => (
            <article key={v.n} className="flex flex-col gap-4 pt-6" style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.15)" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">{v.n}</span>
              <h3 className="font-display text-2xl tracking-tight">{v.title}</h3>
              <p className="text-sm leading-relaxed text-brown/70">{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="py-24 sm:py-32 bg-warm" style={{ borderBottom: "1px solid hsl(24, 15%, 10%, 0.08)" }}>
      <div className="px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-y-12 gap-x-10 items-start">
          <div className="lg:col-span-5 relative">
            <div className="relative w-full rounded-2xl aspect-4/5 overflow-hidden">
              <Image
                src="/images/about/founder.jpg"
                alt="Portrait of Tomi A., founder of Tuft & Thread, in the studio"
                fill
                className="object-cover grayscale"
              />
            </div>
            <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white">
              MK · 2024
            </span>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan">
              Founder
            </span>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.01em]">
              Tomi A. <span className="italic text-accent">designer, dyer, tufter.</span>
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-brown/75 max-w-[52ch]">
              <p>
                Trained as an architect in Lagos and Milan, Tomi spent six years drawing buildings before
                picking up a tufting gun in 2020. The first piece was made for her own apartment. The
                second was made for a friend. The studio quietly grew from there.
              </p>
              <p>
                Today she leads every commission from the first conversation to the final hand-wash,
                with a small team of two who help with stretching, carving, and binding.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-y-6 gap-x-8 pt-8 max-w-md font-mono text-[11px]" style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.08)" }}>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.25em] text-tan mb-1">Trained</dt>
                <dd>Lagos · Milan</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.25em] text-tan mb-1">Tufting since</dt>
                <dd>2020</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.25em] text-tan mb-1">Studio team</dt>
                <dd>Three</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.25em] text-tan mb-1">Pieces to date</dt>
                <dd>Forty-two</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Press() {
  const press = [
    ["Architectural Digest MEA", "2024 · Studio Visit"],
    ["Native Magazine", "2023 · The Quiet Makers"],
    ["Apartamento", "2024 · Issue 33, Lagos"],
    ["The Sole Adventurer", "2023 · In Conversation"],
  ];
  return (
    <section className="py-15">
      <div className="px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-y-10 gap-x-10">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan block mb-4">
              Press &amp; Features
            </span>
            <h2 className="font-display italic text-4xl tracking-tight">In print.</h2>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6" style={{ borderTop: "1px solid hsl(24, 15%, 10%, 0.08)", borderBottom: "1px solid hsl(24, 15%, 10%, 0.08)" }}>
            {press.map(([title, meta]) => (
              <li key={title} className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-5 group hover:text-accent transition-colors" style={{ borderBottom: "1px solid hsl(24, 15%, 10%, 0.08)" }}>
                <span className="font-display text-xl sm:text-2xl tracking-tight">{title}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-tan group-hover:text-accent transition-colors">{meta}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* secondary collage */}
        <div className="grid grid-cols-6 gap-3 sm:gap-5 mt-20">
          <div className="col-span-3 sm:col-span-2 relative aspect-4/5 overflow-hidden">
            <Image src="/images/about/about-hands.jpg" alt="Hands tufting wool" fill className="object-cover" />
          </div>
          <div className="col-span-3 sm:col-span-2 relative aspect-square overflow-hidden sm:translate-y-10">
            <Image src="/images/about/studio-1.jpg" alt="Studio shelves" fill className="object-cover" />
          </div>
          <div className="col-span-3 sm:col-span-1 relative aspect-3/4 overflow-hidden">
            <Image src="/images/about/material-wool.jpg" alt="Wool spools" fill className="object-cover" />
          </div>
          <div className="col-span-3 sm:col-span-1 relative aspect-3/4 overflow-hidden sm:-translate-y-6">
            <Image src="/images/about/studio-2.jpg" alt="Studio detail" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="relative py-15 bg-brown text-cream overflow-hidden">
      <div className="px-5 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-y-12 gap-x-10">
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/60 block mb-6">
              The Studio Door
            </span>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em] max-w-[14ch]">
              Come by — <span className="italic text-accent">by appointment.</span>
            </h2>
            <p className="mt-10 max-w-[44ch] text-base sm:text-lg leading-relaxed text-cream/75">
              We host one client at a time on Wednesdays and Fridays, between 11am and 4pm. Walk
              through current works on the frame, hold the wool, talk through your room.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8 lg:pt-6">
            <dl className="grid grid-cols-1 gap-6 font-mono text-sm">
              <div>
                <dt className="text-[9px] uppercase tracking-[0.25em] text-cream/50 mb-1">Address</dt>
                <dd>14 Ikot Ekpene Road<br />Aba, Abia State</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.25em] text-cream/50 mb-1">Hours</dt>
                <dd>Wed &amp; Fri · 11–16</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.25em] text-cream/50 mb-1">Studio</dt>
                <dd>studio@tuftandthread.ng</dd>
              </div>
            </dl>
            <Link
              href="/custom"
              className="group inline-flex w-fit items-center gap-4 py-4 pl-7 pr-5 bg-cream text-brown rounded-full transition-transform active:scale-[0.97]"
            >
              <span className="text-sm font-medium tracking-tight">Start a commission</span>
              <span className="flex items-center justify-center size-9 rounded-full bg-brown/10 group-hover:bg-brown/20 transition-colors">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Oversized watermark */}
      <span aria-hidden className="absolute -bottom-20 -right-10 font-display italic text-[26vw] leading-none text-cream/5 select-none pointer-events-none">
        Visit.
      </span>
    </section>
  );
}