
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import BreadcrumbNav from './BreadcrumbNav';

interface FloatingNavProps {
  steps: Array<{
    id: string;
    label: string;
    completed: boolean;
  }>;
  currentStepIndex: number;
  breadcrumbs: Array<{
    label: string;
    path?: string;
    current?: boolean;
  }>;
  onNext?: () => void;
  onPrevious?: () => void;
  onNavigate?: (path: string) => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  className?: string;
}

const FloatingNav: React.FC<FloatingNavProps> = ({
  steps,
  currentStepIndex,
  breadcrumbs,
  onNext,
  onPrevious,
  onNavigate,
  canGoNext = true,
  canGoPrevious = true,
  className = ""
}) => {
  return (
    <Card className={`
      fixed bottom-6 left-1/2 transform -translate-x-1/2 
      bg-white/95 backdrop-blur-md border shadow-lg
      p-4 min-w-[320px] max-w-[600px] w-[90vw]
      z-50 animate-fade-in
      ${className}
    `}>
      {/* Breadcrumbs */}
      <div className="mb-4">
        <BreadcrumbNav 
          items={breadcrumbs}
          onNavigate={onNavigate}
        />
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator 
        steps={steps}
        currentStepIndex={currentStepIndex}
        className="mb-4"
      />

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="text-xs text-gray-500">
          {steps[currentStepIndex]?.label}
        </div>

        <Button
          size="sm"
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default FloatingNav;
