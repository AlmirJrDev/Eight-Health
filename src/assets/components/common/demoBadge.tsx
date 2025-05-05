// DemoBadge.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useDemoMode } from './DemoModeProvider';


const DemoBadge: React.FC = () => {
  const { isDemoMode } = useDemoMode();
  
  if (!isDemoMode) return null;
  
  return (
    <motion.div
      className="fixed top-16 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Play className="h-3 w-3 mr-1" />
      Modo Demonstração
    </motion.div>
  );
};

export default DemoBadge;