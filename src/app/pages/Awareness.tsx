import { motion } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  ShieldAlert, 
  Building2, 
  HeartPulse, 
  FileWarning, 
  Download,
  ChevronRight,
  Wifi,
  Zap,
  Briefcase,
  Activity,
  AlertTriangle,
  CheckCircle,
  Play
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useStore } from '../store/useStore';

const modules = [
  {
    id: 'fist-to-click',
    title: 'Fist-to-Click Bullying',
    description: 'Understanding how offline conflicts escalate to online harassment',
    icon: Building2,
    secondaryIcon: AlertTriangle,
    duration: 15,
    color: 'bg-orange-600',
    content: 'Learn to recognize when workplace or community conflicts transition to digital aggression.',
  },
  {
    id: 'born-digital',
    title: 'Born-Digital Aggression',
    description: 'Pure online harassment with no offline connection',
    icon: Wifi,
    secondaryIcon: Zap,
    duration: 12,
    color: 'bg-blue-600',
    content: 'Understand cyberbullying that originates entirely in digital spaces.',
  },
  {
    id: 'professional-doxing',
    title: 'Professional Doxing & Character Assassination',
    description: 'Targeted attacks on professional reputation and career',
    icon: Briefcase,
    secondaryIcon: FileWarning,
    duration: 18,
    color: 'bg-purple-600',
    content: 'Protect your professional identity and understand your workplace rights.',
  },
  {
    id: 'health-triggers',
    title: 'Public Health Triggers',
    description: 'Cyberbullying impacts on those with long-term health conditions',
    icon: HeartPulse,
    secondaryIcon: Activity,
    duration: 20,
    color: 'bg-rose-600',
    content: 'Special considerations for managing health while experiencing digital aggression.',
  },
];

const infographics = [
  {
    title: 'The Anatomy of Cyberbullying',
    description: 'Visual breakdown of harassment patterns',
    downloads: 1234,
  },
  {
    title: 'Digital Evidence Collection Guide',
    description: 'Step-by-step documentation process',
    downloads: 987,
  },
  {
    title: 'Platform Safety Settings',
    description: 'Comprehensive privacy configuration guide',
    downloads: 1567,
  },
];

export default function Awareness() {
  const { completeModule, shieldProgress } = useStore();

  const handleCompleteModule = (moduleId: string) => {
    completeModule(moduleId);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-blue-600" size={40} aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Awareness Hub
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Evidence-based education modules to help you understand, recognize, and respond to cyberbullying
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">Your Learning Progress</h3>
                  <p className="text-slate-600">
                    {shieldProgress.modulesCompleted.length} of {modules.length} modules completed
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="text-amber-500" size={24} aria-hidden="true" />
                  <span className="text-2xl font-bold text-blue-600">
                    {Math.round((shieldProgress.modulesCompleted.length / modules.length) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Educational Modules */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldAlert className="text-blue-600" size={28} aria-hidden="true" />
            Educational Modules
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const SecondaryIcon = module.secondaryIcon;
              const isCompleted = shieldProgress.modulesCompleted.includes(module.id);

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${module.color} text-white rounded-lg flex items-center justify-center`}>
                            <Icon size={24} aria-hidden="true" />
                          </div>
                          <SecondaryIcon className="text-slate-400" size={20} aria-hidden="true" />
                        </div>
                        {isCompleted && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                            <CheckCircle size={14} className="mr-1" aria-hidden="true" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription className="text-base">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">{module.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">{module.duration} minutes</span>
                        <Button
                          onClick={() => handleCompleteModule(module.id)}
                          disabled={isCompleted}
                          className={isCompleted ? 'bg-slate-400' : ''}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle size={16} aria-hidden="true" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play size={16} aria-hidden="true" />
                              Start Module
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Infographics & Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles className="text-amber-500" size={28} aria-hidden="true" />
            Interactive Infographics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infographics.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="h-full bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                      <FileWarning className="text-blue-600" size={48} aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{item.downloads.toLocaleString()} downloads</span>
                      <Button size="sm" variant="outline">
                        <Download size={16} aria-hidden="true" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Deep Dive Tabs */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Deep Dive Topics</h2>
          
          <Tabs defaultValue="recognition" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
              <TabsTrigger value="recognition" className="py-3">
                Recognition Patterns
              </TabsTrigger>
              <TabsTrigger value="impact" className="py-3">
                Psychological Impact
              </TabsTrigger>
              <TabsTrigger value="response" className="py-3">
                Effective Responses
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recognition" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recognizing Cyberbullying Patterns</CardTitle>
                  <CardDescription>
                    Learn to identify different forms of online harassment and aggression
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      'Repeated targeted messages with hostile intent',
                      'Public shaming or humiliation campaigns',
                      'Sharing private information without consent (doxing)',
                      'Impersonation or identity theft',
                      'Coordinated group harassment (brigading)',
                      'Professional reputation attacks',
                    ].map((pattern, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <ChevronRight className="text-blue-600 flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
                        <p className="text-slate-700">{pattern}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="impact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Understanding Psychological Impact</CardTitle>
                  <CardDescription>
                    Research-backed insights into how cyberbullying affects mental health
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700">
                    Studies show that cyberbullying can have severe psychological consequences, particularly for adults managing long-term health conditions. 45.4% of cyberbullying victims report having chronic health issues, which can be exacerbated by digital aggression.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                    <h4 className="font-semibold text-blue-900 mb-2">Key Research Findings</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-start gap-2">
                        <Activity className="flex-shrink-0 mt-1" size={16} aria-hidden="true" />
                        <span>Increased anxiety and depression symptoms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Activity className="flex-shrink-0 mt-1" size={16} aria-hidden="true" />
                        <span>Sleep disruption and chronic stress</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Activity className="flex-shrink-0 mt-1" size={16} aria-hidden="true" />
                        <span>Reduced work performance and productivity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Activity className="flex-shrink-0 mt-1" size={16} aria-hidden="true" />
                        <span>Social withdrawal and isolation</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="response" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Effective Response Strategies</CardTitle>
                  <CardDescription>
                    Evidence-based approaches to handling cyberbullying incidents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Document Everything', desc: 'Screenshot, save URLs, note timestamps' },
                      { title: 'Block & Report', desc: 'Use platform tools immediately' },
                      { title: 'Seek Support', desc: 'Talk to trusted friends, family, or Billy' },
                      { title: 'Legal Action', desc: 'Know your rights under Online Safety Act 2023' },
                      { title: 'Self-Care', desc: 'Prioritize mental health and wellbeing' },
                      { title: 'Professional Help', desc: 'Contact HR, police, or legal advisors if needed' },
                    ].map((strategy, i) => (
                      <div key={i} className="p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
                        <h4 className="font-semibold text-slate-900 mb-1">{strategy.title}</h4>
                        <p className="text-sm text-slate-600">{strategy.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
