"use client"
import React, { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, Brain, Trash2, Loader2, Loader, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
interface AIChatbotModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  message: string;
  timestamp: number;
  suggestedActions?: string[];
}

interface ChatStorage {
  [key: string]: ChatMessage[];
}

const AIChatbotModal = ({ isOpen = false, onClose }: AIChatbotModalProps) => {
  const [isOpenState, setIsOpen] = useState(isOpen);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();


  const pathname = usePathname();

  const urls = [
    {
      url: "/dashboard/user",
      suggestedMessage: [
        "Give me a progress summary",
        "What should I focus on today?",
        "Any urgent tasks I'm missing?",
        "How am I doing overall?",
      ]
    },
    {
      url: "/dashboard/user/ai-insights",
      suggestedMessage: [
        "Explain my latest insights",
        "Help me implement recommendations",
        "What do these skill gaps mean?",
        "Create a weekly action plan",
      ]
    },
    {
      url: "/dashboard/user/journal",
      suggestedMessage: [
        "Analyze my journal patterns",
        "Suggest today's journal prompt",
        "Help me reflect on challenges",
        "Track my mood trends",
      ]
    },
    {
      url: "/dashboard/user/mentor",
      suggestedMessage: [
        "Find mentors for my goals",
        "Prepare for my next session",
        "Questions to ask mentors",
        "Review mentor feedback",
      ]
    },
    {
      url: "/dashboard/user/resources",
      suggestedMessage: [
        "Recommend resources for my goals",
        "Create a learning plan",
        "Find tutorials for specific skills",
        "Suggest practice projects",
      ]
    },
    {
      url: "/dashboard/user/timelines",
      suggestedMessage: [
        "Help me create a new timeline",
        "Break down a big milestone",
        "Is my timeline realistic?",
        "Suggest timeline adjustments",
      ]
    },
    {
      url: "/dashboard/user/timelines/create",
      suggestedMessage: [
        "Help structure this timeline",
        "Set realistic deadlines",
        "Break down main goal",
        "Suggest milestones",
      ]
    },
    {
      url: "/dashboard/user/community",
      suggestedMessage: [
        "Find communities I should join",
        "Help me write a community post",
        "Connect me with peers",
        "Share my progress effectively",
      ]
    },
    {
      url: "/dashboard/user/settings",
      suggestedMessage: [
        "Help with account settings",
        "Explain privacy options",
        "Optimize my preferences",
        "Troubleshoot issues",
      ]
    },
    {
      url: "/dashboard/user/help",
      suggestedMessage: [
        "How do I use this feature?",
        "Troubleshoot a problem",
        "Explain platform features",
        "Get support help",
      ]
    },
  ]

  useEffect(() => {
    loadChatHistory();
  }, [pathname]);

  const loadChatHistory = () => {
    try {
      const storedChats: ChatStorage = JSON.parse(localStorage.getItem('chronoai_chats') || '{}');
      const currentChat = storedChats[pathname] || [];
      setChatMessages(currentChat);
    } catch (error) {
      setChatMessages([]);
    }
  };

  const saveChatMessage = (message: ChatMessage) => {
    try {
      const storedChats: ChatStorage = JSON.parse(localStorage.getItem('chronoai_chats') || '{}');
      const currentChat = storedChats[pathname] || [];
      const updatedChat = [...currentChat, message];

      storedChats[pathname] = updatedChat.slice(-50);
      localStorage.setItem('chronoai_chats', JSON.stringify(storedChats));

      setChatMessages(updatedChat);
    } catch (error) {
      setError('Failed to save chat');
      console.error('Failed to save chat:', error);
    }
  };

  const clearChatHistory = () => {
    try {
      const storedChats: ChatStorage = JSON.parse(localStorage.getItem('chronoai_chats') || '{}');
      delete storedChats[pathname];
      localStorage.setItem('chronoai_chats', JSON.stringify(storedChats));
      setChatMessages([]);
    } catch (error) {
      setError('Failed to clear chat');
      console.error('Failed to clear chat:', error);
    }
  };

  const handleSendMessage = async (message?: string) => {
    const finalMessage = message || inputMessage;
    if (!finalMessage.trim()) return;

    setIsLoading(true);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: finalMessage,
      timestamp: Date.now()
    };

    saveChatMessage(userMessage);
    setInputMessage('');

    try {
      const response = await axios.post('/api/ai-chat', {
        message: finalMessage,
        context: pathname,
        chatHistory: chatMessages.slice(-10)
      });

      if (response.data.success) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          message: response.data.data.response,
          suggestedActions: response.data.data.suggestedActions,
          timestamp: Date.now()
        };
        setError('');
        saveChatMessage(aiMessage);
      }
    } catch (error: any) {
      router.refresh()
      setError(error.response?.data?.error || 'Failed to get AI response');
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const currentPage = urls.find(item => item.url === pathname) || urls[0];

  const getContextualGreeting = () => {
    const greetings = {
      "/dashboard/user": "Hello! I'm here to help you overview your progress and plan your next steps.",
      "/dashboard/user/ai-insights": "Hi! I can break down your insights and help you create actionable plans.",
      "/dashboard/user/journal": "Welcome! Let me help you reflect and gain insights from your journal entries.",
      "/dashboard/user/mentor": "Hello! I can assist with finding mentors and preparing for your sessions.",
      "/dashboard/user/resources": "Hi there! Let me recommend personalized learning resources for you.",
      "/dashboard/user/timelines": "Hello! I'm here to help you plan and optimize your timelines.",
      "/dashboard/user/timelines/create": "Welcome! Let me help you structure and create an effective timeline.",
      "/dashboard/user/community": "Hi! I can help you engage with communities and connect with peers.",
      "/dashboard/user/settings": "Hello! I can assist with your account settings and preferences.",
      "/dashboard/user/help": "Hi! I'm here to help you with any questions or issues.",
    };
    return greetings[pathname as keyof typeof greetings] || "Hello! How can I assist you today?";
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpenState)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 z-50 border-2 border-white/20 group"
      >
        <div className="relative">
          <Sparkles className="h-6 w-6 text-white group-hover:rotate-180 transition-all duration-500" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
      </button>

      {isOpenState && (
        <div className="fixed bottom-28 right-8 w-96 h-[560px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden transform transition-all duration-300 animate-in slide-in-from-bottom-10">
          <div className="bg-gradient-to-r from-primary to-blue-600 px-6 py-4 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 translate-y-12"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">ChronoAI Assistant</h3>
                <p className="text-white/80 text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online • Ready to help
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChatHistory}
                className="text-white hover:bg-white/20 rounded-xl"
                title="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setIsOpen(false); if (onClose) onClose(); }}
                className="text-white hover:bg-white/20 rounded-xl"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isBannerVisible && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800 text-sm">
                <Zap className="h-4 w-4" />
                <span>Each AI request costs <strong>5 credits</strong></span>
              </div>
              <Button
                onClick={() => setIsBannerVisible(false)}
                variant="ghost"
                size="sm"
                className="text-amber-600 hover:text-amber-800 hover:bg-amber-100 h-8 px-2"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
            <div className="space-y-6">
              {chatMessages.length === 0 && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100 max-w-[80%]">
                    <p className="text-gray-800 text-sm leading-relaxed">{getContextualGreeting()}</p>
                  </div>
                </div>
              )}

              {chatMessages.map((chat) => (
                <div key={chat.id} className={`flex gap-3 ${chat.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${chat.type === 'user'
                      ? 'bg-gray-600'
                      : 'bg-gradient-to-br from-primary to-blue-600'
                    }`}>
                    {chat.type === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 shadow-sm border max-w-[80%] ${chat.type === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white border-gray-100 rounded-tl-none'
                    }`}>
                    <p className="text-sm leading-relaxed">
                      {chat.message.split('**').map((part, index) =>
                        index % 2 === 1 ? (
                          <strong key={index} className="font-bold">{part}</strong>
                        ) : (
                          part.split('\n').map((line, lineIndex) => (
                            <span key={lineIndex}>
                              {line}
                              {lineIndex < part.split('\n').length - 1 && <br />}
                            </span>
                          ))
                        )
                      )}
                      </p>
                    {chat.suggestedActions && chat.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4 justify-center text-primary">
                        {chat.suggestedActions.map((action, index) => (
                          <button 
                            key={index}
                            onClick={() => handleSuggestionClick(action)}
                            className="items-center"
                          >
                            {action}

                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {chatMessages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2">Quick Suggestions</p>
                  <div className="grid grid-cols-1 gap-2">
                    {currentPage.suggestedMessage.map((message, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(message)}
                        className="text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-sm hover:border-gray-300"
                      >
                        {message}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-400/20 text-red-700 text-xs mt-2 p-2 rounded-lg">
                  <div className="flex flex-col  items-left">
                    <span className="font-bold">Error: </span>
                    <span>
                      {error}
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="border-t border-gray-200 bg-white p-2">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about your progress..."
                  disabled={isLoading}
                />
              </div>
              <Button
                variant="default"
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="h-10 w-10"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>

          </div>
        </div>
      )}
    </>
  )
}

export default AIChatbotModal;