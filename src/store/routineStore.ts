import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NaturalRemedy = 'water' | 'exercise' | 'rest' | 'sunlight' | 'temperance' | 'air' | 'nutrition' | 'trust';

export interface RoutineActivity {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  category: NaturalRemedy | 'medication' | 'exercise' | 'water' | 'meal' | 'rest' | 'other';
  completed?: boolean;
  days?: string[]; // 'monday', 'tuesday', etc.
}

interface RoutineStoreState {
  routines: RoutineActivity[];
  addRoutine: (routine: Omit<RoutineActivity, 'id'>) => void;
  updateRoutine: (id: string, routine: Partial<RoutineActivity>) => void;
  removeRoutine: (id: string) => void;
  markRoutineCompleted: (id: string, completed: boolean) => void;
  getDailyRoutines: () => RoutineActivity[];
  reset: () => void;
}

const useRoutineStore = create<RoutineStoreState>()(
  persist(
    (set, get) => ({
      routines: [],
      
      addRoutine: (routine) => {
        const newRoutine = {
          ...routine,
          id: Date.now().toString(),
          completed: false
        };
        
        set((state) => ({
          routines: [...state.routines, newRoutine]
        }));
      },
      
      updateRoutine: (id, updatedFields) => 
        set((state) => ({
          routines: state.routines.map(routine => 
            routine.id === id ? { ...routine, ...updatedFields } : routine
          )
        })),
      
      removeRoutine: (id) =>
        set((state) => ({
          routines: state.routines.filter(routine => routine.id !== id)
        })),
      
      markRoutineCompleted: (id, completed) =>
        set((state) => ({
          routines: state.routines.map(routine =>
            routine.id === id ? { ...routine, completed } : routine
          )
        })),
      
      getDailyRoutines: () => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const routines = get().routines;
        
        return routines.filter(routine => {
          // Include if no days specified (every day) or if today is included
          return !routine.days || routine.days.length === 0 || routine.days.includes(today);
        }).sort((a, b) => {
          // Sort by time
          if (a.startTime < b.startTime) return -1;
          if (a.startTime > b.startTime) return 1;
          return 0;
        });
      },
      
      reset: () => set({ routines: [] }),
    }),
    {
      name: 'eight-health-routines-storage',
    }
  )
);

export default useRoutineStore;