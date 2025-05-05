import { motion } from 'framer-motion';
import useWaterStore from '../store/waterStore';
import { WaterProgress } from '../assets/components/WaterTracker/WaterProgress';
import Header from '../assets/components/layout/Header';
import { WaterInput } from '../assets/components/WaterTracker/WaterInput';
import Footer from '../assets/components/layout/Footer';


const WaterPage = () => {
  const { waterData, addWater } = useWaterStore();


  const handleAddWater = (amount: number) => {
    addWater(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Water Tracker</h1>
          
          <div className="mb-8">
            <WaterProgress 
              currentAmount={waterData.currentAmount} 
              dailyGoal={waterData.dailyGoal}
            />
          </div>
          
          <WaterInput onAddWater={handleAddWater} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Weekly History</h2>
          
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
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaterPage;