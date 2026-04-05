import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Sparkles, ShieldAlert, Building2, HeartPulse, FileWarning, 
  ChevronRight, Wifi, Briefcase, Activity, 
  CheckCircle, X, RotateCcw, Info, Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useStore } from '../store/useStore';

const modules = [
  {
    id: 'fist-to-click',
    title: 'Fist-to-Click Bullying',
    description: 'Transition of offline conflict into persistent digital harassment',
    icon: Building2,
    duration: 6,
    color: 'bg-orange-600',
    sections: [
      { title: 'Definition', content: 'Migration of offline conflicts into persistent digital environments where harm is amplified.' },
      { title: 'Core Characteristics', content: 'Anonymity, persistence, scalability, and reduced accountability.' },
      { title: 'Mechanisms', content: 'Offline disputes escalate via social media exposure, messaging leaks, and public posts.' },
      { title: 'Real-world Manifestations', content: 'Public shaming, screenshot exposure, coordinated harassment.' },
      { title: 'Implications', content: 'Continuous exposure leads to psychological stress and reputational harm.' }
    ]
  },
  {
    id: 'born-digital',
    title: 'Born-Digital Aggression',
    description: 'Aggression originating entirely within digital ecosystems',
    icon: Wifi,
    duration: 5,
    color: 'bg-blue-600',
    sections: [
      { title: 'Definition', content: 'Hostility that originates purely within digital platforms.' },
      { title: 'Core Characteristics', content: 'Identity masking, anonymity, and algorithmic amplification.' },
      { title: 'Mechanisms', content: 'Use of comments, reposts, and tagging to escalate conflict.' },
      { title: 'Real-world Manifestations', content: 'Trolling, flaming, cancel dynamics.' },
      { title: 'Implications', content: 'Creates unsafe digital environments and normalizes aggression.' }
    ]
  },
  {
    id: 'professional-doxing',
    title: 'Professional Doxing & Career Attacks',
    description: 'Targeted reputational and career-based digital attacks',
    icon: Briefcase,
    duration: 7,
    color: 'bg-purple-600',
    sections: [
      { title: 'Definition', content: 'Exposure or misuse of personal/professional data to damage careers.' },
      { title: 'Core Characteristics', content: 'Targeted attacks, amplification, data exploitation.' },
      { title: 'Mechanisms', content: 'Use of public records, social profiles, and coordinated campaigns.' },
      { title: 'Real-world Manifestations', content: 'LinkedIn attacks, fake reviews, email leaks.' },
      { title: 'Implications', content: 'Job loss, reputation damage, long-term consequences.' }
    ]
  },
  {
    id: 'health-triggers',
    title: 'Public Health & Digital Stress',
    description: 'Psychological and societal impacts of digital aggression',
    icon: HeartPulse,
    duration: 8,
    color: 'bg-rose-600',
    sections: [
      { title: 'Definition', content: 'Cyberbullying viewed through a public health perspective.' },
      { title: 'Core Characteristics', content: 'Chronic stress, emotional strain, population-level impact.' },
      { title: 'Mechanisms', content: 'Repeated exposure triggers psychological responses.' },
      { title: 'Real-world Manifestations', content: 'Anxiety, depression, burnout, withdrawal.' },
      { title: 'Implications', content: 'Requires structured intervention and policy-level response.' }
    ]
  },
];

const infographics = [
  {
    title: 'The Anatomy of Cyberbullying',
    description: 'Visual breakdown of harassment patterns',
    data: [
      'Intentionality: Deliberate actions meant to cause distress or harm.',
      'Repetition: Harassment occurs multiple times over a period.',
      'Power Imbalance: Exploitation of social status or numerical advantage.',
      'Digital Amplification: Information spreads 5x faster online than offline.',
      'Anonymity Effect: Aggressors act with reduced empathy due to distancing.'
    ],
    downloads: 1234,
  },
  {
    title: 'Digital Evidence Collection Guide',
    description: 'Step-by-step documentation',
    data: [
      'Full-Page Screenshots: Capture entire screen including taskbars.',
      'Direct URLs: Document specific links to abusive content.',
      'Timestamps: Ensure system clock is visible in captures.',
      'Metadata: Save original files (emails/images) for technical proof.',
      'Redundancy: Keep one cloud copy and one physical offline copy.'
    ],
    downloads: 987,
  },
  {
    title: 'Platform Safety Settings',
    description: 'Privacy configuration guide',
    data: [
      '2FA: Prevents account takeover and identity theft.',
      'Comment Filtering: Hide aggressive language automatically.',
      'Account Visibility: Toggle to "Private" for verified followers only.',
      'Tagging Approvals: Manually approve posts before they show.',
      'Restricted Mode: Hide bullies without notifying them.'
    ],
    downloads: 1567,
  },
];

export default function Awareness() {
  const { completeModule, resetProgress, shieldProgress } = useStore();
  const [activeModule, setActiveModule] = useState<any>(null);
  const [showInfographic, setShowInfographic] = useState<any>(null);
  const [isRotating, setIsRotating] = useState(false);

  const handleReset = () => {
    setIsRotating(true);
    resetProgress();
    setTimeout(() => setIsRotating(false), 500);
  };

  const completionPercentage = Math.round((shieldProgress.modulesCompleted.length / modules.length) * 100);

  return (
    <div className="min-h-screen py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex gap-3 items-center text-slate-900">
              <BookOpen className="text-blue-600" size={32} />
              Awareness Hub
            </h1>
            <p className="text-slate-500 mt-1">
              Comprehensive digital awareness training modules.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleReset}
            title="Reset learning progress"
            aria-label="Reset learning progress"
            className="cursor-pointer border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            <motion.div
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <RotateCcw size={16} className="mr-2" />
            </motion.div>
            Reset Progress
          </Button>
        </div>

        {/* UNIFORM PROGRESS CARD */}
        <Card className="mb-12 border-none bg-white shadow-sm border border-slate-100">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Overall Completion</p>
                  <h3 className="text-xl font-bold text-slate-900">
                    {shieldProgress.modulesCompleted.length} of {modules.length} Modules Mastered
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 w-full sm:w-64">
                <div className="flex justify-between w-full mb-1">
                  <span className="text-sm font-bold text-blue-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    className="bg-blue-600 h-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MODULES */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {modules.map((module) => {
            const Icon = module.icon;
            const isCompleted = shieldProgress.modulesCompleted.includes(module.id);

            return (
              <Card key={module.id} className="hover:border-blue-200 transition-colors shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex justify-between mb-4">
                    <div className={`${module.color} p-2.5 rounded-lg text-white shadow-sm`}>
                      <Icon size={20} />
                    </div>

                    {isCompleted && (
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100">
                        <CheckCircle size={12} className="mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-slate-500 leading-relaxed">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-between items-center border-t border-slate-50 pt-4">
                  <span className="text-xs font-medium text-slate-400 uppercase">{module.duration} min session</span>

                  <Button
                    size="sm"
                    onClick={() => setActiveModule(module)}
                    title={`Open ${module.title}`}
                    aria-label={`Open ${module.title}`}
                    className={`cursor-pointer ${
                      isCompleted ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-none' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isCompleted ? 'Review' : 'Start'}
                    <ChevronRight size={14} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* INFOGRAPHICS */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 flex gap-2 items-center text-slate-800">
            <Info size={20} className="text-blue-500" /> Interactive Insights
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {infographics.map((item) => (
              <Card 
                key={item.title}
                onClick={() => setShowInfographic(item)}
                className="cursor-pointer hover:border-blue-300 transition-all group shadow-sm"
                title={`View ${item.title}`}
                aria-label={`View ${item.title}`}
              >
                <CardHeader>
                  <div className="w-9 h-9 rounded-md bg-slate-50 text-slate-400 flex items-center justify-center mb-2 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Eye size={18} />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-1">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* MODULE MODAL */}
        <AnimatePresence>
          {activeModule && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
                <div className="p-5 border-b flex justify-between items-center bg-white sticky top-0">
                  <h2 className="text-lg font-bold text-slate-900">{activeModule.title}</h2>
                  <button
                    onClick={() => setActiveModule(null)}
                    title="Close module"
                    aria-label="Close module"
                    className="cursor-pointer p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto">
                  {activeModule.sections.map((s: any, i: number) => (
                    <div key={i} className="border-l-2 border-blue-500 pl-4 py-1">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-1">{s.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{s.content}</p>
                    </div>
                  ))}

                  <Button
                    onClick={() => {
                      completeModule(activeModule.id);
                      setActiveModule(null);
                    }}
                    title="Mark module as completed"
                    aria-label="Mark module as completed"
                    className="w-full bg-blue-600 hover:bg-blue-700 h-11 cursor-pointer mt-4"
                  >
                    Complete Session
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* INFOGRAPHIC MODAL */}
          {showInfographic && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
                <button 
                  onClick={() => setShowInfographic(null)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 cursor-pointer"
                  title="Close insight"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{showInfographic.title}</h3>
                </div>

                <div className="space-y-4">
                  {showInfographic.data.map((point: string, i: number) => (
                    <div key={i} className="flex gap-3 items-start p-2 rounded-lg bg-slate-50/50">
                      <div className="mt-1.5 min-w-[5px] h-[5px] rounded-full bg-blue-400" />
                      <p className="text-slate-600 text-sm leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full mt-6 bg-slate-900 hover:bg-black h-10" 
                  onClick={() => setShowInfographic(null)}
                >
                  Close Insights
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}