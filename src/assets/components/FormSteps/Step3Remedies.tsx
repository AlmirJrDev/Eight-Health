import React from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from '../common/Checkbox';

export type NaturalRemedy = 'water' | 'exercise' | 'rest' | 'sunlight' | 'temperance' | 'air' | 'nutrition' | 'trust';

interface Remedy {
  id: string;
  name: string;
  description?: string;
  time?: string;
  completed?: boolean;
}

interface Step3RemediesProps {
  remedies: Remedy[];
  onRemediesChange: (remedies: Remedy[]) => void;
}

export const Step3Remedies: React.FC<Step3RemediesProps> = ({
  remedies,
  onRemediesChange,
}) => {
  const [selectedRemedies, setSelectedRemedies] = React.useState<NaturalRemedy[]>([]);

  const allRemedies: NaturalRemedy[] = [
    'water',
    'exercise',
    'rest',
    'sunlight',
    'temperance',
    'air',
    'nutrition',
    'trust',
  ];

  const getRemedyName = (remedy: NaturalRemedy): string => {
    const names: Record<NaturalRemedy, string> = {
      water: 'Água',
      exercise: 'Exercício',
      rest: 'Descanso',
      sunlight: 'Luz Solar',
      temperance: 'Temperança',
      air: 'Ar Puro',
      nutrition: 'Nutrição',
      trust: 'Confiança',
    };
    return names[remedy];
  };

  const handleToggleRemedy = (remedy: NaturalRemedy) => {
    if (selectedRemedies.includes(remedy)) {
      setSelectedRemedies(selectedRemedies.filter((r) => r !== remedy));
    } else {
      setSelectedRemedies([...selectedRemedies, remedy]);
    }


    const updatedRemedies = [...remedies];
    const remedyIndex = updatedRemedies.findIndex(r => r.id === remedy);
    
    if (remedyIndex >= 0) {

      updatedRemedies.splice(remedyIndex, 1);
    } else {

      updatedRemedies.push({
        id: remedy,
        name: getRemedyName(remedy),
      });
    }
    
    onRemediesChange(updatedRemedies);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Boas vindas!
        </h2>
        <p className="mt-2 text-gray-600">
          Qual seu objetivo?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {allRemedies.map((remedy) => (
          <motion.div
            key={remedy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
          >
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleToggleRemedy(remedy)}
            >
              <Checkbox 
                checked={selectedRemedies.includes(remedy)}
                onChange={() => handleToggleRemedy(remedy)}
              />
              <span className="text-gray-700">{getRemedyName(remedy)}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Step3Remedies;