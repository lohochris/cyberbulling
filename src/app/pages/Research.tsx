import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GitBranch, 
  Users, 
  ExternalLink,
  Download,
  Mail,
  Brain,
  Target,
  Shield,
  Activity,
  ArrowUpRight,
  X,
  Send,
  CheckCircle2
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
    url: 'https://www.simplypsychology.org/theory-of-planned-behavior.html',
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
    url: 'https://www.youtube.com/watch?v=PTdvABcsJCc',
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleDownload = () => {
    const reportContent = "Billy AI Full Research Report 2026 - Theoretical Frameworks and Methodology";
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BillyAI_Research_Report_2026.txt');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Research Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent via Billy AI Research Portal`
    );
    
    // Show confirmation state
    setSubmitted(true);
    
    // Trigger mail client
    window.location.href = `mailto:michaelakpla@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form data
    setFormData({ name: '', email: '', message: '' });
  };

  const closePortal = () => {
    setIsFormOpen(false);
    setTimeout(() => setSubmitted(false), 300); // Reset after exit animation
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
        <section className="mb-20" aria-labelledby="frameworks-title">
          <div className="flex items-center gap-3 mb-8">
            <GitBranch className="text-blue-600" size={32} aria-hidden="true" />
            <h2 id="frameworks-title" className="text-3xl font-bold text-slate-900">Theoretical Frameworks</h2>
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
                        title={`Read more about ${framework.name} on an external site`}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                        Visit External Source
                      </motion.a>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Advisory Board Section */}
        <section className="mb-20" aria-labelledby="advisory-title">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-blue-600" size={32} aria-hidden="true" />
            <h2 id="advisory-title" className="text-3xl font-bold text-slate-900">Advisory Board</h2>
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
                    <Users size={28} aria-hidden="true" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{member.role}</h4>
                  <p className="text-sm text-slate-500 mb-6 flex-grow">{member.org}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    title={`Visit ${member.org} website`}
                    className="w-full cursor-pointer hover:bg-blue-600 hover:text-white transition-all group border-slate-200"
                    onClick={() => window.open(member.url, '_blank')}
                  >
                    Visit Organization
                    <ArrowUpRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
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
          role="region"
          aria-labelledby="cta-title"
        >
          <Card className="bg-slate-900 text-white border-0 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <CardContent className="p-10 md:p-16 text-center relative z-10">
              <Mail className="mx-auto mb-6 text-blue-400" size={56} aria-hidden="true" />
              <h3 id="cta-title" className="text-3xl font-bold mb-4">Interested in Our Research?</h3>
              <p className="text-slate-300 mb-2 max-w-2xl mx-auto text-lg leading-relaxed">
                Contact: Michael Akpala
              </p>
              <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-sm">
                Nottingham Trent University, UK | School of Science and Information Technology
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={handleDownload}
                  title="Download the full research report as a text file"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 cursor-pointer shadow-lg shadow-blue-900/40 min-w-[220px] font-semibold"
                >
                  <Download className="mr-2" size={20} aria-hidden="true" />
                  Download Full Report (.txt)
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsFormOpen(true)}
                  title="Open a form to contact the research team"
                  className="bg-white/10 border-2 border-white/20 hover:bg-white hover:text-slate-900 text-white px-8 cursor-pointer min-w-[220px] font-semibold transition-all"
                >
                  <Mail className="mr-2" size={20} aria-hidden="true" />
                  Contact Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePortal}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Research Collaboration Form</h3>
                    <p className="text-sm text-slate-500 text-left">Recipient: Michael Akpala</p>
                  </div>
                  <button 
                    onClick={closePortal}
                    aria-label="Close contact form"
                    title="Close"
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-500" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleFormSubmit} 
                        className="space-y-6"
                      >
                        <div className="space-y-2 text-left">
                          <label htmlFor="user-name" className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                          <input 
                            id="user-name"
                            required
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2 text-left">
                          <label htmlFor="user-email" className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                          <input 
                            id="user-email"
                            required
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2 text-left">
                          <label htmlFor="user-message" className="text-sm font-semibold text-slate-700 ml-1">Message / Area of Interest</label>
                          <textarea 
                            id="user-message"
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 resize-none"
                            placeholder="Tell us about your interest in the research..."
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                          />
                        </div>

                        <Button 
                          type="submit"
                          title="Submit the collaboration inquiry"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                          <Send size={18} aria-hidden="true" />
                          Send Inquiry
                        </Button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8 space-y-4"
                      >
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 size={48} aria-hidden="true" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900">Inquiry Sent!</h4>
                        <p className="text-slate-600 max-w-xs mx-auto">
                          We've received your inquiry and will get back to you shortly. Thank you for your interest in collaborating on our research!
                        </p>
                        <Button 
                          onClick={closePortal}
                          className="mt-6 bg-slate-900 text-white hover:bg-slate-800 px-8"
                        >
                          Close Window
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}