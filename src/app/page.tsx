"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FaqItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-6 hover:bg-white/10 transition-colors duration-200">
        <span className="font-brand text-xl font-semibold pr-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-slate-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-slate-400 leading-relaxed font-sans pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAFAFA] text-slate-900 overflow-x-hidden relative selection:bg-blue-100 selection:text-blue-900 min-h-screen">
      <div className="absolute inset-0 bg-grid z-[0] pointer-events-none"></div>

      {/* ── Sticky Frosted Nav ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-4 max-w-7xl mx-auto w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3"
            : "bg-transparent"
        }`}
      >
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <img src="/logo_inv.png" alt="Guild Icon" className="h-10 object-contain" />
          <img src="/logo_inv_words.png" alt="Guild Wordmark" className="h-6 object-contain mt-1 hidden sm:block" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500"
        >
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
          <a href="#why-guild" className="hover:text-slate-900 transition-colors">Why Guild</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="#apply"
            className="font-brand tracking-wide bg-slate-900 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-slate-800 transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:-translate-y-0.5 inline-block"
          >
            Join Waitlist
          </a>
        </motion.div>
      </nav>

      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 pt-40 pb-32 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-brand text-6xl md:text-8xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]"
        >
          Stop learning alone.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Get drafted.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Guild matches ambitious people into committed global teams of 5-10, gives each team an AI manager, and turns your daily focus into the foundation for your next startup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#apply"
            className="font-brand tracking-wide w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-md text-base font-semibold hover:bg-blue-700 transition-all shadow-[0_8px_20px_rgb(37,99,235,0.25)] hover:-translate-y-0.5 text-center"
          >
            Apply Now
          </a>
          <button className="font-brand tracking-wide w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-md text-base font-semibold hover:bg-slate-50 transition-all shadow-sm">
            Read the Working Model
          </button>
        </motion.div>

        {/* Mockup Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Ambient blobs – animated */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 w-2/3 h-2/3 bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 z-[-1]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-2/3 h-2/3 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 z-[-1]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 left-1/4 w-2/3 h-2/3 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 z-[-1]"
          />

          {/* macOS Desktop */}
          <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 ring-1 ring-black/5 bg-white">
            <div className="absolute inset-0 mac-wallpaper"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.4)_0%,_transparent_60%)]"></div>

            {/* Menu Bar */}
            <div className="absolute top-0 inset-x-0 h-6 bg-white/20 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-3 z-10 text-[11px] text-white/90 font-medium tracking-wide">
              <div className="flex items-center gap-4">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                <span className="font-bold">Guild</span>
                <span className="hidden sm:inline">File</span>
                <span className="hidden sm:inline">Edit</span>
                <span className="hidden sm:inline">View</span>
                <span className="hidden sm:inline">Window</span>
                <span className="hidden sm:inline">Help</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
                <span>Tue 9:41 AM</span>
              </div>
            </div>

            {/* Dock */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center z-10 pointer-events-none">
              <div className="h-12 px-2 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 flex items-center gap-2 shadow-lg">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-sm border border-white/20 flex items-center justify-center">
                  <img src="/logo_inv.png" className="w-5 h-5 object-contain invert brightness-0" alt="App Icon" />
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-800 shadow-sm border border-white/20 flex items-center justify-center text-white text-[10px]">Term</div>
                <div className="w-px h-6 bg-white/30 mx-1"></div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-400 to-amber-300 shadow-sm border border-white/20"></div>
              </div>
            </div>

            {/* App Window */}
            <div className="absolute inset-0 flex items-center justify-center pt-8 px-4 sm:px-12 pb-16 z-0">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="w-full max-w-2xl bg-[#121212]/95 backdrop-blur-2xl rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden text-left flex flex-col h-full max-h-[450px]"
              >
                {/* Window controls */}
                <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between shrink-0">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10"></div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium flex gap-2 items-center">
                    <img src="/logo_inv.png" className="h-3 object-contain invert brightness-0" alt="" />
                    Pod_402_Workspace
                  </div>
                  <div className="w-12"></div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                      className="flex gap-4"
                    >
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shrink-0 border border-white/10 shadow-sm">
                        <span className="font-brand text-white font-bold text-sm">K_</span>
                      </div>
                      <div className="bg-white/5 rounded-lg rounded-tl-none p-4 border border-white/10 text-sm text-gray-300 font-mono leading-relaxed">
                        <span className="font-bold text-white font-sans">SYSTEM:</span> Team assembly complete. Connecting 3 absolute beginners with 2 intermediate developers.
                        <br /><br />
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.2 }}
                        >
                          <span className="text-gray-500">&gt; Initiating Day 1 protocols...</span>
                        </motion.span>
                        <br />
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3.0 }}
                        >
                          &gt; Task assigned.{" "}
                          <span className="text-blue-400 font-medium cursor-pointer hover:text-blue-300 underline decoration-blue-400/50 underline-offset-2 transition-colors">
                            Execute Workspace →
                          </span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block ml-1 w-2 h-4 bg-blue-400 align-middle"
                          />
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.8 }}
                      className="flex items-start gap-4 pl-12"
                    >
                      <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-1">
                        <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div className="bg-transparent border-l-2 border-white/10 pl-4 py-1.5 text-sm text-gray-400 font-mono">
                        <span className="font-medium text-white font-sans">USER_01</span> committed code to daily task.
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="p-4 border-t border-white/10 bg-white/5 shrink-0">
                  <div className="bg-black/40 border border-white/10 rounded-md px-4 py-2.5 flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-mono">@Kairos what is our next priority...</span>
                    <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center shadow-sm">
                      <svg className="w-3 h-3 text-white ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ── How It Works ────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-[#FDFBF7] py-32 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-32"
          >
            <h2 className="font-editorial text-5xl md:text-7xl text-[#1A1A1A] mb-6 tracking-tight leading-tight">
              Designed for the way <br /><span className="italic text-slate-500">you</span> build.
            </h2>
            <p className="text-lg text-slate-600">See exactly how a Guild pod operates day-to-day.</p>
          </motion.div>

          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-40">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 relative"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#1C1C1A] rounded-[2rem] p-8 shadow-2xl relative z-10 aspect-square flex flex-col justify-end overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -15 }} whileInView={{ opacity: 1, scale: 1, rotate: -6 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                  className="absolute top-12 left-8 bg-[#F08A4B] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg z-20"
                >
                  Velocity Tracked
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: 15 }} whileInView={{ opacity: 1, scale: 1, rotate: 3 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                  className="absolute top-32 right-8 bg-[#F08A4B] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg z-20"
                >
                  Task Assigned
                </motion.div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative z-10 translate-y-4">
                  <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-xs font-mono">K_</div>
                    <div className="text-white font-medium">Kairos AI <span className="text-slate-400 text-sm font-normal">System Update</span></div>
                  </div>
                  <p className="text-slate-300 font-mono text-sm leading-relaxed mb-4">
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>&gt; Analyzing pod velocity... </motion.span><br />
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }}>&gt; USER_01 is blocked on API integration. </motion.span><br />
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5 }}>&gt; Adjusting today's sprint requirements.</motion.span>
                  </p>
                  <div className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 px-4 py-3 rounded-lg text-sm font-medium">
                    Execute Daily Workspace &rarr;
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 lg:pl-10"
            >

              <h3 className="font-editorial text-4xl md:text-5xl text-[#1A1A1A] mb-6 relative z-10 leading-tight">
                Your <span className="italic">always-on</span> <br />AI Manager.
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Guild doesn't just put you in a chat room. Every pod is managed by Kairos, an AI that tracks your commits, removes blockers, and dynamically assigns tasks based on your team's real-time velocity.
              </p>
            </motion.div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 mb-40">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 lg:pr-10"
            >

              <h3 className="font-editorial text-4xl md:text-5xl text-[#1A1A1A] mb-6 leading-tight">
                Radical <br /><span className="italic">peer-mentorship.</span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Learn by doing, and master by teaching. We intentionally pair absolute beginners with intermediate builders. Submit your daily code, and let your pod review it directly in the workspace.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 relative"
            >
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#1C1C1A] rounded-[2rem] p-8 shadow-2xl relative z-10 aspect-square flex items-center justify-center overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: 15 }} whileInView={{ opacity: 1, scale: 1, rotate: 6 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                  className="absolute bottom-16 right-10 bg-[#16857B] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg z-20"
                >
                  Peer Reviewed
                </motion.div>
                <div className="w-full max-w-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-white font-medium text-lg">Pod Activity</h4>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">+</div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#16857B] border border-[#21A89B] text-white px-4 py-3 rounded-full text-sm font-medium flex justify-between">
                      <span>Commit: Auth Pipeline</span>
                      <span className="opacity-70">10m ago</span>
                    </div>
                    <div className="bg-transparent border border-white/20 text-white px-4 py-3 rounded-full text-sm font-medium flex justify-between">
                      <span>Review: React Components</span>
                      <span className="opacity-50">1h ago</span>
                    </div>
                    <div className="bg-transparent border border-white/20 text-white px-4 py-3 rounded-full text-sm font-medium flex justify-between">
                      <span>Standup Notes</span>
                      <span className="opacity-50">4h ago</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 relative"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-[#1C1C1A] rounded-[2rem] p-8 shadow-2xl relative z-10 aspect-square flex flex-col justify-center overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -15 }} whileInView={{ opacity: 1, scale: 1, rotate: -6 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                  className="absolute top-16 left-8 bg-[#3B82F6] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg z-20"
                >
                  Track Record Built
                </motion.div>
                <div className="w-full max-w-sm mx-auto bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-4">
                    <h4 className="text-white font-medium">Commit History</h4>
                    <span className="text-emerald-400 text-sm font-mono">+1,204</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const colors = ["bg-white/5", "bg-emerald-500/30", "bg-emerald-500/60", "bg-emerald-500"];
                      const color = colors[(i * 13 + 7) % 4];
                      return (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          whileHover={{ scale: 1.4 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.02, type: "spring" }}
                          className={`w-full aspect-square rounded-sm ${color} cursor-pointer`}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 lg:pl-10"
            >

              <h3 className="font-editorial text-4xl md:text-5xl text-[#1A1A1A] mb-6 leading-tight">
                Build in public. <br /><span className="italic">Ship with proof.</span>
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Your daily commits aren't just for practice; they build your public track record. Over 24 months, you create an undeniable portfolio of shipped products, proving your consistency to co-founders and startups.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Guild Bento Grid ─────────────────────────────────────────────── */}
      <section id="why-guild" className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-brand text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Designed for high-output builders.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group md:col-span-2 relative bg-white/40 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.15)] rounded-3xl p-10 overflow-hidden transition-shadow duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent group-hover:from-blue-500/10 transition-colors duration-500"></div>
            {/* Shimmer sweep */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" style={{ transitionProperty: "opacity, transform", transitionDuration: "700ms" }}></div>
            <div className="relative z-10">
              <h3 className="font-brand text-3xl font-bold text-slate-900 mb-4">Drafted, not dropped in.</h3>
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                No browsing. No decision fatigue. We analyze your goal and draft you into a vetted pod of 5-10 peers on your exact trajectory.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group md:col-span-1 relative bg-white/40 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.15)] rounded-3xl p-10 overflow-hidden transition-shadow duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent group-hover:from-purple-500/10 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h3 className="font-brand text-2xl font-bold text-slate-900 mb-3">Kairos AI.</h3>
              <p className="text-slate-600 leading-relaxed">
                A shared brain for your team that tracks momentum, assigns tasks, and runs your standups.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group md:col-span-1 relative bg-white/40 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.15)] rounded-3xl p-10 overflow-hidden transition-shadow duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent group-hover:from-emerald-500/10 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h3 className="font-brand text-2xl font-bold text-slate-900 mb-3">Structured Mentorship.</h3>
              <p className="text-slate-600 leading-relaxed">
                Mixed-experience pods ensure beginners get guidance and experts sharpen skills by teaching.
              </p>
            </div>
          </motion.div>

          {/* Card 4 - Dark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group md:col-span-2 relative bg-slate-900 rounded-3xl p-10 text-white shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] overflow-hidden transition-shadow duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 to-transparent group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative z-10 max-w-xl">
              <h3 className="font-brand text-3xl font-bold mb-4">The 24-Month Game.</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Commit to the journey. When you finish, your track record unlocks the Alumni Network, where you hand-pick your next founding team.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Wall of Ambition ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAFA] py-32 border-t border-slate-200 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
            className="text-center mb-24 flex flex-col items-center justify-center"
          >
            <h2 className="font-brand text-5xl md:text-7xl font-bold tracking-tight text-[#111111] flex items-center gap-4 flex-wrap justify-center">
              Why builders{" "}
              <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 24 24" fill="url(#gradientHeart)">
                <defs>
                  <linearGradient id="gradientHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F08A4B" />
                    <stop offset="100%" stopColor="#16857B" />
                  </linearGradient>
                </defs>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Guild
            </h2>
            <p className="text-xl text-slate-500 mt-6 max-w-2xl">
              We haven't even launched Cohort 1 yet. Here is what early applicants are saying about the end of solo-learning.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 font-mono border border-slate-200 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"></span>
              Source: Pre-launch waitlist applicants
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {[
                { text: "\"The isolation of self-taught programming is brutal. Required daily commits with a pod of serious developers sounds incredibly motivating.\"", name: "Justin Wilkerson", role: "Waitlist #402 • Software Developer", color: "bg-blue-50 text-blue-700" },
                { text: "\"I've tried building side projects with friends, but without a dedicated manager or real structure, it always fizzles out after the first weekend. The idea of Kairos AI acting as a neutral manager to enforce daily accountability, while being drafted into a committed team of 5-10 builders, is exactly what I need. I'm so ready for this.\"", name: "Cole Bemis", role: "Waitlist #12 • @GitHub", color: "bg-slate-900 text-white" },
                { text: "\"I just need a team.\"", name: "Rohit Sharma", role: "Waitlist #118 • Front-End Developer", color: "bg-orange-100 text-orange-700" },
                { text: "\"I can follow a guide perfectly, but when I try to build something from scratch, I freeze. I'm joining to finally experience a real team structure and escape tutorial-hell.\"", name: "James Armenta", role: "Waitlist #45 • Software Engineer", color: "bg-slate-100 text-slate-900" },
                { text: "\"Just drafted my application.\"", name: "Kevin L.", role: "Waitlist #512 • Beginner Track", color: "bg-emerald-50 text-emerald-700" },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm cursor-default">
                  <p className="text-[#111111] text-xl font-medium leading-snug mb-5">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold font-brand text-sm`}>{t.name[0]}</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-slate-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Column 2 – offset down */}
            <div className="flex flex-col gap-4 lg:gap-5 md:mt-20">
              {[
                { text: "\"Most learning platforms sell you content, but there's a million free videos on YouTube for that. What we actually need is accountability and real-world reps. Guild is the first thing that looks like it solves the actual problem instead of just selling more content.\"", name: "Herminio Garcia", role: "Waitlist #67 • Software Engineer", color: "bg-red-100 text-red-700" },
                { text: "\"Finally, an end to tutorial hell.\"", name: "Ananya Gupta", role: "Waitlist #204 • Full-Stack Engineer", color: "bg-indigo-100 text-indigo-700" },
                { text: "\"Tech meetups are practically non-existent in my city. I signed up to find my tribe and finally build alongside ambitious people.\"", name: "Aditya Verma", role: "Waitlist #184 • Self-Taught Dev", color: "bg-teal-100 text-teal-700" },
                { text: "\"I'm tired of 'networking' on LinkedIn and pretending to be a thought leader. I just want to write good code, deal with messy merge conflicts, and build real products with smart people.\"", name: "Rahul Mehta", role: "Waitlist #441 • Backend Engineer", color: "bg-rose-100 text-rose-700" },
                { text: "\"Certificates are dead. I need a real commit history.\"", name: "Priya Patel", role: "Waitlist #03 • Founding Engineer", color: "bg-slate-100 text-slate-900" },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }} whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm cursor-default">
                  <p className="text-[#111111] text-xl font-medium leading-snug mb-5">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold font-brand text-sm`}>{t.name[0]}</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-slate-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Column 3 – offset down slightly */}
            <div className="flex flex-col gap-4 lg:gap-5 md:mt-10">
              {[
                { text: "\"Accountability as a service.\"", name: "Max Gustafson", role: "Waitlist #22 • Design Director", color: "bg-purple-50 text-purple-700" },
                { text: "\"Consistency is my biggest flaw. I can code for 12 hours straight one day, and then not touch my keyboard for a week. I need daily accountability.\"", name: "Alex Chen", role: "Waitlist #89 • Full-Stack Engineer", color: "bg-teal-50 text-teal-700" },
                { text: "\"Working a 9-to-5 leaves me drained. By the time I sit down at my laptop, I have decision fatigue and end up doing nothing. I signed up because I need a structured environment that tells me exactly what the sprint goal is so I can just sit down and execute.\"", name: "Stacy Taylor", role: "Waitlist #134 • Front-End Engineer", color: "bg-pink-50 text-pink-700" },
                { text: "\"I'm here for the 24-month game.\"", name: "Neha Desai", role: "Waitlist #301 • React Developer", color: "bg-cyan-100 text-cyan-700" },
                { text: "\"Traditional bootcamps are $15k and they basically just give you a curriculum you could have googled. I'm on the waitlist for Guild because it feels like the exact opposite: focusing entirely on the reps, the team dynamics, and the daily habit of pushing code.\"", name: "Vikram Singh", role: "Waitlist #88 • iOS Developer", color: "bg-yellow-100 text-yellow-700" },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }} whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm cursor-default">
                  <p className="text-[#111111] text-xl font-medium leading-snug mb-5">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold font-brand text-sm`}>{t.name[0]}</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-slate-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────────────────────────────────────── */}
      <section id="faq" className="relative bg-[#0A0A0A] text-white py-32 overflow-hidden border-t border-white/10 mt-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="font-brand text-4xl md:text-5xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-400">Everything you need to know about the draft, the pods, and the commitment.</p>
          </motion.div>

          <div className="space-y-4">
            <FaqItem delay={0.1} q="What is the actual time commitment?" a="Guild is not a weekend hackathon. You are committing to a 6 to 24-month journey. Expect to spend a minimum of 1-2 hours daily on tasks assigned by Kairos, plus participation in twice-weekly pod standups." />
            <FaqItem delay={0.2} q="How does the Draft work?" a="During onboarding, we analyze your skill level, timezone, and ultimate goals. We then manually assemble highly complementary pods of 5-10 people. We intentionally pair absolute beginners with intermediate developers to enforce a culture of mentorship." />
            <FaqItem delay={0.3} q="What exactly does Kairos (the AI) do?" a="Kairos is your pod's dedicated manager. It doesn't just answer coding questions; it monitors team momentum, assigns the daily technical requirements, tracks who is falling behind, and organizes your shared workspace." />
            <FaqItem delay={0.4} q="What happens when I finish?" a="Graduation unlocks the Alumni Network. Your daily commits, peer reviews, and consistency over the months become a verifiable track record. You can use this reputation to recruit a highly vetted co-founder or join an early-stage startup team." />
          </div>
        </div>
      </section>

      {/* ── Application Form ─────────────────────────────────────────────────── */}
      <section id="apply" className="bg-[#FDFBF7] py-32 px-6">
        <div className="max-w-[1000px] mx-auto bg-[#1C1C1A] rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F08A4B]/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#16857B]/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Section Header */}
          <div className="text-center mb-20 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#F08A4B] mb-8 font-mono tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#F08A4B] animate-pulse"></span>
              Cohort 1 Applications Open
            </div>
            <h2 className="font-editorial text-5xl md:text-7xl text-[#FDFBF7] mb-6 leading-tight">
              The Cohort 1 <i className="text-[#F08A4B]">Draft.</i>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Guild is a closed ecosystem. To assemble the perfect pods, Kairos needs to understand your trajectory. Tell us what you're building, and we'll draft you with the team that will help you finish it.
            </p>
          </div>

          {/* Form / Success State */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative z-10 text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-7xl mb-8"
                >
                  🎉
                </motion.div>
                <h3 className="font-editorial text-4xl md:text-5xl text-[#FDFBF7] mb-6 leading-tight">
                  You're on the list.
                </h3>
                <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
                  We'll reach out when your pod is assembled. In the meantime, keep building — Kairos is watching.
                </p>
                <div className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                  Application received
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-16"
                onSubmit={handleSubmit}
              >
                {/* Group 1: Identity */}
                <div>
                  <h3 className="text-[#16857B] font-mono text-sm uppercase tracking-widest mb-8 border-b border-white/10 pb-4">01. Identity &amp; Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    <div className="relative group">
                      <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Full Name</label>
                      <input type="text" placeholder="Satoshi Nakamoto" required className="w-full bg-transparent border-b border-white/20 text-xl text-white pb-3 focus:outline-none focus:border-[#FDFBF7] transition-colors placeholder:text-slate-700" />
                    </div>
                    <div className="relative group">
                      <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Email Address</label>
                      <input type="email" placeholder="name@domain.com" required className="w-full bg-transparent border-b border-white/20 text-xl text-white pb-3 focus:outline-none focus:border-[#FDFBF7] transition-colors placeholder:text-slate-700" />
                    </div>
                    <div className="relative group md:col-span-2">
                      <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Country / Timezone</label>
                      <input type="text" placeholder="Where are you building from? (e.g., London, GMT)" required className="w-full bg-transparent border-b border-white/20 text-xl text-white pb-3 focus:outline-none focus:border-[#FDFBF7] transition-colors placeholder:text-slate-700" />
                    </div>
                  </div>
                </div>

                {/* Group 2: The Builder */}
                <div>
                  <h3 className="text-[#F08A4B] font-mono text-sm uppercase tracking-widest mb-8 border-b border-white/10 pb-4">02. The Builder</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    <div className="relative group">
                      <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Technical Skill Level</label>
                      <select required defaultValue="" className="w-full bg-transparent border-b border-white/20 text-xl text-white pb-3 focus:outline-none focus:border-[#FDFBF7] transition-colors appearance-none cursor-pointer">
                        <option value="" disabled className="text-slate-900">Select your level...</option>
                        <option value="beginner" className="text-slate-900">Absolute Beginner</option>
                        <option value="intermediate" className="text-slate-900">Intermediate</option>
                        <option value="advanced" className="text-slate-900">Advanced / Expert</option>
                      </select>
                    </div>
                    <div className="relative group">
                      <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Personal Commitment</label>
                      <select required defaultValue="" className="w-full bg-transparent border-b border-white/20 text-xl text-white pb-3 focus:outline-none focus:border-[#FDFBF7] transition-colors appearance-none cursor-pointer">
                        <option value="" disabled className="text-slate-900">I can commit daily for...</option>
                        <option value="6" className="text-slate-900">6 Months</option>
                        <option value="12" className="text-slate-900">12 Months</option>
                        <option value="18" className="text-slate-900">18 Months</option>
                        <option value="24" className="text-slate-900">24 Months (Alumni Track)</option>
                      </select>
                    </div>
                    <div className="relative group md:col-span-2">
                      <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Current Project or Startup</label>
                      <input type="text" placeholder="What are you currently trying to build or master?" required className="w-full bg-transparent border-b border-white/20 text-xl text-white pb-3 focus:outline-none focus:border-[#FDFBF7] transition-colors placeholder:text-slate-700" />
                    </div>
                  </div>
                </div>

                {/* Group 3: The Vision */}
                <div>
                  <h3 className="text-[#9933FF] font-mono text-sm uppercase tracking-widest mb-8 border-b border-white/10 pb-4">03. The Vision</h3>
                  <div className="grid grid-cols-1 gap-12">
                    <div className="relative group">
                      <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-4">Help us calibrate the platform</label>
                      <textarea placeholder="In your opinion, what should Guild's absolute minimum and maximum commitment period be, and why?" required rows={2} className="w-full bg-transparent border-b border-white/20 text-xl text-white pb-3 focus:outline-none focus:border-[#FDFBF7] transition-colors placeholder:text-slate-700 resize-none"></textarea>
                    </div>
                    <div className="relative group">
                      <label className="block text-xs text-slate-500 font-mono uppercase tracking-widest mb-4">What problem brings you here today?</label>
                      <textarea placeholder="Why are you choosing to join this waitlist instead of taking a standard solo course?" required rows={2} className="w-full bg-transparent border-b border-white/20 text-xl text-white pb-3 focus:outline-none focus:border-[#FDFBF7] transition-colors placeholder:text-slate-700 resize-none"></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-8 flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-8">
                    <input type="checkbox" required id="terms" className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#F08A4B] focus:ring-[#F08A4B] focus:ring-offset-0 focus:ring-1 cursor-pointer" />
                    <label htmlFor="terms" className="text-sm text-slate-400 cursor-pointer">
                      I agree to the <a href="/terms" className="text-[#F08A4B] font-medium hover:underline">Terms of Service</a> and acknowledge the daily commitment.
                    </label>
                  </div>
                  <button type="submit" className="font-editorial italic text-2xl tracking-wide bg-[#FDFBF7] text-[#1C1C1A] px-12 py-5 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_10px_40px_rgba(253,251,247,0.15)]">
                    Submit Application
                  </button>
                  <p className="text-slate-500 text-xs font-mono mt-6">By submitting, you agree to Kairos AI profiling for pod assembly.</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Fat Premium Footer ───────────────────────────────────────────────── */}
      <footer className="bg-[#1C1C1A] text-[#FDFBF7] py-20 md:py-32 rounded-t-[3rem] mt-12 shadow-[0_-20px_60px_rgba(0,0,0,0.05)] relative z-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-8 mb-24">

            {/* Brand & Dispatch – spans 2 cols */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <img src="/logo_inv.png" alt="Guild Logo" className="h-8 object-contain filter brightness-0 invert" />
                  <span className="font-editorial italic text-3xl font-bold tracking-wide">Guild.</span>
                </div>
                <h3 className="font-editorial text-4xl md:text-5xl mb-6 leading-tight">
                  Stop learning alone.<br />
                  <span className="text-[#F08A4B] italic">Get drafted.</span>
                </h3>
              </div>

              {/* Newsletter */}
              <div className="mt-12">
                <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-4">Join the dispatch</p>
                <div className="flex items-center border-b border-white/20 pb-3 max-w-sm focus-within:border-[#FDFBF7] transition-colors group">
                  <input type="email" placeholder="Email address" className="bg-transparent w-full text-white placeholder:text-slate-600 focus:outline-none text-base" />
                  <button className="text-[#F08A4B] font-bold text-sm uppercase tracking-wide hover:text-[#e07a3b] transition-colors shrink-0">Subscribe</button>
                </div>
              </div>
            </div>

            {/* Product links */}
            <div className="lg:pl-8">
              <h4 className="text-white font-brand font-bold text-lg mb-8">Product</h4>
              <ul className="space-y-5 text-slate-400 text-base font-medium">
                {["The Draft", "Kairos AI Manager", "Peer Mentorship", "Alumni Network", "Waitlist Pricing"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources links */}
            <div>
              <h4 className="text-white font-brand font-bold text-lg mb-8">Resources</h4>
              <ul className="space-y-5 text-slate-400 text-base font-medium">
                {["The Working Model", "Pod Guidelines", "Waitlist FAQ", "System Status"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-white font-brand font-bold text-lg mb-8">Company</h4>
              <ul className="space-y-5 text-slate-400 text-base font-medium">
                {["Manifesto", "About Us", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom row */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 text-sm font-mono">© 2026 Guild Systems Inc. All rights reserved.</p>

            <div className="flex items-center gap-8 text-sm text-slate-400 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-6 text-slate-500">
              {/* Twitter / X */}
              <a href="#" className="hover:text-white hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.631 5.904-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="hover:text-white hover:-translate-y-1 transition-all duration-300" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* ── Back to Top Button ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-700 hover:-translate-y-1 transition-all"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
