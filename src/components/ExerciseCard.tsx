import React from 'react';
import { Exercise, Option } from '../types/Exercise';
import { motion } from 'motion/react';
import { Check, X, Info } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  selectedIds: string[];
  onToggleOption: (id: string) => void;
  showResults: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  selectedIds, 
  onToggleOption,
  showResults
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-50 bg-indigo-50/30">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
            exercise.level === 'basic' ? 'bg-emerald-100 text-emerald-700' :
            exercise.level === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {exercise.level}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {exercise.situation}
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Selecciona los datos que consideres <span className="font-bold text-indigo-600">esenciales</span> para este caso.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {exercise.options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const isCorrect = option.isEssential;
          
          let statusClasses = "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30";
          if (showResults) {
            if (isCorrect && isSelected) statusClasses = "border-emerald-500 bg-emerald-50 text-emerald-700";
            else if (isCorrect && !isSelected) statusClasses = "border-emerald-200 bg-emerald-50/50 text-emerald-600 border-dashed";
            else if (!isCorrect && isSelected) statusClasses = "border-rose-500 bg-rose-50 text-rose-700";
            else statusClasses = "border-gray-100 opacity-50";
          } else if (isSelected) {
            statusClasses = "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100";
          }

          return (
            <button
              key={option.id}
              disabled={showResults}
              onClick={() => onToggleOption(option.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${statusClasses}`}
            >
              <span className="font-medium text-sm">{option.label}</span>
              {showResults && (
                <div className="shrink-0 ml-2">
                  {isCorrect ? (
                    <Check size={18} className={isSelected ? "text-emerald-600" : "text-emerald-400"} />
                  ) : isSelected ? (
                    <X size={18} className="text-rose-600" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!showResults && (
        <div className="px-6 pb-6">
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <Info className="text-amber-500 shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-amber-800 leading-relaxed italic">
              <span className="font-bold uppercase not-italic">Pista:</span> {exercise.pista}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
