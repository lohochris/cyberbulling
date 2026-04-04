import { GoogleGenerativeAI } from "@google/generative-ai";
import { BillyResponse } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const responsePatterns: Record<string, BillyResponse> = {
  greeting: {
    message: "Hello! I'm Billy, your support companion. I'm here to help with online safety, digital risks, or anything you're going through. How can I help you today?",
    suggestedActions: ['Tell me what happened', 'I need resources', 'Ask a question'],
    emotionalTone: 'supportive',
  },
  emergency: {
    message: "I'm really sorry you're going through this. You're not alone. Here are some immediate support resources:",
    suggestedActions: ['Talk to someone', 'Reporting options', 'Safety tips'],
    emotionalTone: 'supportive',
    resources: [
      'Emergency Services: 999 / 911',
      'Samaritans (24/7): 116 123',
      'National Bullying Helpline: 0300 323 0169'
    ]
  }
};

export async function getBillyResponse(userMessage: string): Promise<BillyResponse> {
  const input = userMessage.trim();
  const lowerInput = input.toLowerCase();

  if (['hello', 'hi', 'hey', 'start'].includes(lowerInput)) {
    return responsePatterns.greeting;
  }

  if (
    lowerInput.includes('resource') ||
    lowerInput.includes('help') ||
    lowerInput.includes('support') ||
    lowerInput.includes('emergency')
  ) {
    return responsePatterns.emergency;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-002"
    });

    const prompt = `You are Billy, an assistant for online safety, cybersecurity, and general questions. 
Respond clearly and concisely in 2 to 4 sentences. Only show empathy if the user expresses distress.

User: ${input}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (text && text.trim().length > 0) {
      return {
        message: text.trim(),
        suggestedActions: ['Tell me more', 'What should I do?', 'Ask another question'],
        emotionalTone: 'informative'
      };
    }

    return {
      message: "I couldn’t generate a clear answer. Please try rephrasing your question.",
      suggestedActions: ['Try again', 'Ask differently'],
      emotionalTone: 'informative'
    };

  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      message: "Something went wrong while processing your request. Please try again.",
      suggestedActions: ['Retry', 'Ask another question'],
      emotionalTone: 'informative'
    };
  }
}

export function getEmergencyResources(): string[] {
  return [
    'Samaritans (24/7): 116 123',
    'NHS Mental Health: 111 (Option 2)',
    'National Bullying Helpline: 0300 323 0169',
  ];
}