import React, { useState, useEffect } from 'react';
import useWaterStore from '../../../store/waterStore';


interface Step4RoutineProps {
  waterGoal: number;
  wakeUpTime: string;
  sleepTime: string;
  height: number; // em cm
  weight: number; // em kg
  onWaterGoalChange: (value: number) => void;
  onWakeUpTimeChange: (value: string) => void;
  onSleepTimeChange: (value: string) => void;
  onHeightChange: (value: number) => void;
  onWeightChange: (value: number) => void;
}

export const Step4Routine: React.FC<Step4RoutineProps> = ({
  waterGoal,
  wakeUpTime,
  sleepTime,
  height,
  weight,
  onWaterGoalChange,
  onWakeUpTimeChange,
  onSleepTimeChange,
  onHeightChange,
  onWeightChange,
}) => {
  const [imc, setImc] = useState<number | null>(null);
  const [imcCategory, setImcCategory] = useState<string>('');
  const [recommendedWater, setRecommendedWater] = useState<number>(2000);
  const { setWaterGoal } = useWaterStore();

  // Calcular o IMC e a categoria
  useEffect(() => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedImc = weight / (heightInMeters * heightInMeters);
      setImc(calculatedImc);
      
      // Definir categoria do IMC
      if (calculatedImc < 18.5) {
        setImcCategory('Abaixo do peso');
      } else if (calculatedImc < 25) {
        setImcCategory('Peso normal');
      } else if (calculatedImc < 30) {
        setImcCategory('Sobrepeso');
      } else if (calculatedImc < 35) {
        setImcCategory('Obesidade grau I');
      } else if (calculatedImc < 40) {
        setImcCategory('Obesidade grau II');
      } else {
        setImcCategory('Obesidade grau III');
      }
      
      // Calcular recomendação de água baseada no peso (30ml por kg)
      const calculatedWater = Math.round(weight * 30);
      setRecommendedWater(calculatedWater);
      
      // Atualizar meta de água se o usuário não tiver definido manualmente
      if (waterGoal === 2000) {
        onWaterGoalChange(calculatedWater);
        // Atualizar também no waterStore
        setWaterGoal(calculatedWater);
      }
    }
  }, [height, weight, waterGoal, onWaterGoalChange, setWaterGoal]);

  const handleWaterGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onWaterGoalChange(value);
      // Atualizar também no waterStore
      setWaterGoal(value);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onHeightChange(value);
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onWeightChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Sua Rotina Diária</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure sua rotina e medidas para melhorar sua saúde
        </p>
      </div>

      <div className="space-y-4">
        {/* Altura */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Altura (cm)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="height"
              id="height"
              value={height || ''}
              onChange={handleHeightChange}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              min="100"
              max="250"
              placeholder="170"
            />
          </div>
        </div>

        {/* Peso */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Peso (kg)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="weight"
              id="weight"
              value={weight || ''}
              onChange={handleWeightChange}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              min="30"
              max="300"
              placeholder="70"
            />
          </div>
        </div>

        {/* Exibir IMC calculado */}
        {imc !== null && (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  Seu IMC é <span className="font-bold">{imc.toFixed(1)}</span> - {imcCategory}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Water Goal */}
        <div>
          <label htmlFor="waterGoal" className="block text-sm font-medium text-gray-700">
            Meta de água diária (ml)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="waterGoal"
              id="waterGoal"
              value={waterGoal}
              onChange={handleWaterGoalChange}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              min="500"
              max="5000"
              step="100"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {weight > 0 ? `Recomendamos pelo menos ${recommendedWater}ml por dia baseado no seu peso` : 'Recomendamos pelo menos 2000ml por dia'}
          </p>
        </div>

        {/* Wake Up Time */}
        <div>
          <label htmlFor="wakeUpTime" className="block text-sm font-medium text-gray-700">
            Horário de acordar
          </label>
          <div className="mt-1">
            <input
              type="time"
              name="wakeUpTime"
              id="wakeUpTime"
              value={wakeUpTime}
              onChange={(e) => onWakeUpTimeChange(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Sleep Time */}
        <div>
          <label htmlFor="sleepTime" className="block text-sm font-medium text-gray-700">
            Horário de dormir
          </label>
          <div className="mt-1">
            <input
              type="time"
              name="sleepTime"
              id="sleepTime"
              value={sleepTime}
              onChange={(e) => onSleepTimeChange(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-sm text-gray-500">
          Com base nos seus dados, iremos gerar uma rotina personalizada para melhorar sua saúde.
        </p>
      </div>
    </div>
  );
};