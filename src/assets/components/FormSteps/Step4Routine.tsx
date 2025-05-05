import React from 'react';

interface Step4RoutineProps {
  waterGoal: number;
  wakeUpTime: string;
  sleepTime: string;
  onWaterGoalChange: (value: number) => void;
  onWakeUpTimeChange: (value: string) => void;
  onSleepTimeChange: (value: string) => void;
}

export const Step4Routine: React.FC<Step4RoutineProps> = ({
  waterGoal,
  wakeUpTime,
  sleepTime,
  onWaterGoalChange,
  onWakeUpTimeChange,
  onSleepTimeChange,
}) => {
  const handleWaterGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onWaterGoalChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Sua Rotina Diária</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure sua rotina para melhorar sua saúde
        </p>
      </div>

      <div className="space-y-4">
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
            Recomendamos pelo menos 2000ml por dia
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
          Com base nos seus horários, iremos gerar uma rotina personalizada para você.
        </p>
      </div>
    </div>
  );
};