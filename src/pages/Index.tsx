
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Heart, Lightbulb } from "lucide-react";
import Journal from "@/components/Journal";
import BreathingExercise from "@/components/BreathingExercise";
import DecisionHelper from "@/components/DecisionHelper";
import Onboarding from "@/components/Onboarding";
import EnhancedCard from "@/components/EnhancedCard";
import { loadProgress, hasProgress, clearProgress } from "@/utils/progressStorage";

const Index = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'journal' | 'breathing' | 'decision'>('welcome');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [savedProgress, setSavedProgress] = useState<any>(null);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('innervoice_onboarding_completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
      return;
    }

    // Check for saved progress
    if (hasProgress()) {
      const progress = loadProgress();
      setSavedProgress(progress);
      setShowContinuePrompt(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('innervoice_onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const handleRestartOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleContinueProgress = () => {
    if (savedProgress) {
      setCurrentView(savedProgress.tool as any);
      setShowContinuePrompt(false);
    }
  };

  const handleStartFresh = () => {
    clearProgress();
    setShowContinuePrompt(false);
    setSavedProgress(null);
  };

  const handleNavigateToTool = (tool: 'journal' | 'breathing' | 'decision') => {
    setCurrentView(tool);
    setShowContinuePrompt(false);
  };

  if (currentView === 'journal') {
    return <Journal onBack={() => setCurrentView('welcome')} onDecisionHelper={() => setCurrentView('decision')} />;
  }

  if (currentView === 'breathing') {
    return <BreathingExercise onBack={() => setCurrentView('welcome')} />;
  }

  if (currentView === 'decision') {
    return <DecisionHelper onBack={() => setCurrentView('welcome')} />;
  }

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      
      {/* Continue Progress Modal */}
      {showContinuePrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
            <p className="text-gray-600 mb-6">
              You have progress saved in <strong>{savedProgress?.tool}</strong>. Would you like to continue where you left off?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleContinueProgress}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                Continue
              </Button>
              <Button
                onClick={handleStartFresh}
                variant="outline"
                className="flex-1"
              >
                Start Fresh
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Subtle parallax background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Mindful Thoughts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              A gentle space to explore your thoughts, find clarity, and make mindful decisions through guided practices and AI-powered insights.
            </p>
            
            {/* Show tour button for returning users */}
            <Button
              onClick={handleRestartOnboarding}
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400 transition-all duration-200"
            >
              Show Tour Again
            </Button>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <EnhancedCard
              title="Brain Dump"
              description="Release your thoughts onto paper. Let your mind flow freely and discover what's really on your heart through guided journaling and AI-powered pattern recognition."
              icon={Heart}
              gradient="from-emerald-400 to-teal-500"
              onClick={() => handleNavigateToTool('journal')}
              height="tall"
              priority="high"
            />

            <EnhancedCard
              title="Box Breathing"
              description="Find your center with guided breathing exercises. Perfect for reducing anxiety and gaining mental clarity through proven mindfulness techniques."
              icon={Brain}
              gradient="from-blue-400 to-indigo-500"
              onClick={() => handleNavigateToTool('breathing')}
              height="normal"
              priority="medium"
            />

            <EnhancedCard
              title="Decision Helper"
              description="Struggling with choices? Use our structured approach to weigh options and make mindful decisions with confidence and clarity."
              icon={Lightbulb}
              gradient="from-purple-400 to-pink-500"
              onClick={() => handleNavigateToTool('decision')}
              height="normal"
              priority="medium"
            />
          </div>

          {/* Bottom Quote */}
          <div className="text-center mt-20 animate-fade-in">
            <blockquote className="text-xl text-gray-600 italic max-w-3xl mx-auto leading-relaxed">
              "The mind is like water. When agitated, it becomes difficult to see. When calm, everything becomes clear."
            </blockquote>
            <cite className="text-gray-500 text-sm mt-4 block">— Prasad Mahes</cite>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
