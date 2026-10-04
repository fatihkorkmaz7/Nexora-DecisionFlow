import { BankingScenario, DecisionResult } from '@/types/decision';

export const PRESET_SCENARIOS: BankingScenario[] = [
  {
    id: 'fraud-dispute',
    category: 'Fraud',
    title: 'Unauthorized Foreign Transaction',
    titleTr: 'Yetkisiz Yurt Dışı Kart Harcaması',
    prompt: "I noticed an unauthorized charge of 4,200 TL from 'Apple Store London' on my credit card. My card is currently with me in Istanbul.",
    promptTr: "Kredi kartımdan bilgim dışında 'Apple Store London' adıyla 4.200 TL harcama yapılmış. Kartım şu anda İstanbul'da ve fiziksel olarak yanımda.",
    amount: '4,200 TRY',
    badgeColor: 'text-red-400 bg-red-950/60 border-red-800/50',
    simulatedResult: {
      caseId: 'CASE-2026-8941',
      timestamp: '2026-10-04T18:40:00.000Z',
      caseTitle: 'Suspected Card Compromise & Unauthorized Foreign POS Transaction',
      intentCategory: 'Fraud & Unauthorized Transaction Dispute',
      summary: 'Customer reports an anomalous 4,200 TL international transaction while possessing the physical card in domestic jurisdiction. Telemetry and geo-velocity algorithms detect impossible traveler state.',
      riskScore: 89,
      riskLevel: 'CRITICAL',
      confidenceScore: 94,
      priority: 'CRITICAL',
      humanApprovalRequired: true,
      humanApprovalReason: 'Chargeback initiation over 3,000 TL and permanent card cancellation require authorized representative sign-off.',
      financialExposure: {
        amount: 4200,
        currency: 'TRY',
        isRecoverable: true
      },
      policyViolationsOrChecks: [
        {
          ruleId: 'POL-SEC-09',
          ruleName: 'Geo-Velocity Conflict Rule',
          status: 'TRIGGERED',
          description: 'Transaction in London registered 22 minutes after an Istanbul POS operation without valid flight record.'
        },
        {
          ruleId: 'POL-BDDK-44',
          ruleName: 'Fraud Dispute & Zero-Liability Window',
          status: 'PASSED',
          description: 'Dispute submitted within the statutory 24-hour notification window.'
        },
        {
          ruleId: 'POL-CHG-02',
          ruleName: 'Mastercard / Visa Reason Code 4837 (No Cardholder Authorization)',
          status: 'TRIGGERED',
          description: 'Eligible for pre-arbitration chargeback filing.'
        }
      ],
      recommendedActions: [
        {
          id: 'act-1',
          step: 1,
          action: 'Temporarily freeze card international e-commerce channel',
          detail: 'Instantly mitigate secondary fraud attempts by restricting cross-border card authorizations.',
          isAutomated: true,
          requiresHumanApproval: false,
          systemImpact: 'security_state',
          status: 'executed'
        },
        {
          id: 'act-2',
          step: 2,
          action: 'Send Biometric Push Notification to Mobile Banking',
          detail: 'Prompt customer to confirm current physical device possession via biometric 3D verification.',
          isAutomated: true,
          requiresHumanApproval: false,
          systemImpact: 'customer_notification',
          status: 'executed'
        },
        {
          id: 'act-3',
          step: 3,
          action: 'Initiate Mastercard / Visa Reason Code 4837 Chargeback Dossier',
          detail: 'Compile technical terminal log, merchant metadata, and timestamp proof for acquirer dispute.',
          isAutomated: false,
          requiresHumanApproval: true,
          systemImpact: 'financial_impact',
          status: 'pending'
        },
        {
          id: 'act-4',
          step: 4,
          action: 'Permanent card reissue with new digital token',
          detail: 'Burn the compromised CVV/PAN and provision instant Apple Pay / Google Wallet virtual card.',
          isAutomated: false,
          requiresHumanApproval: true,
          systemImpact: 'security_state',
          status: 'pending'
        }
      ],
      agentTraces: [
        {
          id: 'trace-1',
          agentName: 'Intent Classification Agent',
          role: 'Extracts customer intent, entities, sentiment, and dispute classification',
          durationMs: 420,
          status: 'completed',
          summary: 'Identified primary intent: Unauthorized card transaction dispute.',
          details: [
            'Parsed Merchant: Apple Store London (Foreign Acquirer)',
            'Extracted Amount: 4,200.00 TRY (approx 120.00 GBP)',
            'Identified User Location: Istanbul (Turkey)',
            'Urgency Level: High (Ongoing card vulnerability)'
          ],
          confidence: 98
        },
        {
          id: 'trace-2',
          agentName: 'Transaction & Telemetry Agent',
          role: 'Retrieves card ledger, POS terminal logs, and geo-spatial velocity data',
          durationMs: 780,
          status: 'completed',
          summary: 'High-confidence impossible travel anomaly flagged between Istanbul & London.',
          details: [
            'Card Ledger: 1 active card ending in 8421',
            'Last legitimate auth: 14:10 TRT at Migros Kadikoy (Chip & PIN)',
            'Flagged auth: 14:32 TRT at Apple Store London (Card Not Present / Fallback)',
            'Speed required: 6,800 km/h (Impossible travel velocity)'
          ],
          confidence: 96
        },
        {
          id: 'trace-3',
          agentName: 'Risk & Fraud Assessment Agent',
          role: 'Computes multi-dimensional risk matrix and financial loss exposure',
          durationMs: 650,
          status: 'completed',
          summary: 'Risk Score calculated at 89/100 (Critical Risk Category).',
          details: [
            'Merchant Risk Profile: Medium (Known target for stolen token reselling)',
            'Account Risk Multiplier: 1.25x due to high transaction limit',
            'Synthetic Identity Risk: 0% (Long-standing account history 4.5 yrs)',
            'Financial Exposure: 4,200 TRY (100% recoverable via Scheme Chargeback)'
          ],
          confidence: 91
        },
        {
          id: 'trace-4',
          agentName: 'Regulatory & Policy Agent',
          role: 'Checks compliance against banking laws, MASAK, BDDK, and Scheme Rules',
          durationMs: 510,
          status: 'completed',
          summary: 'Compliance rules evaluated. Gated Human Approval triggered for permanent card destruction and chargeback.',
          details: [
            'BDDK Fraud Mandate: Zero-Liability clause valid for prompt reports',
            'Policy Gate POL-ACT-04: Card reissue requires human fraud analyst consent',
            'Policy Gate POL-FIN-12: Chargeback claim generation requires supervisor sign-off'
          ],
          confidence: 95
        },
        {
          id: 'trace-5',
          agentName: 'Decision & Action Orchestrator',
          role: 'Synthesizes agent insights into prioritized, executable remediation steps',
          durationMs: 340,
          status: 'completed',
          summary: 'Generated 4 coordinated actions (2 auto-mitigated, 2 awaiting human sign-off).',
          details: [
            'Immediate containment: International e-comm blocked immediately in microsecond engine',
            'Customer protection: Push challenge dispatched',
            'Orchestrated dossier ready for Banking Operations Console'
          ],
          confidence: 94
        }
      ],
      totalProcessingTimeMs: 2700
    }
  },
  {
    id: 'duplicate-payment',
    category: 'Duplicate',
    title: 'Duplicate Credit Card Billing',
    titleTr: 'Mükerrer Kart Çekimi Şikayeti',
    prompt: "I noticed two identical transactions of 7,500 TL from 'Teknoloji Market' on my card within 3 seconds. I only made one single purchase.",
    promptTr: "Kredi kartımda 'Teknoloji Market' üzerinden 3 saniye arayla çekilmiş iki adet 7.500 TL mükerrer işlem görüyorum. Ben sadece tek bir alışveriş yaptım.",
    amount: '7,500 TRY',
    badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/50',
    simulatedResult: {
      caseId: 'CASE-2026-4412',
      timestamp: '2026-10-04T18:40:00.000Z',
      caseTitle: 'Terminal Timeout Duplicate Billing - Merchant Ledger Collision',
      intentCategory: 'Duplicate Transaction & Terminal Error',
      summary: 'Merchant POS terminal recorded dual authorization attempts (7,500 TL x2) within 3.2 seconds due to network timeout retry. Second charge confirmed as un-cleared dual capture.',
      riskScore: 42,
      riskLevel: 'MEDIUM',
      confidenceScore: 98,
      priority: 'HIGH',
      humanApprovalRequired: true,
      humanApprovalReason: 'Immediate 7,500 TL provision reversal to cardholder ledger requires Operations Analyst approval.',
      financialExposure: {
        amount: 7500,
        currency: 'TRY',
        isRecoverable: true
      },
      policyViolationsOrChecks: [
        {
          ruleId: 'POL-LEDG-03',
          ruleName: 'Duplicate Authorization Pattern Filter',
          status: 'TRIGGERED',
          description: 'Identical ARN, amount (7,500 TL), and Merchant Terminal ID within 60-second window.'
        },
        {
          ruleId: 'POL-PROV-11',
          ruleName: 'Provisional Hold Release Threshold',
          status: 'PASSED',
          description: 'Transaction is currently in PROVISION state (not yet settled).'
        }
      ],
      recommendedActions: [
        {
          id: 'act-dup-1',
          step: 1,
          action: 'Release duplicate provisional authorization hold',
          detail: 'Cancel pending 7,500 TL hold on authorization engine before settlement window closes.',
          isAutomated: false,
          requiresHumanApproval: true,
          systemImpact: 'financial_impact',
          status: 'pending'
        },
        {
          id: 'act-dup-2',
          step: 2,
          action: 'Send automated SMS & in-app resolution update',
          detail: 'Notify customer that duplicate pending hold will reflect back to limit within 15 minutes.',
          isAutomated: true,
          requiresHumanApproval: false,
          systemImpact: 'customer_notification',
          status: 'executed'
        },
        {
          id: 'act-dup-3',
          step: 3,
          action: 'Log Merchant Terminal POS Timeout Incident',
          detail: 'Submit automated merchant gateway ticket to prevent recurring duplicate captures.',
          isAutomated: true,
          requiresHumanApproval: false,
          systemImpact: 'read_only',
          status: 'executed'
        }
      ],
      agentTraces: [
        {
          id: 'trace-1',
          agentName: 'Intent Classification Agent',
          role: 'Analyzes user statement and categorizes problem type',
          durationMs: 380,
          status: 'completed',
          summary: 'Intent identified: Merchant POS Duplicate Transaction Complaint.',
          details: [
            'Merchant: Teknoloji Market',
            'Amount: 7,500.00 TL (x2 duplicate detected)',
            'Confidence: 99%'
          ],
          confidence: 99
        },
        {
          id: 'trace-2',
          agentName: 'Transaction & Telemetry Agent',
          role: 'Scans switch gateway logs and RRN matching',
          durationMs: 620,
          status: 'completed',
          summary: 'Duplicate RRN found. Terminal Retry Flag detected in ISO8583 Packet 0200.',
          details: [
            'Auth 1: 18:44:01 TRT - Success (RRN: 90219401)',
            'Auth 2: 18:44:04 TRT - Duplicate Timeout Retry (RRN: 90219402)',
            'Settlement Status: Both in Pending Authorization (Pre-clearing)'
          ],
          confidence: 98
        },
        {
          id: 'trace-3',
          agentName: 'Risk & Fraud Assessment Agent',
          role: 'Evaluates intentional merchant fraud vs. infrastructure fault',
          durationMs: 490,
          status: 'completed',
          summary: 'Risk Score 42/100. Low fraud probability; standard POS technical fault.',
          details: [
            'Account Health: Excellent (Credit score: 1740/1900)',
            'Merchant Reliability: High (Tier-1 electronics retail partner)',
            'Financial Risk: Negligible if canceled in pre-clearing state'
          ],
          confidence: 97
        },
        {
          id: 'trace-4',
          agentName: 'Regulatory & Policy Agent',
          role: 'Assesses BKM Switch & Card Brand reconciliation mandates',
          durationMs: 440,
          status: 'completed',
          summary: 'BKM Provisional Release Protocol eligible for instant reversal.',
          details: [
            'Policy Rule: No chargeback fee when released in provision',
            'Approval Gate: Operational analyst verification required for amounts > 5,000 TL'
          ],
          confidence: 96
        },
        {
          id: 'trace-5',
          agentName: 'Decision & Action Orchestrator',
          role: 'Produces remediation strategy and instant resolution plan',
          durationMs: 310,
          status: 'completed',
          summary: 'Generated 3 orchestrated actions for instant resolution without dispute fees.',
          details: [
            'Instant hold cancellation prepared',
            'Proactive customer reassurance SMS queued'
          ],
          confidence: 98
        }
      ],
      totalProcessingTimeMs: 2240
    }
  },
  {
    id: 'loan-request',
    category: 'Credit',
    title: 'Instant Personal Loan Evaluation',
    titleTr: 'İhtiyaç Kredisi Ön Onay ve Risk Değerlendirmesi',
    prompt: "I want to apply for a 150,000 TL personal loan with a 24-month term for home renovation. What are my eligibility chances?",
    promptTr: "Ev tadilatı için 24 ay vadeli 150.000 TL ihtiyaç kredisi başvurusu yapmak istiyorum. Ön onay ve uygunluk durumum nedir?",
    amount: '150,000 TRY',
    badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50',
    simulatedResult: {
      caseId: 'CASE-2026-7731',
      timestamp: '2026-10-04T18:40:00.000Z',
      caseTitle: 'Automated Retail Loan Pre-Scoring & Debt Burden Analysis',
      intentCategory: 'Retail Lending & Credit Underwriting',
      summary: 'Customer requests a 150,000 TL consumer loan with 24 months amortization. KKB score and debt-to-income ratio (DTI) fall well within prime tier benchmarks.',
      riskScore: 18,
      riskLevel: 'LOW',
      confidenceScore: 96,
      priority: 'MEDIUM',
      humanApprovalRequired: false,
      humanApprovalReason: 'Pre-qualified automated approval tier (< 200k TL and KKB > 1650).',
      financialExposure: {
        amount: 150000,
        currency: 'TRY',
        isRecoverable: true
      },
      policyViolationsOrChecks: [
        {
          ruleId: 'POL-BDDK-LEND-01',
          ruleName: 'Maximum Consumer Loan Maturity Cap (24 Months <= 100k-200k)',
          status: 'PASSED',
          description: 'Compliant with BDDK macroprudential maturity ceiling guidelines.'
        },
        {
          ruleId: 'POL-DTI-04',
          ruleName: 'Debt-to-Income (DTI) Ceiling (< 50%)',
          status: 'PASSED',
          description: 'Calculated monthly installment represents 26.4% of verified salary inflows.'
        }
      ],
      recommendedActions: [
        {
          id: 'act-loan-1',
          step: 1,
          action: 'Generate Pre-Approved Digital Loan Contract',
          detail: 'Create personalized repayment schedule (3.19% APR, monthly installment: 9,780 TL).',
          isAutomated: true,
          requiresHumanApproval: false,
          systemImpact: 'financial_impact',
          status: 'executed'
        },
        {
          id: 'act-loan-2',
          step: 2,
          action: 'Send Mobile In-App One-Click Contract Signing Prompt',
          detail: 'Notify mobile app with biometric PIN authorization for instant account deposit.',
          isAutomated: true,
          requiresHumanApproval: false,
          systemImpact: 'customer_notification',
          status: 'executed'
        }
      ],
      agentTraces: [
        {
          id: 'trace-1',
          agentName: 'Intent Classification Agent',
          role: 'Parses loan product, requested amount, tenor, and stated purpose',
          durationMs: 310,
          status: 'completed',
          summary: 'Intent: Consumer Loan Request (150,000 TRY, 24M tenor).',
          details: [
            'Product: Consumer Renovation Loan',
            'Requested Tenor: 24 Months',
            'Amount: 150,000 TRY'
          ],
          confidence: 99
        },
        {
          id: 'trace-2',
          agentName: 'Transaction & Telemetry Agent',
          role: 'Analyzes payroll deposits and monthly disposable cash flow',
          durationMs: 710,
          status: 'completed',
          summary: 'Regular direct salary deposits confirmed for past 36 consecutive months.',
          details: [
            'Average Monthly Inflow: 54,000 TRY',
            'Existing Debt Service: 4,500 TRY/mo',
            'Projected New DTI: 26.4%'
          ],
          confidence: 97
        },
        {
          id: 'trace-3',
          agentName: 'Risk & Fraud Assessment Agent',
          role: 'Queries Findeks / KKB credit score and calculates default probability',
          durationMs: 580,
          status: 'completed',
          summary: 'Risk Score 18/100 (Prime Credit Tier). Default probability < 0.8%.',
          details: [
            'KKB Credit Score: 1,780 / 1,900',
            'Historical Overdue Record: 0 incidents in 5 years',
            'Risk Category: Tier 1 (Lowest risk)'
          ],
          confidence: 98
        },
        {
          id: 'trace-4',
          agentName: 'Regulatory & Policy Agent',
          role: 'Validates BDDK loan limits, maturity limits, and interest caps',
          durationMs: 410,
          status: 'completed',
          summary: 'All BDDK lending criteria passed without exemption requirements.',
          details: [
            'Maturity Rule Check: Passed (24 months valid for 150k TL)',
            'Human Underwriter Override: Not required by policy matrix'
          ],
          confidence: 99
        },
        {
          id: 'trace-5',
          agentName: 'Decision & Action Orchestrator',
          role: 'Finalizes decision package and loan disbursement pipeline',
          durationMs: 290,
          status: 'completed',
          summary: 'Pre-approval granted. Ready for digital signature.',
          details: [
            'Personalized rate: 3.19% with automatic salary link discount',
            'Instant disbursement ready'
          ],
          confidence: 96
        }
      ],
      totalProcessingTimeMs: 2300
    }
  },
  {
    id: 'suspicious-login',
    category: 'Account Security',
    title: 'Suspicious Device & Account Takeover Alert',
    titleTr: 'Şüpheli Cihaz Girişi ve Hesap Ele Geçirme Şüphesi',
    prompt: "I received an alert that my online banking was accessed from an unrecognized Android device in Frankfurt at 03:14 AM. I was asleep in Ankara.",
    promptTr: "Gece saat 03:14'te Ankara'da uyurken hesabıma Frankfurt'tan tanınmayan bir Android cihazla giriş yapıldığına dair SMS bildirimi aldım.",
    amount: 'N/A (Security)',
    badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-800/50',
    simulatedResult: {
      caseId: 'CASE-2026-1092',
      timestamp: '2026-10-04T18:40:00.000Z',
      caseTitle: 'Credential Stuffing / Session Hijacking & Anomaly Detection',
      intentCategory: 'Account Takeover & Device Security Anomaly',
      summary: 'Telemetry shows login from TOR exit node IP (Frankfurt, DE) using a novel device fingerprint without primary SIM authentication. High probability of credential stuffing.',
      riskScore: 92,
      riskLevel: 'CRITICAL',
      confidenceScore: 97,
      priority: 'CRITICAL',
      humanApprovalRequired: true,
      humanApprovalReason: 'Account unfreezing or biometric credential reset requires Tier-2 Fraud Desk agent validation.',
      financialExposure: {
        amount: 0,
        currency: 'TRY',
        isRecoverable: true
      },
      policyViolationsOrChecks: [
        {
          ruleId: 'POL-AUTH-08',
          ruleName: 'TOR / High-Risk Proxy Access Restriction',
          status: 'TRIGGERED',
          description: 'Session IP mapped to known bulletproof proxy / TOR exit relay.'
        },
        {
          ruleId: 'POL-DEV-01',
          ruleName: 'Zero-Trust Device Binding Policy',
          status: 'TRIGGERED',
          description: 'Device hardware ID does not match the registered user cryptographic key.'
        }
      ],
      recommendedActions: [
        {
          id: 'act-sec-1',
          step: 1,
          action: 'Immediate Kill-Switch: Terminate all active OAuth & web sessions',
          detail: 'Revoke refresh tokens, kill active websocket connections, and invalidate session cookies.',
          isAutomated: true,
          requiresHumanApproval: false,
          systemImpact: 'security_state',
          status: 'executed'
        },
        {
          id: 'act-sec-2',
          step: 2,
          action: 'Apply temporary 24-hour outbound transfer lock (FAST & EFT Block)',
          detail: 'Prevent money mule exfiltration while security audit is conducted.',
          isAutomated: true,
          requiresHumanApproval: false,
          systemImpact: 'security_state',
          status: 'executed'
        },
        {
          id: 'act-sec-3',
          step: 3,
          action: 'Schedule Security Specialist Outbound Callback',
          detail: 'Initiate verified outbound voice verification to guide customer through credential reset.',
          isAutomated: false,
          requiresHumanApproval: true,
          systemImpact: 'customer_notification',
          status: 'pending'
        }
      ],
      agentTraces: [
        {
          id: 'trace-1',
          agentName: 'Intent Classification Agent',
          role: 'Categorizes security incident and extracts device/time metadata',
          durationMs: 350,
          status: 'completed',
          summary: 'Intent: Critical Account Security & Session Compromise Alert.',
          details: [
            'Alert Type: Unrecognized Device Login',
            'Reported Location: Frankfurt, Germany',
            'Actual User Location: Ankara, Turkey'
          ],
          confidence: 99
        },
        {
          id: 'trace-2',
          agentName: 'Transaction & Telemetry Agent',
          role: 'Analyzes IP geolocation, ASN, browser fingerprint, and behavioral biometrics',
          durationMs: 820,
          status: 'completed',
          summary: 'TOR relay detected. Typing cadence and mouse trajectory mismatch rate: 99.4%.',
          details: [
            'IP Address: 185.220.101.5 (TOR Node, Frankfurt)',
            'Device: Generic Android 12 Emulator',
            'Keystroke Dynamics: Automated script pattern detected'
          ],
          confidence: 98
        },
        {
          id: 'trace-3',
          agentName: 'Risk & Fraud Assessment Agent',
          role: 'Scores account takeover (ATO) vulnerability and potential loss exposure',
          durationMs: 610,
          status: 'completed',
          summary: 'Risk Score: 92/100 (Critical ATO threat).',
          details: [
            'Account Balance at Risk: 230,000 TRY in demand deposit',
            'Threat Vector: Credential Stuffing / Botnet automation',
            'Mitigation Status: Intercepted prior to financial exfiltration'
          ],
          confidence: 95
        },
        {
          id: 'trace-4',
          agentName: 'Regulatory & Policy Agent',
          role: 'Verifies MASAK suspicious activity notification triggers & lock protocols',
          durationMs: 460,
          status: 'completed',
          summary: 'Automated session kill-switch approved by Zero-Trust policy.',
          details: [
            'Emergency FAST limit suspension: Compliant with BDDK circular 2024/09',
            'Audit Trail Logged in Immutable Security Vault'
          ],
          confidence: 97
        },
        {
          id: 'trace-5',
          agentName: 'Decision & Action Orchestrator',
          role: 'Dispatches emergency lockdown and queues analyst verification',
          durationMs: 330,
          status: 'completed',
          summary: 'Lockdown executed. Customer funds safeguarded.',
          details: [
            'All sessions revoked in 12ms',
            'Outbound transfers locked',
            'Dossier transferred to Priority SOC Desk'
          ],
          confidence: 97
        }
      ],
      totalProcessingTimeMs: 2570
    }
  }
];
