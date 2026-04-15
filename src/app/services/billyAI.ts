import { BillyResponse } from '../types';

// Cache last working model (persists during session)
let lastWorkingModel: string | null = null;

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

// Retry with exponential backoff
async function fetchWithRetry(url: string, options: any, retries = 2) {
  let lastError: any;

  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        let result: any = null;

        try {
          result = await response.json();
        } catch {
          throw new Error("Invalid JSON response");
        }

        const errorMessage = result?.error?.message || "Unknown error";

        // Rate limit handling
        if (errorMessage.toLowerCase().includes("rate limit")) {
          throw new Error("RATE_LIMIT");
        }

        throw new Error(errorMessage);
      }

      return response;

    } catch (err: any) {
      clearTimeout(timeout);
      lastError = err;

      // stop retrying on rate limit (handle separately)
      if (err.message === "RATE_LIMIT") {
        throw err;
      }

      // exponential backoff
      await new Promise(r => setTimeout(r, 500 * Math.pow(2, i)));
    }
  }

  throw lastError;
}

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
    const baseModels = [
      "meta-llama/llama-3-8b-instruct",
      "mistralai/mistral-7b-instruct",
      "openai/gpt-3.5-turbo"
    ];

    // Prioritize last working model
    const models = lastWorkingModel
      ? [lastWorkingModel, ...baseModels.filter(m => m !== lastWorkingModel)]
      : baseModels;

    let data: any = null;
    let success = false;
    let lastError = "";

    for (const model of models) {
      try {
        const response = await fetchWithRetry(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model,
              messages: [
                {
                  role: "system",
                  content: "You are Billy, an AI assistant specialized in cybersecurity and online safety. Provide accurate and factually correct explanations. Do not confuse cybersecurity concepts. If unsure, give a safe and general explanation. Use clear, simple language in short paragraphs. Avoid symbols, bullet points, or formatting. Always continue the conversation based on previous context."
                },
                ...chatHistory,
                {
                  role: "user",
                  content: input
                }
              ]
            })
          }
        );

        let result: any = null;

        try {
          result = await response.json();
        } catch {
          throw new Error("Invalid JSON response from API");
        }

        data = result;
        success = true;

        // Cache successful model
        lastWorkingModel = model;

        console.log({
          model,
          status: "success",
          timestamp: new Date().toISOString()
        });

        break;

      } catch (err: any) {
        lastError = err.message;

        console.error({
          model,
          status: "failed",
          error: lastError
        });

        // Rate limit handling (global stop)
        if (lastError === "RATE_LIMIT") {
          return {
            message: "Too many requests right now. Please wait a moment and try again.",
            suggestedActions: ['Retry'],
            emotionalTone: 'informative'
          };
        }
      }
    }

    if (!success) {
      throw new Error(lastError || "All models failed");
    }

    let text =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I could not generate a response. Please try again.";

    // Hard accuracy fix
    if (input.toLowerCase().includes("juice jacking")) {
      text = "Juice jacking is a cyberattack where a compromised USB charging station is used to steal data or install malware on a device. It is not related to SIM card swapping. To stay safe, avoid using public USB charging ports and use your own charger or a power bank.";
    }

    // Clean formatting
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
    console.error("OpenRouter Fatal Error:", error);

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