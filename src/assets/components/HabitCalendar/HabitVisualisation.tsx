import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importando o locale pt-br
import { NaturalRemedy } from '../../../types';

// Configurando dayjs para usar o locale pt-br
dayjs.locale('pt-br');

// Typed remedy info
interface RemedyInfo {
  name: string;
  icon: string;
  color: string;
}

// Properly typed remedy information object
const REMEDY_INFO: Record<NaturalRemedy, RemedyInfo> = {
  water: { name: 'Água', icon: '💧', color: 'bg-blue-500' },
  exercise: { name: 'Exercício', icon: '🏃', color: 'bg-orange-500' },
  rest: { name: 'Descanso', icon: '😴', color: 'bg-purple-500' },
  sunlight: { name: 'Sol', icon: '☀️', color: 'bg-yellow-500' },
  temperance: { name: 'Temperança', icon: '⚖️', color: 'bg-teal-500' },
  air: { name: 'Ar Puro', icon: '🌬️', color: 'bg-cyan-500' },
  nutrition: { name: 'Nutrição', icon: '🥗', color: 'bg-green-500' },
  trust: { name: 'Confiança', icon: '🙏', color: 'bg-indigo-500' }
};

interface HabitCalendarProps {
  habitsData: {
    id: string;
    remedy: NaturalRemedy;
    name: string;
    dates: string[];
  }[];
  activeRemedies: NaturalRemedy[];
}

interface DayInfo {
  date: string;         // Formato interno YYYY-MM-DD
  displayDate: string;  // Formato visual DD/MM/YYYY
  dayOfWeek: string;
  dayOfMonth: number;
}

interface CompletionData {
  remedyCompletions: Record<NaturalRemedy, boolean>;
  completedCount: number;
  totalRemedies: number;
  completionLevel: number;
}

export const HabitCalendar: React.FC<HabitCalendarProps> = ({ 
  habitsData, 
  activeRemedies 
}) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));

  // Create array of days for the selected month
  const getDaysInMonth = (): DayInfo[] => {
    const year = parseInt(selectedMonth.split('-')[0]);
    const month = parseInt(selectedMonth.split('-')[1]) - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = dayjs(`${selectedMonth}-${i.toString().padStart(2, '0')}`);
      days.push({
        date: day.format('YYYY-MM-DD'), // Mantemos o formato interno YYYY-MM-DD para processamento
        displayDate: day.format('DD/MM/YYYY'), // Formato visual brasileiro
        dayOfWeek: day.format('ddd'),
        dayOfMonth: i,
      });
    }
    
    return days;
  };
  
  const days = getDaysInMonth();
  
  // Get previous months for navigation
  const getMonthOptions = () => {
    const options = [];
    const today = dayjs();
    
    for (let i = 0; i < 12; i++) {
      const date = today.subtract(i, 'month');
      options.push({
        value: date.format('YYYY-MM'),
        label: date.format('MMMM [de] YYYY') // Formato "Maio de 2025"
      });
    }
    
    return options;
  };
  
  // Calculate stats for the current month
  const calculateStats = () => {
    const year = parseInt(selectedMonth.split('-')[0]);
    const month = parseInt(selectedMonth.split('-')[1]) - 1;
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    
    let completedDays = 0;
    const totalDays = days.length;
    const daysTracked = new Set<string>();
    
    habitsData.forEach(habit => {
      habit.dates.forEach(date => {
        const habitDate = new Date(date);
        if (habitDate >= startOfMonth && habitDate <= endOfMonth) {
          daysTracked.add(date);
        }
      });
    });
    
    completedDays = daysTracked.size;
    const percentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
    
    // Calculate streak
    let currentStreak = 0;
    const today = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    
    // Check if today has completions
    const hasTodayCompletions = daysTracked.has(today);
    
    // Start from yesterday or today depending on today's completion
    let currentDate = hasTodayCompletions ? today : yesterday;
    let checkDate = dayjs(currentDate);
    
    // Count back until we find a day without completions
    while (daysTracked.has(checkDate.format('YYYY-MM-DD'))) {
      currentStreak++;
      checkDate = checkDate.subtract(1, 'day');
    }
    
    // If today doesn't have completions, don't count it in streak
    if (!hasTodayCompletions) {
      currentStreak = Math.max(0, currentStreak);
    }
    
    return {
      totalDays,
      completedDays,
      percentage,
      currentStreak
    };
  };
  
  const stats = calculateStats();

  // Calculate completion levels for each day
  const getCompletionData = (date: string): CompletionData => {
    const remedyCompletions = {} as Record<NaturalRemedy, boolean>;
    
    // Initialize all active remedies as incomplete
    activeRemedies.forEach(remedy => {
      remedyCompletions[remedy] = false;
    });
    
    // Mark completed remedies
    habitsData.forEach(habit => {
      if (habit.dates.includes(date)) {
        remedyCompletions[habit.remedy] = true;
      }
    });
    
    // Count completed remedies
    const completedCount = Object.values(remedyCompletions).filter(Boolean).length;
    const totalRemedies = activeRemedies.length;
    
    // Calculate completion level (0-4)
    let completionLevel = 0;
    if (totalRemedies > 0) {
      const completionPercentage = completedCount / totalRemedies;
      if (completionPercentage > 0) {
        completionLevel = Math.ceil(completionPercentage * 4);
      }
    }
    
    return {
      remedyCompletions,
      completedCount,
      totalRemedies,
      completionLevel
    };
  };
  
  // Get color based on completion level
  const getCompletionLevelColor = (level: number): string => {
    switch (level) {
      case 0: return 'bg-gray-100';
      case 1: return 'bg-blue-100';
      case 2: return 'bg-blue-300';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-blue-700';
      default: return 'bg-gray-100';
    }
  };
  
  // Handle month change
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };
  
  // Traduzir nomes de dias para exibição
  const translateDayName = (day: string): string => {
    // dayjs em pt-br já retorna os nomes em português, mas podemos garantir com este mapeamento
    const translations: Record<string, string> = {
      'Mon': 'Seg',
      'Tue': 'Ter',
      'Wed': 'Qua',
      'Thu': 'Qui',
      'Fri': 'Sex',
      'Sat': 'Sáb',
      'Sun': 'Dom'
    };
    
    return translations[day] || day;
  };
  
  // Verificar se é final de semana
  const isWeekend = (day: string): boolean => {
    return ['Sáb', 'Dom'].includes(translateDayName(day));
  };
  
  // Formatar data para exibição nos tooltips
  const formatDateForDisplay = (date: string): string => {
    return dayjs(date).format('DD/MM/YYYY');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <select 
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          {getMonthOptions().map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center bg-white p-3 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{stats.completedDays}</p>
          <p className="text-xs text-gray-500">Dias ativos</p>
        </div>
        <div className="text-center bg-white p-3 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{stats.percentage}%</p>
          <p className="text-xs text-gray-500">Consistência</p>
        </div>
        <div className="text-center bg-white p-3 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-blue-600">
            {stats.currentStreak}
          </p>
          <p className="text-xs text-gray-500">Sequência atual</p>
        </div>
        <div className="text-center bg-white p-3 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-blue-600">
            {activeRemedies.length}
          </p>
          <p className="text-xs text-gray-500">Remédios ativos</p>
        </div>
      </div>
      
      {/* Gráfico estilo GitHub */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium mb-4">Calendário de Hábitos</h3>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const { completionLevel } = getCompletionData(day.date);
            const color = getCompletionLevelColor(completionLevel);
            const isToday = day.date === dayjs().format('YYYY-MM-DD');
            const dayIsWeekend = isWeekend(day.dayOfWeek);
            const translatedDayOfWeek = translateDayName(day.dayOfWeek);
            
            return (
              <div key={index} className="aspect-square">
                <div
                  className={`w-full h-full rounded-sm ${color} ${isToday ? 'ring-2 ring-blue-500' : ''} ${
                    dayIsWeekend ? 'opacity-80' : ''
                  } cursor-pointer flex items-center justify-center relative`}
                  title={`${day.dayOfMonth} - ${translatedDayOfWeek}: ${completionLevel > 0 ? `${completionLevel * 25}% completo` : 'Sem registro'} (${formatDateForDisplay(day.date)})`}
                >
                  <span className="absolute text-xs text-gray-500">{day.dayOfMonth}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-end mt-2 text-xs text-gray-500">
          <span className="mr-1">Menos</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getCompletionLevelColor(level)}`}
              />
            ))}
          </div>
          <span className="ml-1">Mais</span>
        </div>
      </div>
      
      {/* Lista de remédios ativos */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">Remédios Naturais Ativos</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {activeRemedies.map((remedy) => (
            <div
              key={remedy}
              className="flex items-center p-3 bg-white rounded-lg shadow-sm"
            >
              <span className="text-lg mr-2">{REMEDY_INFO[remedy].icon}</span>
              <span className="text-sm">{REMEDY_INFO[remedy].name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};