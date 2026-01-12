
import React, { useState, useEffect } from 'react';
import { AppState, AppView } from '../types';
import { TON_LOGO_SVG } from '../constants';

interface MiningPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onLogoClick: () => void;
}

const MiningPage: React.FC<MiningPageProps> = ({ state, setState, onLogoClick }) => {
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

  useEffect(() => {
    if (state.isMining && state.miningStartTime) {
      const updateTimer = () => {
        const now = Date.now();
        const durationMs = state.config.miningSessionMinutes * 60 * 1000;
        const elapsed = now - state.miningStartTime!;
        const remaining = Math.max(0, durationMs - elapsed);

        if (remaining === 0) {
          setTimeLeft('00:00:00');
        } else {
          const h = Math.floor(remaining / 3600000);
          const m = Math.floor((remaining % 3600000) / 60000);
          const s = Math.floor((remaining % 60000) / 1000);
          setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }
      };

      const timer = setInterval(updateTimer, 1000);
      updateTimer();
      return () => clearInterval(timer);
    } else {
      setTimeLeft('00:00:00');
    }
  }, [state.isMining, state.miningStartTime, state.config.miningSessionMinutes]);

  const startMining = () => {
    if (!state.isMining) {
      setState(prev => ({
        ...prev,
        isMining: true,
        miningStartTime: Date.now()
      }));
    }
  };

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-700">
      <div className="w-full flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-400">TON MINER</h1>
          <p className="text-gray-400 text-sm font-medium">Cloud Mining Session</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Balance</p>
          <p className="text-2xl font-black text-white">{state.balance.toFixed(8)} <span className="text-blue-500">TON</span></p>
        </div>
      </div>

      <div className="relative mt-8 group">
        {/* Pulsating Ring */}
        <div 
          onClick={onLogoClick}
          className={`w-64 h-64 rounded-full flex items-center justify-center cursor-pointer transition-all duration-1000 ${
            state.isMining ? 'animate-pulsate' : 'opacity-60 grayscale'
          }`}
          style={{ 
            background: 'radial-gradient(circle, rgba(0,163,255,0.2) 0%, rgba(0,0,0,0) 70%)' 
          }}
        >
          <div className="bg-blue-600/20 p-8 rounded-full border-4 border-blue-500/30 backdrop-blur-xl">
             {TON_LOGO_SVG("w-32 h-32 drop-shadow-[0_0_15px_rgba(0,163,255,0.8)]")}
          </div>
        </div>
        
        {state.isMining && (
          <div className="absolute -top-4 -right-4 glass px-3 py-1 rounded-full border border-blue-400/30">
            <span className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              MINING ACTIVE
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-12">
        <div className="glass p-5 rounded-3xl border border-white/5">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Session Timer</p>
          <p className="text-2xl font-black tracking-tighter font-mono">{timeLeft}</p>
        </div>
        <div className="glass p-5 rounded-3xl border border-white/5">
          <p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Hourly Profit</p>
          <p className="text-2xl font-black tracking-tighter">{state.config.miningRatePerHour.toFixed(4)} <span className="text-sm text-blue-400">TON</span></p>
        </div>
      </div>

      <button
        onClick={startMining}
        disabled={state.isMining}
        className={`w-full mt-8 py-5 rounded-3xl text-xl font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-xl ${
          state.isMining 
          ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5' 
          : 'ton-gradient text-white hover:shadow-blue-500/20 border-b-4 border-blue-700'
        }`}
      >
        {state.isMining ? 'Mining in Progress...' : 'Start Mining'}
      </button>

      <div className="mt-8 glass p-4 rounded-2xl border border-white/5 w-full">
         <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest">Global Statistics</p>
         <div className="flex justify-around mt-2">
            <div className="text-center">
              <p className="text-sm font-bold">{state.config.totalMembers.toLocaleString()}</p>
              <p className="text-[8px] text-gray-500 uppercase">Users</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">14.5K</p>
              <p className="text-[8px] text-gray-500 uppercase">Active</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">102.4 TON</p>
              <p className="text-[8px] text-gray-500 uppercase">Paid Out</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MiningPage;
