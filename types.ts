
export enum AppView {
  MINING = 'MINING',
  TASKS = 'TASKS',
  REFERRALS = 'REFERRALS',
  WITHDRAWAL = 'WITHDRAWAL',
  ADMIN = 'ADMIN'
}

export enum AdminSubView {
  DASHBOARD = 'DASHBOARD',
  ECONOMY = 'ECONOMY',
  TASKS = 'TASKS',
  WITHDRAWALS = 'WITHDRAWALS',
  USERS = 'USERS'
}

export enum WithdrawalStatus {
  REVIEW = 'REVIEW',
  PAID = 'PAID',
  REJECTED = 'REJECTED'
}

export interface Withdrawal {
  id: string;
  amount: number;
  address: string;
  status: WithdrawalStatus;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  reward: number;
  type: 'ad' | 'video' | 'telegram' | 'link';
  completed: boolean;
}

export interface Referral {
  id: string;
  name: string;
  joinedDate: string;
  earned: number;
}

export interface AppConfig {
  miningSessionMinutes: number;
  miningRatePerHour: number;
  minWithdrawal: number;
  referralReward: number;
  taskReward: number;
  totalMembers: number;
}

export interface AppState {
  balance: number;
  isMining: boolean;
  miningStartTime: number | null;
  withdrawals: Withdrawal[];
  tasks: Task[];
  referrals: Referral[];
  config: AppConfig;
}
