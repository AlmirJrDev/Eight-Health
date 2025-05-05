import React, { useEffect, useState } from 'react';
import { Button } from '../common/Button';

interface Activity {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  category: 'medication' | 'exercise' | 'water' | 'meal' | 'rest' | 'other';
  completed?: boolean;
}

interface NextActivityProps {
  activities: Activity[];
  onMarkComplete: (activityId: string) => void;
}

export const NextActivity: React.FC<NextActivityProps> = ({ activities, onMarkComplete }) => {
  const [nextActivity, setNextActivity] = useState<Activity | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  useEffect(() => {
    const findNextActivity = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinutes;
      const incompleteTodayActivities = activities.filter(activity => !activity.completed);
      const sortedActivities = [...incompleteTodayActivities].sort((a, b) => {
        const [aHours, aMinutes] = a.startTime.split(':').map(Number);
        const [bHours, bMinutes] = b.startTime.split(':').map(Number);
        const aTimeInMinutes = aHours * 60 + aMinutes;
        const bTimeInMinutes = bHours * 60 + bMinutes;
        return aTimeInMinutes - bTimeInMinutes;
      });

      const nextAct = sortedActivities.find(activity => {
        const [hours, minutes] = activity.startTime.split(':').map(Number);
        const activityTimeInMinutes = hours * 60 + minutes;
        return activityTimeInMinutes > currentTimeInMinutes;
      });


      const selected = nextAct || (sortedActivities.length > 0 ? sortedActivities[0] : null);
      setNextActivity(selected);


      if (selected) {
        const [hours, minutes] = selected.startTime.split(':').map(Number);
        let activityTimeInMinutes = hours * 60 + minutes;
        
    
        if (!nextAct && sortedActivities.length > 0) {
          activityTimeInMinutes += 24 * 60; 
        }
        
        let minutesDiff = activityTimeInMinutes - currentTimeInMinutes;
        if (minutesDiff < 0) {
          minutesDiff += 24 * 60; 
        }
        
        const hoursUntil = Math.floor(minutesDiff / 60);
        const minutesUntil = minutesDiff % 60;
        
        let timeStr = '';
        if (hoursUntil > 0) {
          timeStr += `${hoursUntil}h `;
        }
        timeStr += `${minutesUntil}min`;
        
        setTimeUntilNext(timeStr);
      }
    };

    findNextActivity();
    const interval = setInterval(findNextActivity, 60000); 
    
    return () => clearInterval(interval);
  }, [activities]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medication':
        return '💊';
      case 'exercise':
        return '🏃‍♂️';
      case 'water':
        return '💧';
      case 'meal':
        return '🍽️';
      case 'rest':
        return '😴';
      default:
        return '📌';
    }
  };

  if (!nextActivity) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Próxima Atividade</h3>
        <div className="py-6 text-center text-gray-500">
          <p>Nenhuma atividade agendada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Próxima Atividade</h3>
      
      <div className="flex items-center mb-3">
        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
          {getCategoryIcon(nextActivity.category)}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{nextActivity.name}</p>
          <p className="text-sm text-gray-500">
            {nextActivity.startTime} - {nextActivity.endTime}
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-md p-3 mb-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-blue-800">Em {timeUntilNext}</span>
        </div>
      </div>
      
      <Button 
        onClick={() => onMarkComplete(nextActivity.id)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        Marcar como Concluída
      </Button>
    </div>
  );
};