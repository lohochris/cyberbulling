import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { track } from '@vercel/analytics'; 
import { 
  Bot, 
  Send, 
  User, 
  Clock
} from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';

import { useStore } from '../store/useStore';
import { getBillyResponse, getEmergencyResources } from '../services/billyAI';

const quickStarters = [
  "I'm experiencing harassment online",
  "I need help with workplace cyberbullying",
  "How do I document incidents?",
  "I'm feeling overwhelmed and anxious",
  "Tell me about my legal rights",
];

export default function Billy() {
  const { billyChatHistory, addChatMessage, clearChatHistory } = useStore();

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [billyChatHistory, isTyping]);

  useEffect(() => {
    if (billyChatHistory.length === 0) {
      handleSendMessage('start', true);
    }
  }, []);

  const handleSendMessage = async (message?: string, isInitial = false) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    // Add user message
    if (!isInitial) {
      addChatMessage({ 
        id: crypto.randomUUID(),
        role: 'user', 
        content: messageToSend,
        timestamp: Date.now()
      });

      track('billy_message_sent', { 
        is_quick_starter: quickStarters.includes(messageToSend),
        message_length: messageToSend.length 
      });
    }

    setInputValue('');
    setIsTyping(true);

    try {
      // ✅ FIXED: INCLUDE CURRENT MESSAGE IN HISTORY
      const updatedHistory = [
        ...billyChatHistory.map(msg => ({
          role: msg.role === 'billy' ? 'assistant' : 'user',
          content: msg.content
        })),
        {
          role: 'user',
          content: messageToSend
        }
      ];

      const response = await getBillyResponse(messageToSend, updatedHistory);

      const finalMessage =
        response?.message && response.message.trim().length > 0
          ? response.message
          : "I couldn’t generate a response. Please try again.";

      addChatMessage({ 
        id: crypto.randomUUID(),
        role: 'billy', 
        content: finalMessage,
        suggestedActions: response?.suggestedActions || [],
        timestamp: Date.now()
      });

    } catch (error) {
      console.error("Billy Error:", error);

      track('billy_error', { error: String(error) });

      addChatMessage({
        id: crypto.randomUUID(),
        role: 'billy',
        content: "Something went wrong. Please try again.",
        suggestedActions: ['Retry'],
        timestamp: Date.now()
      });

    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickStarter = (message: string) => {
    track('billy_quick_starter_clicked', { label: message });
    handleSendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen py-6 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold">Talk to Billy</h1>
        </motion.div>

        <Card className="flex flex-col h-[600px]">
          <CardContent className="flex flex-col flex-1 p-0">

            <ScrollArea className="flex-1" ref={scrollRef}>
              <div className="p-4 space-y-4">

                {billyChatHistory.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[75%] bg-slate-100 p-3 rounded-xl">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className="text-xs mt-1 opacity-50">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && <p className="text-sm text-gray-500">Billy is thinking...</p>}

              </div>
            </ScrollArea>

            <div className="p-3 border-t flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Billy anything..."
                disabled={isTyping}
              />
              <Button onClick={() => handleSendMessage()} disabled={isTyping}>
                <Send size={16} />
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}