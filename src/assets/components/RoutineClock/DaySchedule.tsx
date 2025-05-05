import { useMemo } from 'react';
import dayjs from 'dayjs';

interface Activity {
  id: string;
  name: string;
  startTime: string; 
  endTime: string; 
  category: 'medication' | 'exercise' | 'water' | 'meal' | 'rest' | 'other';
  completed?: boolean;
}

interface DayScheduleProps {
  activities: Activity[];
  date?: Date;
  onActivityClick?: (activity: Activity) => void;
}

const DaySchedule = ({ 
  activities, 
  date = new Date(), 
  onActivityClick 
}: DayScheduleProps) => {
  const timeBlocks = useMemo(() => {
    const blocks = [];
    for (let hour = 6; hour <= 22; hour++) {
      blocks.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return blocks;
  }, []);

  const formattedDate = dayjs(date).format('DD/MM/YYYY');
  const currentTime = dayjs().format('HH:mm');

  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
  }, [activities]);

  const isActivityInTimeBlock = (activity: Activity, timeBlock: string) => {
    const blockHour = parseInt(timeBlock.split(':')[0]);
  //  const nextBlockHour = blockHour + 1;
    
    const activityStartHour = parseInt(activity.startTime.split(':')[0]);
  //  const activityStartMinute = parseInt(activity.startTime.split(':')[1]);
    
    const activityEndHour = parseInt(activity.endTime.split(':')[0]);
    const activityEndMinute = parseInt(activity.endTime.split(':')[1]);

    if (activityStartHour === blockHour) return true;
    
    if (activityEndHour === blockHour && activityEndMinute > 0) return true;
    
    if (activityStartHour < blockHour && activityEndHour > blockHour) return true;
    
    return false;
  };

  const getCategoryColor = (category: Activity['category'], completed?: boolean) => {
    if (completed) return 'bg-gray-300 text-gray-700';
    
    switch(category) {
      case 'medication':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'exercise':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'water':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meal':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rest':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: Activity['category']) => {
    switch(category) {
      case 'medication':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 6h-7a1 1 0 00-1 1v10a1 1 0 001 1h7a1 1 0 001-1V7a1 1 0 00-1-1z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19h5a1 1 0 001-1V6a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z" />
          </svg>
        );
      case 'exercise':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'water':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.03 15.12a2 2 0 00-1.022.547m13.42 1.42a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.03 16.12a2 2 0 00-1.022.547" />
          </svg>
        );
      case 'meal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'rest':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Agenda do Dia</h2>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      <div className="space-y-3">
        {timeBlocks.map((timeBlock) => {
          const activitiesInBlock = sortedActivities.filter(activity => 
            isActivityInTimeBlock(activity, timeBlock)
          );

          const isCurrentTimeBlock = currentTime >= timeBlock && 
            currentTime < `${(parseInt(timeBlock.split(':')[0]) + 1).toString().padStart(2, '0')}:00`;

          return (
            <div 
              key={timeBlock} 
              className={`flex items-start ${isCurrentTimeBlock ? 'bg-blue-50 p-2 rounded-md' : ''}`}
            >
              <div className="w-16 flex-shrink-0 text-sm text-gray-500">
                {timeBlock}
              </div>
              
              <div className="flex-grow">
                {activitiesInBlock.length > 0 ? (
                  <div className="space-y-2">
                    {activitiesInBlock.map((activity) => (
                      <div 
                        key={activity.id}
                        onClick={() => onActivityClick && onActivityClick(activity)}
                        className={`py-1 px-3 rounded-md border ${getCategoryColor(activity.category, activity.completed)} 
                          flex items-center gap-2 text-sm ${onActivityClick ? 'cursor-pointer hover:opacity-80' : ''}`}
                      >
                        {getCategoryIcon(activity.category)}
                        <span className="font-medium">{activity.name}</span>
                        <span className="ml-auto text-xs opacity-75">
                          {activity.startTime} - {activity.endTime}
                        </span>
                        {activity.completed && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-6 text-sm text-gray-400 italic">
                    Nenhuma atividade
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaySchedule;