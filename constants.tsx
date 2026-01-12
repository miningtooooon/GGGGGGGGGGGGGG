
import React from 'react';

export const TON_LOGO_SVG = (className: string = "w-16 h-16") => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill="#0088CC"/>
    <path d="M68.5 35L31.5 50L68.5 65V35Z" fill="white"/>
    <path d="M47 35L31.5 50L47 65V35Z" fill="white" fillOpacity="0.7"/>
  </svg>
);

export const INITIAL_CONFIG = {
  miningSessionMinutes: 60,
  miningRatePerHour: 0.0001,
  minWithdrawal: 0.1,
  referralReward: 0.0001,
  taskReward: 0.0001,
  totalMembers: 12450
};

export const INITIAL_TASKS = [
  { id: '1', title: 'Watch Reward Ad', reward: 0.0001, type: 'ad' as const, completed: false },
  { id: '2', title: 'Follow Telegram Channel', reward: 0.0005, type: 'telegram' as const, completed: false },
  { id: '3', title: 'Watch Tutorial Video', reward: 0.0002, type: 'video' as const, completed: false },
  { id: '4', title: 'Visit Partner Site', reward: 0.0001, type: 'link' as const, completed: false },
];
