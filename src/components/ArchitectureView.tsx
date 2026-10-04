'use client';

import React, { useState } from 'react';
import { Layers, Cpu, ShieldCheck, Database, Zap, Code2, Server, Lock, ArrowRight, GitCommit, UserCheck } from 'lucide-react';

interface ArchitectureViewProps {
  lang: 'en' | 'tr';
}

export function ArchitectureView({ lang }: ArchitectureViewProps) {
  const [selectedLayer, setSelectedLayer] = useState<'orchestrator' | 'agents' | 'guardrails' | 'core'>('orchestrator');

  const layersInfo = {
    orchestrator: {
      title: lang === 'en' ? 'Central Orchestration Engine' : 'Merkezi Ajan Orkestratörü',
      desc: lang === 'en'
        ? 'Implements a deterministic state machine that receives customer events, decomposes them into parallel evaluation tasks, and manages agent lifecycles.'
        : 'Gelen bankacılık taleplerini ayrıştıran, paralel değerlendirme görevlerine bölen ve ajan yaşam döngüsünü yöneten deterministik durum makinesi.',
      tech: ['Next.js App Router / Edge Runtime', 'TypeScript Type-Safe Contracts', 'LangGraph-Inspired State Flow'],
      security: 'Sub-millisecond token dispatch with isolation sandboxes.'
    },
    agents: {
      title: lang === 'en' ? 'Specialized Domain Agents' : 'Uzmanlaşmış Alan Ajanları',
      desc: lang === 'en'
        ? '5 discrete agents with strictly segregated prompts, schemas, and verification boundaries (Intent, Telemetry, Risk, Regulatory, Action).'
        : 'Sorumlulukları kesin çizgilerle ayrılmış 5 otonom ajan (Niyet, Telemetri, Risk Puanlama, BDDK/Mevzuat Uyumu ve Karar).',
      tech: ['Zero-Shot Structured Entity Parser', 'Geo-Velocity & Telemetry Anomaly Models', 'Dynamic Multi-Dimensional Scoring'],
      security: 'Zero hallucination risk on financial movement variables.'
    },
    guardrails: {
      title: lang === 'en' ? 'Regulatory Policy & HITL Governance' : 'Mevzuat Denetimi & İnsan Onay Bariyeri',
      desc: lang === 'en'
        ? 'Enforces BDDK, MASAK, and Card Scheme rules (Mastercard/Visa Reason 4837). Critical fund movements are strictly gated behind Human-in-the-Loop approval.'
        : 'BDDK tüketici koruma maddeleri ve MASAK kurallarını işletir. Fon transferi veya kart iptali gibi yüksek riskli adımlar kesinlikle insan onayına bağlanır.',
      tech: ['BDDK Compliance Matrix', 'Role-Based Dual Authorization Gate', 'Immutable Audit Dossier Generator'],
      security: 'Zero-Blind autonomous money movement guarantee.'
    },
    core: {
      title: lang === 'en' ? 'Core Banking & Payment Rail Adapters' : 'Banka Çekirdek Sistem & Ödeme Rayı Adaptörleri',
      desc: lang === 'en'
        ? 'Unified API abstraction layer interacting with ISO8583 switch messages, BKM switch, Core Ledger, and Instant Notification Push gateways.'
        : 'ISO8583 switch mesajları, BKM takas ağı, ana bankacılık defteri ve anlık mobil bildirim kanallarıyla entegre çalışan API katmanı.',
      tech: ['ISO8583 / AS2805 Switch Adapters', 'BKM Fast & EFT Interface Mock', 'Idempotent Transaction Execution'],
      security: 'End-to-end cryptographic payload signing and replay protection.'
    }
  };

  return (
    <section id="architecture" className="py-16 bg-[#020612] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Enterprise Engineering Specification' : 'Kurumsal Mühendislik Mimarisi'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'en' ? 'Multi-Agent System Architecture' : 'Çoklu Ajan Sistem Mimarisi'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Designed for production banking environments where reliability, compliance, and explainability are non-negotiable.'
              : 'Güvenilirliğin, mevzuat uyumunun ve açıklanabilirliğin şart olduğu gerçek bankacılık operasyonları için tasarlandı.'}
          </p>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl mb-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Interactive Architecture Schema */}
            <div className="lg:col-span-7 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span>SYSTEM_TOPOLOGY_V2.SVG</span>
                <span className="text-emerald-400">STATUS: HEALTHY</span>
              </div>

              {/* Topology Node Map */}
              <div className="space-y-4 font-mono text-xs">
                {/* Layer 1: Ingress */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="font-bold text-white">Ingress: Customer Channel / Webhook</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Natural Language / JSON</span>
                </div>

                <div className="flex justify-center text-slate-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Layer 2: Central Orchestrator */}
                <button
                  onClick={() => setSelectedLayer('orchestrator')}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedLayer === 'orchestrator'
                      ? 'bg-orange-950/40 border-orange-500 text-white ring-1 ring-orange-500/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="font-bold text-sm text-white">Central Orchestration Agent</div>
                      <div className="text-[11px] text-slate-400">State Machine & Parallel Sub-Agent Dispatcher</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    MASTER NODE
                  </span>
                </button>

                <div className="flex justify-center text-slate-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Layer 3: Parallel Specialized Agents */}
                <button
                  onClick={() => setSelectedLayer('agents')}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedLayer === 'agents'
                      ? 'bg-blue-950/40 border-blue-500 text-white ring-1 ring-blue-500/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-sm text-white">Specialized Sub-Agent Cluster</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      5 WORKERS
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-center font-mono">
                    <span className="p-1.5 rounded bg-slate-950 border border-slate-800 text-blue-300">Intent Agent</span>
                    <span className="p-1.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">Telemetry Agent</span>
                    <span className="p-1.5 rounded bg-slate-950 border border-slate-800 text-red-300">Risk Agent</span>
                    <span className="p-1.5 rounded bg-slate-950 border border-slate-800 text-purple-300">Policy Agent</span>
                  </div>
                </button>

                <div className="flex justify-center text-slate-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Layer 4: Regulatory Gate & Human Approval */}
                <button
                  onClick={() => setSelectedLayer('guardrails')}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedLayer === 'guardrails'
                      ? 'bg-amber-950/40 border-amber-500 text-white ring-1 ring-amber-500/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-bold text-sm text-white">Human-in-the-Loop & BDDK Guardrail</div>
                      <div className="text-[11px] text-slate-400">Zero-Blind Financial Authorization Policy</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    HITL GATE
                  </span>
                </button>

                <div className="flex justify-center text-slate-600">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>

                {/* Layer 5: Banking Core Execution */}
                <button
                  onClick={() => setSelectedLayer('core')}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedLayer === 'core'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-sm text-white">Core Banking Execution Rail</div>
                      <div className="text-[11px] text-slate-400">Card Switches, BKM Ledger, SMS/Push Gateways</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    SETTLED
                  </span>
                </button>
              </div>
            </div>

            {/* Layer Detail Inspector */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950/80 text-purple-400 border border-purple-700/60 uppercase">
                    Layer Focus
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {layersInfo[selectedLayer].title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {layersInfo[selectedLayer].desc}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {lang === 'en' ? 'Key Technologies' : 'Kullanılan Teknolojiler'}
                    </h5>
                    <div className="space-y-1.5">
                      {layersInfo[selectedLayer].tech.map((t, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                          <Code2 className="w-3.5 h-3.5 text-orange-400" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {lang === 'en' ? 'Security & Governance Guarantee' : 'Güvenlik ve Uyum Garantisi'}
                    </h5>
                    <p className="text-xs text-slate-400 italic">
                      "{layersInfo[selectedLayer].security}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Architecture verified for enterprise banking agentic standards.'
                    : 'Mimari kurumsal bankacılık otonom ajan standartlarına tam uyumludur.'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Why this is NOT just a chatbot comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-red-900/30">
            <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">
              ❌ {lang === 'en' ? 'Traditional AI Banking Chatbot' : 'Geleneksel Bankacılık Sohbet Botu'}
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>• Tek bir genel LLM yanıtına bağımlı (halüsinasyon riski yüksek).</li>
              <li>• Banka işlem defterine veya POS telemetrisine doğrudan erişimi ve kontrolü yok.</li>
              <li>• Mevzuat ve risk analizini körü körüne karıştırabilir.</li>
              <li>• Finansal aksiyonları izole edip insan onayına güvenle bağlayamaz.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/70 border border-emerald-900/30">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
              ✅ {lang === 'en' ? 'Nexora DecisionFlow (Agentic Copilot)' : 'Nexora DecisionFlow (Ajanlı Karar Platformu)'}
            </h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>• <strong>Understand → Analyze → Decide → Act</strong> felsefesiyle çalışan çoklu uzman ajanlar.</li>
              <li>• Her ajanın ara kararları ve gecikmesi şeffaf denetim izinde görünür (Audit Trace).</li>
              <li>• BDDK / MASAK politikalarını her adımda denetleyen kural motoru.</li>
              <li>• <strong>Human-in-the-Loop</strong>: Finansal transferlerde yetkili insan onay kapısı.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
