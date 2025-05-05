import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useUserStore from './store/userStore';

import { AnimatePresence, motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

import Header from './assets/components/layout/Header';
import Onboarding from './pages/Onboarding';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import WaterPage from './pages/WaterPage';
import RoutinesPage from './pages/RoutinePage';
import HabitsPage from './pages/HabitsPage';
import Footer from './assets/components/layout/Footer';

import useKonamiCode from './utils/konami';
import DemoModeProvider from './assets/components/common/DemoModeProvider';
import DemoBadge from './assets/components/common/demoBadge';

const App: React.FC = () => {
  const { userData, reset } = useUserStore();
  const [showResetNotification, setShowResetNotification] = useState(false);
  const isOnboardingComplete = userData?.onboardingCompleted;

  // Handle Konami code detection
  useKonamiCode(() => {
    // Reset user data when Konami code is entered
    reset();
    // Show a notification
    setShowResetNotification(true);
    // Hide the notification after 3 seconds
    setTimeout(() => setShowResetNotification(false), 3000);
  });

  return (
    <Router>
      <DemoModeProvider>
        <div className="bg-gray-50 min-h-screen flex flex-col relative">
          {/* Reset notification */}
          <AnimatePresence>
            {showResetNotification && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 flex items-center shadow-md"
                role="alert"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                <span>Dados do usuário removidos com sucesso!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <Header />
          <DemoBadge />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Protected routes - redirect if not onboarded */}
              <Route
                path="/dashboard"
                element={isOnboardingComplete ? <Dashboard /> : <Navigate to="/welcome" />}
              />
              <Route
                path="/water"
                element={isOnboardingComplete ? <WaterPage /> : <Navigate to="/welcome" />}
              />
              <Route
                path="/habits"
                element={isOnboardingComplete ? <HabitsPage /> : <Navigate to="/welcome" />}
              />
              <Route
                path="/rotine"
                element={isOnboardingComplete ? <RoutinesPage /> : <Navigate to="/welcome" />}
              />
              
              {/* Redirect root to welcome or dashboard based on onboarding status */}
              <Route
                path="/"
                element={<Navigate to={isOnboardingComplete ? "/dashboard" : "/welcome"} />}
              />
              
              {/* Catch all - redirect to welcome/dashboard */}
              <Route
                path="*"
                element={<Navigate to={isOnboardingComplete ? "/dashboard" : "/welcome"} />}
              />
            </Routes>
          </main>
          <Footer />
          
       
        </div>
      </DemoModeProvider>
    </Router>
  );
};

export default App;