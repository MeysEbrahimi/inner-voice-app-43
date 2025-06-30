
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

interface BreathingExerciseProps {
  onBack: () => void;
}

const BreathingExercise = ({ onBack }: BreathingExerciseProps) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [seconds, setSeconds] = useState(0);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { duration: 4, text: 'Breathe In', color: 'from-blue-400 to-blue-600' },
    hold: { duration: 4, text: 'Hold', color: 'from-indigo-400 to-indigo-600' },
    exhale: { duration: 4, text: 'Breathe Out', color: 'from-purple-400 to-purple-600' },
    rest: { duration: 4, text: 'Rest', color: 'from-teal-400 to-teal-600' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const currentPhaseDuration = phases[phase].duration;
          
          if (prev >= currentPhaseDuration - 1) {
            // Move to next phase
            const phaseOrder: (keyof typeof phases)[] = ['inhale', 'hold', 'exhale', 'rest'];
            const currentIndex = phaseOrder.indexOf(phase);
            const nextPhase = phaseOrder[(currentIndex + 1) % phaseOrder.length];
            
            setPhase(nextPhase);
            
            if (nextPhase === 'inhale') {
              setCycle(c => c + 1);
            }
            
            return 0;
          }
          
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setSeconds(0);
    setCycle(0);
  };

  const progress = (seconds / phases[phase].duration) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-white/50 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Box Breathing</h1>
          <p className="text-lg text-gray-600 mb-12">
            Follow the circle and breathe deeply. 4 seconds for each phase.
          </p>

          {/* Breathing Circle */}
          <div className="relative mb-12">
            <div className={`w-80 h-80 mx-auto rounded-full bg-gradient-to-r ${phases[phase].color} flex items-center justify-center relative overflow-hidden transition-all duration-1000 transform ${isActive ? 'scale-110' : 'scale-100'}`}>
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${phases[phase].color} opacity-20 animate-pulse`} />
              
              {/* Progress Circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 240 240">
                <circle
                  cx="120"
                  cy="120"
                  r="120"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="4"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="120"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: isActive ? 'stroke-dashoffset 1s linear' : 'none' }}
                />
              </svg>

              {/* Center Content */}
              <div className="text-center z-10">
                <div className="text-4xl font-bold text-white mb-2">
                  {phases[phase].duration - seconds}
                </div>
                <div className="text-xl text-white/90 font-medium">
                  {phases[phase].text}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{cycle}</div>
              <div className="text-gray-600">Cycles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{Math.floor((cycle * 16 + seconds) / 60)}:{String((cycle * 16 + seconds) % 60).padStart(2, '0')}</div>
              <div className="text-gray-600">Total Time</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleExercise}
              size="lg"
              className={`bg-gradient-to-r ${phases[phase].color} hover:shadow-lg transition-all duration-300 text-white px-8`}
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
              variant="outline"
              size="lg"
              className="hover:bg-gray-50 transition-colors duration-300"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How it works</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">1</div>
                <div className="font-medium text-gray-800">Inhale</div>
                <div className="text-gray-600">4 seconds</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">2</div>
                <div className="font-medium text-gray-800">Hold</div>
                <div className="text-gray-600">4 seconds</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">3</div>
                <div className="font-medium text-gray-800">Exhale</div>
                <div className="text-gray-600">4 seconds</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">4</div>
                <div className="font-medium text-gray-800">Rest</div>
                <div className="text-gray-600">4 seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
