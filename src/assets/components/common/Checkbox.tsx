import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  id,
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`
          appearance-none w-5 h-5 rounded border border-gray-300
          checked:bg-blue-500 checked:border-blue-500
          focus:outline-none focus:ring-2 focus:ring-blue-200
          transition-colors cursor-pointer
          ${className}
        `}
      />
      <div className="absolute left-0 top-0 w-5 h-5 flex items-center justify-center pointer-events-none">
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {label && (
        <label
          htmlFor={id}
          className={`ml-2 text-sm text-gray-700 cursor-pointer ${
            disabled ? 'opacity-50' : ''
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
  labels?: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  labels,
}) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      {Array.from({ length: steps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              {labels && (
                <span
                  className={`mt-2 text-xs ${
                    isActive ? 'text-blue-500 font-medium' : 'text-gray-500'
                  }`}
                >
                  {labels[index]}
                </span>
              )}
            </div>
            {index < steps - 1 && (
              <div
                className={`hidden sm:block h-0.5 w-full mt-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};