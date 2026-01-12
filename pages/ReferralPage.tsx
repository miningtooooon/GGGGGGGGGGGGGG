
import React from 'react';
import { AppState, Referral } from '../types';

interface ReferralPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const ReferralPage: React.FC<ReferralPageProps> = ({ state, setState }) => {
  const referralLink = `https://t.me/TonMinerBot?start=user_${Math.floor(Math.random() * 90000) + 10000}`;

  const addFriend = () => {
    const names = ['Alex', 'Dmitry', 'Sarah', 'Ivan', 'Elena', 'Mark', 'Tobi'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newRef: Referral = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${randomName}_${Math.floor(Math.random() * 99)}`,
      joinedDate: new Date().toLocaleDateString(),
      earned: state.config.referralReward
    };

    setState(prev => ({
      ...prev,
      balance: prev.balance + state.config.referralReward,
      referrals: [newRef, ...prev.referrals]
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="animate-in slide-in-from-right duration-500 pb-8">
      <h1 className="text-3xl font-black text-pink-500 mb-2 uppercase italic tracking-tighter">Referrals</h1>
      <p className="text-gray-400 text-sm mb-8 font-medium">Invite friends and earn bonus TON for every registration.</p>

      <div className="glass rounded-[2.5rem] p-1 border border-white/5 mb-8">
        <img 
          src="https://picsum.photos/seed/tonmining/600/300" 
          alt="Referral Campaign" 
          className="w-full h-40 object-cover rounded-[2.2rem] opacity-80"
        />
        <div className="p-6 text-center">
          <h2 className="text-xl font-black mb-1">Invite & Earn</h2>
          <p className="text-pink-400 font-black text-sm mb-4">Earn {state.config.referralReward} TON per friend</p>
          
          <div className="flex gap-2">
            <div className="flex-1 glass border border-white/10 px-4 py-3 rounded-2xl text-xs font-mono truncate text-gray-400 flex items-center">
              {referralLink}
            </div>
            <button 
              onClick={copyToClipboard}
              className="bg-pink-600 p-3 rounded-2xl shadow-lg active:scale-90 transition-transform"
            >
              📋
            </button>
          </div>
          <button 
            onClick={addFriend}
            className="w-full mt-4 py-3 bg-white text-black font-black uppercase text-xs rounded-2xl tracking-widest hover:bg-pink-50 transition-colors"
          >
            Simulate New Referral
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-black text-sm uppercase tracking-widest text-gray-500">My Friends ({state.referrals.length})</h3>
          <p className="text-pink-500 font-black text-sm">Total: {(state.referrals.length * state.config.referralReward).toFixed(4)} TON</p>
        </div>

        {state.referrals.length === 0 ? (
          <div className="glass p-10 rounded-3xl border border-white/5 text-center">
            <p className="text-gray-500 font-bold">No friends yet. Start inviting!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {state.referrals.map(ref => (
              <div key={ref.id} className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-red-500 rounded-full flex items-center justify-center font-black text-white">
                    {ref.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">@{ref.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium">Joined {ref.joinedDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-pink-500 font-black text-xs">+{ref.earned} TON</p>
                  <p className="text-[8px] text-gray-500 uppercase font-bold">Bonus Paid</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralPage;
