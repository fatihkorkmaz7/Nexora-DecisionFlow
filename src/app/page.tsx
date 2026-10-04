'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AgentFlowDiagram } from '@/components/AgentFlowDiagram';
import { LiveAnalyzer } from '@/components/LiveAnalyzer';
import { DecisionDashboard } from '@/components/DecisionDashboard';
import { AgentTraceView } from '@/components/AgentTraceView';
import { ArchitectureView } from '@/components/ArchitectureView';
import { HumanApprovalModal } from '@/components/HumanApprovalModal';
import { Footer } from '@/components/Footer';
import { PRESET_SCENARIOS } from '@/lib/data/scenarios';
import { DecisionResult } from '@/types/decision';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'tr'>('tr');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('fraud-dispute');
  const [currentDecision, setCurrentDecision] = useState<DecisionResult>(PRESET_SCENARIOS[0].simulatedResult);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'tr' : 'en'));
  };

  const handleQuickStartScenario = (scenarioId: string) => {
    setSelectedPresetId(scenarioId);
    const preset = PRESET_SCENARIOS.find((s) => s.id === scenarioId);
    if (preset) {
      setCurrentDecision(preset.simulatedResult);
    }
    const el = document.getElementById('analyzer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalysisComplete = (result: DecisionResult) => {
    setCurrentDecision(result);
    // Scroll slightly down to results
    const el = document.getElementById('decision-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApproveAllActions = () => {
    if (!currentDecision) return;
    const updatedActions = currentDecision.recommendedActions.map((action) => ({
      ...action,
      status: 'executed' as const,
    }));

    setCurrentDecision({
      ...currentDecision,
      recommendedActions: updatedActions,
      humanApprovalRequired: false,
    });
  };

  const handleExecuteSingleAction = (actionId: string) => {
    if (!currentDecision) return;
    const updatedActions = currentDecision.recommendedActions.map((action) => {
      if (action.id === actionId) {
        return { ...action, status: 'executed' as const };
      }
      return action;
    });

    const hasPendingGated = updatedActions.some(
      (a) => (!a.isAutomated || a.requiresHumanApproval) && a.status !== 'executed'
    );

    setCurrentDecision({
      ...currentDecision,
      recommendedActions: updatedActions,
      humanApprovalRequired: hasPendingGated,
    });
  };

  return (
    <main className="min-h-screen bg-[#050b1a] text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <HeroSection
        lang={lang}
        onQuickStartScenario={handleQuickStartScenario}
      />

      {/* Visual Workflow Steps */}
      <AgentFlowDiagram lang={lang} />

      {/* Interactive Studio Analyzer */}
      <LiveAnalyzer
        lang={lang}
        onAnalysisComplete={handleAnalysisComplete}
        selectedPresetId={selectedPresetId}
      />

      {/* Decision Results & Dashboard */}
      {currentDecision && (
        <section id="decision-results" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-1">
                {lang === 'en' ? 'Step 3 • Decision Engine Output' : 'Adım 3 • Karar Motoru Çıktısı'}
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                {lang === 'en' ? 'Autonomous Decision Summary' : 'Otonom Karar ve Öneri Özeti'}
              </h3>
            </div>
          </div>

          <DecisionDashboard
            decision={currentDecision}
            lang={lang}
            onOpenApprovalModal={() => setIsApprovalModalOpen(true)}
            onExecuteAction={handleExecuteSingleAction}
          />
        </section>
      )}

      {/* Deep Agent Trace Explorer */}
      {currentDecision && (
        <AgentTraceView
          traces={currentDecision.agentTraces}
          totalTimeMs={currentDecision.totalProcessingTimeMs}
          lang={lang}
        />
      )}

      {/* Architectural Blueprint & Technical Stack */}
      <ArchitectureView lang={lang} />

      {/* Human In The Loop Modal */}
      {currentDecision && (
        <HumanApprovalModal
          decision={currentDecision}
          isOpen={isApprovalModalOpen}
          onClose={() => setIsApprovalModalOpen(false)}
          onApproveAll={handleApproveAllActions}
          lang={lang}
        />
      )}

      {/* Footer */}
      <Footer lang={lang} />
    </main>
  );
}
