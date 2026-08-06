import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../lib/authStore';
import { getMessages, sendMessage, getUsers } from '../lib/api';
import { echo } from '../lib/echo';
import { Send, User as UserIcon, MessageSquare } from 'lucide-react';
import Toast from '../components/Toast';

export default function Messages() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const fetchMessagesAndUsers = async () => {
    try {
      const [msgRes, usrRes] = await Promise.all([
        getMessages(),
        getUsers()
      ]);
      
      if (msgRes.success) setMessages(msgRes.data);
      if (usrRes.success) setUsers(usrRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesAndUsers();
    
    if (user?.id) {
      const channel = echo.private(`chat.${user.id}`);
      channel.listen('MessageSent', (e: any) => {
        setMessages((prev) => {
          // Prevent duplicates
          if (prev.find(m => m.id === e.message.id)) return prev;
          // Add new message to the top since we order by desc
          return [e.message, ...prev];
        });
      });

      return () => {
        channel.stopListening('MessageSent');
        echo.leave(`chat.${user.id}`);
      };
    }
  }, [user]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !receiverId.trim()) return;

    sendMessage({ receiver_id: receiverId, content })
      .then(res => {
        if (res.success) {
          setToast({ message: 'Message sent successfully', type: 'success' });
          setContent('');
          fetchMessagesAndUsers();
        }
      })
      .catch(err => {
        setToast({ message: err.response?.data?.message || 'Failed to send message', type: 'error' });
      });
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-900 p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 h-[80vh]">
        
        {/* Messages List */}
        <div className="flex-1 bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Messages</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500 font-medium">No messages found. Start a conversation!</p>
              </div>
            ) : (
              messages.map((msg: any) => {
                const isMine = msg.sender_id === user?.id;
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-4 rounded-2xl ${isMine ? 'bg-indigo-600 text-white rounded-br-sm shadow-md' : 'bg-slate-100 text-slate-800 rounded-bl-sm border border-slate-200'}`}>
                      <div className={`text-xs mb-1 font-bold ${isMine ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {isMine ? 'You' : msg.sender?.name}
                      </div>
                      <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                      <div className={`text-[10px] mt-2 text-right font-medium ${isMine ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Send Message Form */}
        <div className="w-full md:w-80 bg-white border border-slate-200 shadow-sm rounded-xl p-6 h-fit">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">New Message</h3>
          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Recipient</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={16} className="text-slate-400" />
                </div>
                <select
                  value={receiverId}
                  onChange={e => setReceiverId(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="" disabled>Select User...</option>
                  {users.filter(u => u.id !== user?.id).map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Message</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Type your message..."
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={!content.trim() || !receiverId.trim()}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50 shadow-sm"
            >
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>

      </div>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
