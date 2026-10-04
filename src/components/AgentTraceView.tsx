'use client';

import React, { useState } from 'react';
import { GitBranch, Clock, Sparkles, CheckCircle2, ChevronRight, Terminal, ArrowDown, Bot, Shield, FileCheck, Layers } from 'lucide-react';
import { AgentStepTrace } from '@/types/decision';

interface AgentTraceViewProps {
  traces: AgentStepTrace[];
  totalTimeMs: number;
  lang: 'en' | 'tr';
}

export function AgentTraceView({ traces, totalTimeMs, lang }: AgentTraceViewProps) {
  const [selectedTraceId, setSelectedTraceId] = useState<string>(traces[0]?.id || 'trace-1');

  const selectedTrace = traces.find(t => t.id === selectedTraceId) || traces[0];

  return (
    <section id="traces" className="py-16 bg-[#040919] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <GitBranch className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Deep Agent Explainability' : 'Derinlemesine Ajan Açıklanabilirliği'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {lang === 'en' ? 'Agent Execution Trace' : 'Ajan Yürütme ve Karar İzi'}
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              {lang === 'en'
                ? 'Inspect intermediate sub-agent outputs, reasoning steps, latencies, and tool calls across the multi-agent pipeline.'
                : 'Çoklu ajan hattındaki her bir ajanın ara kararlarını, gerekçelerini, gecikme sürelerini ve veri kaynaklarını adım adım inceleyin.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <div className="text-xs">
                <span className="text-slate-400">{lang === 'en' ? 'Total Pipeline Latency:' : 'Toplam Süre:'} </span>
                <span className="font-mono font-bold text-white">{(totalTimeMs / 1000).toFixed(2)}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Trace Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Timeline List */}
          <div className="lg:col-span-5 space-y-3">
            {traces.map((trace, idx) => {
              const isSelected = selectedTrace?.id === trace.id;

              return (
                <div key={trace.id} className="relative">
                  <button
                    onClick={() => setSelectedTraceId(trace.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-blue-500/80 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/40'
                        : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                          {trace.agentName}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                          {trace.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {(trace.durationMs / 1000).toFixed(2)}s
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-400 translate-x-0.5' : 'text-slate-600'}`} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: Inspector Panel for Selected Agent */}
          <div className="lg:col-span-7">
            {selectedTrace && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl h-full flex flex-col justify-between">
                <div>
                  {/* Agent Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                        <h3 className="text-lg font-bold text-white">
                          {selectedTrace.agentName}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">
                        {selectedTrace.role}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono text-blue-400 font-bold">
                        {selectedTrace.confidence}% Confidence
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        Latency: {selectedTrace.durationMs}ms
                      </div>
                    </div>
                  </div>

                  {/* Summary Callout */}
                  <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 mb-6 font-medium leading-relaxed">
                    <span className="font-bold text-blue-300">{lang === 'en' ? 'Agent Finding Summary:' : 'Ajan Bulgusu Özeti:'} </span>
                    {selectedTrace.summary}
                  </div>

                  {/* Detailed Log & Extraction Items */}
                  <div className="space-y-3 mb-6">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-orange-400" />
                      <span>{lang === 'en' ? 'Telemetry & Reasoning Details' : 'Telemetri ve Akıl Yürütme Detayları'}</span>
                    </h5>
                    <div className="space-y-2">
                      {selectedTrace.details.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 flex items-start gap-2.5"
                        >
                          <span className="text-blue-400 font-bold select-none">›</span>
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* State Proof Badge */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px]">Audit Hash: SHA256_{selectedTrace.id}_OK</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-mono text-[10px] border border-emerald-800/50">
                    VERIFIED COMPLIANT
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
