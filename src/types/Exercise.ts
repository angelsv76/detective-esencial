export type Level = 'basic' | 'medium' | 'advanced';

export interface Option {
  id: string;
  label: string;
  isEssential: boolean;
}

export interface Exercise {
  id: string;
  level: Level;
  type: 'selection';
  situation: string;
  options: Option[];
  explanation: string;
  pista: string;
}
