import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  X, 
  Send, 
  Trash2, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User, 
  CornerDownRight, 
  HelpCircle,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { processChatMessage, SUGGESTED_QUESTIONS } from '../services/chatbotService';
import SOPGeneratorModal from './SOPGeneratorModal';

export default function ChatbotWidget() {
  const navigate = useNavigate();
  const { profile, applications, documents } = useStudent();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: `Hello ${profile.name ? profile.name.split(' ')[0] : 'there'}! ✨ I am **GRANTLY AI**, your student funding assistant created by **Krupa Rathod**.\n\nI can analyze your **${profile.course || 'academic'}** profile, find high-match scholarships, help you structure an SOP outline, or check deadlines. How can I assist your funding journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSOPModal, setShowSOPModal] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!messageText) setInput('');
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const response = processChatMessage(textToSend, { profile, applications, documents });
      const assistantMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: response.text,
        action: response.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'assistant',
        text: `Chat cleared. Ask me anything about scholarships, eligibility, SOP outlines, or required documents!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.type === 'sop_generator') {
      setShowSOPModal(true);
    } else if (action.route) {
      navigate(action.route);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 p-3 sm:px-4 sm:py-3.5 rounded-full shadow-theme-lg flex items-center gap-2.5 text-white font-bold text-xs sm:text-sm card-hover-lift group border border-white/20 animate-soft-pulse"
          style={{ backgroundColor: 'var(--primary)' }}
          title="Open GRANTLY AI Student Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline">Ask GRANTLY AI</span>
          <span className="sm:hidden">AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed right-3 sm:right-6 bottom-3 sm:bottom-6 z-50 w-[94vw] sm:w-[410px] rounded-3xl bg-theme-card border border-theme shadow-theme-lg flex flex-col overflow-hidden transition-all duration-200 ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-theme bg-theme-secondary flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-theme-main font-heading">
                    GRANTLY AI
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-semibold text-theme-muted block">
                  Interactive Demo Assistant • Krupa Rathod
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-theme-muted hover:text-rose-500 hover:bg-theme-main transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme-main hover:bg-theme-main transition-colors"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme-main hover:bg-theme-main transition-colors"
                title="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content (Hidden if minimized) */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-theme-main/30 text-xs">
                
                {/* Notice banner */}
                <div className="p-2.5 rounded-2xl bg-theme-secondary/80 border border-theme text-[11px] text-theme-muted flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
                  <span>
                    Contextually connected to your <strong>{profile.course || 'student'}</strong> profile and demo scholarship database.
                  </span>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'btn-primary text-white rounded-br-xs'
                          : 'bg-theme-card border border-theme text-theme-main rounded-bl-xs'
                      }`}
                    >
                      {/* Markdown-style formatting support */}
                      <div className="whitespace-pre-line space-y-1">
                        {msg.text.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx}>
                            {paragraph.split('**').map((part, i) =>
                              i % 2 === 1 ? <strong key={i} className="font-extrabold">{part}</strong> : part
                            )}
                          </p>
                        ))}
                      </div>

                      {/* Attached Action Button */}
                      {msg.action && (
                        <div className="mt-3 pt-2 border-t border-theme/60">
                          <button
                            onClick={() => handleActionClick(msg.action)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-theme-secondary text-theme-primary hover:bg-theme-primary hover:text-white transition-all flex items-center gap-1.5 shadow-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{msg.action.label}</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-theme-subtle mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-theme-card border border-theme w-20">
                    <span className="w-2 h-2 rounded-full bg-theme-primary animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-theme-primary animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-theme-primary animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Pills */}
              <div className="p-2.5 border-t border-theme bg-theme-card overflow-x-auto whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-theme-muted flex items-center gap-1 pl-1">
                    <CornerDownRight className="w-3 h-3 text-theme-primary" />
                    Ask:
                  </span>
                  {SUGGESTED_QUESTIONS.slice(0, 4).map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-theme-secondary text-theme-main hover:bg-theme-main border border-theme transition-colors shrink-0"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="p-3 border-t border-theme bg-theme-card flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask GRANTLY AI anything about funding..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="btn-primary p-2.5 rounded-xl disabled:opacity-40 transition-opacity"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Standalone SOP Generator Modal Triggered from AI */}
      <SOPGeneratorModal
        isOpen={showSOPModal}
        onClose={() => setShowSOPModal(false)}
      />
    </>
  );
}
