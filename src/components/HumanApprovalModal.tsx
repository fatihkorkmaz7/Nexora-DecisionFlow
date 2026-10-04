'use client';

import React, { useState } from 'react';
import { X, UserCheck, ShieldAlert, CheckCircle2, AlertTriangle, Lock, Sparkles, FileText } from 'lucide-react';
import { DecisionResult } from '@/types/decision';
import confetti from 'canvas-confetti';

interface HumanApprovalModalProps {
  decision: DecisionResult;
  isOpen: boolean;
  onClose: () => void;
  onApproveAll: () => void;
  lang: 'en' | 'tr';
}

export function HumanApprovalModal({ decision, isOpen, onClose, onApproveAll, lang }: HumanApprovalModalProps) {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authorizedSuccess, setAuthorizedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApprove = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      setAuthorizedSuccess(true);
      
      // Fire confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#22c55e', '#3b82f6', '#eab308']
      });

      onApproveAll();

      setTimeout(() => {
        setAuthorizedSuccess(false);
        onClose();
      }, 1800);
    }, 900);
  };

  const pendingActions = decision.recommendedActions.filter(a => !a.isAutomated || a.requiresHumanApproval);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'en' ? 'Human-in-the-Loop Approval Gate' : 'İnsan Onay (HITL) Karar Kapısı'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Case ID: {decision.caseId} • Tier-2 Banking Operator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Reason Alert */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                {lang === 'en' ? 'Why is Human Authorization Required?' : 'Neden İnsan Onayı Gerekiyor?'}
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {decision.humanApprovalReason}
              </p>
            </div>
          </div>

          {/* Pending Gated Actions List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-orange-400" />
              <span>{lang === 'en' ? 'Actions Awaiting Your Signature' : 'İmzanızı Bekleyen Kritik Aksiyonlar'} ({pendingActions.length})</span>
            </h4>

            <div className="space-y-2.5">
              {pendingActions.map((action, idx) => (
                <div
                  key={action.id}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-orange-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-white mb-0.5">
                        {action.action}
                      </h5>
                      <p className="text-[11px] text-slate-400">
                        {action.detail}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/80 text-red-400 border border-red-800/50 shrink-0">
                    PENDING SIGN-OFF
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Metadata Note */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="font-mono">Auditor: Operations Officer ID #8914</span>
            <span className="text-emerald-400">Policy: BDDK Standard 2024-C</span>
          </div>
        </div>

        {/* Modal Footer Buttons */}
        <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isAuthorizing || authorizedSuccess}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            {lang === 'en' ? 'Dismiss / Reject' : 'Kapat / Reddet'}
          </button>

          <button
            onClick={handleApprove}
            disabled={isAuthorizing || authorizedSuccess}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {authorizedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{lang === 'en' ? 'Actions Authorized & Dispatched!' : 'Tüm Aksiyonlar Onaylandı ve İletildi!'}</span>
              </>
            ) : isAuthorizing ? (
              <span>{lang === 'en' ? 'Signing Audit Ledger...' : 'Denetim Defteri İmzalanıyor...'}</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'en' ? 'Approve & Execute All Actions' : 'Tüm Aksiyonları Onayla ve Yürüt'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
