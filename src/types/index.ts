
export type NaturalRemedy = 
  | 'water' 
  | 'exercise' 
  | 'rest' 
  | 'sunlight' 
  | 'temperance' 
  | 'air' 
  | 'nutrition' 
  | 'trust';


  export interface UserData {
    name: string;
    age: string;
    height: number; // em cm
    weight: number; // em kg
    selectedRemedies: string[];
    remedies: any[];
    waterGoal: number;
    wakeUpTime: string;
    sleepTime: string;
    routines: any[];
    onboardingCompleted: boolean;
  }


export interface RoutineActivity {
  id: string;
  time: string; 
  name: string;
  remedyType: NaturalRemedy;
  completed: boolean;
  description?: string;
}

export interface WaterData {
  dailyGoal: number; 
  currentAmount: number;
  history: {
    date: string; 
    amount: number; 
  }[];
}


export interface HabitData {
  date: string; 
  completedRemedies: {
    [key in NaturalRemedy]?: boolean;
  };
  completionLevel: number; 
}


export interface UserStore {
  userData: UserData | null;
  isOnboardingComplete: boolean;
  setUserData: (data: UserData) => void;
  updateSelectedRemedies: (remedies: NaturalRemedy[]) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

export interface WaterStore {
  waterData: WaterData;
  addWater: (amount: number) => void;
  setDailyGoal: (goal: number) => void;
  reset: () => void;
}

export interface HabitStore {
  habits: HabitData[];
  dailyRoutine: RoutineActivity[];
  addHabitEntry: (date: string, remedies: { [key in NaturalRemedy]?: boolean }) => void;
  completeActivity: (activityId: string) => void;
  generateRoutine: (selectedRemedies: NaturalRemedy[]) => void;
  reset: () => void;
}