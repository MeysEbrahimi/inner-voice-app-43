
import React from 'react';
import { CheckCircle, Circle } from "lucide-react";

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current?: boolean;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStepIndex: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  steps, 
  currentStepIndex, 
  className = "" 
}) => {
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className={`w-full ${className}`} role="navigation" aria-label="Progress indicator">
      {/* Simple Progress Bar (using div instead of shadcn Progress component) */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress: ${Math.round(progress)}% complete`}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Step {currentStepIndex + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className="flex flex-col items-center flex-1"
          >
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
              ${step.completed 
                ? 'bg-green-500 text-white' 
                : index === currentStepIndex 
                  ? 'bg-blue-500 text-white animate-pulse' 
                  : 'bg-gray-200 text-gray-500'
              }
            `}>
              {step.completed ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </div>
            <span className={`
              mt-2 text-xs text-center transition-colors duration-300
              ${index === currentStepIndex ? 'text-blue-600 font-medium' : 'text-gray-500'}
            `}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
