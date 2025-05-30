import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { ArrowLeft } from 'lucide-react';


interface Step2AgeProps {
  age: string;
  onAgeChange: (value: string) => void;
  onNext?: () => void; 
  onBack?: () => void; 
}

export const Step2Age: React.FC<Step2AgeProps> = ({ 
  age, 
  onAgeChange, 
  onNext, 
  onBack 
}) => {
  const [error, setError] = useState<string>('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Por favor, informe uma idade válida entre 1 e 120 anos.');
      return;
    }
    
    if (onNext) onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onAgeChange(value);
    setError('');
  };

  const isValidAge = () => {
    const ageNum = parseInt(age);
    return !isNaN(ageNum) && ageNum >= 1 && ageNum <= 120;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Boas vindas!</h2>
          <p className="text-text-secondary">Qual sua idade?</p>
        </div>
        
        <Input
          id="age"
          name="age"
          type="number"
          value={age}
          onChange={handleChange}
          placeholder="Digite sua idade"
          error={error}
          required
        />
        
        <div className="flex space-x-4 gap-2">
          {onBack && (
            <Button variant="outline" onClick={onBack} type="button"  className="px-8 gap-2  font-medium text-red-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
             <ArrowLeft className='w-4'/> Voltar
            </Button>
          )}
          <Button 
            type="submit" 
            fullWidth 
            disabled={!isValidAge()}
           className="px-8 h-12 font-medium bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto"
          >
            Próximo
          </Button>
        </div>
      </form>
    </motion.div>
  );
};