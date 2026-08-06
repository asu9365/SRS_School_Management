import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../../lib/api';
import { echo } from '../../lib/echo';
import { useAuthStore } from '../../lib/authStore';

export default function NotificationBell() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
    
    if (user?.id) {
      const channel = echo.private(`notifications.${user.id}`);
      channel.listen('NotificationSent', (e: any) => {
        setNotifications(prev => [e.notification, ...prev]);
      });

      return () => {
        channel.stopListening('NotificationSent');
        echo.leave(`notifications.${user.id}`);
      };
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      if (res.success) {
        setNotifications(res.data);
      } else if (Array.isArray(res)) {
        setNotifications(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkRead = async (id: number | string) => {
    try {
      await markNotificationRead(id);
      fetchNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  const unreadCount = notifications.filter(n => !n.read_at).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
      >
        <Bell size={20} className="dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-fade-in-up">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{unreadCount} unread</span>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                No notifications yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-50 dark:divide-slate-700">
                {notifications.map((notif: any) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 transition-colors ${notif.read_at ? 'bg-white dark:bg-slate-800 opacity-70' : 'bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                  >
                    <div className="flex justify-between items-start cursor-pointer" onClick={() => !notif.read_at && handleMarkRead(notif.id)}>
                      <div>
                        <h4 className={`text-sm ${notif.read_at ? 'text-slate-600 dark:text-slate-300 font-medium' : 'text-slate-800 dark:text-white font-bold'}`}>
                          {notif.data?.title || 'Notification'}
                        </h4>
                        <p className={`text-xs mt-1 ${notif.read_at ? 'text-slate-500 dark:text-slate-400' : 'text-slate-600 dark:text-slate-300'}`}>
                          {notif.data?.body}
                        </p>
                      </div>
                    </div>
                    {notif.data?.link && (
                      <a href={notif.data.link} className="inline-block mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        View Details →
                      </a>
                    )}
                    <div className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider font-semibold">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
