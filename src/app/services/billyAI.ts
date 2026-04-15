import { BillyResponse } from '../types';

// Predefined response patterns
const responsePatterns: Record<string, BillyResponse> = {
  greeting: {
    message: "Hello. I am Billy, your support companion. I am here to help with online safety, digital risks, or anything you are experiencing. How can I assist you today?",
    suggestedActions: ['Tell me what happened', 'I need resources', 'Ask a question'],
    emotionalTone: 'supportive',
  },
  emergency: {
    message: "I am sorry you are going through this. You are not alone. Here are some immediate support resources you can use.",
    suggestedActions: ['Talk to someone', 'Reporting options', 'Safety tips'],
    emotionalTone: 'supportive',
    resources: [
      'Emergency Services: 999 or 911',
      'Samaritans (24 hours): 116 123',
      'National Bullying Helpline: 0300 323 0169'
    ]
  }
};

export async function getBillyResponse(
  userMessage: string,
  chatHistory: { role: string; content: string }[] = []
): Promise<BillyResponse> {

  const input = userMessage.trim();
  const lowerInput = input.toLowerCase();

  // Greeting shortcut
  if (['hello', 'hi', 'hey', 'start'].includes(lowerInput)) {
    return responsePatterns.greeting;
  }

  // Emergency shortcut
  if (
    lowerInput === 'help' ||
    lowerInput === 'emergency' ||
    lowerInput.includes('support') ||
    lowerInput.includes('resources')
  ) {
    return responsePatterns.emergency;
  }

  try {
    // CALL YOUR BACKEND INSTEAD OF OPENROUTER
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input,
        history: chatHistory
      })
    });

    let result: any = null;

    try {
      result = await response.json();
    } catch {
      throw new Error("Invalid JSON from server");
    }

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || "Request failed");
    }

    let text =
      result?.message?.trim() ||
      "I could not generate a response. Please try again.";

    // HARD ACCURACY FIX
    if (input.toLowerCase().includes("juice jacking")) {
      text = "Juice jacking is a cyberattack where a compromised USB charging station is used to steal data or install malware on a device. It is not related to SIM card swapping. To stay safe, avoid using public USB charging ports and use your own charger or a power bank.";
    }

    //FORMATTING
    text = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#{1,6}\s?/g, '')
      .replace(/`+/g, '')
      .replace(/\n{2,}/g, '\n')
      .trim();

    return {
      message: text,
      suggestedActions: ['Tell me more', 'What should I do?', 'Ask another question'],
      emotionalTone: 'informative'
    };

  } catch (error: any) {
    console.error("Billy API Error:", error);

    // SMART FALLBACK MESSAGE
    return {
      message: "I am having trouble connecting right now. Please try again in a moment.",
      suggestedActions: ['Retry'],
      emotionalTone: 'informative'
    };
  }
}

// Emergency resources
export function getEmergencyResources(): string[] {
  return [
    'Samaritans (24 hours): 116 123',
    'NHS Mental Health: 111 (Option 2)',
    'National Bullying Helpline: 0300 323 0169',
  ];
}