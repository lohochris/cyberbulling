import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// 1. Import track from Vercel Analytics
import { track } from '@vercel/analytics'; 
import { 
  Bot, 
  Send, 
  User, 
  Clock, 
  ShieldCheck, 
  Trash2,
  Phone,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
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

    if (!isInitial) {
      addChatMessage({ role: 'user', content: messageToSend });
      
      // 2. Track message sent event for interaction reports
      track('billy_message_sent', { 
        is_quick_starter: quickStarters.includes(messageToSend),
        message_length: messageToSend.length 
      });
    }

    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getBillyResponse(messageToSend);

      // Safeguard against empty/invalid response
      const finalMessage =
        response?.message && response.message.trim().length > 0
          ? response.message
          : "I couldn’t generate a response. Please try again.";

      addChatMessage({ 
        role: 'billy', 
        content: finalMessage,
        suggestedActions: response?.suggestedActions || [],
      });

    } catch (error) {
      console.error("Billy Error:", error);

      // 3. Track errors to monitor system stability
      track('billy_error', { error: String(error) });

      addChatMessage({
        role: 'billy',
        content: "Something went wrong. Please try again.",
        suggestedActions: ['Retry'],
      });

    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickStarter = (message: string) => {
    // 4. Track which specific quick starters users find most helpful
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
    <div className="min-h-screen py-6 md:py-12 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
              <Bot className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Talk to Billy
            </h1>
          </div>
          <p className="text-slate-600 max-w-xl mx-auto">
            Your PhD-backed AI companion for digital resilience. 
            Billy uses the <strong>SHIELD</strong> framework to support you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Card className="flex-1 shadow-2xl border-none overflow-hidden flex flex-col min-h-[600px]">
              <CardHeader className="bg-slate-900 text-white py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 absolute bottom-0 right-0 z-10" />
                      <Bot size={24} className="text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Billy AI</CardTitle>
                      <CardDescription className="text-slate-400 text-xs">Always Active • Local Privacy</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      track('billy_chat_cleared'); // 5. Track when users reset the conversation
                      clearChatHistory();
                    }}
                    className="text-slate-400 hover:text-rose-400 hover:bg-white/10"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-1 flex flex-col bg-white">
                <ScrollArea className="flex-1 h-[450px]" ref={scrollRef}>
                  <div className="p-6 space-y-6">
                    {billyChatHistory.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'billy' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {message.role === 'billy' ? <Bot size={16} /> : <User size={16} />}
                        </div>
                        
                        <div className={`flex flex-col max-w-[85%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                            message.role === 'billy'
                              ? 'bg-slate-50 text-slate-800 border border-slate-100'
                              : 'bg-blue-600 text-white'
                          }`}>
                            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                          
                          {message.suggestedActions && message.suggestedActions.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.suggestedActions.map((action, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleQuickStarter(action)}
                                  className="px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1 mt-1.5 opacity-50">
                            <Clock size={10} />
                            <span className="text-[10px] font-medium">{formatTime(message.timestamp)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                        <div className="bg-slate-50 rounded-2xl px-5 py-3 border border-slate-100">
                          <motion.div 
                            className="flex gap-1.5"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <span className="text-xs text-blue-500 font-medium">Billy is thinking...</span>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 bg-slate-50 border-t">
                  <div className="relative flex items-center">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Billy anything..."
                      className="pr-12 py-6 bg-white border-slate-200 focus:ring-blue-500 rounded-xl"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-2 h-10 w-10 p-0 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Billy is an AI assistant. If you are in danger, please use the emergency resources.
                  </p>
                </div>
              </CardContent>
            </Card>

            <AnimatePresence>
              {billyChatHistory.length <= 1 && (
                <motion.div exit={{ opacity: 0, height: 0 }} className="flex flex-wrap gap-2 overflow-hidden">
                  {quickStarters.map((starter, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickStarter(starter)}
                      className="rounded-full bg-white text-slate-600 border-slate-200 hover:border-blue-500 hover:text-blue-600"
                    >
                      {starter}
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <ShieldCheck size={20} className="text-blue-200" />
                  SHIELD Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-blue-100 space-y-2 leading-relaxed">
                Billy provides <strong>S</strong>upport, <strong>H</strong>elp, 
                <strong>I</strong>nformation, <strong>E</strong>mpowerment, 
                <strong>L</strong>ogistics, and <strong>D</strong>ocumentation.
              </CardContent>
            </Card>

            <Card className="border-rose-100 bg-rose-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2 text-rose-700">
                  <ShieldAlert size={20} />
                  Crisis Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getEmergencyResources().map((resource, index) => (
                  <div key={index} className="flex items-start gap-2 text-[13px]">
                    <Phone className="text-rose-500 flex-shrink-0 mt-0.5" size={14} />
                    <span className="text-slate-700 font-medium">{resource}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-dashed border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-500 uppercase tracking-wider">
                  Privacy Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Local Storage Only
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Anonymous Session
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}