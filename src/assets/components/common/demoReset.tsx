// DemoResetButton.tsx - Fixed version
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from './DemoModeProvider';
import useUserStore from '../../../store/userStore';
import useRoutineStore from '../../../store/routineStore';
import useHabitStore from '../../../store/habitStore';
import useWaterStore from '../../../store/waterStore';

interface DemoResetButtonProps {
  className?: string;
}

const DemoResetButton: React.FC<DemoResetButtonProps> = ({ className = "" }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isDemoMode } = useDemoMode();
  const resetUser = useUserStore(state => state.reset);
  const resetRoutines = useRoutineStore(state => state.reset);
  const resetHabits = useHabitStore(state => state.reset);
  const resetWater = useWaterStore(state => state.resetDailyWater);
  const navigate = useNavigate();

  // Only show this button in demo mode
  if (!isDemoMode) return null;

  const handleReset = () => {
    setLoading(true);
    setSuccess(false);
    
    // Slight delay to show loading state
    setTimeout(() => {
      // Reset all stores
      resetUser();
      resetRoutines();
      resetHabits();
      resetWater();
      
      setLoading(false);
      setSuccess(true);
      
      // Navigate back to welcome page after reset
      setTimeout(() => {
        navigate('/welcome');
      }, 1000);
    }, 800);
  };

  return (
    <motion.button
      onClick={handleReset}
      className={`flex items-center justify-center rounded-lg px-4 py-2 bg-red-500 text-white text-sm font-medium shadow-md transition-all hover:shadow-lg focus:outline-none disabled:opacity-70 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={loading}
    >
      {loading ? (
        <motion.div 
          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      ) : success ? (
        <CheckCircle className="h-4 w-4 mr-1" />
      ) : (
        <RefreshCw className="h-4 w-4 mr-1" />
      )}
      <span>
        {loading ? 'Resetando...' : 
         success ? 'Sucesso!' : 
         'Sair do demo'}
      </span>
    </motion.button>
  );
};

export default DemoResetButton;