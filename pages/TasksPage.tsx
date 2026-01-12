
import React from 'react';
import { AppState, Task } from '../types';

interface TasksPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const TasksPage: React.FC<TasksPageProps> = ({ state, setState }) => {
  const completeTask = (taskId: string) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    // Simulate task processing
    const confirm = window.confirm(`Processing task: ${task.title}. Reward will be credited after validation.`);
    if (confirm) {
      setState(prev => ({
        ...prev,
        balance: prev.balance + task.reward,
        tasks: prev.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t)
      }));
      alert(`Earned ${task.reward} TON!`);
    }
  };

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'ad': return '📺';
      case 'telegram': return '✈️';
      case 'video': return '🎥';
      case 'link': return '🔗';
      default: return '✅';
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <h1 className="text-3xl font-black text-purple-400 mb-2 uppercase italic tracking-tighter">Daily Tasks</h1>
      <p className="text-gray-400 text-sm mb-8 font-medium">Complete tasks to boost your TON balance instantly.</p>

      <div className="space-y-4">
        {state.tasks.map(task => (
          <div 
            key={task.id} 
            className={`glass p-5 rounded-3xl border flex items-center justify-between group transition-all duration-300 ${
              task.completed ? 'opacity-50 border-white/5' : 'border-purple-500/20 hover:border-purple-500/40 bg-purple-900/10'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl bg-purple-500/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                {getTaskIcon(task.type)}
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-purple-400 font-black text-sm">+{task.reward} TON</span>
                  <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full uppercase text-gray-500 font-bold">{task.type}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => completeTask(task.id)}
              disabled={task.completed}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                task.completed 
                ? 'bg-gray-800 text-gray-600 border border-white/5' 
                : 'bg-purple-600 text-white shadow-lg shadow-purple-900/20 active:scale-95'
              }`}
            >
              {task.completed ? 'Done' : 'Claim'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 glass p-6 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <h3 className="text-lg font-black mb-2 flex items-center gap-2">
          <span>🔥</span> PREMIUM OFFERS
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed font-medium">
          New high-paying tasks arrive every 24 hours. Keep mining and checking back to maximize your earnings!
        </p>
      </div>
    </div>
  );
};

export default TasksPage;
