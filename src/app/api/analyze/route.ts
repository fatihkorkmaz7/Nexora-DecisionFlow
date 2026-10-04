import { NextRequest, NextResponse } from 'next/server';
import { orchestrateBankingDecision } from '@/lib/agents/orchestrator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'A valid customer banking prompt is required.' },
        { status: 400 }
      );
    }

    const decision = await orchestrateBankingDecision(prompt);
    return NextResponse.json(decision);
  } catch (error: any) {
    console.error('Error in agent orchestration:', error);
    return NextResponse.json(
      { error: 'Internal Agent Orchestration Error', details: error?.message },
      { status: 500 }
    );
  }
}
