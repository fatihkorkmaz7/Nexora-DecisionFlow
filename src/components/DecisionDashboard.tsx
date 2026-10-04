'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  FileCheck, 
  ArrowRight, 
  Lock, 
  Zap, 
  Sparkles,
  ExternalLink,
  Layers,
  HelpCircle
} from 'lucide-react';
import { DecisionResult, RecommendedActionItem } from '@/types/decision';
import { formatCurrency } from '@/lib/utils';

interface DecisionDashboardProps {
  decision: DecisionResult;
  lang: 'en' | 'tr';
  onOpenApprovalModal: () => void;
  onExecuteAction: (actionId: string) => void;
}

export function DecisionDashboard({ decision, lang, onOpenApprovalModal, onExecuteAction }: DecisionDashboardProps) {
  const [activeTab, setActiveTab] = useState<'actions' | 'policies' | 'rawJson'>('actions');

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-950/80 border-red-800/80 shadow-red-500/10';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/80 border-amber-800/80 shadow-amber-500/10';
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-950/80 border-yellow-800/80 shadow-yellow-500/10';
      default:
        return 'text-emerald-400 bg-emerald-950/80 border-emerald-800/80 shadow-emerald-500/10';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-500 text-white';
      case 'HIGH':
        return 'bg-orange-500 text-white';
      case 'MEDIUM':
        return 'bg-amber-500 text-slate-900';
      default:
        return 'bg-emerald-500 text-slate-900';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Case Overview */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a142f] to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs font-bold text-orange-400 bg-orange-950/60 px-2.5 py-1 rounded border border-orange-800/40">
                {decision.caseId}
              </span>
              <span className="text-xs font-mono text-slate-400" suppressHydrationWarning>
                {new Date(decision.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {decision.intentCategory}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {decision.caseTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">
              {decision.summary}
            </p>
          </div>

          {/* Human Approval Status Pill Button */}
          <div className="shrink-0 flex flex-col items-start lg:items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {lang === 'en' ? 'Human Approval Required:' : 'İnsan Onayı Gerekli mi?:'}
              </span>
              {decision.humanApprovalRequired ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-700/60 flex items-center gap-1.5 shadow-lg shadow-red-900/20">
                  <UserCheck className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'YES (Gated)' : 'EVET (Zorunlu)'}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 flex items-center gap-1.5 shadow-lg shadow-emerald-900/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'NO (Straight-Through)' : 'HAYIR (Tam Otonom)'}
                </span>
              )}
            </div>

            {decision.humanApprovalRequired && (
              <button
                onClick={onOpenApprovalModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>{lang === 'en' ? 'Review & Authorize Actions' : 'Aksiyonları İncele & Onayla'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Score KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Risk Score */}
        <div className={`p-5 rounded-2xl border shadow-lg ${getRiskBadge(decision.riskLevel)}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">
              {lang === 'en' ? 'Risk Score' : 'Risk Skoru'}
            </span>
            <ShieldAlert className="w-4 h-4 opacity-80" />
          </div>
          <div className="text-3xl font-black tracking-tight my-1">
            {decision.riskScore}<span className="text-sm font-normal opacity-75">/100</span>
          </div>
          <div className="text-xs font-bold tracking-wide uppercase">
            {decision.riskLevel} {lang === 'en' ? 'Risk' : 'Risk Seviyesi'}
          </div>
        </div>

        {/* Confidence Score */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {lang === 'en' ? 'Confidence' : 'Ajan Güven Skoru'}
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 tracking-tight my-1">
            {decision.confidenceScore}%
          </div>
          <div className="text-xs font-medium text-slate-400">
            {lang === 'en' ? 'Cross-Agent Agreement' : 'Ajanlar Arası Mutabakat'}
          </div>
        </div>

        {/* Priority */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {lang === 'en' ? 'Priority Tier' : 'Öncelik Kademesi'}
            </span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex items-center my-1.5">
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${getPriorityBadge(decision.priority)}`}>
              {decision.priority}
            </span>
          </div>
          <div className="text-xs font-medium text-slate-400">
            {decision.priority === 'CRITICAL' ? 'Immediate SLA (<5m)' : 'Standard Queue'}
          </div>
        </div>

        {/* Financial Exposure */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {lang === 'en' ? 'Financial Value' : 'Finansal Tutar'}
            </span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-1 truncate">
            {decision.financialExposure.amount > 0 
              ? `${decision.financialExposure.amount.toLocaleString()} ${decision.financialExposure.currency}`
              : 'N/A'}
          </div>
          <div className="text-xs font-medium text-emerald-400">
            {decision.financialExposure.isRecoverable ? (lang === 'en' ? '100% Recoverable' : 'Geri Alınabilir') : 'Under Review'}
          </div>
        </div>
      </div>

      {/* AI vs Human Responsibility Matrix Banner */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">
            {lang === 'en' ? 'Agentic Responsibility Boundary (Autonomous vs Gated)' : 'Ajan Sorumluluk Sınırı (Otonom vs İnsan Onaylı)'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'AI Can Autonomously Execute:' : 'Yapay Zekânın Otonom Yaptığı İşlemler:'}</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 font-medium list-disc list-inside">
              <li>{lang === 'en' ? 'Natural language intent classification' : 'Niyet ve şikayet sınıflandırması'}</li>
              <li>{lang === 'en' ? 'Ledger & terminal telemetry pattern recognition' : 'Banka kütüğü ve POS hız kontrolü'}</li>
              <li>{lang === 'en' ? 'Dynamic risk & regulatory compliance scoring' : 'Risk ve BDDK uyumluluk puanlaması'}</li>
              <li>{lang === 'en' ? 'Non-destructive precautionary channel locks' : 'Zararsız geçici kanal blokeleri'}</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-800/30">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400 mb-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Human Approval Strictly Required For:' : 'Kesinlikle İnsan Onayı Gerektiren İşlemler:'}</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 font-medium list-disc list-inside">
              <li>{lang === 'en' ? 'Financial chargeback / provision refund execution' : 'Finansal iade / provizyon iptal onayı'}</li>
              <li>{lang === 'en' ? 'Permanent card destruction & re-issuance' : 'Kalıcı kart iptali ve yeni kart basımı'}</li>
              <li>{lang === 'en' ? 'Complete account unfreezing & KYC override' : 'Hesap kilit kaldırma ve KYC istisnaları'}</li>
              <li>{lang === 'en' ? 'Credit contract fund disbursement' : 'Kredi tutarının hesaba aktarılması'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs for Action Roadmap & Policy Engine */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'actions'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'en' ? 'Recommended Action Roadmap' : 'Önerilen Aksiyon Yol Haritası'} ({decision.recommendedActions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('policies')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'policies'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{lang === 'en' ? 'Policy & BDDK Checks' : 'Mevzuat & BDDK Kontrolleri'} ({decision.policyViolationsOrChecks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rawJson')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'rawJson'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>JSON Output</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Recommended Actions */}
        {activeTab === 'actions' && (
          <div className="space-y-3">
            {decision.recommendedActions.map((action, idx) => (
              <div
                key={action.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  action.status === 'executed'
                    ? 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                    : 'bg-orange-950/20 border-orange-500/30 text-white'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                    0{action.step}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h5 className="text-sm font-bold text-white">
                        {action.action}
                      </h5>
                      {action.isAutomated ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700/50">
                          {lang === 'en' ? 'AUTONOMOUS' : 'OTONOM'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-950/80 text-orange-400 border border-orange-700/50">
                          {lang === 'en' ? 'HUMAN GATED' : 'İNSAN ONAYLI'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {action.detail}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {action.status === 'executed' ? (
                    <span className="px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/60 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {lang === 'en' ? 'Dispatched' : 'İcra Edildi'}
                    </span>
                  ) : (
                    <button
                      onClick={() => onExecuteAction(action.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Approve & Execute' : 'Onayla ve İcra Et'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Policy Engine */}
        {activeTab === 'policies' && (
          <div className="space-y-3">
            {decision.policyViolationsOrChecks.map((policy, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-orange-400 bg-orange-950/50 px-2 py-0.5 rounded border border-orange-800/40">
                      {policy.ruleId}
                    </span>
                    <h5 className="text-sm font-bold text-white">
                      {policy.ruleName}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-400">
                    {policy.description}
                  </p>
                </div>

                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase shrink-0 border ${
                    policy.status === 'PASSED'
                      ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60'
                      : policy.status === 'TRIGGERED'
                      ? 'text-red-400 bg-red-950/60 border-red-800/60'
                      : 'text-amber-400 bg-amber-950/60 border-amber-800/60'
                  }`}
                >
                  {policy.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: JSON Payload */}
        {activeTab === 'rawJson' && (
          <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-orange-300 border border-slate-800 overflow-x-auto max-h-96">
            {JSON.stringify(decision, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
