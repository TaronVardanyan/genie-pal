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
    const { messages } = body;

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    if (!openai.apiKey)
      return new NextResponse('OpenAI API key not configured', { status: 500 });
    if (!messages)
      return new NextResponse('Messages are required', { status: 400 });

    const params = {
      messages,
      model: 'gpt-3.5-turbo',
    };

    const response = await openai.chat.completions.create(params);

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
