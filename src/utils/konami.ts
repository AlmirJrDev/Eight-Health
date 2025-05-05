import { useState, useEffect, useCallback } from 'react';

type KonamiCodeCallback = () => void;

/**
 * Hook to detect the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
 * @param callback Function to execute when the Konami code is detected
 * @returns Current sequence of keys pressed
 */
const useKonamiCode = (callback: KonamiCodeCallback): string[] => {
  // The Konami code sequence
  const konamiCode: string[] = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
  ];
  
  // State to track the current position in the sequence
  const [sequence, setSequence] = useState<string[]>([]);

  // Event handler for keydown events
  const keyHandler = useCallback((event: KeyboardEvent): void => {
    // Get the key code
    const key = event.code;
    
    // Update the sequence with the new key
    const updatedSequence = [...sequence, key];
    
    // Only keep the last N keys, where N is the length of the Konami code
    if (updatedSequence.length > konamiCode.length) {
      updatedSequence.shift();
    }
    
    setSequence(updatedSequence);
    
    // Check if the sequence matches the Konami code
    const isKonamiCode = updatedSequence.length === konamiCode.length &&
      updatedSequence.every((key, index) => key === konamiCode[index]);
    
    if (isKonamiCode && callback) {
      callback();
      // Reset the sequence after a match
      setSequence([]);
    }
  }, [callback, sequence, konamiCode]);

  useEffect(() => {
    // Add event listener
    window.addEventListener('keydown', keyHandler);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [keyHandler]);
  
  return sequence;
};

export default useKonamiCode;