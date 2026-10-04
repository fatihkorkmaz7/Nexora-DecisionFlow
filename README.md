# 🛡️ Nexora DecisionFlow

### **Agentic Intelligence for Banking Decisions**

> **Nexora DecisionFlow is an agentic AI decision-support platform designed for banking operations. It coordinates specialized AI agents to analyze customer requests, evaluate risk, check policies, and recommend the safest next action while keeping critical financial decisions under human control.**

```text
               Customer Banking Request
                          │
                          ▼
             ┌─────────────────────────┐
             │   Orchestrator Agent    │
             └────────────┬────────────┘
                          │
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Intent Agent │   │  Risk Agent  │   │ Policy Agent │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
      │                   │                   │
      └───────────────────┼───────────────────┘
                          │
                          ▼
             ┌─────────────────────────┐
             │     Decision Agent      │
             └────────────┬────────────┘
                          │
                          ▼
             ┌─────────────────────────┐
             │  Human Approval (HITL)  │
             └────────────┬────────────┘
                          │
                          ▼
              Recommended Next Action
```

---

## 1. 📌 Project Overview

**Nexora DecisionFlow** is an enterprise-grade Multi-Agent Decision Orchestration Platform tailored for retail and digital banking operations. Rather than answering queries like a generic LLM chatbot, DecisionFlow processes complex financial disputes, suspicious logins, duplicate billings, and credit evaluations through a synchronized team of autonomous agents. The platform converts raw customer inquiries into structured risk profiles, regulatory audits, and prioritized action plans in **under 2.4 seconds**.

---

## 2. ⚠️ Problem Statement

In modern digital banking, customer inquiries and operational anomalies (such as disputed credit card charges, terminal timeouts, or account takeovers) require rigorous multi-step analysis:

- Cross-referencing core ledger entries and POS terminal telemetry.
- Evaluating fraud likelihood and financial exposure.
- Enforcing compliance with national and international banking regulations (e.g., BDDK, MASAK, Visa/Mastercard Scheme Rules).
- **Classic AI chatbots fail here**: They produce unstructured, hallucination-prone text, cannot isolate banking domains, and lack deterministic safety controls required for financial movements.

---

## 3. 💡 Solution

Nexora DecisionFlow replaces monolithic prompt-and-response chatbots with a **governed multi-agent orchestration architecture**:

1. **Decomposes** the incoming case into discrete domain-specific tasks.
2. **Executes parallel sub-agent reasoning** for Intent, Telemetry, Risk, and Policy.
3. **Synthesizes a unified decision matrix** with confidence metrics and explainability traces.
4. **Gates high-risk actions** behind an interactive **Human-in-the-Loop (HITL)** authorization barrier.

---

## 4. 🧩 Agent Architecture

| Agent Name                              | Primary Responsibility                                                                                             | Input / Data Source                    | Output / Artifact                    |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------- | :----------------------------------- |
| **Orchestrator Agent**            | Manages case lifecycle, coordinates worker execution, enforces state transitions.                                  | Inbound customer payload               | Orchestrated Execution Pipeline      |
| **Intent Classification Agent**   | Extracts structured entities (amounts, currencies, merchants, locations, timestamps) and categorizes dispute type. | Natural language text                  | Extracted Entity Schema & Intent Tag |
| **Transaction & Telemetry Agent** | Inspects card ledger, POS timestamps, and geo-velocity signals (e.g. impossible travel detection).                 | ISO8583 switch logs, GPS, terminal IDs | Anomaly vector & ledger telemetry    |
| **Risk & Fraud Assessment Agent** | Calculates composite risk score (0–100), financial loss exposure, and Account Takeover (ATO) risk.                | Telemetry + user profile               | Multidimensional Risk & Loss Score   |
| **Regulatory & Policy Agent**     | Verifies BDDK circulars, MASAK thresholds, and card network chargeback reason codes (Visa/Mastercard 4837).        | Banking regulatory ruleset             | Policy Compliance Flags & HITL Gate  |
| **Decision & Action Agent**       | Synthesizes insights into an actionable roadmap, triggers safe automations, and queues critical actions.           | All agent findings                     | Structured JSON & Execution Roadmap  |

---

## 5. 🔄 How It Works

The end-to-end execution flow follows a strict deterministic pipeline:

$$
\text{User Request} \longrightarrow \text{Intent Analysis} \longrightarrow \text{Risk Analysis} \longrightarrow \text{Policy Check} \longrightarrow \text{Decision} \longrightarrow \text{Human Approval}
$$

1. **Ingest**: The customer submits a natural language request or a banking webhook payload arrives.
2. **Understand**: The Intent Agent parses entities, amounts, and urgency.
3. **Analyze**: The Transaction and Risk Agents cross-examine the bank ledger and compute risk matrices.
4. **Comply**: The Policy Agent checks BDDK, MASAK, and scheme rules to determine if human intervention is legally mandated.
5. **Decide**: The Decision Agent generates a prioritized remediation roadmap.
6. **Act**: Precautionary low-risk actions run automatically (e.g. temporary channel locks, biometric push challenge), while financial actions wait for authorized operator sign-off.

---

## 6. 👤 Human-in-the-Loop (HITL) Governance

Agentic AI must **never blindly move funds or permanently alter customer credit status**. DecisionFlow establishes a crystal-clear operational boundary:

```text
AI Autonomous Execution (Zero-Risk):
  ✓ Classify incoming complaints
  ✓ Query ledger & telemetry signals
  ✓ Calculate risk & regulatory compliance
  ✓ Apply temporary precautionary channel blocks
  ✓ Send biometric verification prompts

Human Approval Strictly Required (High-Risk):
  • Direct financial refunds & chargeback payouts
  • Permanent credit card cancellation & re-issuance
  • Account unfreezing & KYC security overrides
  • Credit contract fund disbursement
```

---

## 7. 🚀 Key Features

- **Multi-Agent Orchestration**: Specialized micro-agents cooperating through a state machine.
- **Dynamic Risk Gauge**: Real-time 0–100 composite risk calculation with visual indicators.
- **Explainable Decision Trace**: Deep inspector panel showing every agent's latency, reasoning, and evidence.
- **Dual-Mode Language Engine**: Full Turkish (TR) and English (EN) localized UI and data sets.
- **Human-in-the-Loop Action Gate**: Interactive modal for compliance officers with instant execution and celebratory feedback.
- **Structured JSON Schema**: Clean, type-safe JSON output for integration with banking cores.
- **Sub-2.5s Latency**: High-performance asynchronous execution pipeline.

---

## 8. 🧪 Demo Scenarios (Benchmark Cases)

The platform comes preloaded with 4 realistic banking benchmark cases:

1. **🔴 Unauthorized Foreign Transaction (Fraud Detection)***“I noticed an unauthorized charge of 4,200 TL from 'Apple Store London' on my credit card. My card is with me in Istanbul.”*→ **Outcome**: Geo-velocity conflict detected (London vs Istanbul within 22 mins). Risk 89/100 (Critical). Chargeback Reason 4837 triggered. Human approval required for chargeback.
2. **🟡 Duplicate Payment (Terminal Timeout Error)***“The same payment of 7,500 TL appears twice on my credit card within 3 seconds.”*→ **Outcome**: Duplicate POS authorization detected. Risk 42/100 (Medium). Provisional hold release queued for operator approval.
3. **🟢 Personal Loan Pre-Scoring (Credit Underwriting)***“I want to apply for a 150,000 TL personal loan with a 24-month term for home renovation.”*→ **Outcome**: Prime tier KKB score (1,780). DTI 26.4%. Risk 18/100 (Low). Straight-through automated pre-approval generated.
4. **🟣 Suspicious Account Access (Account Takeover - ATO)**
   *“My account was accessed from an unrecognized Android device in Frankfurt at 03:14 AM.”*
   → **Outcome**: TOR exit node IP detected with anomalous keystroke dynamics. Risk 92/100 (Critical). Automated session kill-switch triggered; outbound transfer lock applied.

---

## 9. 📄 Example Output (Structured JSON)

When an analysis completes, the engine generates an enterprise-ready JSON response:

```json
{
  "case_id": "CASE-2026-8941",
  "intent": "unauthorized_card_transaction_dispute",
  "risk_score": 89,
  "risk_level": "CRITICAL",
  "confidence_score": 94,
  "priority": "CRITICAL",
  "financial_exposure": {
    "amount": 4200.00,
    "currency": "TRY",
    "is_recoverable": true
  },
  "policy_checks": [
    {
      "rule_id": "POL-SEC-09",
      "rule_name": "Geo-Velocity Conflict Rule",
      "status": "TRIGGERED",
      "description": "Transaction in London registered 22 minutes after Istanbul POS auth."
    },
    {
      "rule_id": "POL-BDDK-44",
      "rule_name": "Fraud Dispute Zero-Liability Window",
      "status": "PASSED"
    }
  ],
  "human_approval_required": true,
  "human_approval_reason": "Chargeback filing over 3,000 TL requires authorized officer sign-off.",
  "recommended_actions": [
    {
      "step": 1,
      "action": "Temporarily freeze card international e-commerce channel",
      "is_automated": true,
      "requires_human_approval": false,
      "status": "executed"
    },
    {
      "step": 2,
      "action": "Send Biometric Push Notification to Mobile App",
      "is_automated": true,
      "requires_human_approval": false,
      "status": "executed"
    },
    {
      "step": 3,
      "action": "Initiate Mastercard/Visa Reason Code 4837 Chargeback Dossier",
      "is_automated": false,
      "requires_human_approval": true,
      "status": "pending"
    }
  ]
}
```

---

## 10. 💻 Tech Stack

- **Frontend & App Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling & UI**: Tailwind CSS, Glassmorphic Fintech Design, Lucide Icons, Canvas Confetti
- **Agent Orchestration**: Multi-Agent State Machine Architecture (LangGraph Pattern)
- **Backend API**: Next.js Serverless Edge Route Handlers (`/api/analyze`)
- **Safety & Guardrails**: Deterministic Regulatory Matrix & Zero-Blind HITL Gate
- **AI Models Supported**: OpenAI GPT-4o / Google Gemini 1.5 Pro / Local LLMs

---

## 11. 📂 Project Structure

```text
bankacılık/
├── .env.example                 # Sample environment variables
├── package.json                 # Next.js & project dependencies
├── tsconfig.json                # TypeScript compiler configuration
├── tailwind.config.js           # Tailwind dark fintech theme & glow tokens
├── postcss.config.js            # PostCSS plugin setup
├── next.config.mjs              # Next.js runtime configuration
├── README.md                    # System architecture & documentation
└── src/
    ├── app/
    │   ├── api/
    │   │   └── analyze/
    │   │       └── route.ts     # Multi-Agent REST API endpoint
    │   ├── globals.css          # Fintech design system & scrollbars
    │   ├── layout.tsx           # SEO metadata & HTML root layout
    │   └── page.tsx             # Master DecisionFlow application page
    ├── components/
    │   ├── Navbar.tsx           # Brand header, agent counter & lang toggle
    │   ├── HeroSection.tsx      # High-impact hero, pipeline strip & metrics
    │   ├── AgentFlowDiagram.tsx # Visual lifecycle of the 5 agents
    │   ├── LiveAnalyzer.tsx     # Interactive terminal studio & step animations
    │   ├── DecisionDashboard.tsx# Case results, risk cards & responsibility matrix
    │   ├── AgentTraceView.tsx   # Explainability inspector & latency telemetry
    │   ├── ArchitectureView.tsx # System topology, tech breakdown & chatbot diff
    │   ├── HumanApprovalModal.tsx# HITL signature gate with celebratory confetti
    │   └── Footer.tsx           # Product accreditation & technical tags
    ├── lib/
    │   ├── agents/
    │   │   └── orchestrator.ts  # Central multi-agent state coordinator
    │   ├── data/
    │   │   └── scenarios.ts     # Pre-configured banking benchmark cases
    │   └── utils.ts             # Currency formatters & Tailwind class merger
    └── types/
        └── decision.ts          # Type-safe schemas for agents, risk & traces
```

---

## 12. ⚡ Getting Started

### Prerequisites

- **Node.js**: v18.17.0 or higher
- **npm** / **yarn** / **pnpm**

### Quick Start Steps

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables (optional for demo presets)
cp .env.example .env.local

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 13. 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# AI Provider Keys (Optional for local simulation, active for live LLM mode)
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 14. 🧠 Why Agentic AI? (Not Just a Chatbot)

| Feature                        | Standard Banking Chatbot      | Nexora DecisionFlow (Agentic Platform)            |
| :----------------------------- | :---------------------------- | :------------------------------------------------ |
| **Execution Philosophy** | Q&A Text Generation           | **Understand → Analyze → Decide → Act**  |
| **Architecture**         | Single monolithic prompt      | 5 specialized, isolated autonomous agents         |
| **Explainability**       | Black-box generated text      | Step-by-step trace with latency and evidence logs |
| **Regulatory Guardrail** | Unreliable hallucination risk | Deterministic BDDK & MASAK compliance checks      |
| **Financial Safety**     | Unrestricted / disconnected   | **Human-in-the-Loop** gated authorization   |

---

## 15. 🛡️ Safety & Responsible AI

- **Synthetic Data**: All demo transactions, account numbers, and device IPs are 100% synthetic.
- **Zero Autonomous Fund Movement**: No financial disbursements or chargeback payouts occur without human sign-off.
- **Deterministic Guardrails**: Financial parameters (amounts, limits, dates) are validated against hard programmatic boundaries.
- **Complete Audit Provenance**: Every intermediate decision generates a cryptographic trace hash (`SHA256`).

---

## 16. 🔮 Future Roadmap

- [ ] Direct Core Banking API integration (Open Banking PSD2 & BKM Gateway).
- [ ] RAG (Retrieval-Augmented Generation) connected to internal bank circulars & PDF legislation.
- [ ] Machine learning fraud scoring model integration (XGBoost / Graph Neural Networks).
- [ ] Persistent Agent Memory & Customer Affinity Profiles.
- [ ] Multi-tenant Role-Based Access Control (RBAC) for Branch vs Headquarters fraud desks.

---

## 17. 🌐 Enterprise Deployment & Vision

> **Nexora DecisionFlow is engineered as an autonomous decision copilot to empower financial institutions, card issuers, and compliance desks.**

The platform demonstrates how multi-agent autonomous systems revolutionize digital banking operations by augmenting human decision-makers, eliminating operational backlogs, and ensuring strict regulatory compliance.

---

## 👥 Team Nexora

- **Fatih Korkmaz** — *Lead Agentic AI Architect & Full-Stack Engineer*
- **Elif Yeşilyurt** — *AI Product Strategist & Banking Domain Lead*

---

*© 2026 Nexora DecisionFlow. Built with precision for next-generation banking operations.*
