import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Heart, Lightbulb, ArrowRight, ArrowLeft, CheckCircle, Play, SkipForward } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  feature: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Inner Voice',
    description: 'Your personal space for mindful thinking and better decision-making. Let us show you around in just 60 seconds.',
    icon: Brain,
    gradient: 'from-blue-500 to-purple-600',
    feature: 'overview'
  },
  {
    id: 'braindump',
    title: 'Brain Dump',
    description: 'Release your thoughts freely onto paper. Our AI helps identify thinking patterns and cognitive biases in your writing.',
    icon: Heart,
    gradient: 'from-emerald-500 to-teal-600',
    feature: 'journal'
  },
  {
    id: 'breathing',
    title: 'Box Breathing',
    description: 'Find your center with guided breathing exercises. Perfect for reducing anxiety and gaining mental clarity.',
    icon: Brain,
    gradient: 'from-blue-500 to-indigo-600',
    feature: 'breathing'
  },
  {
    id: 'decisions',
    title: 'Decision Helper',
    description: 'Struggling with choices? Use our structured approach to weigh options and make mindful decisions.',
    icon: Lightbulb,
    gradient: 'from-purple-500 to-pink-600',
    feature: 'decision'
  }
];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const [tourStarted, setTourStarted] = useState(false);

  const handleStartTour = () => {
    setShowTour(true);
    setTourStarted(true);
    setCurrentStep(0);
  };

  const handleSkipTour = () => {
    onComplete();
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  if (!showTour && !tourStarted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 bg-white shadow-2xl animate-scale-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Inner Voice</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your personal space for mindful thinking, better decisions, and mental clarity. 
              Ready for a quick 60-second tour?
            </p>

            <div className="space-y-3">
              <Button 
                onClick={handleStartTour}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Tour (60 seconds)
              </Button>
              
              <Button 
                onClick={handleSkipTour}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Skip & Explore
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ⏱️ Quick tour • 🎯 Key features • 🚀 Get started fast
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full bg-white shadow-2xl animate-fade-in">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-t-lg">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-tl-lg transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8">
          {/* Step Counter */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
            <span className="text-sm text-gray-500">
              ~{Math.max(1, Math.ceil((onboardingSteps.length - currentStep) * 15))}s remaining
            </span>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${currentStepData.gradient} rounded-full mb-6 animate-scale-in`}>
              <currentStepData.icon className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrev}
              variant="outline"
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center"
            >
              {currentStep === onboardingSteps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <Button
              onClick={handleSkipTour}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              Skip tour
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
