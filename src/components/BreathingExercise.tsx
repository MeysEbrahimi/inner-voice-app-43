
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

interface BreathingExerciseProps {
  onBack: () => void;
}

const BreathingExercise = ({ onBack }: BreathingExerciseProps) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { duration: 4000, text: 'Breathe In', scale: 1.5 },
    hold: { duration: 4000, text: 'Hold', scale: 1.5 },
    exhale: { duration: 4000, text: 'Breathe Out', scale: 0.8 },
    rest: { duration: 4000, text: 'Rest', scale: 0.8 }
  };

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentPhaseDuration = phases[phase].duration;
      const progress = Math.min(elapsed / currentPhaseDuration, 1);

      setPhaseProgress(progress);

      if (progress >= 1) {
        // Move to next phase
        const phaseOrder: (keyof typeof phases)[] = ['inhale', 'hold', 'exhale', 'rest'];
        const currentIndex = phaseOrder.indexOf(phase);
        const nextPhase = phaseOrder[(currentIndex + 1) % phaseOrder.length];
        
        setPhase(nextPhase);
        setPhaseProgress(0);
        startTime = timestamp;
        
        if (nextPhase === 'inhale') {
          setCycle(c => c + 1);
        }
      }

      if (isActive) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isActive) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setPhaseProgress(0);
    setCycle(0);
  };

  // Calculate circle size based on phase and progress
  const getCircleScale = () => {
    const baseScale = 0.8;
    const targetScale = phases[phase].scale;
    
    if (phase === 'inhale') {
      return baseScale + (targetScale - baseScale) * phaseProgress;
    } else if (phase === 'hold') {
      return targetScale;
    } else if (phase === 'exhale') {
      return targetScale + (baseScale - targetScale) * phaseProgress;
    } else { // rest
      return baseScale;
    }
  };

  const circleScale = getCircleScale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Calming background elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-2xl animate-blob" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-12">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-surface-glass backdrop-blur-sm transition-all duration-300 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-light text-foreground mb-2">Box Breathing</h1>
          <p className="text-muted-foreground mb-16 font-light">
            Find your rhythm
          </p>

          {/* Breathing Circle */}
          <div className="relative mb-16 flex items-center justify-center h-96">
            <div 
              className="w-64 h-64 rounded-full bg-gradient-to-br from-card/90 via-primary/5 to-secondary/10 backdrop-blur-[var(--surface-blur)] border border-border/30 flex items-center justify-center transition-transform duration-1000 ease-in-out shadow-[var(--shadow-medium)]"
              style={{ 
                transform: `scale(${circleScale})`,
                filter: `drop-shadow(0 25px 50px hsl(var(--primary) / ${0.1 + circleScale * 0.05}))`
              }}
            >
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-card/60 to-transparent" />
              
              {/* Center content */}
              <div className="text-center z-10">
                <div className="text-lg text-foreground font-light">
                  {phases[phase].text}
                </div>
              </div>
            </div>
          </div>

          {/* Minimal stats */}
          <div className="flex justify-center gap-12 mb-12">
            <div className="text-center">
              <div className="text-2xl font-light text-foreground">{cycle}</div>
              <div className="text-sm text-muted-foreground font-light">Cycles</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleExercise}
              size="lg"
              className="bg-card/90 hover:bg-card backdrop-blur-sm text-card-foreground border border-border/30 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 px-8"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              onClick={resetExercise}
              variant="ghost"
              size="lg"
              className="hover:bg-surface-glass backdrop-blur-sm transition-all duration-300 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
