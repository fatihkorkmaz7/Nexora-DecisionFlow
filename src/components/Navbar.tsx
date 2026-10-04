'use client';

import React from 'react';
import { ShieldCheck, Cpu, GitBranch, Layers, Sparkles, Activity, ExternalLink, Globe } from 'lucide-react';

interface NavbarProps {
  lang: 'en' | 'tr';
  onToggleLang: () => void;
  activeSection: string;
}

export function Navbar({ lang, onToggleLang, activeSection }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050b1a]/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/25 ring-1 ring-orange-400/50 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#050b1a] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-orange-400 transition-colors">
                Nexora <span className="text-orange-500 font-extrabold">DecisionFlow</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded">
                v2.4 Pro
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
              {lang === 'en' ? 'Agentic Intelligence for Banking Decisions' : 'Bankacılık Karar Destekli Otonom Ajan Platformu'}
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <a
            href="#analyzer"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            {lang === 'en' ? 'Copilot Demo' : 'Canlı Demo'}
          </a>
          <a
            href="#traces"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <GitBranch className="w-4 h-4 text-blue-400" />
            {lang === 'en' ? 'Agent Trace' : 'Ajan İzi'}
          </a>
          <a
            href="#architecture"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            {lang === 'en' ? 'Architecture' : 'Mimari'}
          </a>
          <a
            href="#workflow"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            {lang === 'en' ? 'How It Works' : 'Nasıl Çalışır?'}
          </a>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          {/* Live system state badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>5 Agents Ready</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-semibold transition-all"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Quick CTA */}
          <a
            href="#analyzer"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>{lang === 'en' ? 'Try Demo' : 'Demoyu Başlat'}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
