import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface ResultPanelProps {
  isCorrect: boolean;
  explanation: string;
  points: number;
  onNext: () => void;
  onRetry: () => void;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ 
  isCorrect, 
  explanation, 
  points, 
  onNext,
  onRetry
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-6 rounded-2xl border-2 shadow-xl ${
        isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
      }`}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {isCorrect ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
        </div>
        <div>
          <h4 className={`text-xl font-black ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
            {isCorrect ? '¡Excelente Abstracción!' : '¡Sigue Intentando!'}
          </h4>
          <p className={`text-sm font-medium ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isCorrect ? `Has ganado ${points} puntos.` : 'Te faltaron algunos datos esenciales o seleccionaste irrelevantes.'}
          </p>
        </div>
      </div>

      <div className={`p-4 rounded-xl mb-8 border ${isCorrect ? 'bg-white/50 border-emerald-100 text-emerald-900' : 'bg-white/50 border-rose-100 text-rose-900'}`}>
        <p className="text-sm leading-relaxed italic">
          <span className="font-bold uppercase not-italic">Explicación:</span> {explanation}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {isCorrect ? (
          <button 
            onClick={onNext}
            className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
          >
            Siguiente Desafío <ArrowRight size={20} />
          </button>
        ) : (
          <button 
            onClick={onRetry}
            className="flex-1 py-4 bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-700 transition-colors shadow-lg shadow-rose-100"
          >
            Reintentar <RefreshCw size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
};
