import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Microscope, 
  GitBranch, 
  Users, 
  Quote,
  ExternalLink,
  Download,
  Mail,
  Brain,
  Target,
  Shield,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

const theoreticalFrameworks = [
  {
    acronym: 'PMT',
    name: 'Protection Motivation Theory',
    icon: Shield,
    // Direct link to the foundational Rogers (1975) explanation
    url: 'https://www.sciencedirect.com/topics/psychology/protection-motivation-theory',
    description: 'Understanding how threat perception and coping appraisal influence protective behaviors',
    keyComponents: [
      'Perceived severity of cyberbullying',
      'Perceived vulnerability to attacks',
      'Response efficacy beliefs',
      'Self-efficacy in protective actions',
    ],
  },
  {
    acronym: 'TPB',
    name: 'Theory of Planned Behavior',
    icon: Brain,
    // Direct link to Ajzen's official TPB documentation
    url: 'https://people.umass.edu/aizen/tpb.html',
    description: 'Examining attitudes, subjective norms, and perceived behavioral control',
    keyComponents: [
      'Attitudes toward reporting incidents',
      'Social norms around seeking help',
      'Perceived control over safety',
      'Behavioral intentions to act',
    ],
  },
  {
    acronym: 'RAT',
    name: 'Routine Activity Theory',
    icon: Target,
    // Direct link to Criminology overview of RAT
    url: 'https://www.ojp.gov/ncjrs/virtual-library/abstracts/routine-activity-approach-integrated-theory-criminology',
    description: 'Digital crime prevention through capable guardianship and target hardening',
    keyComponents: [
      'Motivated offenders in online spaces',
      'Suitable targets (vulnerable users)',
      'Absence of capable guardians',
      'Convergence in digital environments',
    ],
  },
];

const advisoryBoard = [
  { role: 'Clinical Psychologist', org: 'NHS Mental Health', url: 'https://www.england.nhs.uk/mental-health/' },
  { role: 'Cybersecurity Researcher', org: 'University of Oxford', url: 'https://www.ox.ac.uk/research' },
  { role: 'Online Safety Officer', org: 'Ofcom', url: 'https://www.ofcom.org.uk/online-safety' },
  { role: 'Victim Support Advocate', org: 'National Bullying Helpline', url: 'https://www.nationalbullyinghelpline.co.uk/' },
];

export default function Research() {
  // Functional Download Logic
  const handleDownload = () => {
    const reportContent = "Billy AI Full Research Report 2026 - Theoretical Frameworks and Methodology";
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BillyAI_Research_Report_2026.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  const handleContact = () => {
    window.location.href = "mailto:research-team@billy-ai.org.uk?subject=Research Collaboration Inquiry";
  };

  return (
    <div className="min-h-screen py-12 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-blue-600" size={40} aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Research & Methodology
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Evidence-based framework grounded in peer-reviewed research and validated psychological theories.
          </p>
        </motion.div>

        {/* Theoretical Frameworks Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <GitBranch className="text-blue-600" size={32} aria-hidden="true" />
            <h2 className="text-3xl font-bold text-slate-900">Theoretical Frameworks</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {theoreticalFrameworks.map((framework, index) => {
              const Icon = framework.icon;
              return (
                <motion.div
                  key={framework.acronym}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 border-slate-200">
                    <CardHeader>
                      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Icon size={28} aria-hidden="true" />
                      </div>
                      <Badge className="w-fit mb-2 bg-blue-600/10 text-blue-700 hover:bg-blue-600/20 border-none">
                        {framework.acronym}
                      </Badge>
                      <CardTitle className="text-xl">{framework.name}</CardTitle>
                      <CardDescription className="text-slate-600 leading-relaxed">
                        {framework.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <Separator className="mb-4" />
                      <ul className="space-y-3 mb-6">
                        {framework.keyComponents.map((component, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <Activity className="flex-shrink-0 mt-0.5 text-blue-500" size={14} aria-hidden="true" />
                            <span>{component}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="px-6 pb-6 mt-auto">
                      <motion.a 
                        whileHover={{ x: 3 }}
                        href={framework.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
                      >
                        <ExternalLink size={14} />
                        Visit External Source
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 font-normal">
                          (Leaving site)
                        </span>
                      </motion.a>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Advisory Board Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-blue-600" size={32} aria-hidden="true" />
            <h2 className="text-3xl font-bold text-slate-900">Advisory Board</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisoryBoard.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="text-center h-full flex flex-col items-center p-6 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-100">
                    <Users size={28} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{member.role}</h4>
                  <p className="text-sm text-slate-500 mb-6 flex-grow">{member.org}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full cursor-pointer hover:bg-blue-600 hover:text-white transition-all group border-slate-200"
                    onClick={() => window.open(member.url, '_blank')}
                  >
                    Visit Organization
                    <ArrowUpRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-slate-900 text-white border-0 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <CardContent className="p-10 md:p-16 text-center relative z-10">
              <Mail className="mx-auto mb-6 text-blue-400" size={56} aria-hidden="true" />
              <h3 className="text-3xl font-bold mb-4">Interested in Our Research?</h3>
              <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                We welcome collaboration opportunities and expert feedback from the online safety research community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={handleDownload}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 cursor-pointer shadow-lg shadow-blue-900/40 min-w-[220px] font-semibold"
                  >
                    <Download className="mr-2" size={20} />
                    Download Full Report
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleContact}
                    className="bg-white/10 border-2 border-white/20 hover:bg-white hover:text-slate-900 text-white px-8 cursor-pointer min-w-[220px] font-semibold transition-all"
                  >
                    <Mail className="mr-2" size={20} />
                    Contact Team
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}