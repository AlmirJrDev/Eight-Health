import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WaterStore } from '../types';
import dayjs from 'dayjs';

const DEFAULT_DAILY_GOAL = 2000; 

const useWaterStore = create<WaterStore>()(
  persist(
    (set) => ({
      waterData: {
        dailyGoal: DEFAULT_DAILY_GOAL,
        currentAmount: 0,
        history: []
      },

      addWater: (amount: number) => 
        set((state) => {
          const today = dayjs().format('YYYY-MM-DD');
          const existingEntryIndex = state.waterData.history.findIndex(
            entry => entry.date === today
          );

          let newHistory = [...state.waterData.history];
          
          if (existingEntryIndex >= 0) {
      
            newHistory[existingEntryIndex] = {
              ...newHistory[existingEntryIndex],
              amount: newHistory[existingEntryIndex].amount + amount
            };
          } else {

            newHistory.push({
              date: today,
              amount: amount
            });
          }

          return {
            waterData: {
              ...state.waterData,
              currentAmount: state.waterData.currentAmount + amount,
              history: newHistory
            }
          };
        }),

      setDailyGoal: (goal: number) => 
        set((state) => ({
          waterData: {
            ...state.waterData,
            dailyGoal: goal
          }
        })),

      reset: () => 
        set(() => ({
          waterData: {
            dailyGoal: DEFAULT_DAILY_GOAL,
            currentAmount: 0,
            history: []
          }
        })),
    }),
    {
      name: 'eight-health-water-storage',
    }
  )
);

export default useWaterStore;