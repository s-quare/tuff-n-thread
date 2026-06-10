export default function Footer() {
  return (
    <footer className="px-5 sm:px-10 lg:px-14 pt-20 pb-10 border-t border-brown/10 bg-warm/30">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 mb-16">

        {/* Brand */}
        <div className="col-span-2">
          <h2 className="font-display font-semibold italic text-3xl sm:text-4xl mb-6 tracking-tight">
            Tuft &amp; Thread
          </h2>
          <p className="text-sm text-brown/70 leading-relaxed">
            14 Ikot Ekpene Road<br />
            Aba, Abia State<br />
            Nigeria
          </p>
          <p
            className="inline-flex items-center gap-2 cursor-pointer mt-6 text-sm font-mono hover:text-accent transition-colors group"
          >
            <i className="bi bi-arrow-left group-hover:-translate-x-1 transition-transform" />
            @tuftandthread
          </p>
        </div>

        {/* Studio links */}
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan mb-4">Studio</p>
          {["Custom Rugs", "Drops", "The Process", "Visit"].map(l => (
            <span key={l} className="block cursor-pointer text-sm hover:text-accent transition-colors">
              {l}
            </span>
          ))}
        </div>

        {/* Care links */}
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tan mb-4">Care</p>
          {["Care Guide", "FAQ", "Shipping", "Trade Program"].map(l => (
            <span key={l} className="block cursor-pointer text-sm hover:text-accent transition-colors">
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center pt-8 border-t border-brown/10">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-tan">
          © {new Date().getFullYear()} Tuft &amp; Thread Studio
        </span>
        <div className="flex items-center gap-4">
          <span rel="noreferrer" className="text-tan hover:text-accent transition-colors">
            <i className="bi bi-instagram text-sm" />
          </span>
          <span className="text-tan hover:text-accent transition-colors">
            <i className="bi bi-pinterest text-sm" />
          </span>
          <span className="text-tan hover:text-accent transition-colors">
            <i className="bi bi-twitter-x text-sm" />
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-tan">
          Made by hand in Aba · NG
        </span>
      </div>
    </footer>
  );
}
