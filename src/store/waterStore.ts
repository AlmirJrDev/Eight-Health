import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WaterHistoryItem {
  date: string;
  amount: number;
}

interface WaterData {
  currentAmount: number;
  dailyGoal: number;
  lastUpdated: string;
  history: WaterHistoryItem[];
}

interface WaterStore {
  waterData: WaterData;
  addWater: (amount: number) => void;
  setWaterGoal: (goal: number) => void;
  resetDailyWater: () => void;
  reset: () => void; // Added reset method
}

// Helper to get current date as YYYY-MM-DD
const getTodayDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Default water data state
const defaultWaterData = {
  currentAmount: 0,
  dailyGoal: 2000, // Default goal: 2 liters
  lastUpdated: getTodayDate(),
  history: [],
};

const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      waterData: defaultWaterData,
      
      addWater: (amount: number) => {
        const { waterData } = get();
        const today = getTodayDate();
        
        // Check if it's a new day to reset
        if (waterData.lastUpdated !== today) {
          // Add yesterday to history if there was consumption
          if (waterData.currentAmount > 0) {
            set((state) => ({
              waterData: {
                ...state.waterData,
                history: [
                  ...state.waterData.history,
                  { date: state.waterData.lastUpdated, amount: state.waterData.currentAmount }
                ].slice(-30), // Keep only last 30 days
                currentAmount: amount,
                lastUpdated: today,
              }
            }));
          } else {
            // Just update the date and set current amount
            set((state) => ({
              waterData: {
                ...state.waterData,
                currentAmount: amount,
                lastUpdated: today,
              }
            }));
          }
        } else {
          // Same day, just add water
          set((state) => ({
            waterData: {
              ...state.waterData,
              currentAmount: state.waterData.currentAmount + amount,
            }
          }));
          
          // Update today in history (if exists)
          const historyIndex = waterData.history.findIndex(
            (item) => item.date === today
          );
          
          if (historyIndex >= 0) {
            const updatedHistory = [...waterData.history];
            updatedHistory[historyIndex] = {
              ...updatedHistory[historyIndex],
              amount: waterData.currentAmount + amount,
            };
            
            set((state) => ({
              waterData: {
                ...state.waterData,
                history: updatedHistory,
              }
            }));
          }
        }
      },
      
      setWaterGoal: (goal: number) => {
        set((state) => ({
          waterData: {
            ...state.waterData,
            dailyGoal: goal,
          }
        }));
      },
      
      resetDailyWater: () => {
        const { waterData } = get();
        const today = getTodayDate();
        
        // Only add to history if there was consumption
        if (waterData.currentAmount > 0) {
          set((state) => ({
            waterData: {
              ...state.waterData,
              history: [
                ...state.waterData.history,
                { date: state.waterData.lastUpdated, amount: state.waterData.currentAmount }
              ].slice(-30), // Keep last 30 days
              currentAmount: 0,
              lastUpdated: today,
            }
          }));
        } else {
          set((state) => ({
            waterData: {
              ...state.waterData,
              lastUpdated: today,
            }
          }));
        }
      },
      
      // Complete reset function for the store
      reset: () => {
        set({ waterData: defaultWaterData });
      },
    }),
    {
      name: 'water-storage', // Storage key for localStorage
    }
  )
);

export default useWaterStore;