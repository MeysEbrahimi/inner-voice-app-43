
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, PenTool, Lightbulb, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface JournalProps {
  onBack: () => void;
  onDecisionHelper: () => void;
}

const Journal = ({ onBack, onDecisionHelper }: JournalProps) => {
  const [entry, setEntry] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEntry = async () => {
    if (!entry.trim()) {
      toast.error("Please write something first");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis (in a real app, this would call an AI API)
    setTimeout(() => {
      const biases = [
        "Confirmation Bias: You might be focusing on information that confirms your existing beliefs.",
        "Catastrophizing: There's a tendency to imagine worst-case scenarios.",
        "All-or-Nothing Thinking: Consider if you're seeing situations in black and white.",
        "Mind Reading: You might be assuming you know what others are thinking.",
        "Emotional Reasoning: Your feelings might be influencing your perception of facts."
      ];
      
      const randomBiases = biases.sort(() => 0.5 - Math.random()).slice(0, 2);
      setAnalysis(`Based on your writing, I notice some patterns:\n\n${randomBiases.join('\n\n')}\n\nRemember, awareness is the first step to clearer thinking. These patterns are normal - we all have them.`);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-surface-glass transition-colors duration-300 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-[var(--shadow-medium)]">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Brain Dump</h1>
            <p className="text-lg text-muted-foreground">Let your thoughts flow freely. No judgment, just release.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Writing Area */}
            <Card className="p-6 bg-card/90 backdrop-blur-[var(--surface-blur)] border border-border/50 shadow-[var(--shadow-soft)]">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Write your thoughts</h3>
              <Textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="What's on your mind? Let it all out here..."
                className="min-h-[300px] resize-none border-0 bg-muted/20 focus:bg-card transition-colors duration-300 text-base leading-relaxed"
              />
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={analyzeEntry}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex-1"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze My Thoughts"}
                </Button>
                <Button
                  variant="outline"
                  onClick={onDecisionHelper}
                  className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors duration-300"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Need Decision Help?
                </Button>
              </div>
            </Card>

            {/* Analysis Area */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Thought Patterns</h3>
              </div>
              
              {analysis ? (
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                    {analysis}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Write your thoughts above and click "Analyze" to discover potential thinking patterns and biases.</p>
                </div>
              )}
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Feeling stuck on a decision?</p>
            <Button
              onClick={onDecisionHelper}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Go to Decision Helper
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
