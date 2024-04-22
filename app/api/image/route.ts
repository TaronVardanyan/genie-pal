import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = '512x512' } = body;

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    if (!openai.apiKey)
      return new NextResponse('OpenAI API key not configured', { status: 500 });
    if (!prompt) return new NextResponse('Prompt is required', { status: 400 });
    if (!amount) return new NextResponse('Amount is required', { status: 400 });
    if (!resolution)
      return new NextResponse('Resolution is required', { status: 400 });

    const params = {
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    };

    const response = await openai.images.generate(params);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
