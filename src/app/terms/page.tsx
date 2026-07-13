"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="bg-[#FAFAFA] text-slate-900 min-h-screen selection:bg-blue-100 selection:text-blue-900 relative">
      <div className="absolute inset-0 bg-grid z-[0] pointer-events-none"></div>

      {/* Minimalist Light Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full relative z-10 border-b border-slate-200/50">
        <Link href="/" className="flex items-center gap-4 group">
          <img src="/logo_inv.png" alt="Guild Icon" className="h-10 object-contain group-hover:scale-105 transition-transform" />
          <img src="/logo_inv_words.png" alt="Guild Wordmark" className="h-5 object-contain mt-1 hidden sm:block" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <Link href="/#apply" className="font-brand tracking-wide bg-slate-900 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm">
            Back to Application
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200"
        >
          <div className="mb-12">
            <h1 className="font-brand text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Terms and Conditions</h1>
            <p className="text-slate-500">Last updated: June 18, 2026</p>
          </div>

          <div className="space-y-10 text-slate-600 leading-relaxed text-lg font-sans">
            <section>
              <h2 className="font-brand text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p>
                Welcome to Guild. By applying to join a pod or using our platform, you agree to be bound by these Terms and Conditions. Guild is not a standard learning platform—it is a commitment-based network designed to foster long-term collaboration. If you do not agree to these terms, please do not submit an application.
              </p>
            </section>

            <section>
              <h2 className="font-brand text-2xl font-bold text-slate-900 mb-4">2. Eligibility & Application</h2>
              <p className="mb-4">
                Guild is highly selective. Completing the application process does not guarantee placement in a pod. We manually review and assemble pods based on skill harmony, timezone alignment, and shared ambition.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate information during the application process.</li>
                <li>You must be at least 18 years of age to participate.</li>
                <li>Guild reserves the right to reject any application at our sole discretion.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-brand text-2xl font-bold text-slate-900 mb-4">3. The Commitment Standard</h2>
              <p>
                When you are placed in a pod, you are making a binding commitment to your teammates for the duration you selected (6 to 24 months). Guild utilizes Kairos AI to monitor team health, velocity, and individual contributions.
                <br /><br />
                <strong>Removal Policy:</strong> Guild reserves the right to immediately remove any member who consistently fails to meet daily execution standards, skips mandatory pod standups, or abandons their team without valid notice. We protect the momentum of the pod above all else.
              </p>
            </section>

            <section>
              <h2 className="font-brand text-2xl font-bold text-slate-900 mb-4">4. Code of Conduct</h2>
              <p className="mb-4">
                We enforce a strict culture of respect, mentorship, and high performance. While working within your pod:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Harassment, discrimination, or toxic behavior of any kind will result in immediate and permanent expulsion.</li>
                <li>Intermediate and advanced developers are expected to actively mentor absolute beginners within their pod.</li>
                <li>Constructive feedback is required; gatekeeping is prohibited.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-brand text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
              <p>
                Guild does not claim ownership over the code, projects, or startups you build within your pod. The intellectual property you generate belongs entirely to you and your pod members, subject to whatever internal agreements your team establishes. 
              </p>
            </section>

            <section>
              <h2 className="font-brand text-2xl font-bold text-slate-900 mb-4">6. Data & Privacy (Kairos AI)</h2>
              <p>
                To effectively manage pods, our AI agent, Kairos, will process chat logs, task completions, and general activity within your workspace. This data is used strictly for team calibration, health monitoring, and generating personalized daily requirements. Your data will never be sold to third-party advertisers.
              </p>
            </section>

            <section>
              <h2 className="font-brand text-2xl font-bold text-slate-900 mb-4">7. Changes to Terms</h2>
              <p>
                We may update these Terms and Conditions as Guild evolves. If we make significant changes, we will notify all active pod members and waitlist applicants via email. Continued participation in a pod after changes are made constitutes acceptance of the new terms.
              </p>
            </section>

          </div>
        </motion.div>
      </main>

      <footer className="bg-white pt-12 pb-8 border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <img src="/logo_inv.png" alt="Guild Icon" className="h-6 object-contain grayscale opacity-60 hover:opacity-100 transition-opacity" />
                <span className="text-sm text-slate-500 font-medium">© 2026 Guild. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
                <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                <Link href="#" className="hover:text-slate-900 transition-colors">Manifesto</Link>
                <Link href="#" className="hover:text-slate-900 transition-colors">Twitter / X</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
