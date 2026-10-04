import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexora DecisionFlow | Agentic Intelligence for Banking Decisions',
  description: 'An autonomous multi-agent AI decision orchestration platform for banking operations, risk evaluation, and human-in-the-loop compliance.',
  keywords: ['Agentic AI', 'Banking AI', 'Fintech Decision Engine', 'Fraud Detection', 'Multi-Agent Systems', 'Nexora'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-[#050b1a] text-slate-100 antialiased selection:bg-orange-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
