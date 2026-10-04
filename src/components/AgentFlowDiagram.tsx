'use client';

import React from 'react';
import { Bot, UserCheck, ShieldAlert, FileText, CheckCircle2, ArrowDown, Cpu, Sparkles, Terminal } from 'lucide-react';

interface AgentFlowDiagramProps {
  lang: 'en' | 'tr';
}

export function AgentFlowDiagram({ lang }: AgentFlowDiagramProps) {
  const steps = [
    {
      num: '01',
      agent: lang === 'en' ? 'Intent Agent' : 'Niyet Sınıflandırma Ajanı',
      sub: lang === 'en' ? 'Entity & Sentiment Extraction' : 'Varlık ve Aciliyet Analizi',
      desc: lang === 'en' ? 'Parses unstructured text, determines intent category, urgency, and financial values.' : 'Müşteri ifadesini NLP ile parse eder, işlem tutarını, satıcıyı ve şikayet türünü çıkarır.',
      badge: 'NLP & Tokenizer',
      badgeColor: 'text-blue-400 bg-blue-950/60 border-blue-800/40',
      icon: Bot,
    },
    {
      num: '02',
      agent: lang === 'en' ? 'Transaction & Telemetry Agent' : 'İşlem ve Telemetri Ajanı',
      sub: lang === 'en' ? 'Ledger & Geo-Velocity Crosscheck' : 'Banka Defteri & Hız Kontrolü',
      desc: lang === 'en' ? 'Queries core banking switch, checks terminal timestamps, detects impossible travel & duplicates.' : 'Kart harcama kütüğünü, POS loglarını ve cihaz sinyallerini tarayarak anormallikleri tespit eder.',
      badge: 'Core Ledger & GPS',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/40',
      icon: Terminal,
    },
    {
      num: '03',
      agent: lang === 'en' ? 'Risk & Fraud Agent' : 'Risk ve Dolandırıcılık Ajanı',
      sub: lang === 'en' ? 'Loss Probability & Scoring (0-100)' : 'Risk Skoru ve Kayıp Tahmini',
      desc: lang === 'en' ? 'Computes multidimensional composite score, ATO threat level, and financial exposure.' : 'Çok boyutlu risk matrisi hesaplar, hesap ele geçirme (ATO) veya çifte çekim riskini belirler.',
      badge: 'Dynamic Risk Engine',
      badgeColor: 'text-red-400 bg-red-950/60 border-red-800/40',
      icon: ShieldAlert,
    },
    {
      num: '04',
      agent: lang === 'en' ? 'Regulatory & Policy Agent' : 'Mevzuat ve Uyum Ajanı',
      sub: lang === 'en' ? 'BDDK, MASAK & Scheme Guardrails' : 'BDDK, MASAK & İtiraz Kuralları',
      desc: lang === 'en' ? 'Validates against banking regulations, chargeback eligibility (Visa/Mastercard 4837), and limits.' : 'BDDK tüketici koruma maddeleri, ters ibraz süreleri ve iç bankacılık limit kurallarını uygular.',
      badge: 'Rule Engine & Guardrails',
      badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-800/40',
      icon: FileText,
    },
    {
      num: '05',
      agent: lang === 'en' ? 'Decision & Action Orchestrator' : 'Karar ve Aksiyon Orkestratörü',
      sub: lang === 'en' ? 'Prioritized Next-Best Action' : 'Öncelikli Aksiyon Planı',
      desc: lang === 'en' ? 'Synthesizes agent insights into safe automated tasks and gates critical actions for human approval.' : 'Tüm ajan çıktılarını sentezleyerek güvenli otomasyonları tetikler, finansal riskli işlemleri insan onayına sunar.',
      badge: 'HITL Governed Execution',
      badgeColor: 'text-orange-400 bg-orange-950/60 border-orange-800/40',
      icon: UserCheck,
    },
  ];

  return (
    <section id="workflow" className="py-16 bg-[#030712] border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'en' ? 'Autonomous Multi-Agent Workflow' : 'Otonom Çoklu Ajan İş Akışı'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'en' ? 'How DecisionFlow Orchestrates Banking Cases' : 'DecisionFlow Bankacılık Vakalarını Nasıl Yönetir?'}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'en'
              ? 'Unlike simple chatbots that hallucinate financial actions, DecisionFlow relies on specialized autonomous agents cooperating through strict regulatory guardrails.'
              : 'Finansal işlemleri tek bir LLM yanıtıyla geçiştiren basit sohbet botlarının aksine, DecisionFlow uzmanlaşmış ajanları denetimli ve mevzuata tam uyumlu bir akışla koordine eder.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/40 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full pointer-events-none group-hover:bg-orange-500/10 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center font-mono text-xs font-bold text-orange-400">
                      {step.num}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-orange-400" />
                    <h3 className="font-bold text-sm text-white group-hover:text-orange-300 transition-colors">
                      {step.agent}
                    </h3>
                  </div>

                  <p className="text-[11px] font-medium text-slate-400 mb-3 leading-snug">
                    {step.sub}
                  </p>

                  <p className="text-xs text-slate-400/90 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>State: Active</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
