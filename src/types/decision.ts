export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AgentStepTrace {
  id: string;
  agentName: string;
  role: string;
  durationMs: number;
  status: 'pending' | 'running' | 'completed' | 'error';
  summary: string;
  details: string[];
  findings?: Record<string, any>;
  confidence: number;
}

export interface RecommendedActionItem {
  id: string;
  step: number;
  action: string;
  detail: string;
  isAutomated: boolean;
  requiresHumanApproval: boolean;
  systemImpact: 'read_only' | 'security_state' | 'financial_impact' | 'customer_notification';
  status: 'pending' | 'approved' | 'executed' | 'skipped';
}

export interface DecisionResult {
  caseId: string;
  timestamp: string;
  caseTitle: string;
  intentCategory: string;
  summary: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  confidenceScore: number; // 0 - 100
  priority: PriorityLevel;
  humanApprovalRequired: boolean;
  humanApprovalReason?: string;
  financialExposure: {
    amount: number;
    currency: string;
    isRecoverable: boolean;
  };
  policyViolationsOrChecks: {
    ruleId: string;
    ruleName: string;
    status: 'PASSED' | 'TRIGGERED' | 'MANUAL_OVERRIDE_REQUIRED';
    description: string;
  }[];
  recommendedActions: RecommendedActionItem[];
  agentTraces: AgentStepTrace[];
  totalProcessingTimeMs: number;
}

export interface BankingScenario {
  id: string;
  category: 'Fraud' | 'Duplicate' | 'Credit' | 'Account Security';
  title: string;
  titleTr: string;
  prompt: string;
  promptTr: string;
  amount: string;
  badgeColor: string;
  simulatedResult: DecisionResult;
}
