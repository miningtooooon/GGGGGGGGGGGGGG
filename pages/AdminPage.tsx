
import React, { useState } from 'react';
import { AppState, AppConfig, WithdrawalStatus, Withdrawal, AdminSubView, Task } from '../types';

interface AdminPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onClose: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ state, setState, onClose }) => {
  const [activeTab, setActiveTab] = useState<AdminSubView>(AdminSubView.DASHBOARD);
  const [config, setConfig] = useState<AppConfig>(state.config);

  const saveConfig = () => {
    setState(prev => ({ ...prev, config }));
    alert('Global Economy Settings Updated!');
  };

  const updateWithdrawalStatus = (id: string, newStatus: WithdrawalStatus) => {
    setState(prev => ({
      ...prev,
      withdrawals: prev.withdrawals.map(w => w.id === id ? { ...w, status: newStatus } : w)
    }));
  };

  const deleteWithdrawal = (id: string) => {
    if (window.confirm('Delete this transaction record?')) {
      setState(prev => ({
        ...prev,
        withdrawals: prev.withdrawals.filter(w => w.id !== id)
      }));
    }
  };

  const addTask = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Custom Task',
      reward: 0.0001,
      type: 'link',
      completed: false
    };
    setState(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  };

  const deleteTask = (id: string) => {
    if (window.confirm('Delete this task?')) {
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== id)
      }));
    }
  };

  const clearReferrals = () => {
    if (window.confirm('Wipe all referral data? This cannot be undone.')) {
      setState(prev => ({ ...prev, referrals: [] }));
    }
  };

  const getStatusColor = (status: WithdrawalStatus) => {
    switch (status) {
      case WithdrawalStatus.REVIEW: return 'text-yellow-500';
      case WithdrawalStatus.PAID: return 'text-green-500';
      case WithdrawalStatus.REJECTED: return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom duration-500 h-full pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-yellow-500 uppercase tracking-tighter leading-none">Command Center</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Full Bot Authority</p>
        </div>
        <button 
          onClick={onClose} 
          className="bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest"
        >
          Close Panel
        </button>
      </div>

      {/* Sub-Navigation */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
        {[
          { id: AdminSubView.DASHBOARD, label: 'Stats', icon: '📊' },
          { id: AdminSubView.ECONOMY, label: 'Economy', icon: '💎' },
          { id: AdminSubView.TASKS, label: 'Tasks', icon: '📋' },
          { id: AdminSubView.WITHDRAWALS, label: 'Payouts', icon: '💸' },
          { id: AdminSubView.USERS, label: 'Users', icon: '👥' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
              : 'glass text-gray-400 border border-white/5'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === AdminSubView.DASHBOARD && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-5 rounded-3xl border border-white/5 text-center">
                <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Total Users</p>
                <p className="text-3xl font-black">{config.totalMembers.toLocaleString()}</p>
              </div>
              <div className="glass p-5 rounded-3xl border border-white/5 text-center">
                <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Total Paid</p>
                <p className="text-3xl font-black text-green-400">102.4</p>
              </div>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/10">
              <h3 className="text-xs font-black uppercase text-gray-500 mb-4">Real-time Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-400">Active Mining Sessions</span>
                  <span className="text-blue-400">1,420 Users</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[65%]" />
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-400">Daily Task Completions</span>
                  <span className="text-purple-400">8,922</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[40%]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ECONOMY TAB */}
        {activeTab === AdminSubView.ECONOMY && (
          <div className="glass p-6 rounded-3xl border border-white/10 animate-in slide-in-from-right duration-300">
            <h3 className="text-sm font-black uppercase text-yellow-500 mb-6 flex items-center gap-2">
              <span>⚙️</span> Global Parameters
            </h3>
            <div className="space-y-5">
              {[
                { label: 'Mining Session (Minutes)', key: 'miningSessionMinutes', step: 1 },
                { label: 'Hourly Mining Rate (TON)', key: 'miningRatePerHour', step: 0.0001 },
                { label: 'Min. Withdrawal (TON)', key: 'minWithdrawal', step: 0.1 },
                { label: 'Referral Bonus (TON)', key: 'referralReward', step: 0.0001 },
                { label: 'Simulated User Count', key: 'totalMembers', step: 1 },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-1">{field.label}</label>
                  <input 
                    type="number"
                    step={field.step}
                    value={config[field.key as keyof AppConfig]}
                    onChange={e => setConfig({ ...config, [field.key]: parseFloat(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mt-1 outline-none font-bold text-sm focus:border-yellow-500/40"
                  />
                </div>
              ))}
              <button 
                onClick={saveConfig}
                className="w-full bg-yellow-500 text-black font-black uppercase py-4 rounded-2xl text-xs tracking-widest shadow-xl active:scale-95 transition-all mt-4"
              >
                Sync Economy Data
              </button>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === AdminSubView.TASKS && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xs font-black uppercase text-gray-500 tracking-widest">Active Task Manager</h3>
              <button 
                onClick={addTask}
                className="bg-blue-500 text-white p-2 rounded-xl text-[10px] font-black uppercase"
              >
                + New Task
              </button>
            </div>
            {state.tasks.map(task => (
              <div key={task.id} className="glass p-5 rounded-3xl border border-white/5 relative group">
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                <div className="space-y-3">
                  <input 
                    value={task.title}
                    onChange={e => updateTask(task.id, { title: e.target.value })}
                    className="bg-transparent font-black text-lg w-full outline-none focus:text-blue-400"
                  />
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Reward</p>
                      <input 
                        type="number"
                        step="0.0001"
                        value={task.reward}
                        onChange={e => updateTask(task.id, { reward: parseFloat(e.target.value) })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[8px] text-gray-500 font-black uppercase mb-1">Category</p>
                      <select 
                        value={task.type}
                        onChange={e => updateTask(task.id, { type: e.target.value as any })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                      >
                        <option value="ad">Ad</option>
                        <option value="video">Video</option>
                        <option value="telegram">Telegram</option>
                        <option value="link">Link</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WITHDRAWALS TAB */}
        {activeTab === AdminSubView.WITHDRAWALS && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-xs font-black uppercase text-gray-500 tracking-widest px-2">Transaction Queue</h3>
            {state.withdrawals.length === 0 ? (
              <div className="glass p-10 rounded-3xl text-center border border-dashed border-white/10">
                <p className="text-gray-500 font-bold text-xs uppercase">No Payout Requests</p>
              </div>
            ) : (
              state.withdrawals.map(w => (
                <div key={w.id} className="glass p-5 rounded-3xl border border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xl font-black">{w.amount} <span className="text-xs text-blue-400">TON</span></p>
                      <p className="text-[9px] font-mono text-gray-500 mt-1 max-w-[150px] truncate">{w.address}</p>
                    </div>
                    <div className="text-right">
                       <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg bg-white/5 border border-white/10 ${getStatusColor(w.status)}`}>
                         {w.status}
                       </span>
                       <p className="text-[8px] text-gray-600 font-bold mt-1">{w.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateWithdrawalStatus(w.id, WithdrawalStatus.PAID)}
                      className="flex-1 bg-green-500 text-black py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateWithdrawalStatus(w.id, WithdrawalStatus.REJECTED)}
                      className="flex-1 bg-red-500/10 text-red-500 border border-red-500/30 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => deleteWithdrawal(w.id)}
                      className="bg-white/5 text-gray-400 w-10 h-10 flex items-center justify-center rounded-xl border border-white/10"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === AdminSubView.USERS && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xs font-black uppercase text-gray-500 tracking-widest">Registered Members</h3>
              <button 
                onClick={clearReferrals}
                className="text-red-500 text-[10px] font-black uppercase bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
              >
                Clear Data
              </button>
            </div>
            
            <div className="glass p-4 rounded-3xl border border-white/5 divide-y divide-white/5">
              {state.referrals.length === 0 ? (
                <p className="text-center text-gray-500 text-xs py-10 font-bold uppercase">No User Database Found</p>
              ) : (
                state.referrals.map(u => (
                  <div key={u.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center font-black text-yellow-500 text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black">@{u.name}</p>
                        <p className="text-[8px] text-gray-600 font-bold">Member since {u.joinedDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-blue-400">Earned {u.earned} TON</p>
                      <p className="text-[8px] text-gray-500 uppercase font-bold">Active Status</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
