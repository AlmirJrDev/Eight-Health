import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUserStore from '../store/userStore';
import { motion } from 'framer-motion';
import { Button } from '../assets/components/common/Button';

const Welcome = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore(); 


  useEffect(() => {
    if (userData && userData.name) { 
      navigate('/dashboard');
    }
  }, [userData, navigate]); 

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/assets/logo.svg" 
            alt="Eight Health Logo" 
            className="h-20 w-20 mx-auto mb-6"
          />
          
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Eight<span className="text-blue-600">Health</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Cuide da sua saúde de forma simples e eficiente. 
            Mantenha-se hidratado, controle sua medicação e acompanhe seus hábitos saudáveis.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.03 15.12a2 2 0 00-1.022.547" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Acompanhamento de Água</h3>
              <p className="text-gray-600">
                Acompanhe facilmente sua ingestão diária de água e mantenha-se hidratado.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Rotina Personalizada</h3>
              <p className="text-gray-600">
                Crie e mantenha rotinas saudáveis com lembretes personalizados.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Controle de Hábitos</h3>
              <p className="text-gray-600">
                Mantenha o controle dos seus hábitos saudáveis diários com nosso calendário visual.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Button 
              onClick={handleGetStarted}
              variant="primary"
              className="px-8"
            >
              Começar Agora
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;