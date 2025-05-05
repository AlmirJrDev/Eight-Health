// DemoButton.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import loadDemoData from '../../../utils/demodata';


interface DemoButtonProps {
  className?: string;
}

const DemoButton: React.FC<DemoButtonProps> = ({ className = "" }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleDemoClick = () => {
    setLoading(true);
    setSuccess(false);
    setError(false);
    
    try {
      // Slight delay to show loading state
      setTimeout(() => {
        const result = loadDemoData();
        if (result.success) {
          setSuccess(true);
          // Navigate to dashboard after successful demo data load
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          setError(true);
        }
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error("Error loading demo data:", err);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <motion.button
      onClick={handleDemoClick}
      className={`px-8 h-12 font-medium bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto ${
        success ? 'bg-green-500' : 
        error ? 'bg-red-500' : 
        'bg-blue-600'
      } text-white font-medium shadow-md transition-all hover:shadow-lg focus:outline-none disabled:opacity-70 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={loading}
    >
      {loading ? (
        <motion.div 
          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      ) : success ? (
        <CheckCircle className="h-5 w-5 mr-2" />
      ) : error ? (
        <AlertCircle className="h-5 w-5 mr-2" />
      ) : (
        <Play className="h-5 w-5 mr-2" />
      )}
      <span>
        {loading ? 'Carregando...' : 
         success ? 'Sucesso!' : 
         error ? 'Erro!' : 
         'Modo Demonstração'}
      </span>
    </motion.button>
  );
};

export default DemoButton;