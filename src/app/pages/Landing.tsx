import { Link } from 'react-router';
import { motion } from 'motion/react';
import { 
  Shield, 
  Heart, 
  TrendingUp, 
  Bot, 
  FileCheck, 
  Users, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Activity,
  Target,
  BookOpen,
  Zap,
  FileWarning // Added this import to fix the ReferenceError
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { StatsDisplay } from '../components/StatsCounter';

const shieldFramework = [
  {
    icon: Shield,
    title: 'Strengths',
    description: 'Identify and build upon your existing digital resilience capabilities',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Heart,
    title: 'Healing',
    description: 'Access compassionate support and recovery resources for emotional wellbeing',
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
  },
  {
    icon: Target,
    title: 'Interventions',
    description: 'Learn effective strategies to stop ongoing harassment and prevent escalation',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: Zap,
    title: 'Empowerment',
    description: 'Build self-efficacy and take control of your digital experiences',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    icon: BookOpen,
    title: 'Learning',
    description: 'Understand cyberbullying patterns and develop awareness strategies',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    icon: TrendingUp,
    title: 'Development',
    description: 'Continuous growth in digital safety knowledge and protective behaviors',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

const quickActions = [
  {
    icon: Bot,
    title: 'Talk to Billy',
    description: 'Get immediate support from our empathetic AI companion',
    href: '/billy',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    icon: FileWarning,
    title: 'Anonymous Report',
    description: 'Securely document an incident on your device',
    href: '/report',
    color: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    icon: Shield,
    title: 'SHIELD Assessment',
    description: 'Measure your digital resilience level',
    href: '/shield',
    color: 'bg-emerald-600 hover:bg-emerald-700',
  },
];

export default function Landing() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl"
              >
                <Shield size={64} aria-hidden="true" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering English Adults Against Digital Aggression
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Strategic support, evidence-based resources, and compassionate care for cyberbullying victims
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl"
              >
                <Link to="/billy">
                  <Bot size={20} aria-hidden="true" />
                  Talk to Billy Now
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10"
              >
                <Link to="/awareness">
                  <BookOpen size={20} aria-hidden="true" />
                  Explore Resources
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <StatsDisplay
          stats={[
            {
              label: 'Lifetime Victimization Rate',
              value: 58.2,
              suffix: '%',
              decimals: 1,
              description: 'UK adults who have experienced cyberbullying',
            },
            {
              label: 'Health Impact Cases',
              value: 45.4,
              suffix: '%',
              decimals: 1,
              description: 'Victims with long-term health conditions',
            },
            {
              label: 'Paradox of Passivity',
              value: 69,
              suffix: '%',
              decimals: 0,
              description: 'Adults aware of risks but not taking protective action',
            },
          ]}
        />
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get Support Immediately
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the path that feels right for you. All options are confidential and designed to empower you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link to={action.href}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-blue-200">
                      <CardHeader>
                        <div className={`w-12 h-12 ${action.color} text-white rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                          <Icon size={24} aria-hidden="true" />
                        </div>
                        <CardTitle>{action.title}</CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm font-medium text-blue-600">
                          Get Started
                          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* SHIELD Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="text-blue-600" size={32} aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                The SHIELD Framework
              </h2>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A comprehensive approach to building digital resilience and empowering your online safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shieldFramework.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Card className="h-full bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className={`w-12 h-12 ${item.bgColor} ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
              <Link to="/shield">
                <Activity size={20} aria-hidden="true" />
                Start Your SHIELD Assessment
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Billy Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Bot size={48} aria-hidden="true" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">Meet Billy</h3>
                      <p className="text-blue-100">Your Compassionate AI Support Companion</p>
                    </div>
                  </div>
                  
                  <p className="text-lg mb-6 text-blue-50">
                    Billy provides 24/7 empathetic support, helping you navigate cyberbullying challenges with personalized guidance based on Protection Motivation Theory and Theory of Planned Behavior.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      'Immediate emotional support',
                      'Personalized action plans',
                      'Crisis resource access',
                      'Complete privacy - chats stored locally',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle size={20} className="text-emerald-300" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-blue-50"
                  >
                    <Link to="/billy">
                      <Sparkles size={20} aria-hidden="true" />
                      Start Conversation
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm italic">"I'm experiencing harassment at work through professional networks..."</p>
                    </div>
                    <div className="bg-blue-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Bot size={20} className="flex-shrink-0 mt-1" aria-hidden="true" />
                        <p className="text-sm">
                          "I'm sorry you're going through this. Professional cyberbullying is serious and you have rights. Let's explore documentation strategies and workplace protections together..."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl"
        >
          <AlertTriangle size={48} className="mx-auto mb-4 text-amber-300" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Breaking the Paradox of Passivity
          </h2>
          <p className="text-xl mb-6 text-blue-50 max-w-2xl mx-auto">
            69% of UK adults know the risks but don't act. We're here to change that by reducing cognitive load and building self-efficacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Link to="/awareness">
                <BookOpen size={20} aria-hidden="true" />
                Learn More
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              <Link to="/resources">
                <FileCheck size={20} aria-hidden="true" />
                Access Resources
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}