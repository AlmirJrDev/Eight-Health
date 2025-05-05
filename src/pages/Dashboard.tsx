import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import useWaterStore from '../store/waterStore';
import useHabitStore from '../store/habitStore';
import { Button } from '../assets/components/common/Button';
import { WaterProgress } from '../assets/components/WaterTracker/WaterProgress';
import { NextActivity } from '../assets/components/RoutineClock/NextActivicy';


interface Activity {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  category: 'medication' | 'exercise' | 'water' | 'meal' | 'rest' | 'other';
  completed?: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const { waterData, addWater } = useWaterStore();
  const { habits, getDisplayHabits, toggleHabitCompletion } = useHabitStore();
  const [todayActivities, setTodayActivities] = useState<Activity[]>([]);
  const displayHabits = getDisplayHabits();
  useEffect(() => {
    if (!userData || !userData.name) {
      navigate('/welcome');
    }
  }, [userData, navigate]);
  useEffect(() => {
    if (userData) {
    
      const sampleActivities: Activity[] = [
        {
          id: '1',
          name: 'Beber água',
          startTime: '08:00',
          endTime: '08:05',
          category: 'water',
        },
        {
          id: '2',
          name: 'Exercício matinal',
          startTime: '08:30',
          endTime: '09:00',
          category: 'exercise',
        },
        {
          id: '3',
          name: 'Almoço',
          startTime: '12:00',
          endTime: '12:45',
          category: 'meal',
        },
        {
          id: '4',
          name: 'Beber água',
          startTime: '14:00',
          endTime: '14:05',
          category: 'water',
        },
        {
          id: '5',
          name: 'Vitamina D',
          startTime: '16:00',
          endTime: '16:05',
          category: 'medication',
        },
        {
          id: '6',
          name: 'Alongamento',
          startTime: '18:00',
          endTime: '18:15',
          category: 'exercise',
        }
      ];
      
      if (userData.selectedRemedies && userData.selectedRemedies.length > 0) {
        userData.selectedRemedies.forEach((remedy, index) => {
          const remedyName = typeof remedy === 'string' ? remedy : (remedy as any).name;
          const remedyTime = typeof remedy === 'string' ? '08:00' : (remedy as any).time || '08:00';
          
          sampleActivities.push({
            id: `med-${index}`,
            name: remedyName,
            startTime: remedyTime,
            endTime: remedyTime.split(':').map((part: string, i: number) => 
              i === 1 ? String(Number(part) + 5).padStart(2, '0') : part
            ).join(':'),
            category: 'medication'
          });
        });
      }
      
      setTodayActivities(sampleActivities);
    }
  }, [userData]);

  const handleActivityCompletion = (activityId: string) => {
    setTodayActivities(activities => 
      activities.map(activity => 
        activity.id === activityId ? { ...activity, completed: true } : activity
      )
    );
  
    const activity = todayActivities.find(a => a.id === activityId);
    if (activity && activity.category === 'water') {
      addWater(250); 
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, {userData?.name || 'Usuário'}!
        </h1>
        <p className="text-gray-600 mt-1">
          Confira seu progresso e próximas atividades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {/* Water Progress Card */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Consumo de Água</h2>
              <Button 
                variant="text" 
                onClick={() => navigate('/water')}
                className="text-blue-600"
              >
                Ver Detalhes
              </Button>
            </div>
            <WaterProgress 
              currentAmount={waterData.currentAmount} 
              dailyGoal={waterData.dailyGoal} 
            />
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={() => addWater(250)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Adicionar 250ml
              </Button>
            </div>
          </div>

          {/* Habits Card */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Hábitos Diários</h2>
              <Button 
                variant="text" 
                onClick={() => navigate('/habits')}
                className="text-blue-600"
              >
                Ver Todos
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayHabits.slice(0, 4).map((habit, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <span className="font-medium">{habit.date}</span>
                  <input 
                    type="checkbox"
                    checked={habit.completionLevel > 0}
                    onChange={() => {
                      const originalHabit = habits.find(h => h.name === habit.date);
                      if (originalHabit) {
                        toggleHabitCompletion(
                          originalHabit.id, 
                          new Date().toISOString().split('T')[0]
                        );
                      }
                    }}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              ))}
              {displayHabits.length === 0 && (
                <div className="col-span-2 py-4 text-center text-gray-500">
                  <p>Você ainda não tem hábitos configurados.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/habits')} 
                    className="mt-2"
                  >
                    Adicionar Hábitos
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Next Activity Card */}
          <NextActivity 
            activities={todayActivities}
            onMarkComplete={handleActivityCompletion}
          />

          {/* Quick Actions Card */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Ações Rápidas</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full text-left justify-start"
                onClick={() => addWater(250)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Adicionar 250ml de água
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-left justify-start"
                onClick={() => navigate('/habits')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Gerenciar hábitos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;