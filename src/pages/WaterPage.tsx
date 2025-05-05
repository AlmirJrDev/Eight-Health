import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, PlusCircle, MinusCircle, Droplet } from 'lucide-react';
import { WaterProgress } from '../assets/components/WaterTracker/WaterProgress';

import useWaterStore from '../store/waterStore';
import useUserStore from '../store/userStore';

interface WaterScheduleItem {
  time: string;
  amount: number;
}

const WaterPage = () => {
  const { waterData, addWater, setWaterGoal } = useWaterStore();
  const { userData } = useUserStore();
  
  const [customAmount, setCustomAmount] = useState(250);
  const [waterSchedule, setWaterSchedule] = useState<WaterScheduleItem[]>([]);
  const [nextWaterTime, setNextWaterTime] = useState('');
  const [timeUntilNext, setTimeUntilNext] = useState('');
  
  // Calculate water schedule based on wake and sleep times
  useEffect(() => {
    if (userData?.wakeUpTime && userData?.sleepTime && waterData.dailyGoal) {
      const schedule = generateWaterSchedule(
        userData.wakeUpTime,
        userData.sleepTime,
        waterData.dailyGoal
      );
      setWaterSchedule(schedule);
    }
  }, [userData?.wakeUpTime, userData?.sleepTime, waterData.dailyGoal]);
  
  // Update next water time
  useEffect(() => {
    if (waterSchedule.length > 0) {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const nextTime = waterSchedule.find(item => {
        const [hours, minutes] = item.time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        return timeInMinutes > currentTime;
      });
      
      if (nextTime) {
        setNextWaterTime(nextTime.time);
        
        // Calculate time until next
        const [hours, minutes] = nextTime.time.split(':').map(Number);
        const nextTimeInMinutes = hours * 60 + minutes;
        const diffMinutes = nextTimeInMinutes - currentTime;
        
        if (diffMinutes < 60) {
          setTimeUntilNext(`${diffMinutes} minutes`);
        } else {
          const hoursDiff = Math.floor(diffMinutes / 60);
          const minsDiff = diffMinutes % 60;
          setTimeUntilNext(`${hoursDiff}h ${minsDiff}m`);
        }
      } else {
        setNextWaterTime('Tomorrow');
        setTimeUntilNext('');
      }
    }
  }, [waterSchedule]);
  
  const generateWaterSchedule = (wakeUpTime: string, sleepTime: string, dailyGoal: number): WaterScheduleItem[] => {
    // Convert wake and sleep times to minutes
    const [wakeHours, wakeMinutes] = wakeUpTime.split(':').map(Number);
    const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
    
    let wakeTimeInMinutes = wakeHours * 60 + wakeMinutes;
    let sleepTimeInMinutes = sleepHours * 60 + sleepMinutes;
    
    // Handle case where sleep time is on the next day
    if (sleepTimeInMinutes < wakeTimeInMinutes) {
      sleepTimeInMinutes += 24 * 60;
    }
    
    // Calculate awake time in minutes
    const awakeTimeInMinutes = sleepTimeInMinutes - wakeTimeInMinutes;
    
    // Decide how many water servings to have
    const numberOfServings = Math.max(5, Math.floor(awakeTimeInMinutes / 120)); // At least every 2 hours
    const servingSize = Math.round(dailyGoal / numberOfServings / 50) * 50; // Round to nearest 50ml
    
    // Generate schedule
    const schedule: WaterScheduleItem[] = [];
    const intervalMinutes = awakeTimeInMinutes / numberOfServings;
    
    for (let i = 0; i < numberOfServings; i++) {
      const timeInMinutes = wakeTimeInMinutes + Math.round(intervalMinutes * i);
      const hours = Math.floor(timeInMinutes / 60) % 24;
      const minutes = timeInMinutes % 60;
      
      schedule.push({
        time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        amount: servingSize,
      });
    }
    
    return schedule;
  };
  
  const handleAddWater = (amount: number) => {
    addWater(amount);
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCustomAmount(value);
    }
  };
  
  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWaterGoal(value);
    }
  };
  
  const handleIncreaseCustomAmount = () => {
    setCustomAmount(prev => prev + 50);
  };
  
  const handleDecreaseCustomAmount = () => {
    setCustomAmount(prev => Math.max(50, prev - 50));
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col ">
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Controle de Água</h1>
          
          <div className="mb-8">
            <WaterProgress 
              currentAmount={waterData.currentAmount} 
              dailyGoal={waterData.dailyGoal}
            />
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-4 justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Meta diária de água (ml)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={waterData.dailyGoal}
                  onChange={handleGoalChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                  min="500"
                  max="5000"
                  step="100"
                />
                <span className="text-sm text-gray-500">ml</span>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Água</h2>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[100, 250, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAddWater(amount)}
                  className="flex items-center justify-center py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
                >
                  <Droplet className="h-4 w-4 mr-1" />
                  <span>{amount}ml</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecreaseCustomAmount}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <MinusCircle className="h-5 w-5 text-gray-700" />
              </button>
              
              <div className="flex-1 flex items-center">
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                  min="50"
                  step="50"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  ml
                </span>
              </div>
              
              <button
                onClick={handleIncreaseCustomAmount}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <PlusCircle className="h-5 w-5 text-gray-700" />
              </button>
              
              <button
                onClick={() => handleAddWater(customAmount)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Adicionar
              </button>
            </div>
          </div>
          
          {waterSchedule.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Programação de Hidratação</h2>
              
              {nextWaterTime && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-blue-800 font-medium">
                      {nextWaterTime === 'Tomorrow' ? 'Próxima dose: Amanhã' : `Próxima dose: ${nextWaterTime}`}
                      {timeUntilNext && ` (em ${timeUntilNext})`}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="max-h-60 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Horário
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantidade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {waterSchedule.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.amount}ml
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Histórico Semanal</h2>
          
          <div className="grid grid-cols-7 gap-4">
            {waterData.history.slice(-7).map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-sm text-gray-500">
                  {new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                </div>
                <div 
                  className="w-full bg-blue-100 rounded-lg mt-2 relative"
                  style={{ height: '120px' }}
                >
                  <div 
                    className="absolute bottom-0 w-full bg-blue-500 rounded-lg"
                    style={{ 
                      height: `${Math.min(100, (day.amount / waterData.dailyGoal) * 100)}%`,
                    }}
                  />
                </div>
                <div className="text-sm font-medium mt-1">
                  {Math.round(day.amount / 1000 * 10) / 10}L
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round((day.amount / waterData.dailyGoal) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      

    </div>
  );
};

export default WaterPage; 