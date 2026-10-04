import { DecisionResult, PriorityLevel, RiskLevel, AgentStepTrace, RecommendedActionItem } from '@/types/decision';
import { PRESET_SCENARIOS } from '../data/scenarios';

export async function orchestrateBankingDecision(inputPrompt: string): Promise<DecisionResult> {
  const promptLower = inputPrompt.toLowerCase();

  // Check if input matches one of our rich presets
  const matchedPreset = PRESET_SCENARIOS.find(s => 
    promptLower.includes(s.title.toLowerCase()) || 
    promptLower.includes(s.titleTr.toLowerCase()) ||
    inputPrompt.includes(s.amount) ||
    promptLower.includes(s.id)
  );

  if (matchedPreset) {
    return {
      ...matchedPreset.simulatedResult,
      timestamp: new Date().toISOString(),
      caseId: `CASE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    };
  }

  // Dynamic Multi-Agent Simulation for custom free-form banking inputs
  // Extract entities heuristically
  const amountMatch = inputPrompt.match(/(\d+[\d.,]*)\s*(tl|try|usd|eur|dolar|euro|bin|milyon)?/i);
  const detectedAmount = amountMatch ? parseFloat(amountMatch[1].replace('.', '').replace(',', '.')) : 0;
  const currency = promptLower.includes('usd') || promptLower.includes('dolar') ? 'USD' : promptLower.includes('eur') || promptLower.includes('euro') ? 'EUR' : 'TRY';

  const isFraud = /çalındı|yetkisiz|unauthorized|dolandır|hırsız|bilgim dışı|tanımıyorum|don't recognize|stolen|fraud|phishing|şüpheli/i.test(promptLower);
  const isDuplicate = /iki kere|mükerrer|duplicate|twice|çift çekim|2 defa|2 kere/i.test(promptLower);
  const isLoan = /kredi|loan|borç|avans|taksit|borrow|finansman/i.test(promptLower);
  const isSecurity = /şifre|giriş|password|login|cihaz|device|hacked|ele geçir|bloke|ip/i.test(promptLower);

  let riskScore = 45;
  let riskLevel: RiskLevel = 'MEDIUM';
  let priority: PriorityLevel = 'MEDIUM';
  let intentCategory = 'General Banking Inquiry';
  let caseTitle = 'Customer Transaction / Account Operation Assessment';
  let humanApprovalRequired = true;
  let humanReason = 'Standard financial change gate verification required.';

  if (isFraud) {
    riskScore = Math.floor(82 + Math.random() * 15);
    riskLevel = 'CRITICAL';
    priority = 'CRITICAL';
    intentCategory = 'Fraud & Unauthorized Card/Account Dispute';
    caseTitle = 'Suspicious Unauthorized Activity / Financial Dispute';
    humanReason = 'High financial exposure and chargeback trigger require authorized fraud analyst review.';
  } else if (isDuplicate) {
    riskScore = Math.floor(35 + Math.random() * 20);
    riskLevel = 'MEDIUM';
    priority = 'HIGH';
    intentCategory = 'Merchant POS Terminal Duplicate Charge';
    caseTitle = 'Duplicate Transaction Reversal & Settlement Hold Check';
    humanReason = 'Ledger refund authorization exceeds automated bot limit.';
  } else if (isLoan) {
    riskScore = Math.floor(15 + Math.random() * 25);
    riskLevel = 'LOW';
    priority = 'MEDIUM';
    intentCategory = 'Retail Loan & Credit Underwriting';
    caseTitle = 'Automated Consumer Credit Evaluation & Limit Scoring';
    humanApprovalRequired = detectedAmount > 200000;
    humanReason = humanApprovalRequired ? 'Loan amount exceeds digital branch auto-approval cap (>200,000 TRY).' : 'None (Auto-approved under prime criteria)';
  } else if (isSecurity) {
    riskScore = Math.floor(85 + Math.random() * 12);
    riskLevel = 'CRITICAL';
    priority = 'CRITICAL';
    intentCategory = 'Account Compromise & Session Security Threat';
    caseTitle = 'Unrecognized Access Attempt & Threat Containment';
    humanReason = 'Identity verification required before restoring digital banking access.';
  }

  const confidenceScore = Math.floor(88 + Math.random() * 11);

  const traces: AgentStepTrace[] = [
    {
      id: 'trace-intent',
      agentName: 'Intent Classification Agent',
      role: 'Parses raw natural language, extracts entities and classifies problem category',
      durationMs: 340 + Math.floor(Math.random() * 80),
      status: 'completed',
      summary: `Parsed category: ${intentCategory}`,
      details: [
        `Extracted Entity: Amount ~ ${detectedAmount ? detectedAmount + ' ' + currency : 'Not explicitly quantified'}`,
        `Primary Intent Tag: ${intentCategory}`,
        `Sentiment: High urgency customer notification`
      ],
      confidence: confidenceScore + 2 > 99 ? 99 : confidenceScore + 2
    },
    {
      id: 'trace-transaction',
      agentName: 'Transaction & Telemetry Agent',
      role: 'Queries core banking ledger, card rails, and device telemetry signals',
      durationMs: 650 + Math.floor(Math.random() * 150),
      status: 'completed',
      summary: isFraud || isSecurity ? 'Telemetry signals show geographic / biometric discrepancy.' : 'Ledger logs queried successfully with standard latency.',
      details: [
        'Core Ledger Status: Active',
        'Device Hardware Signature: Matched against historical baseline',
        'Payment Switch Status: Normal response'
      ],
      confidence: 96
    },
    {
      id: 'trace-risk',
      agentName: 'Risk & Fraud Assessment Agent',
      role: 'Calculates multi-dimensional risk matrix and loss probability',
      durationMs: 520 + Math.floor(Math.random() * 100),
      status: 'completed',
      summary: `Computed Risk Score: ${riskScore}/100 (${riskLevel} Risk).`,
      details: [
        `Historical Fraud Affinity: ${isFraud ? 'Elevated' : 'Low'}`,
        `Estimated Financial Exposure: ${detectedAmount ? detectedAmount + ' ' + currency : 'Under assessment'}`,
        'Loss Mitigation Readiness: 95%'
      ],
      confidence: confidenceScore
    },
    {
      id: 'trace-policy',
      agentName: 'Regulatory & Policy Agent',
      role: 'Cross-checks BDDK, MASAK, Visa/Mastercard, and internal bank policies',
      durationMs: 410 + Math.floor(Math.random() * 90),
      status: 'completed',
      summary: `Policy gates validated. Human in the Loop required: ${humanApprovalRequired ? 'YES' : 'NO'}.`,
      details: [
        'BDDK Compliance Check: Compliant',
        'Automated Action Threshold Matrix: Evaluated',
        `Human Sign-off Policy: ${humanApprovalRequired ? 'Gated' : 'Bypassed (Safe Automation Tier)'}`
      ],
      confidence: 97
    },
    {
      id: 'trace-decision',
      agentName: 'Decision & Action Orchestrator',
      role: 'Synthesizes final action sequence and dispatches low-risk automations',
      durationMs: 280 + Math.floor(Math.random() * 70),
      status: 'completed',
      summary: 'Action sequence generated with clear separation between automated and gated tasks.',
      details: [
        'Orchestration Pipeline: 3 actions planned',
        'Audit Dossier Created'
      ],
      confidence: confidenceScore
    }
  ];

  const recommendedActions: RecommendedActionItem[] = [
    {
      id: 'act-dyn-1',
      step: 1,
      action: isFraud || isSecurity ? 'Apply precautionary temporary channel freeze' : 'Log customer request in CRM & Core Ledger',
      detail: isFraud || isSecurity ? 'Instantly block high-risk outgoing transaction channels.' : 'Record timestamped inquiry in banking core.',
      isAutomated: true,
      requiresHumanApproval: false,
      systemImpact: isFraud || isSecurity ? 'security_state' : 'read_only',
      status: 'executed'
    },
    {
      id: 'act-dyn-2',
      step: 2,
      action: 'Dispatch Push Notification & In-App Security Prompt',
      detail: 'Request customer verification via registered mobile biometric app.',
      isAutomated: true,
      requiresHumanApproval: false,
      systemImpact: 'customer_notification',
      status: 'executed'
    },
    {
      id: 'act-dyn-3',
      step: 3,
      action: isFraud ? 'Initiate Formal Chargeback & Card Reissue' : isDuplicate ? 'Authorize Immediate Hold Cancellation & Refund' : isLoan ? 'Disburse Pre-Approved Loan to Main Checking Account' : 'Verify Customer Identity & Clear Security Lock',
      detail: 'Execute terminal banking transaction state change.',
      isAutomated: false,
      requiresHumanApproval: humanApprovalRequired,
      systemImpact: 'financial_impact',
      status: 'pending'
    }
  ];

  return {
    caseId: `CASE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    caseTitle,
    intentCategory,
    summary: `Customer input analyzed: "${inputPrompt.slice(0, 120)}${inputPrompt.length > 120 ? '...' : ''}". Automated agent evaluation completed.`,
    riskScore,
    riskLevel,
    confidenceScore,
    priority,
    humanApprovalRequired,
    humanApprovalReason: humanReason,
    financialExposure: {
      amount: detectedAmount || 0,
      currency,
      isRecoverable: true
    },
    policyViolationsOrChecks: [
      {
        ruleId: 'POL-GEN-01',
        ruleName: 'Banking Regulatory Compliance Guardrail',
        status: 'PASSED',
        description: 'Case conforms to consumer protection and privacy directives.'
      },
      {
        ruleId: 'POL-HITL-05',
        ruleName: 'Human-in-the-Loop Risk Gating',
        status: humanApprovalRequired ? 'TRIGGERED' : 'PASSED',
        description: humanApprovalRequired ? 'Action involves financial or account state modification exceeding autonomous threshold.' : 'Action qualifies for straight-through automated processing.'
      }
    ],
    recommendedActions,
    agentTraces: traces,
    totalProcessingTimeMs: traces.reduce((acc, t) => acc + t.durationMs, 0)
  };
}
