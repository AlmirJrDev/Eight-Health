import { useState, useEffect } from 'react';

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
  labels?: string[];
  onStepClick?: (step: number) => void;
  className?: string;
}

const ProgressIndicator = ({
  steps,
  currentStep,
  labels = [],
  onStepClick,
  className = '',
}: ProgressIndicatorProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const percentage = ((currentStep - 1) / (steps - 1)) * 100;
    setProgress(percentage);
  }, [currentStep, steps]);

  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="relative">
        {/* Progress bar background */}
        <div className="h-1 w-full bg-gray-200 rounded-full">
          {/* Actual progress */}
          <div
            className="h-1 bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between absolute w-full top-1/2 -translate-y-1/2">
          {Array.from({ length: steps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => onStepClick && onStepClick(stepNumber)}
                  disabled={!onStepClick}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'ring-2 ring-blue-300 bg-blue-500 text-white'
                      : isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  } ${onStepClick ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="text-xs font-semibold">{stepNumber}</span>
                </button>
                
                {labels && labels[index] && (
                  <span className={`text-xs mt-2 ${isActive ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                    {labels[index]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;