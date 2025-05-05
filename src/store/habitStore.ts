import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completedDates: string[];
}

export interface HabitDisplay {
  date: string;
  completionLevel: number;
}

export interface HabitData extends Habit {
  date: string;
  completedRemedies: number;
  completionLevel: number;
}

interface HabitStoreState {
  habits: Habit[];
  getDisplayHabits: () => HabitDisplay[];
  addHabit: (habit: Habit) => void;
  removeHabit: (habitId: string) => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  reset: () => void;
}

const useHabitStore = create<HabitStoreState>()(
  persist(
    (set, get) => ({
      habits: [],
      
      getDisplayHabits: () => {
        const habits = get().habits;
        const today = new Date().toISOString().split('T')[0];
        return habits.map(habit => ({
          date: habit.name,
          completionLevel: habit.completedDates.includes(today) ? 1 : 0
        }));
      },
      
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
      
      reset: () =>
        set(() => ({
          habits: []
        })),
    }),
    {
      name: 'eight-health-habits-storage',
    }
  )
);

export default useHabitStore;