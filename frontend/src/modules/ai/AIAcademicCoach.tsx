import React, { useState, useEffect, useRef } from 'react';
import api from '../../lib/api';
import { Bot, X, Send, User, ChevronUp } from 'lucide-react';

export default function AIAcademicCoach({ studentId, visible=true }: { studentId: string, visible?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai'|'user', content: string}[]>([
    { role: 'ai', content: "Hi! I'm your AI Academic Coach. I've analyzed your current 360° profile. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!visible) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post(`/ai/coach/chat/${studentId}`, {
        message: userMsg
      });
      
      if (response.data.success) {
        setMessages(prev => [...prev, { role: 'ai', content: response.data.data }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting right now." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-all duration-300 z-50 ${
          isOpen ? 'bg-slate-800 text-white rotate-180 scale-0 opacity-0' : 'bg-indigo-600 hover:bg-indigo-700 text-white scale-100 opacity-100'
        }`}
      >
        <Bot size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col z-50 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-full">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold font-outfit leading-tight">AI Academic Coach</h3>
              <p className="text-xs text-indigo-100">Powered by SchoolOS</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'ai' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}>
                {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50">
                <Bot size={16} />
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 rounded-tl-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-b-2xl shrink-0">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask for study tips, performance..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-full transition-colors"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
