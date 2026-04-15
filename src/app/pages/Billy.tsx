import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { track } from '@vercel/analytics';
import { Send } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';

import { useStore } from '../store/useStore';
import { getBillyResponse } from '../services/billyAI';

const quickStarters = [
  "I'm experiencing harassment online",
  "I need help with workplace cyberbullying",
  "How do I document incidents?",
  "I'm feeling overwhelmed and anxious",
  "Tell me about my legal rights",
];

export default function Billy() {
  const { billyChatHistory, addChatMessage } = useStore();

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [billyChatHistory, isTyping]);

  useEffect(() => {
    if (billyChatHistory.length === 0) {
      handleSendMessage('start', true);
    }
  }, []);

  const handleSendMessage = async (message?: string, isInitial = false) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

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
        response?.message?.trim() || "I couldn’t generate a response.";

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
    <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-slate-50 px-4">
      
      {/* 📘 CHAT CARD */}
      <Card className="w-full max-w-3xl h-full flex flex-col shadow-xl rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-4 border-b text-center font-semibold text-lg bg-white">
          Talk to Billy
        </div>

        {/* 💬 MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">

          {billyChatHistory.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[75%] p-3 rounded-2xl text-sm shadow-sm
                  ${message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border'}
                `}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>

                <div className="text-[10px] mt-1 opacity-60 text-right">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <p className="text-sm text-gray-500">Billy is thinking...</p>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ✍️ INPUT AREA */}
        <div className="p-3 border-t bg-white flex gap-2">
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

      </Card>
    </div>
  );
}