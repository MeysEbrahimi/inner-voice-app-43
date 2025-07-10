
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Heart, Lightbulb } from "lucide-react";
import Journal from "@/components/Journal";
import BreathingExercise from "@/components/BreathingExercise";
import DecisionHelper from "@/components/DecisionHelper";
import Onboarding from "@/components/Onboarding";
import EnhancedCard from "@/components/EnhancedCard";
import ToolTour from "@/components/ToolTour";
import { loadProgress, hasProgress, clearProgress } from "@/utils/progressStorage";

const Index = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'journal' | 'breathing' | 'decision'>('welcome');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [savedProgress, setSavedProgress] = useState<any>(null);
  const [showTour, setShowTour] = useState<'journal' | 'breathing' | 'decision' | null>(null);

  const tourData = {
    journal: {
      name: "Brain Dump",
      steps: [
        {
          title: "Welcome to Brain Dump",
          description: "This is your safe space to release thoughts, worries, and ideas without judgment.",
          tip: "Write freely - there's no right or wrong way to brain dump."
        },
        {
          title: "Start Writing",
          description: "Simply start typing whatever comes to mind. Don't worry about grammar or structure.",
          tip: "Set a timer for 5-10 minutes and write continuously without stopping."
        },
        {
          title: "AI Insights",
          description: "Our AI will help identify patterns in your thoughts and suggest areas for reflection.",
          tip: "The AI analysis is meant to guide, not judge. Use insights that feel helpful."
        },
        {
          title: "Review & Reflect",
          description: "Take time to review what you've written and any insights provided.",
          tip: "Consider how this exercise has helped clarify your thoughts or feelings."
        }
      ]
    },
    breathing: {
      name: "Box Breathing",
      steps: [
        {
          title: "Welcome to Box Breathing",
          description: "A simple yet powerful technique to calm your mind and reduce stress.",
          tip: "Find a comfortable, quiet place to practice for best results."
        },
        {
          title: "The Technique",
          description: "Follow the circle: breathe in as it grows, hold when it pauses, breathe out as it shrinks.",
          tip: "Each phase lasts 4 seconds. Don't force it - find your natural rhythm."
        },
        {
          title: "Focus on the Circle",
          description: "Let the visual guide your breathing. This helps keep your mind focused and present.",
          tip: "If your mind wanders, gently bring attention back to the circle."
        },
        {
          title: "Practice Regularly",
          description: "Even 2-3 minutes of box breathing can significantly reduce stress and anxiety.",
          tip: "Try practicing before stressful situations or when you need to center yourself."
        }
      ]
    },
    decision: {
      name: "Decision Helper",
      steps: [
        {
          title: "Welcome to Decision Helper",
          description: "A structured approach to help you make thoughtful, confident decisions.",
          tip: "Works best for decisions you've been pondering for a while."
        },
        {
          title: "Define Your Decision",
          description: "Clearly state what decision you're trying to make and why it matters to you.",
          tip: "The more specific you are, the more helpful the process becomes."
        },
        {
          title: "Explore Options",
          description: "List all possible options, even ones that seem unlikely at first.",
          tip: "Sometimes the best solutions come from unexpected combinations of ideas."
        },
        {
          title: "Weigh Pros and Cons",
          description: "For each option, consider the benefits, drawbacks, and potential outcomes.",
          tip: "Think both short-term and long-term consequences."
        }
      ]
    }
  };

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

  const handleTourComplete = () => {
    setShowTour(null);
  };

  const handleStartTour = (tool: 'journal' | 'breathing' | 'decision') => {
    setShowTour(tool);
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
      
      {/* Tool Tour */}
      {showTour && (
        <ToolTour
          toolName={tourData[showTour].name}
          steps={tourData[showTour].steps}
          onComplete={handleTourComplete}
          onClose={() => setShowTour(null)}
        />
      )}
      
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
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted relative overflow-hidden">
        {/* Enhanced glassy background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/30 to-primary/20 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-accent/30 to-muted/40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-secondary/40 to-muted/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary to-primary/80 rounded-3xl mb-8 shadow-[var(--shadow-medium)] backdrop-blur-sm animate-gentle-bounce">
              <Brain className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent tracking-tight">
              Mindful Thoughts
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12 font-light">
              A gentle space to explore your thoughts, find clarity, and make mindful decisions through guided practices and AI-powered insights.
            </p>
            
            {/* Show tour button for returning users */}
            <Button
              onClick={handleRestartOnboarding}
              variant="outline"
              size="lg"
              className="text-muted-foreground hover:text-foreground border-border hover:border-primary/50 bg-surface-glass backdrop-blur-sm hover:bg-surface-glass-hover transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] px-8 py-3 text-base font-medium"
            >
              Show Tour Again
            </Button>
          </div>

          {/* Enhanced Feature Cards - Consistent Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-20">
            <div className="animate-slide-up [animation-delay:0.1s]">
              <EnhancedCard
                title="Brain Dump"
                subtitle="Journaling & Self-Reflection"
                description="Release your thoughts onto paper. Let your mind flow freely and discover what's really on your heart through guided journaling and AI-powered pattern recognition."
                icon={Heart}
                gradient="from-emerald-400 to-teal-500"
                onClick={() => handleNavigateToTool('journal')}
                onTourClick={() => handleStartTour('journal')}
              />
            </div>

            <div className="animate-slide-up [animation-delay:0.2s]">
              <EnhancedCard
                title="Box Breathing"
                subtitle="Mindfulness & Relaxation"
                description="Find your center with guided breathing exercises. Perfect for reducing anxiety and gaining mental clarity through proven mindfulness techniques."
                icon={Brain}
                gradient="from-blue-400 to-indigo-500"
                onClick={() => handleNavigateToTool('breathing')}
                onTourClick={() => handleStartTour('breathing')}
              />
            </div>

            <div className="animate-slide-up [animation-delay:0.3s]">
              <EnhancedCard
                title="Decision Helper"
                subtitle="Structured Decision Making"
                description="Struggling with choices? Use our structured approach to weigh options and make mindful decisions with confidence and clarity."
                icon={Lightbulb}
                gradient="from-purple-400 to-pink-500"
                onClick={() => handleNavigateToTool('decision')}
                onTourClick={() => handleStartTour('decision')}
              />
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="text-center animate-fade-in [animation-delay:0.4s]">
            <blockquote className="text-2xl md:text-3xl text-muted-foreground italic max-w-4xl mx-auto leading-relaxed font-light">
              "The mind is like water. When agitated, it becomes difficult to see. When calm, everything becomes clear."
            </blockquote>
            <cite className="text-muted-foreground/60 text-lg mt-6 block font-medium">— Prasad Mahes</cite>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
