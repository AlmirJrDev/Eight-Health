import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NaturalRemedy } from '../types';
import dayjs from 'dayjs';

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
  remedy: NaturalRemedy;
}

interface HabitDisplay {
  date: string;
  completionLevel: number;
}

interface HabitStoreState {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  removeHabit: (habitId: string) => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  getRemedyStats: (remedy: NaturalRemedy) => {
    total: number;
    completed: number;
    percentage: number;
  };
  getHabitStreak: (habitId: string) => number;
  getHabitsByRemedy: (remedy: NaturalRemedy) => Habit[];
  getActiveRemedies: () => NaturalRemedy[];
  getDisplayHabits: () => HabitDisplay[];
  reset: () => void;
}

const useHabitStore = create<HabitStoreState>()(
  persist(
    (set, get) => ({
      habits: [],
      
      addHabit: (habit: Habit) =>
        set((state) => ({
          habits: [...state.habits, habit]
        })),
      
      removeHabit: (habitId: string) =>
        set((state) => ({
          habits: state.habits.filter(habit => habit.id !== habitId)
        })),
      
      toggleHabitCompletion: (habitId: string, date: string) =>
        set((state) => {
          const updatedHabits = state.habits.map(habit => {
            if (habit.id === habitId) {
              const completedDates = [...habit.completedDates];
              const dateIndex = completedDates.findIndex(d => d === date);
              
              if (dateIndex >= 0) {
                completedDates.splice(dateIndex, 1);
              } else {
                completedDates.push(date);
              }
              
              return {
                ...habit,
                completedDates
              };
            }
            return habit;
          });
          
          return { habits: updatedHabits };
        }),
      
      getRemedyStats: (remedy: NaturalRemedy) => {
        const habits = get().habits.filter(habit => habit.remedy === remedy);
        const total = habits.length;
        
        // Check for completions today
        const today = new Date().toISOString().split('T')[0];
        const completed = habits.filter(habit => 
          habit.completedDates.includes(today)
        ).length;
        
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { total, completed, percentage };
      },
      
      getHabitStreak: (habitId: string) => {
        const habit = get().habits.find(h => h.id === habitId);
        if (!habit) return 0;
        
        // Sort dates in ascending order
        const sortedDates = [...habit.completedDates].sort();
        if (sortedDates.length === 0) return 0;
        
        // Check if today is completed
        const today = new Date().toISOString().split('T')[0];
        const hasTodayCompletion = sortedDates.includes(today);
        
        // Start from yesterday or today based on today's completion
        let currentDate = hasTodayCompletion ? today : dayjs().subtract(1, 'day').format('YYYY-MM-DD');
        let checkDate = dayjs(currentDate);
        let streak = 0;
        
        // Count back until we find a day without completions
        while (sortedDates.includes(checkDate.format('YYYY-MM-DD'))) {
          streak++;
          checkDate = checkDate.subtract(1, 'day');
        }
        
        return streak;
      },
      
      getHabitsByRemedy: (remedy: NaturalRemedy) => {
        return get().habits.filter(habit => habit.remedy === remedy);
      },
      
      getActiveRemedies: () => {
        const remedies = new Set<NaturalRemedy>();
        get().habits.forEach(habit => {
          remedies.add(habit.remedy);
        });
        return Array.from(remedies);
      },
      
      getDisplayHabits: () => {
        const { habits } = get();
        const today = new Date().toISOString().split('T')[0];
        
        return habits.map(habit => {
          const isCompletedToday = habit.completedDates.includes(today);
          return {
            date: habit.name, // Using the habit name as the display string
            completionLevel: isCompletedToday ? 1 : 0
          };
        });
      },
      
      reset: () =>
        set(() => ({
          habits: []
        })),
    }),
    {
      name: 'natural-remedies-habits-storage',
    }
  )
);

export default useHabitStore;