import React from 'react';
import { motion } from 'framer-motion';
import { calculateWaterProgress } from '../../../utils/helpers';

interface WaterProgressProps {
  currentAmount: number;
  dailyGoal: number;
}

export const WaterProgress: React.FC<WaterProgressProps> = ({ currentAmount, dailyGoal }) => {
  const progress = calculateWaterProgress(currentAmount, dailyGoal);
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52">
        {/* Círculo de progresso base */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            className="text-gray-200 stroke-current" 
            strokeWidth="8" 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none"
          />
          
          {/* Círculo de progresso animado */}
          <motion.circle 
            className="text-primary stroke-current" 
            strokeWidth="8" 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.51} 251`}
            strokeDashoffset="0"
            initial={{ strokeDasharray: "0 251" }}
            animate={{ strokeDasharray: `${progress * 2.51} 251` }}
            transition={{ duration: 1, ease: "easeOut" }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {/* Ícone de gota d'água centralizado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl">💧</span>
            <div className="mt-2">
              <p className="font-bold text-lg">{currentAmount}ml</p>
              <p className="text-sm text-text-secondary">de {dailyGoal}ml</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
        <motion.div 
          className="bg-primary h-2.5 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div> */}
      
      <p className="mt-2 text-sm text-text-secondary">
        {progress}% do objetivo diário
      </p>
    </div>
  );
};