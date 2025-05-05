import { NaturalRemedy, RoutineActivity } from '../types';

export const generateDefaultRoutine = (selectedRemedies: NaturalRemedy[]): RoutineActivity[] => {
  const routine: RoutineActivity[] = [];

  if (selectedRemedies.includes('water')) {
    routine.push({
      id: '',
      name: 'Beber 300ml de água ao acordar',
      startTime: '06:30',
      endTime: '06:35',
      category: 'water',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Beber 300ml de água',
      startTime: '10:00',
      endTime: '10:05',
      category: 'water',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Beber 300ml de água durante o almoço',
      startTime: '13:00',
      endTime: '13:30',
      category: 'water',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Beber 300ml de água',
      startTime: '16:00',
      endTime: '16:05',
      category: 'water',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Beber 300ml de água durante o jantar',
      startTime: '19:00',
      endTime: '19:30',
      category: 'water',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
  }

  if (selectedRemedies.includes('exercise')) {
    routine.push({
      id: '',
      name: 'Exercício matinal (30 min)',
      startTime: '07:00',
      endTime: '07:30',
      category: 'exercise',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Exercício da tarde (30 min)',
      startTime: '17:00',
      endTime: '17:30',
      category: 'exercise',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    });
  }

  if (selectedRemedies.includes('rest')) {
    routine.push({
      id: '',
      name: 'Preparação para dormir',
      startTime: '22:00',
      endTime: '22:30',
      category: 'rest',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Hora de dormir',
      startTime: '22:30',
      endTime: '06:30',
      category: 'rest',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
  }

  if (selectedRemedies.includes('sunlight')) {
    routine.push({
      id: '',
      name: 'Exposição matinal ao sol (15 min)',
      startTime: '08:00',
      endTime: '08:15',
      category: 'sunlight',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
  }

  if (selectedRemedies.includes('temperance')) {
    routine.push({
      id: '',
      name: 'Pausa para relaxamento (10 min)',
      startTime: '14:00',
      endTime: '14:10',
      category: 'temperance',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    });
    
    routine.push({
      id: '',
      name: 'Evitar alimentos pesados/estimulantes',
      startTime: '20:00',
      endTime: '20:30',
      category: 'temperance',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
  }

  if (selectedRemedies.includes('air')) {
    routine.push({
      id: '',
      name: 'Respiração profunda ao ar livre (5 min)',
      startTime: '07:30',
      endTime: '07:35',
      category: 'air',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Respiração profunda ao ar livre (5 min)',
      startTime: '18:00',
      endTime: '18:05',
      category: 'air',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
  }

  if (selectedRemedies.includes('nutrition')) {
    routine.push({
      id: '',
      name: 'Café da manhã nutritivo',
      startTime: '07:45',
      endTime: '08:15',
      category: 'nutrition',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Almoço equilibrado',
      startTime: '12:30',
      endTime: '13:00',
      category: 'nutrition',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Jantar leve',
      startTime: '19:30',
      endTime: '20:00',
      category: 'nutrition',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
  }

  if (selectedRemedies.includes('trust')) {
    routine.push({
      id: '',
      name: 'Momento de gratidão matinal',
      startTime: '06:30',
      endTime: '06:40',
      category: 'trust',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
    
    routine.push({
      id: '',
      name: 'Reflexão/meditação/oração',
      startTime: '21:30',
      endTime: '21:45',
      category: 'trust',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    });
  }

  return routine.sort((a, b) => {
    if (a.startTime < b.startTime) return -1;
    if (a.startTime > b.startTime) return 1;
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