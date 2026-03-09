import React from 'react';
import { Brain, Search, Trophy } from 'lucide-react';

interface HeaderProps {
  score: number;
  level: string;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ score, level, onReset }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Search className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Detective de lo Esencial</h1>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Laboratorio de Abstracción</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Nivel Actual</span>
            <span className="text-xs font-bold text-gray-700 capitalize">{level}</span>
          </div>
          <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 flex items-center gap-2">
            <Trophy className="text-amber-500" size={16} />
            <span className="text-sm font-black text-gray-900">{score} pts</span>
          </div>
        </div>
      </div>
    </header>
  );
};
