import { Exercise, Level, Option } from '../types/Exercise';
import { EXERCISE_TEMPLATES } from '../data/exercises';

export const generateExercise = (level: Level): Exercise => {
  const templates = EXERCISE_TEMPLATES[level];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  const options: Option[] = [
    ...template.essential.map(label => ({
      id: Math.random().toString(36).substr(2, 9),
      label,
      isEssential: true
    })),
    ...template.irrelevant.map(label => ({
      id: Math.random().toString(36).substr(2, 9),
      label,
      isEssential: false
    }))
  ];

  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    level,
    type: 'selection',
    situation: template.situation,
    options,
    explanation: template.explanation,
    pista: template.pista
  };
};
