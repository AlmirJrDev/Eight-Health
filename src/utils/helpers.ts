
import { NaturalRemedy, RoutineActivity } from '../types';

export const generateDefaultRoutine = (selectedRemedies: NaturalRemedy[]): RoutineActivity[] => {
  const routine: RoutineActivity[] = [];

  if (selectedRemedies.includes('water')) {
    routine.push({
      id: '',
      time: '06:30',
      name: 'Beber 300ml de água ao acordar',
      remedyType: 'water',
      completed: false,
      description: 'Hidratar o corpo logo pela manhã'
    });
    
    routine.push({
      id: '',
      time: '10:00',
      name: 'Beber 300ml de água',
      remedyType: 'water',
      completed: false
    });
    
    routine.push({
      id: '',
      time: '13:00',
      name: 'Beber 300ml de água durante o almoço',
      remedyType: 'water',
      completed: false
    });
    
    routine.push({
      id: '',
      time: '16:00',
      name: 'Beber 300ml de água',
      remedyType: 'water',
      completed: false
    });
    
    routine.push({
      id: '',
      time: '19:00',
      name: 'Beber 300ml de água durante o jantar',
      remedyType: 'water',
      completed: false
    });
  }

  if (selectedRemedies.includes('exercise')) {
    routine.push({
      id: '',
      time: '07:00',
      name: 'Exercício matinal (30 min)',
      remedyType: 'exercise',
      completed: false,
      description: 'Caminhada, alongamento ou exercícios leves'
    });
    
    routine.push({
      id: '',
      time: '17:00',
      name: 'Exercício da tarde (30 min)',
      remedyType: 'exercise',
      completed: false,
      description: 'Atividade física mais intensa'
    });
  }

  if (selectedRemedies.includes('rest')) {
    routine.push({
      id: '',
      time: '22:00',
      name: 'Preparação para dormir',
      remedyType: 'rest',
      completed: false,
      description: 'Desligar eletrônicos e preparar para um sono reparador'
    });
    
    routine.push({
      id: '',
      time: '22:30',
      name: 'Hora de dormir',
      remedyType: 'rest',
      completed: false,
      description: 'Dormir para garantir 7-8 horas de sono'
    });
  }

  if (selectedRemedies.includes('sunlight')) {
    routine.push({
      id: '',
      time: '08:00',
      name: 'Exposição matinal ao sol (15 min)',
      remedyType: 'sunlight',
      completed: false,
      description: 'Obter vitamina D e regular o ritmo circadiano'
    });
  }

  if (selectedRemedies.includes('temperance')) {
    routine.push({
      id: '',
      time: '14:00',
      name: 'Pausa para relaxamento (10 min)',
      remedyType: 'temperance',
      completed: false,
      description: 'Pausa para regulação emocional e equilíbrio'
    });
    
    routine.push({
      id: '',
      time: '20:00',
      name: 'Evitar alimentos pesados/estimulantes',
      remedyType: 'temperance',
      completed: false
    });
  }

  if (selectedRemedies.includes('air')) {
    routine.push({
      id: '',
      time: '07:30',
      name: 'Respiração profunda ao ar livre (5 min)',
      remedyType: 'air',
      completed: false
    });
    
    routine.push({
      id: '',
      time: '18:00',
      name: 'Respiração profunda ao ar livre (5 min)',
      remedyType: 'air',
      completed: false
    });
  }

  if (selectedRemedies.includes('nutrition')) {
    routine.push({
      id: '',
      time: '07:45',
      name: 'Café da manhã nutritivo',
      remedyType: 'nutrition',
      completed: false,
      description: 'Frutas, cereais integrais, proteínas magras'
    });
    
    routine.push({
      id: '',
      time: '12:30',
      name: 'Almoço equilibrado',
      remedyType: 'nutrition',
      completed: false,
      description: 'Metade do prato com vegetais, um quarto com proteínas, um quarto com carboidratos'
    });
    
    routine.push({
      id: '',
      time: '19:30',
      name: 'Jantar leve',
      remedyType: 'nutrition',
      completed: false,
      description: 'Refeição leve e nutritiva, pelo menos 2h antes de dormir'
    });
  }

  if (selectedRemedies.includes('trust')) {
    routine.push({
      id: '',
      time: '06:30',
      name: 'Momento de gratidão matinal',
      remedyType: 'trust',
      completed: false,
      description: 'Reflexão sobre aspectos positivos da vida'
    });
    
    routine.push({
      id: '',
      time: '21:30',
      name: 'Reflexão/meditação/oração',
      remedyType: 'trust',
      completed: false,
      description: 'Momento espiritual para paz interior'
    });
  }


  return routine.sort((a, b) => {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  });
};

export const calculateWaterProgress = (current: number, goal: number): number => {
  return Math.min(Math.round((current / goal) * 100), 100);
};

export const getCompletionLevelColor = (level: number): string => {
  const colors = [
    'bg-gray-100', // nível 0
    'bg-primary-light/30', // nível 1
    'bg-primary-light/60', // nível 2
    'bg-primary-light', // nível 3
    'bg-primary', // nível 4
  ];
  
  return colors[level] || colors[0];
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  return `${hours}h${minutes}`;
};


export const getRemedyIcon = (remedy: NaturalRemedy): string => {
  const icons: Record<NaturalRemedy, string> = {
    water: '💧',
    exercise: '🏃',
    rest: '😴',
    sunlight: '☀️',
    temperance: '⚖️',
    air: '🌬️',
    nutrition: '🥗',
    trust: '🙏'
  };
  
  return icons[remedy] || '✅';
};

export const getRemedyName = (remedy: NaturalRemedy): string => {
  const names: Record<NaturalRemedy, string> = {
    water: 'Água',
    exercise: 'Exercício',
    rest: 'Descanso',
    sunlight: 'Luz Solar',
    temperance: 'Temperança',
    air: 'Ar Puro',
    nutrition: 'Nutrição',
    trust: 'Confiança'
  };
  
  return names[remedy] || remedy;
};