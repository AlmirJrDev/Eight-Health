// DemoModeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import useUserStore from '../../../store/userStore';


interface DemoModeContextType {
  isDemoMode: boolean;
  setDemoMode: (value: boolean) => void;
}

const DemoModeContext = createContext<DemoModeContextType>({
  isDemoMode: false,
  setDemoMode: () => {},
});

export const useDemoMode = () => useContext(DemoModeContext);

export const DemoModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const userData = useUserStore(state => state.userData);
  
  // Check if the current user is the demo user
  useEffect(() => {
    if (userData?.name === "Unasp") {
      setIsDemoMode(true);
    } else {
      setIsDemoMode(false);
    }
  }, [userData]);
  
  const setDemoMode = (value: boolean) => {
    setIsDemoMode(value);
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, setDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
};

export default DemoModeProvider;