import { NaturalRemedy, UserData, RoutineActivity } from '../types';
import useUserStore from '../store/userStore';
import useRoutineStore from '../store/routineStore';
import useHabitStore from '../store/habitStore';
import useWaterStore from '../store/waterStore';
import dayjs from 'dayjs';

// Generate dates for habit completion records
const generatePastDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = dayjs();
  
  for (let i = 0; i < days; i++) {
    // Randomly skip some days to make the data more realistic
    if (Math.random() > 0.3) { // 70% chance to add a date
      dates.push(today.subtract(i, 'day').format('YYYY-MM-DD'));
    }
  }
  
  return dates;
};

// Generate water consumption history
const generateWaterHistory = (days: number) => {
  const history = [];
  const today = dayjs();
  
  for (let i = 1; i <= days; i++) {
    // Generate a random amount between 1000-2500ml
    const amount = Math.floor(Math.random() * 1500) + 1000;
    history.push({
      date: today.subtract(i, 'day').format('YYYY-MM-DD'),
      amount
    });
  }
  
  return history;
};

// Sample demo user data
const demoUserData: UserData = {
  name: "Unasp",
  age: "35",
  height: 175,
  weight: 70,
  selectedRemedies: ["water", "exercise", "rest", "nutrition", "sunlight"],
  remedies: [],
  waterGoal: 2000,
  wakeUpTime: "06:30",
  sleepTime: "22:30",
  routines: [],
  onboardingCompleted: true
};

// Sample demo routines
const demoRoutines: Omit<RoutineActivity, "id">[] = [
  {
    name: "Beber água ao acordar",
    startTime: "06:35",
    endTime: "06:40",
    category: "water",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  },
  {
    name: "Caminhada matinal",
    startTime: "07:00",
    endTime: "07:30",
    category: "exercise",
    days: ["monday", "wednesday", "friday"]
  },
  {
    name: "Café da manhã",
    startTime: "07:45",
    endTime: "08:15",
    category: "nutrition",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  },
  {
    name: "Meditação",
    startTime: "12:30",
    endTime: "12:45",
    category: "rest",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
  },
  {
    name: "Banho de sol",
    startTime: "15:00",
    endTime: "15:20",
    category: "sunlight",
    days: ["monday", "wednesday", "friday", "sunday"]
  },
  {
    name: "Academia",
    startTime: "18:00",
    endTime: "18:30",
    category: "exercise",
    days: ["tuesday", "thursday"]
  },
  {
    name: "Jantar",
    startTime: "19:00",
    endTime: "19:30",
    category: "nutrition",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  },
  {
    name: "Beber chá de camomila",
    startTime: "21:30",
    endTime: "21:45",
    category: "rest",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  }
];

// Sample demo habits
const demoHabits = [
  {
    id: "h1",
    name: "Beber 2L de água",
    createdAt: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    completedDates: generatePastDates(30),
    remedy: "water" as NaturalRemedy,
  },
  {
    id: "h2",
    name: "30 min de exercício",
    createdAt: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    completedDates: generatePastDates(30),
    remedy: "exercise" as NaturalRemedy,
  },
  {
    id: "h3",
    name: "8h de sono",
    createdAt: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    completedDates: generatePastDates(30),
    remedy: "rest" as NaturalRemedy,
  },
  {
    id: "h4",
    name: "Comer vegetais",
    createdAt: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    completedDates: generatePastDates(30),
    remedy: "nutrition" as NaturalRemedy,
  },
  {
    id: "h5",
    name: "15 min de sol",
    createdAt: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    completedDates: generatePastDates(30),
    remedy: "sunlight" as NaturalRemedy,
  }
];

export const loadDemoData = () => {
  // Reset all stores first
  useUserStore.getState().reset();
  useRoutineStore.getState().reset();
  useHabitStore.getState().reset();
  useWaterStore.getState().reset();
  
  // Set user data
  useUserStore.getState().setUserData(demoUserData);
  useUserStore.getState().completeOnboarding();
  
  // Add routines
  demoRoutines.forEach(routine => {
    useRoutineStore.getState().addRoutine(routine);
  });
  
  // Add habits
  demoHabits.forEach(habit => {
    useHabitStore.getState().addHabit(habit);
  });
  
  // Setup water data
  useWaterStore.getState().setWaterGoal(2000);
  
  // Add today's water (random between 0-1500ml)
  const todayWater = Math.floor(Math.random() * 1500);
  if (todayWater > 0) {
    useWaterStore.getState().addWater(todayWater);
  }
  
  // Add historical water data
  const waterHistory = generateWaterHistory(30);
  
  // Need custom function to modify history directly since the store doesn't expose this
  // This is a hack for demo purposes only
  const waterStore = useWaterStore.getState() as any;
  if (waterStore && waterStore.waterData) {
    waterStore.waterData.history = waterHistory;
    useWaterStore.setState(waterStore);
  }
  
  return {
    success: true,
    message: "Dados de demonstração carregados com sucesso!"
  };
};

export default loadDemoData;