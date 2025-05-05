import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Welcome from '../pages/Welcome';
import Onboarding from '../pages/Onboarding';
import Dashboard from '../pages/Dashboard';
import WaterPage from '../pages/WaterPage';
import HabitsPage from '../pages/HabitsPage';
import { ROUTES } from '../utils/constants';

const Routes = () => {
  const { userData, isOnboardingComplete } = useUserStore();

  const isUserOnboarded = !!userData && isOnboardingComplete;

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isUserOnboarded) {
      return <Navigate to={ROUTES.WELCOME} replace />;
    }
    return <>{children}</>;
  };

  const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
    if (isUserOnboarded) {
      return <Navigate to={ROUTES.DASHBOARD} replace />;
    }
    return <>{children}</>;
  };

  const router = createBrowserRouter([
    {
      path: ROUTES.WELCOME,
      element: <OnboardingGuard><Welcome /></OnboardingGuard>,
    },
    {
      path: ROUTES.ONBOARDING,
      element: <OnboardingGuard><Onboarding /></OnboardingGuard>,
    },
    {
      path: ROUTES.DASHBOARD,
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    },
    {
      path: ROUTES.WATER,
      element: <ProtectedRoute><WaterPage /></ProtectedRoute>,
    },
    {
      path: ROUTES.HABITS,
      element: <ProtectedRoute><HabitsPage /></ProtectedRoute>,
    },
    {
    
      path: '*',
      element: isUserOnboarded ? 
        <Navigate to={ROUTES.DASHBOARD} replace /> : 
        <Navigate to={ROUTES.WELCOME} replace />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;