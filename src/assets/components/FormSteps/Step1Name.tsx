import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface Step1NameProps {
  name: string;
  setName: (name: string) => void;
  onNext: () => void;
}

export const Step1Name: React.FC<Step1NameProps> = ({ name, setName, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNext();
    }
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
          <h2 className="text-2xl font-semibold mb-2">Olá!</h2>
          <p className="text-text-secondary">Qual seu nome?</p>
        </div>
        
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          required
        />
        
        <Button type="submit" fullWidth disabled={!name.trim()}  className="px-8 h-12 font-medium bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto"
            >
          Próximo
        </Button>
      </form>
    </motion.div>
  );
};




