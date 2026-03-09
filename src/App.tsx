import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Search, 
  Trophy, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Lightbulb,
  Play,
  BookOpen,
  Target,
  RefreshCw,
  Sparkles,
  User,
  IdCard,
  Hash,
  Download,
  FileText
} from 'lucide-react';

import { Header } from './components/Header';
import { ExerciseCard } from './components/ExerciseCard';
import { ResultPanel } from './components/ResultPanel';
import { generateExercise } from './logic/generateExercise';
import { generatePDF } from './logic/generatePDF';
import { Exercise, Level } from './types/Exercise';

type Screen = 'welcome' | 'registration' | 'learning' | 'levelSelection' | 'challenge' | 'summary';

const CLASS_CODES = [
  "MA1B", "ITSI1A", "MA1A", "MA1E", "MA1F", "DS1A", "DS1D", 
  "MA1G", "MA1H", "MI1A", "MI1B", "DS1B", "ITSI2A", "ITSI3A"
];

export default function App() {
  // App State
  const [screen, setScreen] = useState<Screen>('welcome');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<Level>('basic');
  
  // Student State
  const [student, setStudent] = useState({
    name: '',
    nie: '',
    classCode: ''
  });
  
  // Exercise State
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);

  // Initialize first exercise
  useEffect(() => {
    if (screen === 'challenge' && !currentExercise) {
      setCurrentExercise(generateExercise(level));
    }
  }, [screen, currentExercise, level]);

  const handleStart = () => setScreen('registration');
  const handleGoToLearning = () => {
    if (!student.name || !student.nie || !student.classCode) {
      alert("Por favor completa todos los campos.");
      return;
    }
    setScreen('learning');
  };
  const handleGoToLevelSelection = () => setScreen('levelSelection');
  const handleSelectLevel = (selectedLevel: Level) => {
    setLevel(selectedLevel);
    setScreen('challenge');
  };
  const handleGoToChallenge = () => setScreen('challenge');
  
  const handleToggleOption = (id: string) => {
    if (showResults) return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleEvaluate = () => {
    if (!currentExercise) return;
    
    const essentialIds = currentExercise.options
      .filter(o => o.isEssential)
      .map(o => o.id);
    
    const irrelevantIds = currentExercise.options
      .filter(o => !o.isEssential)
      .map(o => o.id);

    const allEssentialSelected = essentialIds.every(id => selectedIds.includes(id));
    const noIrrelevantSelected = irrelevantIds.every(id => !selectedIds.includes(id));
    const sameCount = essentialIds.length === selectedIds.length;

    const correct = allEssentialSelected && noIrrelevantSelected && sameCount;
    
    setIsCorrect(correct);
    setShowResults(true);
    
    if (correct) {
      const points = level === 'basic' ? 14 : level === 'medium' ? 18 : 20;
      setScore(prev => prev + points);
      setExercisesCompleted(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (exercisesCompleted >= 5) {
      setScreen('summary');
      return;
    }

    setCurrentExercise(generateExercise(level));
    setSelectedIds([]);
    setShowResults(false);
  };

  const handleRetry = () => {
    setSelectedIds([]);
    setShowResults(false);
  };

  const resetApp = () => {
    setScreen('welcome');
    setScore(0);
    setLevel('basic');
    setExercisesCompleted(0);
    setCurrentExercise(null);
    setSelectedIds([]);
    setShowResults(false);
    setStudent({ name: '', nie: '', classCode: '' });
  };

  const handleDownloadPDF = () => {
    generatePDF(student, score, level, exercisesCompleted);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header score={score} level={level} onReset={resetApp} />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {/* WELCOME SCREEN */}
          {screen === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12 text-center"
            >
              <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-200">
                <Search className="text-white" size={48} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 font-display">Detective de lo Esencial</h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
                Aprende a dominar la <span className="text-indigo-600 font-bold">Abstracción</span>: el superpoder de identificar lo importante y descartar el ruido.
              </p>
              <button onClick={handleStart} className="btn-primary mx-auto text-lg px-10 py-4">
                Comenzar Misión <Play size={20} />
              </button>
            </motion.div>
          )}

          {/* REGISTRATION SCREEN */}
          {screen === 'registration' && (
            <motion.div 
              key="registration"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-indigo-100 p-3 rounded-2xl">
                    <User className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Identificación</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Datos del Detective</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <IdCard size={16} className="text-indigo-400" /> Nombre Completo
                    </label>
                    <input 
                      type="text"
                      value={student.name}
                      onChange={(e) => setStudent(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Escribe tu nombre aquí..."
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Hash size={16} className="text-indigo-400" /> NIE
                    </label>
                    <input 
                      type="text"
                      value={student.nie}
                      onChange={(e) => setStudent(prev => ({ ...prev, nie: e.target.value }))}
                      placeholder="Tu número de NIE..."
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Target size={16} className="text-indigo-400" /> Código de Clase
                    </label>
                    <select 
                      value={student.classCode}
                      onChange={(e) => setStudent(prev => ({ ...prev, classCode: e.target.value }))}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium appearance-none"
                    >
                      <option value="">Selecciona tu código...</option>
                      {CLASS_CODES.map(code => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleGoToLearning}
                  className="btn-primary w-full mt-10 py-5 text-lg"
                >
                  Continuar <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* LEARNING SCREEN */}
          {screen === 'learning' && (
            <motion.div 
              key="learning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-indigo-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-900">¿Qué es la Abstracción?</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  En computación, la <strong>abstracción</strong> consiste en simplificar un problema complejo enfocándose solo en los detalles que realmente importan para resolverlo.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                      <Target size={18} /> Lo Esencial
                    </h4>
                    <p className="text-sm text-indigo-800">Información crítica sin la cual el proceso no funciona.</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2 text-xs font-medium text-indigo-700">
                        <CheckCircle2 size={14} /> Ingredientes (Sándwich)
                      </li>
                      <li className="flex items-center gap-2 text-xs font-medium text-indigo-700">
                        <CheckCircle2 size={14} /> Destino (GPS)
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Info size={18} /> Lo Irrelevante
                    </h4>
                    <p className="text-sm text-slate-600">Detalles que, aunque existen, no cambian el resultado final.</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <XCircle size={14} className="opacity-50" /> Color del plato
                      </li>
                      <li className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <XCircle size={14} className="opacity-50" /> Marca de los zapatos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button onClick={handleGoToLevelSelection} className="btn-primary w-full py-5 text-lg">
                Elegir Nivel de Desafío <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* LEVEL SELECTION SCREEN */}
          {screen === 'levelSelection' && (
            <motion.div 
              key="levelSelection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8 py-8"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2 font-display">Selecciona tu Nivel</h2>
                <p className="text-gray-500">Cada nivel tiene una puntuación máxima diferente.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'basic', label: 'Básico', max: 70, color: 'emerald', icon: <CheckCircle2 size={32} />, desc: 'Conceptos fundamentales de abstracción.' },
                  { id: 'medium', label: 'Medio', max: 90, color: 'amber', icon: <Lightbulb size={32} />, desc: 'Situaciones cotidianas con más variables.' },
                  { id: 'advanced', label: 'Avanzado', max: 100, color: 'rose', icon: <Brain size={32} />, desc: 'Sistemas complejos y pensamiento crítico.' }
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleSelectLevel(l.id as Level)}
                    className={`p-8 rounded-3xl border-2 text-left transition-all hover:scale-105 flex flex-col items-center text-center group
                      ${l.id === 'basic' ? 'border-emerald-100 bg-white hover:border-emerald-500' : 
                        l.id === 'medium' ? 'border-amber-100 bg-white hover:border-amber-500' : 
                        'border-rose-100 bg-white hover:border-rose-500'}`}
                  >
                    <div className={`mb-6 p-4 rounded-2xl ${
                      l.id === 'basic' ? 'bg-emerald-50 text-emerald-600' : 
                      l.id === 'medium' ? 'bg-amber-50 text-amber-600' : 
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {l.icon}
                    </div>
                    <h3 className="text-xl font-black mb-2">{l.label}</h3>
                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">{l.desc}</p>
                    <div className={`mt-auto px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      l.id === 'basic' ? 'bg-emerald-100 text-emerald-700' : 
                      l.id === 'medium' ? 'bg-amber-100 text-amber-700' : 
                      'bg-rose-100 text-rose-700'
                    }`}>
                      Máximo: {l.max} pts
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CHALLENGE SCREEN */}
          {screen === 'challenge' && currentExercise && (
            <motion.div 
              key="challenge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <Sparkles size={18} /> Desafío {exercisesCompleted + 1}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Progreso: {Math.round((exercisesCompleted / 6) * 100)}%
                </div>
              </div>

              <ExerciseCard 
                exercise={currentExercise}
                selectedIds={selectedIds}
                onToggleOption={handleToggleOption}
                showResults={showResults}
              />

              {!showResults ? (
                <button 
                  disabled={selectedIds.length === 0}
                  onClick={handleEvaluate}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl ${
                    selectedIds.length > 0 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Verificar Abstracción
                </button>
              ) : (
                <ResultPanel 
                  isCorrect={isCorrect}
                  explanation={currentExercise.explanation}
                  points={level === 'basic' ? 10 : level === 'medium' ? 20 : 30}
                  onNext={handleNext}
                  onRetry={handleRetry}
                />
              )}
            </motion.div>
          )}

          {/* SUMMARY SCREEN */}
          {screen === 'summary' && (
            <motion.div 
              key="summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-amber-200">
                <Trophy className="text-amber-600" size={64} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 font-display">¡Misión Cumplida!</h2>
              <p className="text-lg text-gray-600 mb-10">
                Has demostrado ser un excelente <span className="text-indigo-600 font-bold">Detective de lo Esencial</span>.
              </p>
              
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-sm mx-auto mb-10">
                <div className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-widest">Puntaje Final</div>
                <div className="text-6xl font-black text-indigo-600">{score}</div>
                <div className="text-xs font-bold text-indigo-400 mt-2 uppercase">
                  Puntos de Abstracción ({level === 'basic' ? 'Máx 70' : level === 'medium' ? 'Máx 90' : 'Máx 100'})
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button onClick={handleDownloadPDF} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                  <Download size={20} /> Descargar Reporte PDF
                </button>
                <button onClick={resetApp} className="flex-1 py-4 bg-white text-gray-600 border-2 border-gray-100 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <RefreshCw size={20} /> Reiniciar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-8 text-center text-gray-400 text-xs font-medium">
        <p>© 2026 Detective de lo Esencial – Pensamiento Computacional</p>
      </footer>
    </div>
  );
}

// Helper icons for ResultPanel (XCircle is missing in some imports)
const XCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
