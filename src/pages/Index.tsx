
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Heart, Lightbulb, ArrowRight } from "lucide-react";
import Journal from "@/components/Journal";
import BreathingExercise from "@/components/BreathingExercise";
import DecisionHelper from "@/components/DecisionHelper";
import Onboarding from "@/components/Onboarding";

const Index = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'journal' | 'breathing' | 'decision'>('welcome');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('innervoice_onboarding_completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('innervoice_onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const handleRestartOnboarding = () => {
    setShowOnboarding(true);
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
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mindful Thoughts</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A gentle space to explore your thoughts, find clarity, and make mindful decisions
            </p>
            
            {/* Show tour button for returning users */}
            <Button
              onClick={handleRestartOnboarding}
              variant="outline"
              size="sm"
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Show Tour Again
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brain Dump */}
            <Card 
              className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setCurrentView('journal')}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Brain Dump</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Release your thoughts onto paper. Let your mind flow freely and discover what's really on your heart.
                </p>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 group-hover:shadow-lg transition-all duration-300">
                  Start Writing
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Box Breathing */}
            <Card 
              className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => setCurrentView('breathing')}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-7 h-7 border-2 border-white rounded-full animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Box Breathing</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Find your center with guided breathing. A simple exercise to calm your mind and reduce anxiety.
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 group-hover:shadow-lg transition-all duration-300">
                  Start Breathing
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>

            {/* Decision Helper */}
            <Card 
              className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group md:col-span-2 lg:col-span-1"
              onClick={() => setCurrentView('decision')}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Decision Helper</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Struggling with a choice? Use our structured approach to weigh options and find clarity.
                </p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 group-hover:shadow-lg transition-all duration-300">
                  Make Decision
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Bottom Quote */}
          <div className="text-center mt-16 animate-fade-in">
            <blockquote className="text-lg text-gray-600 italic max-w-2xl mx-auto">
              "The mind is like water. When agitated, it becomes difficult to see. When calm, everything becomes clear."
            </blockquote>
            <cite className="text-gray-500 text-sm mt-2 block">— Prasad Mahes</cite>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
