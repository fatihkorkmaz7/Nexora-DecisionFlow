'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Terminal, GitBranch, Heart } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'tr';
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-[#02050e] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500 text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">Nexora DecisionFlow</span>
              <p className="text-[11px] text-slate-500">
                {lang === 'en' ? 'Agentic AI Decision Orchestration Platform for Banking Operations' : 'Bankacılık Operasyonları için Otonom Çoklu Ajan Karar Destek Sistemi'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-900 text-orange-400 border border-slate-800">
              Next.js 14 App Router
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 text-blue-400 border border-slate-800">
              Multi-Agent State Machine
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 text-emerald-400 border border-slate-800">
              Human-in-the-Loop Safe
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Nexora DecisionFlow. Built for Autonomous Banking Operations.
          </p>
          <div className="flex items-center gap-1">
            <span>Designed with precision & fintech security standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
