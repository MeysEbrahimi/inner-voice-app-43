
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center mb-12">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-white/60 backdrop-blur-sm transition-all duration-300 text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-light text-gray-800 mb-2">Box Breathing</h1>
          <p className="text-gray-600 mb-16 font-light">
            Find your rhythm
          </p>

          {/* Breathing Circle */}
          <div className="relative mb-16 flex items-center justify-center h-96">
            <div 
              className="w-64 h-64 rounded-full bg-gradient-to-br from-white/80 via-blue-100/60 to-indigo-100/60 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform duration-1000 ease-in-out shadow-2xl shadow-blue-200/30"
              style={{ 
                transform: `scale(${circleScale})`,
                boxShadow: `0 25px 50px -12px rgba(59, 130, 246, ${0.15 + circleScale * 0.1})`
              }}
            >
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/60 to-transparent" />
              
              {/* Center content */}
              <div className="text-center z-10">
                <div className="text-lg text-gray-700 font-light">
                  {phases[phase].text}
                </div>
              </div>
            </div>
          </div>

          {/* Minimal stats */}
          <div className="flex justify-center gap-12 mb-12">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-800">{cycle}</div>
              <div className="text-sm text-gray-500 font-light">Cycles</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleExercise}
              size="lg"
              className="bg-white/80 hover:bg-white/90 backdrop-blur-sm text-gray-700 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 px-8"
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
              className="hover:bg-white/60 backdrop-blur-sm transition-all duration-300 text-gray-600"
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
