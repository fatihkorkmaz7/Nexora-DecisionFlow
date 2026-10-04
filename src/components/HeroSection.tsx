'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Lock, BarChart3, ChevronRight, Play } from 'lucide-react';

interface HeroSectionProps {
  lang: 'en' | 'tr';
  onQuickStartScenario: (scenarioId: string) => void;
}

export function HeroSection({ lang, onQuickStartScenario }: HeroSectionProps) {
  const content = {
    en: {
      badge: 'Agentic AI Decision Orchestration Platform for Banking Operations',
      titleStart: 'Banking decisions,',
      titleHighlight: 'powered by autonomous',
      titleEnd: 'AI agents.',
      subtitle:
        'An enterprise multi-agent system that autonomously investigates complex banking cases, evaluates risk & regulatory compliance, and orchestrates the safest next action while keeping critical decisions under human control.',
      ctaDemo: 'Try Live Copilot Demo',
      ctaArchitecture: 'Explore Multi-Agent Architecture',
      quickScenariosLabel: 'Quick Launch Benchmark Cases:',
      metrics: [
        { label: 'Autonomous Agents', val: '5 Orchestrated', sub: 'Intent, Risk, Ledger, Policy, Action' },
        { label: 'Decision Latency', val: '< 2.4s', sub: 'Instant straight-through triage' },
        { label: 'Governance Gating', val: '100% HITL', sub: 'Zero unauthorized fund movement' },
        { label: 'Explainability Trace', val: 'Full Audit Log', sub: 'Regulatory-ready step provenance' },
      ],
      agentFlowSteps: [
        { name: 'Customer Request', tag: 'Inbound Stream' },
        { name: 'Intent Agent', tag: 'Entity Extraction' },
        { name: 'Risk Agent', tag: 'Fraud & Loss Scoring' },
        { name: 'Policy Agent', tag: 'BDDK & Scheme Checks' },
        { name: 'Decision Engine', tag: 'Next-Best Action' },
        { name: 'Human Sign-off', tag: 'Authorized Execution' },
      ]
    },
    tr: {
      badge: 'Bankacılık Operasyonları için Otonom Karar Destek Platformu',
      titleStart: 'Bankacılık kararları,',
      titleHighlight: 'otonom yapay zekâ ajanlarıyla',
      titleEnd: 'yönetilir.',
      subtitle:
        'Müşteri taleplerini ve şüpheli işlemleri çoklu ajan mimarisiyle derinlemesine analiz eden, risk ve BDDK mevzuatını değerlendiren, kritik kararları insan onayında tutarak en doğru aksiyonu belirleyen yeni nesil karar orkestrasyonu.',
      ctaDemo: 'Canlı Demoyu Deneyin',
      ctaArchitecture: 'Ajan Mimarisini İncele',
      quickScenariosLabel: 'Hızlı Test Senaryoları:',
      metrics: [
        { label: 'Otonom Ajanlar', val: '5 Özel Ajan', sub: 'Niyet, Risk, Telemetri, Mevzuat, Karar' },
        { label: 'Karar Gecikmesi', val: '< 2.4 sn', sub: 'Anlık çoklu ajan sentezi' },
        { label: 'İnsan Onay Güvencesi', val: '%100 HITL', sub: 'Finansal risklerde sıfır kör işlem' },
        { label: 'Açıklanabilirlik İzi', val: 'Tam Denetim Logu', sub: 'Her adımın gerekçesi şeffaf' },
      ],
      agentFlowSteps: [
        { name: 'Müşteri Talebi', tag: 'Giriş İletisi' },
        { name: 'Niyet Ajanı', tag: 'Varlık Çıkarımı' },
        { name: 'Risk Ajanı', tag: 'Dolandırıcılık Puanı' },
        { name: 'Mevzuat Ajanı', tag: 'BDDK & Kural Kontrolü' },
        { name: 'Karar Motoru', tag: 'Önerilen Aksiyon' },
        { name: 'İnsan Onayı', tag: 'Güvenli İcra' },
      ]
    }
  };

  const c = content[lang];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-1/4 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-orange-500/10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>{c.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            {c.titleStart}{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              {c.titleHighlight}
            </span>{' '}
            {c.titleEnd}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {c.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#analyzer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold text-base shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{c.ctaDemo}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#architecture"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2 hover:border-slate-600"
            >
              <span>{c.ctaArchitecture}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Quick Benchmark Cases pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 pb-8 border-t border-slate-800/60">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
              {c.quickScenariosLabel}
            </span>
            <button
              onClick={() => onQuickStartScenario('fraud-dispute')}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-medium hover:bg-red-900/50 hover:border-red-600/60 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>{lang === 'en' ? 'Fraud Dispute' : 'Şüpheli Harcama'}</span>
            </button>
            <button
              onClick={() => onQuickStartScenario('duplicate-payment')}
              className="px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-medium hover:bg-amber-900/50 hover:border-amber-600/60 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{lang === 'en' ? 'Duplicate Billing' : 'Mükerrer Çekim'}</span>
            </button>
            <button
              onClick={() => onQuickStartScenario('loan-request')}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-medium hover:bg-emerald-900/50 hover:border-emerald-600/60 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{lang === 'en' ? 'Loan Pre-scoring' : 'Kredi Ön Onayı'}</span>
            </button>
            <button
              onClick={() => onQuickStartScenario('suspicious-login')}
              className="px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-medium hover:bg-purple-900/50 hover:border-purple-600/60 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>{lang === 'en' ? 'Account Takeover' : 'Cihaz Güvenliği'}</span>
            </button>
          </div>
        </div>

        {/* Live Multi-Agent Pipeline Strip */}
        <div className="mt-6 p-6 rounded-2xl bg-[#09122a]/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                {lang === 'en' ? 'Continuous Multi-Agent Pipeline' : 'Otonom Çoklu Ajan Hattı'}
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Deterministic Safety Fallback: Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {c.agentFlowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-orange-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-orange-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60 group-hover:bg-orange-400" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-white leading-tight mb-1">
                  {step.name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate">
                  {step.tag}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {c.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition-all"
            >
              <div className="text-2xl font-black text-white tracking-tight mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                {m.val}
              </div>
              <div className="text-xs font-semibold text-orange-400 mb-0.5">
                {m.label}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
