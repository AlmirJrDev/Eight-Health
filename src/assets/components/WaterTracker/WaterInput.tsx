import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface WaterInputProps {
  onAddWater: (amount: number) => void;
}

export const WaterInput: React.FC<WaterInputProps> = ({ onAddWater }) => {
  const [customAmount, setCustomAmount] = useState<number>(0);
  
  const predefinedAmounts = [100, 200, 300, 500];
  
  const handleAddPredefined = (amount: number) => {
    onAddWater(amount);
  };
  
  const handleAddCustom = () => {
    if (customAmount > 0) {
      onAddWater(customAmount);
      setCustomAmount(0);
    }
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Adicionar água</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {predefinedAmounts.map((amount) => (
          <motion.div 
            key={amount} 
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <div 
              className="flex flex-col items-center justify-center p-3 border border-primary rounded-lg hover:bg-primary/10"
              onClick={() => handleAddPredefined(amount)}
            >
              <span className="text-primary text-xl">💧</span>
              <span className="font-medium mt-1">{amount}ml</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex space-x-2 mt-4">
        <Input
          id="custom-amount"
          name="custom-amount"
          type="number"
          placeholder="Quantidade personalizada"
          value={customAmount || ''}
          onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
        />
        <Button 
          onClick={handleAddCustom} 
          disabled={customAmount <= 0}
          className="whitespace-nowrap"
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
};