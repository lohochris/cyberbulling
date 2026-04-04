import { motion } from 'motion/react';
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
  Activity
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
    description: 'Digital crime prevention through capable guardianship and target hardening',
    keyComponents: [
      'Motivated offenders in online spaces',
      'Suitable targets (vulnerable users)',
      'Absence of capable guardians',
      'Convergence in digital environments',
    ],
  },
];

const keyStudies = [
  {
    authors: 'Alhaboby et al.',
    year: 2023,
    title: 'Cyberbullying and Long-Term Health Conditions in English Adults',
    finding: '45.4% of cyberbullying victims report chronic health conditions',
  },
  {
    authors: 'Peck & Holt',
    year: 2024,
    title: 'The Paradox of Passivity: Awareness Without Action',
    finding: '69% of UK adults aware of risks but not taking protective measures',
  },
  {
    authors: 'Kaluarachchi & Smith',
    year: 2026,
    title: 'Fist-to-Click: Offline-Online Bullying Escalation',
    finding: 'Strong correlation between workplace conflicts and professional cyberbullying',
  },
  {
    authors: 'Stanford Research Group',
    year: 2025,
    title: 'Self-Efficacy Scale for Digital Resilience',
    finding: 'Validated 10-point scale measuring cyberbullying coping capabilities',
  },
];

export default function Research() {
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
              Research & Methodology
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Evidence-based framework grounded in peer-reviewed research and validated psychological theories
          </p>
        </motion.div>

        {/* Theoretical Framework */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GitBranch className="text-blue-600" size={32} aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Theoretical Frameworks</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    <Card className="h-full hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                          <Icon size={28} aria-hidden="true" />
                        </div>
                        <Badge className="w-fit mb-2">{framework.acronym}</Badge>
                        <CardTitle className="text-xl">{framework.name}</CardTitle>
                        <CardDescription>{framework.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-4" />
                        <ul className="space-y-2">
                          {framework.keyComponents.map((component, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <Activity className="flex-shrink-0 mt-0.5 text-blue-600" size={14} aria-hidden="true" />
                              <span>{component}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Integration Model */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 border-2 border-blue-200">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <Microscope className="text-blue-600 flex-shrink-0" size={32} aria-hidden="true" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Integrated Theoretical Model
                    </h3>
                    <p className="text-slate-700">
                      This system uniquely combines PMT, TPB, and RAT to address the multifaceted nature of adult cyberbullying in England
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-blue-200">
                    <h4 className="font-semibold text-slate-900 mb-3">Individual Level (PMT + TPB)</h4>
                    <p className="text-sm text-slate-700">
                      Building self-efficacy, reducing cognitive barriers, and empowering protective behaviors through education and support
                    </p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-purple-200">
                    <h4 className="font-semibold text-slate-900 mb-3">Social Level (TPB)</h4>
                    <p className="text-sm text-slate-700">
                      Normalizing help-seeking, providing bystander intervention tools, and reducing stigma around victimization
                    </p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-emerald-200">
                    <h4 className="font-semibold text-slate-900 mb-3">Environmental Level (RAT)</h4>
                    <p className="text-sm text-slate-700">
                      Acting as the "capable guardian" through reporting systems, resource access, and safety work tools
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Key Studies */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Quote className="text-blue-600" size={32} aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Foundational Research</h2>
            </div>

            <div className="space-y-4">
              {keyStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{study.year}</Badge>
                            <h3 className="font-semibold text-slate-900">{study.authors}</h3>
                          </div>
                          <p className="text-slate-700 mb-2 italic">{study.title}</p>
                          <div className="flex items-start gap-2 mt-3 p-3 bg-blue-50 rounded-lg">
                            <Activity className="text-blue-600 flex-shrink-0 mt-0.5" size={16} aria-hidden="true" />
                            <p className="text-sm text-blue-900">
                              <strong>Key Finding:</strong> {study.finding}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="flex-shrink-0">
                          <ExternalLink size={16} aria-hidden="true" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Microscope className="text-blue-600" size={32} aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Research Methodology</h2>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Mixed-Methods Approach</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Quantitative Components</h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li>• Validated scales for self-efficacy (Stanford)</li>
                        <li>• Digital resilience measurement (SHIELD)</li>
                        <li>• Victimization prevalence surveys</li>
                        <li>• Behavioral intention assessments (TPB)</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Qualitative Components</h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li>• Semi-structured victim interviews</li>
                        <li>• Thematic analysis of incident reports</li>
                        <li>• User experience testing (Billy AI)</li>
                        <li>• Stakeholder consultations (NHS, police)</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-4 mt-8">Ethical Considerations</h3>
                  <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded">
                    <p className="text-sm text-slate-700 mb-2">
                      <strong>Priority:</strong> This system prioritizes participant safety and data sovereignty. All data remains on users' devices, no transmission to external servers occurs without explicit consent, and crisis support resources are prominently displayed.
                    </p>
                    <p className="text-sm text-slate-700">
                      Research protocols approved by institutional ethics board with special provisions for vulnerable populations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Advisory Board */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-blue-600" size={32} aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Advisory Board</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { role: 'Clinical Psychologist', org: 'NHS Mental Health' },
                { role: 'Cybersecurity Researcher', org: 'University of Oxford' },
                { role: 'Online Safety Officer', org: 'Ofcom' },
                { role: 'Victim Support Advocate', org: 'National Bullying Helpline' },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="text-blue-600" size={28} aria-hidden="true" />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-1">{member.role}</h4>
                      <p className="text-sm text-slate-600">{member.org}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <Mail className="mx-auto mb-4 text-blue-100" size={48} aria-hidden="true" />
              <h3 className="text-2xl font-bold mb-4">Interested in Our Research?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                We welcome collaboration opportunities, academic partnerships, and feedback from the research community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50"
                >
                  <Download size={20} aria-hidden="true" />
                  Download Full Report
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                >
                  <Mail size={20} aria-hidden="true" />
                  Contact Research Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
