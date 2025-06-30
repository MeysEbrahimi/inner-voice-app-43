
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Minus, Lightbulb, Target, X } from "lucide-react";
import { toast } from "sonner";

interface DecisionHelperProps {
  onBack: () => void;
}

interface ProCon {
  id: string;
  text: string;
  weight: number;
}

interface Factor {
  id: string;
  name: string;
  importance: number;
  optionA: number;
  optionB: number;
}

const DecisionHelper = ({ onBack }: DecisionHelperProps) => {
  const [decisionTitle, setDecisionTitle] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  
  // Pros and Cons
  const [prosA, setProsA] = useState<ProCon[]>([]);
  const [consA, setConsA] = useState<ProCon[]>([]);
  const [prosB, setProsB] = useState<ProCon[]>([]);
  const [consB, setConsB] = useState<ProCon[]>([]);
  
  // Priority Matrix
  const [factors, setFactors] = useState<Factor[]>([]);

  const addProCon = (type: 'prosA' | 'consA' | 'prosB' | 'consB') => {
    const newItem: ProCon = {
      id: Date.now().toString(),
      text: '',
      weight: 5
    };
    
    switch (type) {
      case 'prosA':
        setProsA([...prosA, newItem]);
        break;
      case 'consA':
        setConsA([...consA, newItem]);
        break;
      case 'prosB':
        setProsB([...prosB, newItem]);
        break;
      case 'consB':
        setConsB([...consB, newItem]);
        break;
    }
  };

  const removeProCon = (type: 'prosA' | 'consA' | 'prosB' | 'consB', id: string) => {
    switch (type) {
      case 'prosA':
        setProsA(prosA.filter(item => item.id !== id));
        break;
      case 'consA':
        setConsA(consA.filter(item => item.id !== id));
        break;
      case 'prosB':
        setProsB(prosB.filter(item => item.id !== id));
        break;
      case 'consB':
        setConsB(consB.filter(item => item.id !== id));
        break;
    }
  };

  const updateProCon = (type: 'prosA' | 'consA' | 'prosB' | 'consB', id: string, field: 'text' | 'weight', value: string | number) => {
    const updateArray = (array: ProCon[]) => 
      array.map(item => item.id === id ? { ...item, [field]: value } : item);
    
    switch (type) {
      case 'prosA':
        setProsA(updateArray(prosA));
        break;
      case 'consA':
        setConsA(updateArray(consA));
        break;
      case 'prosB':
        setProsB(updateArray(prosB));
        break;
      case 'consB':
        setConsB(updateArray(consB));
        break;
    }
  };

  const addFactor = () => {
    const newFactor: Factor = {
      id: Date.now().toString(),
      name: '',
      importance: 5,
      optionA: 5,
      optionB: 5
    };
    setFactors([...factors, newFactor]);
  };

  const removeFactor = (id: string) => {
    setFactors(factors.filter(f => f.id !== id));
  };

  const updateFactor = (id: string, field: keyof Factor, value: string | number) => {
    setFactors(factors.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const calculateProConScore = (pros: ProCon[], cons: ProCon[]) => {
    const prosScore = pros.reduce((sum, pro) => sum + (pro.text ? pro.weight : 0), 0);
    const consScore = cons.reduce((sum, con) => sum + (con.text ? con.weight : 0), 0);
    return prosScore - consScore;
  };

  const calculateMatrixScore = (option: 'A' | 'B') => {
    return factors.reduce((sum, factor) => {
      if (!factor.name) return sum;
      const score = option === 'A' ? factor.optionA : factor.optionB;
      return sum + (score * factor.importance);
    }, 0);
  };

  const scoreA = calculateProConScore(prosA, consA);
  const scoreB = calculateProConScore(prosB, consB);
  const matrixScoreA = calculateMatrixScore('A');
  const matrixScoreB = calculateMatrixScore('B');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Decision Helper</h1>
            <p className="text-lg text-gray-600">Structure your decision-making process with clear comparisons</p>
          </div>

          {/* Decision Setup */}
          <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What decision are you making?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Decision title (e.g., 'Job Change')"
                value={decisionTitle}
                onChange={(e) => setDecisionTitle(e.target.value)}
                className="bg-white/70"
              />
              <Input
                placeholder="Option A (e.g., 'Stay at current job')"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                className="bg-white/70"
              />
              <Input
                placeholder="Option B (e.g., 'Take new position')"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                className="bg-white/70"
              />
            </div>
          </Card>

          <Tabs defaultValue="proscons" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="proscons" className="text-base">Pros & Cons</TabsTrigger>
              <TabsTrigger value="matrix" className="text-base">Priority Matrix</TabsTrigger>
            </TabsList>

            <TabsContent value="proscons">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Option A */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-emerald-600" />
                    {optionA || 'Option A'}
                  </h3>
                  
                  {/* Pros A */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-emerald-700">Pros</h4>
                      <Button size="sm" onClick={() => addProCon('prosA')} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {prosA.map((pro) => (
                      <div key={pro.id} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a pro..."
                          value={pro.text}
                          onChange={(e) => updateProCon('prosA', pro.id, 'text', e.target.value)}
                          className="flex-1 bg-emerald-50"
                        />
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={pro.weight}
                          onChange={(e) => updateProCon('prosA', pro.id, 'weight', parseInt(e.target.value))}
                          className="w-16 bg-emerald-50"
                        />
                        <Button size="sm" variant="ghost" onClick={() => removeProCon('prosA', pro.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Cons A */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-red-700">Cons</h4>
                      <Button size="sm" onClick={() => addProCon('consA')} className="bg-red-500 hover:bg-red-600 text-white">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {consA.map((con) => (
                      <div key={con.id} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a con..."
                          value={con.text}
                          onChange={(e) => updateProCon('consA', con.id, 'text', e.target.value)}
                          className="flex-1 bg-red-50"
                        />
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={con.weight}
                          onChange={(e) => updateProCon('consA', con.id, 'weight', parseInt(e.target.value))}
                          className="w-16 bg-red-50"
                        />
                        <Button size="sm" variant="ghost" onClick={() => removeProCon('consA', con.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">{scoreA}</div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                </Card>

                {/* Option B */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    {optionB || 'Option B'}
                  </h3>
                  
                  {/* Pros B */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-emerald-700">Pros</h4>
                      <Button size="sm" onClick={() => addProCon('prosB')} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {prosB.map((pro) => (
                      <div key={pro.id} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a pro..."
                          value={pro.text}
                          onChange={(e) => updateProCon('prosB', pro.id, 'text', e.target.value)}
                          className="flex-1 bg-emerald-50"
                        />
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={pro.weight}
                          onChange={(e) => updateProCon('prosB', pro.id, 'weight', parseInt(e.target.value))}
                          className="w-16 bg-emerald-50"
                        />
                        <Button size="sm" variant="ghost" onClick={() => removeProCon('prosB', pro.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Cons B */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-red-700">Cons</h4>
                      <Button size="sm" onClick={() => addProCon('consB')} className="bg-red-500 hover:bg-red-600 text-white">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {consB.map((con) => (
                      <div key={con.id} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a con..."
                          value={con.text}
                          onChange={(e) => updateProCon('consB', con.id, 'text', e.target.value)}
                          className="flex-1 bg-red-50"
                        />
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={con.weight}
                          onChange={(e) => updateProCon('consB', con.id, 'weight', parseInt(e.target.value))}
                          className="w-16 bg-red-50"
                        />
                        <Button size="sm" variant="ghost" onClick={() => removeProCon('consB', con.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">{scoreB}</div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                </Card>
              </div>

              {/* Results */}
              <Card className="mt-8 p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pros & Cons Analysis</h3>
                <div className="text-center">
                  {scoreA === scoreB ? (
                    <p className="text-lg text-gray-600">It's a tie! Both options score equally. Consider your gut feeling or look at the priority matrix.</p>
                  ) : (
                    <p className="text-lg text-gray-600">
                      Based on weighted pros and cons, <span className="font-bold text-purple-600">{scoreA > scoreB ? (optionA || 'Option A') : (optionB || 'Option B')}</span> scores higher 
                      ({Math.max(scoreA, scoreB)} vs {Math.min(scoreA, scoreB)})
                    </p>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="matrix">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Priority Matrix</h3>
                  <Button onClick={addFactor} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Factor
                  </Button>
                </div>

                {factors.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Target className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Add factors that are important to your decision</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Factor</th>
                          <th className="text-center p-3">Importance (1-10)</th>
                          <th className="text-center p-3">{optionA || 'Option A'} (1-10)</th>
                          <th className="text-center p-3">{optionB || 'Option B'} (1-10)</th>
                          <th className="text-center p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {factors.map((factor) => (
                          <tr key={factor.id} className="border-b">
                            <td className="p-3">
                              <Input
                                placeholder="Factor name..."
                                value={factor.name}
                                onChange={(e) => updateFactor(factor.id, 'name', e.target.value)}
                                className="bg-white/70"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                value={factor.importance}
                                onChange={(e) => updateFactor(factor.id, 'importance', parseInt(e.target.value))}
                                className="w-20 mx-auto bg-white/70"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                value={factor.optionA}
                                onChange={(e) => updateFactor(factor.id, 'optionA', parseInt(e.target.value))}
                                className="w-20 mx-auto bg-white/70"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                value={factor.optionB}
                                onChange={(e) => updateFactor(factor.id, 'optionB', parseInt(e.target.value))}
                                className="w-20 mx-auto bg-white/70"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <Button size="sm" variant="ghost" onClick={() => removeFactor(factor.id)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {factors.length > 0 && (
                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-emerald-50 rounded-lg">
                      <div className="text-3xl font-bold text-emerald-700 mb-2">{matrixScoreA}</div>
                      <div className="text-emerald-600 font-medium">{optionA || 'Option A'}</div>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-700 mb-2">{matrixScoreB}</div>
                      <div className="text-blue-600 font-medium">{optionB || 'Option B'}</div>
                    </div>
                  </div>
                )}

                {factors.length > 0 && (
                  <div className="mt-6 text-center p-4 bg-gray-50 rounded-lg">
                    {matrixScoreA === matrixScoreB ? (
                      <p className="text-lg text-gray-600">Both options score equally in the priority matrix.</p>
                    ) : (
                      <p className="text-lg text-gray-600">
                        Priority matrix suggests: <span className="font-bold text-purple-600">{matrixScoreA > matrixScoreB ? (optionA || 'Option A') : (optionB || 'Option B')}</span>
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DecisionHelper;
