
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setCurrentView }) => {
  const items = [
    { view: AppView.MINING, label: 'Mining', icon: '⚡' },
    { view: AppView.TASKS, label: 'Tasks', icon: '📝' },
    { view: AppView.REFERRALS, label: 'Friends', icon: '👥' },
    { view: AppView.WITHDRAWAL, label: 'Wallet', icon: '💰' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass rounded-2xl p-2 flex justify-between items-center z-50 shadow-2xl border border-white/10">
      {items.map((item) => (
        <button
          key={item.view}
          onClick={() => setCurrentView(item.view)}
          className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all duration-300 ${
            currentView === item.view 
            ? 'bg-blue-500/20 text-blue-400 scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
            : 'text-gray-400 opacity-60'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
