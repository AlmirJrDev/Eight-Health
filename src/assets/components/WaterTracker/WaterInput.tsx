import React, { useState } from 'react';
import { Droplet, PlusCircle, MinusCircle } from 'lucide-react';

interface WaterInputProps {
  onAddWater: (amount: number) => void;
}

export const WaterInput: React.FC<WaterInputProps> = ({ onAddWater }) => {
  const [customAmount, setCustomAmount] = useState<number>(250);
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCustomAmount(value);
    }
  };
  
  const handleIncreaseCustomAmount = () => {
    setCustomAmount(prev => prev + 50);
  };
  
  const handleDecreaseCustomAmount = () => {
    setCustomAmount(prev => Math.max(50, prev - 50));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Água</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[100, 250, 500].map((amount) => (
          <button
            key={amount}
            onClick={() => onAddWater(amount)}
            className="flex items-center justify-center py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors"
          >
            <Droplet className="h-4 w-4 mr-1" />
            <span>{amount}ml</span>
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecreaseCustomAmount}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Diminuir quantidade"
        >
          <MinusCircle className="h-5 w-5 text-gray-700" />
        </button>
        
        <div className="flex-1 flex items-center">
          <input
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
            min="50"
            step="50"
            aria-label="Quantidade personalizada de água"
          />
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            ml
          </span>
        </div>
        
        <button
          onClick={handleIncreaseCustomAmount}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Aumentar quantidade"
        >
          <PlusCircle className="h-5 w-5 text-gray-700" />
        </button>
        
        <button
          onClick={() => onAddWater(customAmount)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};