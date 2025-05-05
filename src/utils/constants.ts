export const APP_NAME = "Eight Health";
export const APP_VERSION = "1.0.0";

export const DEFAULT_WATER_GOAL = 2500; 
export const DEFAULT_WATER_UNITS = "ml";
export const DEFAULT_WATER_INCREMENTS = [200, 350, 500];

export const MAX_HABITS = 10;
export const DEFAULT_HABITS = [
  "Take medication",
  "Drink water",
  "Exercise",
  "Meditate",
  "Eat vegetables"
];

export const REMEDY_CATEGORIES = [
  {
    id: "medication",
    name: "Medication",
    icon: "pill"
  },
  {
    id: "supplement",
    name: "Supplements",
    icon: "vitamin"
  },
  {
    id: "natural",
    name: "Natural Remedies",
    icon: "leaf"
  },
  {
    id: "therapy",
    name: "Therapies",
    icon: "activity"
  }
];


export const ROUTINE_TIME_SLOTS = [
  "morning",
  "afternoon",
  "evening",
  "bedtime"
];

export const ROUTES = {
  WELCOME: "/",
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
  WATER: "/water",
  HABITS: "/habits",
  ROUTINES: "/routines",
  SETTINGS: "/settings"
};


export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const SLIDE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be at most ${max} characters`,
  PASSWORD_MISMATCH: "Passwords do not match",
  POSITIVE_NUMBER: "Must be a positive number"
};


export const STORAGE_KEYS = {
  USER_DATA: "eight_health_user",
  WATER_DATA: "eight_health_water",
  HABITS_DATA: "eight_health_habits",
  SETTINGS: "eight_health_settings"
};

export const API_ENDPOINTS = {
  BASE_URL: "https://api.eight-health.com",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  USER_PROFILE: "/user/profile",
  SYNC_DATA: "/user/sync"
};