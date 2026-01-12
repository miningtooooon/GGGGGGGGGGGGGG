
import React, { useState } from 'react';
import { AppState, AppConfig, WithdrawalStatus, Withdrawal } from '../types';

interface AdminPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onClose: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ state, setState, onClose }) => {
  const [config, setConfig] = useState<AppConfig>(state.config);

  const saveConfig = () => {
    setState(prev => ({ ...prev, config }));
    alert('Configuration saved successfully!');
  };

  const updateWithdrawalStatus = (id: string, newStatus: WithdrawalStatus) => {
    setState(prev => ({
      ...prev,
      withdrawals: prev.withdrawals.map(w => w.id === id ? { ...w, status: newStatus } : w)
    }));
  };

  return (
    <div className="animate-in slide-in-from-bottom duration-500 h-full pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-yellow-500 uppercase tracking-tighter">Control Panel</h1>
        <button onClick={onClose} className="bg-red-500/20 text-red-500 p-2 rounded-xl font-bold text-xs uppercase">Exit Admin</button>
      </div>

      <div className="space-y-6">
        {/* Statistics Section */}
        <section className="glass p-6 rounded-3xl border border-white/10">
          <h3 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-widest">Global Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Members</p>
              <input 
                type="number"
                value={config.totalMembers}
                onChange={e => setConfig({ ...config, totalMembers: parseInt(e.target.value) })}
                className="bg-transparent text-xl font-black w-full outline-none"
              />
            </div>
            <div className="bg-white/5 p-4 rounded-2xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Referrals</p>
              <p className="text-xl font-black">{state.referrals.length}</p>
            </div>
          </div>
        </section>

        {/* Mining Settings */}
        <section className="glass p-6 rounded-3xl border border-white/10">
          <h3 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-widest">Economy Config</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Mining Duration (Mins)</label>
              <input 
                type="number"
                value={config.miningSessionMinutes}
                onChange={e => setConfig({ ...config, miningSessionMinutes: parseFloat(e.target.value) })}
                className="w-full bg-white/5 rounded-xl px-4 py-3 mt-1 outline-none font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Profit per Session (TON)</label>
              <input 
                type="number"
                step="0.0001"
                value={config.miningRatePerHour}
                onChange={e => setConfig({ ...config, miningRatePerHour: parseFloat(e.target.value) })}
                className="w-full bg-white/5 rounded-xl px-4 py-3 mt-1 outline-none font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Referral Reward (TON)</label>
              <input 
                type="number"
                step="0.0001"
                value={config.referralReward}
                onChange={e => setConfig({ ...config, referralReward: parseFloat(e.target.value) })}
                className="w-full bg-white/5 rounded-xl px-4 py-3 mt-1 outline-none font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Min. Withdrawal (TON)</label>
              <input 
                type="number"
                step="0.1"
                value={config.minWithdrawal}
                onChange={e => setConfig({ ...config, minWithdrawal: parseFloat(e.target.value) })}
                className="w-full bg-white/5 rounded-xl px-4 py-3 mt-1 outline-none font-bold"
              />
            </div>
            <button 
              onClick={saveConfig}
              className="w-full bg-yellow-500 text-black font-black uppercase py-3 rounded-xl text-xs tracking-widest shadow-lg active:scale-95 transition-all mt-4"
            >
              Update Settings
            </button>
          </div>
        </section>

        {/* Withdrawal Management */}
        <section className="glass p-6 rounded-3xl border border-white/10">
          <h3 className="text-xs font-black uppercase text-gray-500 mb-4 tracking-widest">Withdrawal Management</h3>
          <div className="space-y-4">
            {state.withdrawals.length === 0 ? (
              <p className="text-center text-gray-500 text-xs font-bold py-4">No active requests.</p>
            ) : (
              state.withdrawals.map(w => (
                <div key={w.id} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-black text-sm">{w.amount} TON</p>
                      <p className="text-[8px] font-mono text-gray-500 truncate w-32">{w.address}</p>
                    </div>
                    <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded text-gray-400 font-black">{w.status}</span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => updateWithdrawalStatus(w.id, WithdrawalStatus.PAID)}
                      className="flex-1 bg-green-500/20 text-green-500 py-1.5 rounded-lg text-[9px] font-black uppercase"
                    >
                      Paid
                    </button>
                    <button 
                      onClick={() => updateWithdrawalStatus(w.id, WithdrawalStatus.REVIEW)}
                      className="flex-1 bg-yellow-500/20 text-yellow-500 py-1.5 rounded-lg text-[9px] font-black uppercase"
                    >
                      Review
                    </button>
                    <button 
                      onClick={() => updateWithdrawalStatus(w.id, WithdrawalStatus.REJECTED)}
                      className="flex-1 bg-red-500/20 text-red-500 py-1.5 rounded-lg text-[9px] font-black uppercase"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
