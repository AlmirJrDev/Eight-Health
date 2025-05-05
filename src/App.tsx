import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useUserStore from './store/userStore';

import Header from './assets/components/layout/Header';
import Onboarding from './pages/Onboarding';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import WaterPage from './pages/WaterPage';

import RoutinesPage from './pages/RoutinePage';
import HabitsPage from './pages/HabitsPage';

const App: React.FC = () => {
  const { userData } = useUserStore();
  const isOnboardingComplete = userData?.onboardingCompleted;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
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
      </div>
    </Router>
  );
};

export default App;