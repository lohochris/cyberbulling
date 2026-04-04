import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Activity, 
  Target, 
  BarChart3, 
  TrendingUp,
  Heart,
  BookOpen,
  Zap,
  CheckCircle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Slider } from '../components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { useStore } from '../store/useStore';
import { saveAssessment } from '../services/db';
import { SHIELDAssessment } from '../types';
import { toast } from 'sonner';

// 1. Define the keys strictly to prevent TypeScript indexing errors
type ShieldKey = 'strengths' | 'healing' | 'interventions' | 'empowerment' | 'learning' | 'development';

const shieldDimensions: { key: ShieldKey; label: string; icon: any; color: string; bgColor: string; description: string }[] = [
  { key: 'strengths', label: 'Strengths', icon: Shield, color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Current digital resilience capabilities' },
  { key: 'healing', label: 'Healing', icon: Heart, color: 'text-rose-600', bgColor: 'bg-rose-100', description: 'Emotional recovery and support access' },
  { key: 'interventions', label: 'Interventions', icon: Target, color: 'text-orange-600', bgColor: 'bg-orange-100', description: 'Effective strategies to stop harassment' },
  { key: 'empowerment', label: 'Empowerment', icon: Zap, color: 'text-amber-600', bgColor: 'bg-amber-100', description: 'Self-efficacy and control over experiences' },
  { key: 'learning', label: 'Learning', icon: BookOpen, color: 'text-emerald-600', bgColor: 'bg-emerald-100', description: 'Understanding patterns and awareness' },
  { key: 'development', label: 'Development', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-100', description: 'Continuous growth in digital safety' },
];

export default function SHIELD() {
  const { shieldProgress, updateResilienceScore } = useStore();
  const [isAssessing, setIsAssessing] = useState(false);
  
  const [scores, setScores] = useState<Record<ShieldKey, number>>({
    strengths: 0,
    healing: 0,
    interventions: 0,
    empowerment: 0,
    learning: 0,
    development: 0,
  });

  const handleStartAssessment = () => {
    setScores({ strengths: 0, healing: 0, interventions: 0, empowerment: 0, learning: 0, development: 0 });
    setIsAssessing(true);
  };

  const handleScoreChange = (dimension: ShieldKey, value: number[]) => {
    setScores(prev => ({ ...prev, [dimension]: value[0] }));
  };

  const calculateOverallScore = () => {
    const values = Object.values(scores);
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round((sum / values.length) * 10);
  };

  const handleSubmitAssessment = async () => {
    const overallScore = calculateOverallScore();
    const assessment: SHIELDAssessment = {
      id: `assessment-${Date.now()}`,
      timestamp: Date.now(),
      ...scores,
      overallScore,
    };

    await saveAssessment(assessment);
    updateResilienceScore(overallScore);
    setIsAssessing(false);
    toast.success('Assessment Complete', { description: `Your SHIELD score: ${overallScore}/100` });
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-emerald-600' };
    if (score >= 60) return { label: 'Strong', color: 'text-blue-600' };
    if (score >= 40) return { label: 'Developing', color: 'text-amber-600' };
    return { label: 'Initial', color: 'text-slate-400' };
  };

  const currentDisplayScore = isAssessing ? calculateOverallScore() : shieldProgress.resilienceScore;
  const scoreLevel = getScoreLevel(currentDisplayScore);

  return (
    <div className="min-h-screen py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="text-blue-600" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">SHIELD Dashboard</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">Build and track your digital resilience in real-time</p>
        </motion.div>

        {/* Score Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <Card className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white border-0 shadow-2xl overflow-hidden relative">
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-xl font-medium text-blue-200 mb-2 uppercase tracking-widest text-sm">Resilience Level</h2>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-7xl md:text-8xl font-bold tabular-nums">{currentDisplayScore}</span>
                    <span className="text-2xl text-blue-300/60 font-light">/ 100</span>
                  </div>
                  <Badge className={`${scoreLevel.color} bg-white text-md px-4 py-1.5 font-bold shadow-lg border-0`}>
                    {scoreLevel.label}
                  </Badge>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4 text-blue-100">
                    <span className="text-sm font-medium">Live Progress</span>
                    <span className="text-2xl font-bold tabular-nums">{currentDisplayScore}%</span>
                  </div>
                  <Progress value={currentDisplayScore} className="h-3 bg-white/10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Assessment Portal</h2>
              {!isAssessing && (
                <Button onClick={handleStartAssessment} className="shadow-md">
                  <Activity size={18} className="mr-2" />
                  {shieldProgress.resilienceScore > 0 ? 'Retake Assessment' : 'New Assessment'}
                </Button>
              )}
            </div>

            {isAssessing ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                
                {/* INSTRUCTION FIX: Added flex-row and w-full to prevent the vertical squashing */}
                <Alert className="bg-white border-blue-100 shadow-sm border-l-4 border-l-blue-500 p-6 flex flex-row items-center gap-6 w-full max-w-full overflow-hidden">
                  <div className="bg-blue-50 p-3 rounded-full shrink-0">
                    <Info className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <AlertTitle className="text-slate-900 font-bold text-lg mb-1">Quick Guide</AlertTitle>
                    <AlertDescription className="text-slate-600 leading-relaxed text-sm">
                      Adjust each category using the sliders. Ratings range from 
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 mx-1.5 font-bold bg-slate-100 text-slate-700 rounded border border-slate-200">0</span> 
                      to 
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 mx-1.5 font-bold bg-blue-600 text-white rounded shadow-sm">10</span>.
                      Your overall resilience will sync automatically.
                    </AlertDescription>
                  </div>
                </Alert>

                {shieldDimensions.map((dimension, index) => (
                  <motion.div key={dimension.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                    <Card className="hover:border-blue-200 transition-all border-slate-200/60">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 ${dimension.bgColor} ${dimension.color} rounded-xl`}>
                            <dimension.icon size={22} />
                          </div>
                          <div>
                            <CardTitle className="text-md font-bold">{dimension.label}</CardTitle>
                            <CardDescription className="text-xs">{dimension.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-6">
                          <Slider
                            value={[scores[dimension.key]]}
                            onValueChange={(value) => handleScoreChange(dimension.key, value)}
                            min={0} max={10} step={1}
                            className="flex-1"
                          />
                          <div className={`w-14 h-10 flex items-center justify-center rounded-lg font-bold text-lg border-2 ${dimension.color} bg-slate-50 border-current/10`}>
                            {scores[dimension.key]}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                
                <div className="flex gap-4 pt-6">
                  <Button variant="ghost" onClick={() => setIsAssessing(false)} className="flex-1 h-12">Discard Changes</Button>
                  <Button onClick={handleSubmitAssessment} className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                    <CheckCircle size={18} className="mr-2" /> Complete & Save Profile
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Card className="border-2 border-dashed border-slate-200 bg-white p-16 text-center">
                  <Target className="text-blue-500 mx-auto mb-6" size={40} />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready for a fresh start?</h3>
                  <Button onClick={handleStartAssessment} size="lg" className="mt-8 px-10">
                    Begin New Assessment
                  </Button>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <BarChart3 className="text-blue-600" size={20} /> 
                  Metrics tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {shieldDimensions.map((dim) => {
                  // FIX: Use optional chaining and type casting to avoid indexing errors
                  const historicalValue = (shieldProgress as any)[dim.key] || 0;
                  const displayValue = isAssessing ? scores[dim.key] : historicalValue;
                  return (
                    <div key={dim.key}>
                      <div className="flex justify-between text-[10px] mb-2 uppercase font-bold text-slate-500">
                        <span>{dim.label}</span>
                        <span className="text-slate-900">{displayValue}/10</span>
                      </div>
                      <Progress value={displayValue * 10} className="h-1.5" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}