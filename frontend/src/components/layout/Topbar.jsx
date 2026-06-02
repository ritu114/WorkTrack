import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui';

export default function Topbar() {
  const { user } = useAuth();
  const { notifications, markNotificationsRead } = useData();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Filter notifications for current user
  const myNotifications = notifications.filter(n => n.userId === user?.id);
  const unreadCount = myNotifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      // Mark read when opening
      markNotificationsRead(user.id);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#334155] bg-[#0F172A] px-6 relative z-40">
      <div className="flex flex-1 items-center">
        <div className="relative w-64 max-w-md hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-9 w-full rounded-md border border-[#334155] bg-[#1E293B] pl-9 pr-4 text-sm text-slate-200 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button 
          onClick={handleNotificationClick}
          className="relative rounded-full p-1.5 text-slate-400 hover:bg-[#1E293B] hover:text-white transition-colors focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        >
          {unreadCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                {unreadCount}
              </span>
            </span>
          )}
          <Bell className="h-5 w-5" />
        </button>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="absolute top-12 right-0 w-80 rounded-xl border border-[#334155] bg-[#1E293B] shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-[#334155] flex justify-between items-center">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && <Badge variant="primary" className="text-[10px] py-0">{unreadCount} New</Badge>}
            </div>
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {myNotifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-slate-500">No notifications</div>
              ) : (
                myNotifications.map(notif => (
                  <div key={notif.id} className={`p-4 border-b border-[#334155]/50 last:border-0 hover:bg-[#283548] transition-colors ${!notif.read ? 'bg-[#0F172A]/50' : ''}`}>
                    <div className="flex gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {notif.type === 'assignment' ? (
                          <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500"></div>
                        ) : notif.type === 'update' ? (
                          <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500"></div>
                        ) : (
                          <div className="h-2 w-2 mt-1.5 rounded-full bg-yellow-500"></div>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm ${!notif.read ? 'text-white font-medium' : 'text-slate-300'}`}>{notif.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{notif.date}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-2 border-t border-[#334155] text-center">
              <button className="text-xs text-yellow-500 hover:text-yellow-400 font-medium w-full py-1">View All Activity</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
