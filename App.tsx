
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppView, AppState, WithdrawalStatus, Withdrawal, Task, Referral, AppConfig } from './types';
import { INITIAL_CONFIG, INITIAL_TASKS, TON_LOGO_SVG } from './constants';

// Pages
import MiningPage from './pages/MiningPage';
import TasksPage from './pages/TasksPage';
import ReferralPage from './pages/ReferralPage';
import WithdrawalPage from './pages/WithdrawalPage';
import AdminPage from './pages/AdminPage';

// Components
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.MINING);
  const [logoClicks, setLogoClicks] = useState(0);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('ton_miner_state');
    if (saved) return JSON.parse(saved);
    return {
      balance: 0.0,
      isMining: false,
      miningStartTime: null,
      withdrawals: [],
      tasks: INITIAL_TASKS,
      referrals: [],
      config: INITIAL_CONFIG
    };
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('ton_miner_state', JSON.stringify(state));
  }, [state]);

  // Admin activation handler
  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const next = prev + 1;
      if (next >= 8) {
        setCurrentView(AppView.ADMIN);
        return 0;
      }
      return next;
    });
  };

  // Mining simulation logic
  useEffect(() => {
    let interval: number;
    if (state.isMining && state.miningStartTime) {
      interval = window.setInterval(() => {
        const now = Date.now();
        const elapsedSecs = (now - state.miningStartTime!) / 1000;
        const totalSessionSecs = state.config.miningSessionMinutes * 60;

        if (elapsedSecs >= totalSessionSecs) {
          // Mining session complete
          setState(prev => ({ ...prev, isMining: false, miningStartTime: null }));
        } else {
          // Increment balance based on per-second rate
          const ratePerSec = state.config.miningRatePerHour / 3600;
          setState(prev => ({
            ...prev,
            balance: prev.balance + ratePerSec
          }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isMining, state.miningStartTime, state.config.miningSessionMinutes, state.config.miningRatePerHour]);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const updateConfig = (newConfig: AppConfig) => {
    setState(prev => ({ ...prev, config: newConfig }));
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.MINING:
        return <MiningPage state={state} setState={setState} onLogoClick={handleLogoClick} />;
      case AppView.TASKS:
        return <TasksPage state={state} setState={setState} />;
      case AppView.REFERRALS:
        return <ReferralPage state={state} setState={setState} />;
      case AppView.WITHDRAWAL:
        return <WithdrawalPage state={state} setState={setState} />;
      case AppView.ADMIN:
        return <AdminPage state={state} setState={setState} onClose={() => setCurrentView(AppView.MINING)} />;
      default:
        return <MiningPage state={state} setState={setState} onLogoClick={handleLogoClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pb-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className={`fixed inset-0 transition-colors duration-1000 pointer-events-none opacity-20 ${
        currentView === AppView.MINING ? 'bg-blue-900' :
        currentView === AppView.TASKS ? 'bg-purple-900' :
        currentView === AppView.REFERRALS ? 'bg-pink-900' :
        currentView === AppView.WITHDRAWAL ? 'bg-teal-900' :
        'bg-gray-900'
      }`} />
      
      <main className="relative z-10 w-full max-w-md px-4 pt-6">
        {renderView()}
      </main>

      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;
