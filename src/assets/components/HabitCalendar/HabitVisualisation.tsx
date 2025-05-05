import React from 'react';

import dayjs from 'dayjs';
import { HabitData, NaturalRemedy } from '../../../types';
import { getCompletionLevelColor, getRemedyIcon, getRemedyName } from '../../../utils/helpers';

interface HabitVisualizationProps {
  habits: HabitData[];
  selectedRemedies: NaturalRemedy[];
}

export const HabitVisualization: React.FC<HabitVisualizationProps> = ({ 
  habits, 
  selectedRemedies 
}) => {

  const getDaysArray = () => {
    const days = [];
    const today = dayjs();
    
    for (let i = 29; i >= 0; i--) {
      const date = today.subtract(i, 'day');
      days.push({
        date: date.format('YYYY-MM-DD'),
        dayOfWeek: date.format('ddd'),
        dayOfMonth: date.format('D'),
      });
    }
    
    return days;
  };
  
  const days = getDaysArray();
  
  const getHabitForDate = (date: string): HabitData | undefined => {
    return habits.find(habit => habit.date === date);
  };
  
  const calculateStats = () => {
    let totalDays = 0;
    let completedDays = 0;
    
    habits.forEach(habit => {
      const date = dayjs(habit.date);
      const isWithinLast30Days = dayjs().diff(date, 'day') <= 30;
      
      if (isWithinLast30Days) {
        totalDays++;
        if (habit.completionLevel > 0) {
          completedDays++;
        }
      }
    });
    
    const percentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
    
    return {
      totalDays,
      completedDays,
      percentage
    };
  };
  
  const stats = calculateStats();
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-xl font-semibold">Seus Hábitos</h2>
        <p className="text-sm text-text-secondary">
          Acompanhe seu progresso diário
        </p>
      </div>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{stats.completedDays}</p>
          <p className="text-xs text-text-secondary">Dias ativos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{stats.percentage}%</p>
          <p className="text-xs text-text-secondary">Consistência</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {stats.completedDays > 0 ? stats.completedDays : 0}
          </p>
          <p className="text-xs text-text-secondary">Sequência atual</p>
        </div>
      </div>
      
      {/* Gráfico estilo GitHub */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium mb-4">Últimos 30 dias</h3>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const habit = getHabitForDate(day.date);
            const completionLevel = habit?.completionLevel || 0;
            const color = getCompletionLevelColor(completionLevel);
            
            return (
              <div key={index} className="aspect-square">
                <div
                  className={`w-full h-full rounded-sm ${color} cursor-pointer`}
                  title={`${day.dayOfMonth} - ${day.dayOfWeek}: ${completionLevel > 0 ? `${completionLevel * 25}% completo` : 'Sem registro'}`}
                />
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-end mt-2 text-xs text-text-secondary">
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
      
      {/* Lista de remédios selecionados */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">Seus remédios</h3>
        
        <div className="space-y-2">
          {selectedRemedies.map((remedy) => (
            <div
              key={remedy}
              className="flex items-center p-2 bg-white rounded-lg shadow-sm"
            >
              <span className="text-lg mr-2">{getRemedyIcon(remedy)}</span>
              <span>{getRemedyName(remedy)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};