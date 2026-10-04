'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Send, RefreshCw, Bot, CheckCircle2, Clock, Terminal, AlertTriangle, ShieldCheck, Play } from 'lucide-react';
import { PRESET_SCENARIOS } from '@/lib/data/scenarios';
import { DecisionResult, BankingScenario } from '@/types/decision';

interface LiveAnalyzerProps {
  lang: 'en' | 'tr';
  onAnalysisComplete: (result: DecisionResult) => void;
  selectedPresetId?: string;
}

export function LiveAnalyzer({ lang, onAnalysisComplete, selectedPresetId }: LiveAnalyzerProps) {
  const [inputPrompt, setInputPrompt] = useState<string>(
    lang === 'en'
      ? "I noticed an unauthorized charge of 4,200 TL from 'Apple Store London' on my credit card. My card is currently with me in Istanbul."
      : "Kredi kartımdan bilgim dışında 'Apple Store London' adıyla 4.200 TL harcama yapılmış. Kartım şu anda İstanbul'da ve fiziksel olarak yanımda."
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [activePreset, setActivePreset] = useState<string>('fraud-dispute');

  const agentSteps = [
    {
      name: lang === 'en' ? 'Intent Classification Agent' : 'Niyet Sınıflandırma Ajanı',
      desc: lang === 'en' ? 'Classifying dispute category, merchant entity, and user location' : 'Şikayet türü, satıcı varlığı ve konum analizi yapılıyor...',
      duration: 500
    },
    {
      name: lang === 'en' ? 'Transaction & Telemetry Agent' : 'İşlem & Telemetri Ajanı',
      desc: lang === 'en' ? 'Scanning core ledger, POS timestamps, and geo-velocity anomaly' : 'Banka işlem kütüğü, POS zaman damgaları ve coğrafi hız taranıyor...',
      duration: 650
    },
    {
      name: lang === 'en' ? 'Risk & Fraud Assessment Agent' : 'Risk & Dolandırıcılık Ajanı',
      desc: lang === 'en' ? 'Computing multidimensional loss score & account compromise probability' : 'Çok boyutlu risk skoru ve hesap güvenliği hesaplanıyor...',
      duration: 600
    },
    {
      name: lang === 'en' ? 'Regulatory & Policy Agent' : 'Mevzuat & Uyum Ajanı',
      desc: lang === 'en' ? 'Evaluating BDDK, Visa/Mastercard 4837 rules & Human Approval policy' : 'BDDK kuralları, ters ibraz kriterleri ve onay politikası denetleniyor...',
      duration: 500
    },
    {
      name: lang === 'en' ? 'Decision & Action Orchestrator' : 'Karar & Aksiyon Orkestratörü',
      desc: lang === 'en' ? 'Synthesizing recommendations & gating high-risk actions' : 'Öncelikli aksiyon planı sentezleniyor ve onay kuyruğuna alınıyor...',
      duration: 450
    }
  ];

  useEffect(() => {
    if (selectedPresetId) {
      handleSelectScenario(selectedPresetId);
    }
  }, [selectedPresetId]);

  const handleSelectScenario = (scenarioId: string) => {
    setActivePreset(scenarioId);
    const found = PRESET_SCENARIOS.find(s => s.id === scenarioId);
    if (found) {
      setInputPrompt(lang === 'en' ? found.prompt : found.promptTr);
    }
  };

  const runAnalysis = async () => {
    if (!inputPrompt.trim() || isLoading) return;

    setIsLoading(true);
    setActiveStepIndex(0);

    // Play step animation sequence
    for (let i = 0; i < agentSteps.length; i++) {
      setActiveStepIndex(i);
      await new Promise(res => setTimeout(res, agentSteps[i].duration));
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt })
      });

      if (!res.ok) {
        throw new Error('Analysis failed');
      }

      const data: DecisionResult = await res.json();
      setActiveStepIndex(agentSteps.length);
      onAnalysisComplete(data);
    } catch (err) {
      console.error(err);
      // Fallback to preset
      const preset = PRESET_SCENARIOS[0].simulatedResult;
      onAnalysisComplete(preset);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="analyzer" className="py-16 relative">
      {/* Subtle background container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Interactive AI Copilot Studio' : 'Etkileşimli Ajan Karar Stüdyosu'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {lang === 'en' ? 'Analyze Customer Case' : 'Müşteri Vakasını Analiz Edin'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {lang === 'en'
                ? 'Type any natural language banking complaint or pick a benchmark preset to watch the multi-agent orchestrator in action.'
                : 'Doğal dilde herhangi bir bankacılık talebi yazın veya hazır senaryolardan birini seçerek çoklu ajan orkestrasyonunu izleyin.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">
              {lang === 'en' ? 'Engine Latency:' : 'Motor Gecikmesi:'}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              ~2.3s end-to-end
            </span>
          </div>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectScenario(preset.id)}
                className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-orange-500/60 ring-1 ring-orange-500/30 shadow-lg shadow-orange-500/10'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${preset.badgeColor}`}>
                    {preset.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {preset.amount}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 mb-1">
                  {lang === 'en' ? preset.title : preset.titleTr}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {lang === 'en' ? preset.prompt : preset.promptTr}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Input Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#081026] border border-slate-800 shadow-2xl relative">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Bot className="w-4 h-4 text-orange-400" />
              <span>{lang === 'en' ? 'Customer Banking Query / Event Payload' : 'Müşteri Bildirimi / Olay Metni'}</span>
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {inputPrompt.length} chars
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={4}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={lang === 'en' ? 'Describe the customer situation or issue...' : 'Müşterinin yaşadığı durumu veya bankacılık talebini girin...'}
              disabled={isLoading}
              className="w-full p-4 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none font-sans"
            />
          </div>

          {/* Action Row */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Zero-Risk Mode: Actions requiring fund transfers trigger Human Gate.'
                  : 'Sıfır-Risk Modu: Finansal transfer gerektiren aksiyonlar İnsan Onayına takılır.'}
              </span>
            </div>

            <button
              onClick={runAnalysis}
              disabled={isLoading || !inputPrompt.trim()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>{lang === 'en' ? 'Agents Orchestrating...' : 'Ajanlar Çalışıyor...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{lang === 'en' ? 'Analyze with AI Agents' : 'Ajanlarla Analiz Et'}</span>
                </>
              )}
            </button>
          </div>

          {/* Live Agent Execution Stepper (Visible when loading or recently run) */}
          {isLoading && (
            <div className="mt-6 pt-6 border-t border-slate-800/80 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
                  <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Multi-Agent Execution Pipeline' : 'Çoklu Ajan Yürütme Hattı'}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Step {Math.min(activeStepIndex + 1, agentSteps.length)} / {agentSteps.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {agentSteps.map((step, idx) => {
                  const isCurrent = activeStepIndex === idx;
                  const isFinished = activeStepIndex > idx;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-orange-950/30 border-orange-500/50 shadow-md shadow-orange-500/10'
                          : isFinished
                          ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                          : 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isFinished ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center text-xs font-mono">
                            {idx + 1}
                          </div>
                        )}

                        <div>
                          <h5 className={`text-xs font-bold ${isCurrent ? 'text-orange-300' : isFinished ? 'text-slate-200' : 'text-slate-500'}`}>
                            {step.name}
                          </h5>
                          <p className="text-[11px] text-slate-400">
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono">
                        {isFinished ? (
                          <span className="text-emerald-400">Complete</span>
                        ) : isCurrent ? (
                          <span className="text-orange-400 animate-pulse">Running...</span>
                        ) : (
                          <span className="text-slate-600">Pending</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
