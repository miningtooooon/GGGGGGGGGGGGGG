
import React, { useState } from 'react';
import { AppState, WithdrawalStatus, Withdrawal } from '../types';

interface WithdrawalPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const WithdrawalPage: React.FC<WithdrawalPageProps> = ({ state, setState }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (!address || isNaN(val)) {
      alert('Please enter a valid address and amount.');
      return;
    }
    if (val < state.config.minWithdrawal) {
      alert(`Minimum withdrawal is ${state.config.minWithdrawal} TON`);
      return;
    }
    if (val > state.balance) {
      alert('Insufficient balance');
      return;
    }

    const newWithdrawal: Withdrawal = {
      id: Math.random().toString(36).substr(2, 9),
      amount: val,
      address,
      status: WithdrawalStatus.REVIEW,
      date: new Date().toLocaleString()
    };

    setState(prev => ({
      ...prev,
      balance: prev.balance - val,
      withdrawals: [newWithdrawal, ...prev.withdrawals].slice(0, 10) // Keep last 10
    }));

    setAmount('');
    alert('Withdrawal request submitted! Our team will review it shortly.');
  };

  const getStatusColor = (status: WithdrawalStatus) => {
    switch (status) {
      case WithdrawalStatus.REVIEW: return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case WithdrawalStatus.PAID: return 'bg-green-500/20 text-green-500 border-green-500/30';
      case WithdrawalStatus.REJECTED: return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500 pb-8">
      <h1 className="text-3xl font-black text-teal-400 mb-2 uppercase italic tracking-tighter">My Wallet</h1>
      <p className="text-gray-400 text-sm mb-8 font-medium">Manage your earnings and withdraw TON to your personal wallet.</p>

      <div className="glass p-8 rounded-[2.5rem] border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.9 6 10 6.9 10 8V16C10 17.1 10.9 18 12 18H21M12 16H22V8H12V16M16 13.5C15.2 13.5 14.5 12.8 14.5 12C14.5 11.2 15.2 10.5 16 10.5C16.8 10.5 17.5 11.2 17.5 12C17.5 12.8 16.8 13.5 16 13.5Z"/></svg>
        </div>
        <p className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">Available to Withdraw</p>
        <h2 className="text-4xl font-black mb-8">{state.balance.toFixed(8)} <span className="text-xl text-teal-400">TON</span></h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase ml-2 mb-1 block">TON Address</label>
            <input 
              type="text" 
              placeholder="EQB..." 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-teal-500/50 transition-colors text-sm font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase ml-2 mb-1 block">Amount (Min {state.config.minWithdrawal})</label>
            <input 
              type="number" 
              placeholder="0.0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-teal-500/50 transition-colors text-sm font-mono"
            />
          </div>
          <button 
            onClick={handleWithdraw}
            className="w-full py-4 bg-teal-500 text-black font-black uppercase text-sm rounded-2xl tracking-widest active:scale-95 transition-all shadow-lg shadow-teal-500/20"
          >
            Request Withdrawal
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-sm uppercase tracking-widest text-gray-500 px-2">History</h3>
        {state.withdrawals.length === 0 ? (
          <div className="glass p-10 rounded-3xl border border-white/5 text-center">
            <p className="text-gray-500 font-bold">No transactions found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {state.withdrawals.map(w => (
              <div key={w.id} className="glass p-4 rounded-2xl border border-white/5 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="font-black text-sm">{w.amount.toFixed(4)} TON</p>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${getStatusColor(w.status)}`}>
                    {w.status}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-[9px] font-mono text-gray-500 max-w-[180px] truncate">{w.address}</p>
                  <p className="text-[9px] text-gray-600 font-bold">{w.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalPage;
