import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore, UserData, NaturalRemedy } from '../types';

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      isOnboardingComplete: false,
      
      setUserData: (data: UserData) => 
        set((state) => ({
          userData: {
            ...state.userData,
            ...data,
          }
        })),
      
      updateSelectedRemedies: (remedies: NaturalRemedy[]) => 
        set((state) => ({
          userData: state.userData 
            ? { ...state.userData, selectedRemedies: remedies } 
            : null
        })),
      
      completeOnboarding: () => 
        set(() => ({
          isOnboardingComplete: true
        })),
      
      reset: () => 
        set(() => ({
          userData: null,
          isOnboardingComplete: false
        })),
    }),
    {
      name: 'eight-health-user-storage',
    }
  )
);

export default useUserStore;