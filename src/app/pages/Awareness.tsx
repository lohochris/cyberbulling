import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { 
  Building2, Wifi, CheckCircle, X, RotateCcw, 
  GraduationCap, ShieldCheck, Download, Lock, Globe, Users, Zap, 
  ShieldAlert, Fingerprint, MessageSquare, AlertTriangle, ExternalLink,
  ChevronLeft, ChevronRight, Eye, LayoutDashboard, Award, Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useStore } from '../store/useStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// HELPER FUNCTION TO SHUFFLE OPTIONS AND RANDOMIZE CORRECT ANSWER POSITION
const shuffleOptionsWithAnswer = (questionText, options, correctAnswerIndex) => {
  const optionObjects = options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === correctAnswerIndex,
  }));
  
  for (let i = optionObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionObjects[i], optionObjects[j]] = [optionObjects[j], optionObjects[i]];
  }
  
  const newCorrectIndex = optionObjects.findIndex(opt => opt.isCorrect);
  
  return {
    question: questionText,
    options: optionObjects.map(opt => opt.text),
    correctAnswer: newCorrectIndex
  };
};

// MODULES WITH RANDOMIZED QUIZ OPTIONS
const modules = [
  {
    id: 'm1',
    title: 'Fist-to-Click Dynamics',
    category: 'Foundations',
    icon: Building2,
    color: 'bg-orange-600',
    externalLink: "https://www.unicef.org/stories/how-to-stop-cyberbullying",
    note: `The "Fist-to-Click" phenomenon represents the modern evolution of interpersonal conflict, where physical altercations have migrated into permanent digital archives. Unlike traditional schoolyard bullying, digital aggression is not bound by geography or time; it persists 24/7, reaching victims in the perceived safety of their own homes. This shift is exacerbated by the "Online Disinhibition Effect," a psychological state where individuals feel less restrained by social norms due to the lack of immediate physical feedback and eye contact. Consequently, conflicts escalate faster and leave behind a toxic "digital trail" that can impact the mental health of all parties involved for years. Understanding this dynamic is the first step in reclaiming digital civility and recognizing that every click has a human consequence behind it.`,
    quiz: [
      shuffleOptionsWithAnswer("What primary psychological effect drives faster escalation in digital conflict?", 
        ["The Slow-Motion Effect", "Online Disinhibition Effect", "Digital Reflection Bias", "Social Validation Loop"], 1),
      shuffleOptionsWithAnswer("Which characteristic makes digital aggression distinct from physical bullying?", 
        ["It only happens during the day", "It is geographically and temporally persistent", "It is always anonymous", "It requires physical proximity"], 1)
    ]
  },
  {
    id: 'm2',
    title: 'Born-Digital Aggression',
    category: 'Platform Dynamics',
    icon: Wifi,
    color: 'bg-blue-600',
    externalLink: "https://en.wikipedia.org/wiki/Online_disinhibition_effect",
    note: `Born-digital aggression refers to hostility that has no offline predecessor; it is birthed entirely within the UI of social platforms. It is often fueled by "asynchronous communication", the gap between sending a message and receiving a reaction. During this silence, intent is often misinterpreted. Modern platform architectures further complicate this by utilizing engagement metrics that inadvertently reward inflammatory content. When a "hateful" comment receives high engagement, algorithms may amplify it, creating a feedback loop where aggression becomes a tool for visibility. Users must learn to recognize these "dark patterns" in platform design that encourage tribalism. By slowing down our response times and practicing "digital pauses," we can disrupt the cycle of instant, born-digital hostility and foster more intentional, human-centric interactions online.`,
    quiz: [
      shuffleOptionsWithAnswer("What is 'asynchronous communication' in this context?", 
        ["Talking on the phone", "The time delay between sending and receiving messages", "Instant face-to-face video calls", "Live streaming events"], 1),
      shuffleOptionsWithAnswer("How do engagement algorithms sometimes worsen online aggression?", 
        ["By deleting all comments", "By amplifying highly engaging, often inflammatory content", "By requiring a passport for login", "By limiting post frequency"], 1)
    ]
  },
  {
    id: 'm3',
    title: 'Algorithmic Bias & Echo Chambers',
    category: 'Tech Ethics',
    icon: Zap,
    color: 'bg-purple-600',
    externalLink: "https://en.wikipedia.org/wiki/Echo_chamber_(media)",
    note: `Algorithms are the invisible architects of our digital reality, but they are far from neutral. Designed to maximize user retention, they often curate "Echo Chambers", digital environments where we are only exposed to information that validates our existing worldviews. This creates a dangerous "Confirmation Bias" loop. When we never encounter dissenting opinions, we begin to perceive the "other side" not just as different, but as an existential threat. This polarization is the breeding ground for radicalization and targeted harassment. Breaking out of an echo chamber requires "algorithmic literacy", the conscious effort to seek out diverse sources, verify information via independent fact-checkers, and understand that our "Feed" is a curated reflection, not a total reality. We must take back control of our digital diet to maintain a balanced perspective of the world.`,
    quiz: [
      shuffleOptionsWithAnswer("What is the primary danger of a digital 'Echo Chamber'?", 
        ["It makes the internet faster", "It reinforces biases and increases polarization", "It helps you find new hobbies", "It improves search accuracy"], 1),
      shuffleOptionsWithAnswer("What does 'Algorithmic Literacy' involve?", 
        ["Learning to code in Python", "Consciously seeking diverse and verified information", "Deleting all social media accounts", "Using only one news source"], 1)
    ]
  },
  {
    id: 'm4',
    title: 'Doxing & Personal Safety',
    category: 'Security',
    icon: Lock,
    color: 'bg-red-600',
    externalLink: "https://en.wikipedia.org/wiki/Doxing",
    note: `Doxing is the malicious publication of private identifiable information (PII), one of the most severe forms of digital violence. By exposing home addresses, private phone numbers, or family details, aggressors move digital conflict into the physical world, often resulting in real-world intimidation or "swatting." Protecting oneself requires rigorous "data hygiene." This includes using secondary email addresses for public forums, disabling geotagging on social media photos, and regularly auditing what "Search Engines" know about you. In the UK, while there isn't a single "Doxing Law," such actions are often prosecuted under the Protection from Harassment Act 1997 or the Malicious Communications Act. Digital safety is a proactive discipline; we must treat our personal data as a high-value asset that requires constant monitoring and protection from those who seek to weaponize it.`,
    quiz: [
      shuffleOptionsWithAnswer("Which practice is key to maintaining good 'Data Hygiene'?", 
        ["Using your birthday as a password", "Minimizing PII shared on public forums", "Posting your location in real-time", "Using the same password everywhere"], 1),
      shuffleOptionsWithAnswer("Under which UK act is doxing often prosecuted?", 
        ["The Digital Music Act", "Protection from Harassment Act 1997", "The Internet Speed Regulation", "The Data Protection Act 2018"], 1)
    ]
  },
  {
    id: 'm5',
    title: 'Trolling & The Dark Tetrad',
    category: 'Psychology',
    icon: MessageSquare,
    color: 'bg-emerald-600',
    externalLink: "https://www.sciencedirect.com/science/article/abs/pii/S0191886914000324",
    note: `Psychological profiling of habitual internet "trolls" has revealed a consistent link to the "Dark Tetrad" of personality traits: Machiavellianism, Narcissism, Psychopathy, and Sadism. Trolls typically seek "negative social potency," which is the psychological gratification derived from causing distress to others. Unlike a debater who seeks to be right, a troll seeks to be disruptive. Recognizing this is a powerful defense mechanism. When we realize that a troll's behavior is a manifestation of their own psychological deficiencies rather than a valid critique of our worth, we gain the emotional distance needed to "not feed the troll." Resilience in digital spaces comes from understanding that some actors are not looking for logic; they are looking for a reaction. Denying them that reaction is the most effective way to neutralize their influence.`,
    quiz: [
      shuffleOptionsWithAnswer("What is 'negative social potency'?", 
        ["Being popular at school", "Power derived from upsetting others", "A fast internet connection", "Having many followers"], 1),
      shuffleOptionsWithAnswer("Which of these is a trait within the 'Dark Tetrad'?", 
        ["Empathy", "Machiavellianism", "Altruism", "Compassion"], 1)
    ]
  },
  {
    id: 'm6',
    title: 'Social Engineering & Phishing',
    category: 'Cybersecurity',
    icon: Users,
    color: 'bg-indigo-600',
    externalLink: "https://en.wikipedia.org/wiki/Social_engineering_(security)",
    note: `Social engineering is a manipulative technique that exploits human psychology rather than technical software flaws. It is the "human hack." Phishing, the most common variant, involves sending deceptive messages designed to trick victims into revealing sensitive information or installing malware. These attacks often leverage "Urgency," "Authority," or "Fear" to bypass our logical thinking. For example, an email claiming your bank account is "compromised" triggers a panic response that makes you more likely to click a malicious link without thinking. To defend against these tactics, we must adopt a "Zero Trust" mindset. Always verify the source through independent channels (like calling the company directly) and never click on links from unsolicited emails. Cyber defense is 10% technology and 90% human awareness.`,
    quiz: [
      shuffleOptionsWithAnswer("What is the core focus of 'Social Engineering'?", 
        ["Breaking into servers with code", "Manipulating human psychology", "Upgrading computer hardware", "Writing malware"], 1),
      shuffleOptionsWithAnswer("Why do phishing emails often use a sense of urgency?", 
        ["To be helpful", "To bypass logical thinking through panic", "To save the user time", "To follow legal requirements"], 1)
    ]
  },
  {
    id: 'm7',
    title: 'Digital Footprints & Metadata',
    category: 'Privacy',
    icon: Fingerprint,
    color: 'bg-cyan-600',
    externalLink: "https://en.wikipedia.org/wiki/Digital_footprint",
    note: `Your digital footprint consists of two parts: active and passive. While you control your "active" footprint (posts and comments), your "passive" footprint metadata is often generated without your direct input. Every digital photo you take contains EXIF data, which can include the exact GPS coordinates, date, time, and camera model used. When shared, this metadata can reveal your daily routines, home location, and travel habits to predators or data brokers. Similarly, your browsing history and "cookies" create a granular profile of your interests and vulnerabilities. Managing this requires "Privacy by Design." We must use metadata stripping tools before posting photos, utilize "Incognito" modes for sensitive searches, and regularly clear our digital trails. In an age of total surveillance, anonymity is not a default setting; it is a skill that must be practiced.`,
    quiz: [
      shuffleOptionsWithAnswer("What is 'EXIF data' in a digital photograph?", 
        ["A filter used for beauty", "Metadata containing GPS and camera info", "The name of the photographer", "The photo resolution"], 1),
      shuffleOptionsWithAnswer("What is the difference between active and passive footprints?", 
        ["One is faster than the other", "Active is what you post; Passive is what is collected behind the scenes", "There is no difference", "Passive is voluntary sharing"], 1)
    ]
  },
  {
    id: 'm8',
    title: 'Digital Ethics & Empathy',
    category: 'Sociology',
    icon: Globe,
    color: 'bg-pink-600',
    externalLink: "https://en.wikipedia.org/wiki/Cyberethics",
    note: `As our lives move deeper into the "metaverse," the ethical imperative of "Digital Empathy" becomes critical. The "Screen Buffer" often prevents us from seeing the physiological impact of our words—the flinch, the tear, or the spike in heart rate. This lack of feedback can turn normally kind people into "accidental aggressors." Digital ethics is the practice of applying the same moral standards to online interactions as we do to face-to-face ones. It involves "Cognitive Empathy", the ability to imagine the mental state of another person behind a profile picture. Practicing digital ethics means pausing before posting, considering how a joke might be interpreted by a different culture, and actively standing up for others who are being targeted. We are the architects of the digital culture our children will inherit; we must build it with kindness and accountability.`,
    quiz: [
      shuffleOptionsWithAnswer("What is 'Digital Empathy'?", 
        ["A new software update", "Applying moral standards to online interactions", "Ignoring online comments", "Using emojis in messages"], 1),
      shuffleOptionsWithAnswer("How does the 'Screen Buffer' affect our behavior?", 
        ["It makes us kinder", "It can hide the emotional impact of our words", "It improves our typing speed", "It increases screen brightness"], 1)
    ]
  },
  {
    id: 'm9',
    title: 'Cyberstalking & Surveillance',
    category: 'Law',
    icon: ShieldAlert,
    color: 'bg-rose-600',
    externalLink: "https://en.wikipedia.org/wiki/Cyberstalking",
    note: `Cyberstalking is a criminal pattern of behavior that uses technology to systematically harass, monitor, or intimidate a victim. This can range from "Geostalking" (using shared location data) to "Identity Assumption" (creating fake profiles to infiltrate a victim's circle). Unlike a one-off argument, cyberstalking is characterized by persistence and the intent to cause fear. In the UK, stalking is a specific criminal offense under the Malicious Communications Act and the Harassment Act. Victims are encouraged to "Keep the Logs" never delete messages, as they form the evidentiary chain required for police intervention. Protection involves locking down social media "tagging" permissions and being extremely selective about who has access to your real-time location. Safety is found in obscurity and the rigorous control of your digital perimeter.`,
    quiz: [
      shuffleOptionsWithAnswer("What defines cyberstalking compared to a simple argument?", 
        ["It is only online", "It is a persistent pattern intended to cause fear", "It involves more than three people", "It requires technical expertise"], 1),
      shuffleOptionsWithAnswer("What is the most important step for a victim of cyberstalking?", 
        ["Delete all the messages immediately", "Keep a detailed log of all interactions as evidence", "Argue back with the stalker", "Change your username"], 1)
    ]
  },
  {
    id: 'm10',
    title: 'Crisis Mitigation Strategy',
    category: 'Strategy',
    icon: AlertTriangle,
    color: 'bg-yellow-600',
    externalLink: "https://www.ncsc.gov.uk/section/advice-guidance/you-your-family",
    note: `When a digital crisis erupts, whether it's a hacking attempt, a viral smear campaign, or severe harassment, the first 60 minutes are critical. The core strategy is: Collect, Block, Report, and Disconnect. First, "Collect" evidence through screenshots that include timestamps and URLs. Second, "Block" the aggressor to prevent further escalation. Third, "Report" to the platform's safety team and, if the threat is physical, to local authorities. Finally, "Disconnect", stepping away from the screen prevents the "doom-scrolling" that damages mental health. Do not attempt to "clear your name" in the middle of a pile-on; silence is often the most powerful de-escalation tool. By following a structured response plan, you move from a state of victimhood to a state of controlled management.`,
    quiz: [
      shuffleOptionsWithAnswer("What are the four pillars of digital crisis mitigation?", 
        ["Argue, Delete, Hide, Wait", "Collect, Block, Report, Disconnect", "Post, Share, Comment, Like", "Screen, Save, Send, Share"], 1),
      shuffleOptionsWithAnswer("Why should you avoid arguing back during a 'digital pile-on'?", 
        ["It makes you look weak", "It provides the aggressors with more engagement and fuel", "It takes too much time", "It confuses other users"], 1)
    ]
  },
  {
    id: 'm11',
    title: 'Deepfakes & Synthetic Media',
    category: 'Emerging Tech',
    icon: Eye,
    color: 'bg-teal-600',
    externalLink: "https://fullfact.org/blog/2023/dec/how-to-spot-deepfakes/",
    note: `Synthetic media, popularly known as "Deepfakes," uses AI to create hyper-realistic images, videos, and audio of people saying or doing things they never did. This technology poses a massive threat to digital ethics, as it can be used for non-consensual imagery or political disinformation. Detecting deepfakes requires "Lateral Reading", checking multiple sources to see if a sensational event is reported elsewhere. We must also look for "digital artifacts" like unnatural blinking patterns, inconsistent lighting, or distorted audio. As AI becomes more sophisticated, we can no longer rely on "seeing is believing." We must move toward a model of "authenticated truth," where we only trust media from verified, reputable sources. Ethical digital citizenship in the AI age means being a critical consumer of every piece of media we encounter.`,
    quiz: [
      shuffleOptionsWithAnswer("What is a 'Deepfake'?", 
        ["A high-quality movie", "AI-generated synthetic media that mimics real people", "A fake social media account", "A type of video filter"], 1),
      shuffleOptionsWithAnswer("What is 'Lateral Reading'?", 
        ["Reading a book sideways", "Verifying information across multiple independent sources", "Reading the comments section", "Skimming through articles"], 1)
    ]
  },
  {
    id: 'm12',
    title: 'Zero-Trust Architecture',
    category: 'Advanced Security',
    icon: ShieldCheck,
    color: 'bg-slate-700',
    externalLink: "https://www.ncsc.gov.uk/collection/zero-trust-architecture",
    note: `Zero-Trust is a security framework based on a simple but powerful mantra: "Never Trust, Always Verify." In traditional security, everything inside a network was considered "safe." In a Zero-Trust world, we assume that a breach is always possible. This means every login attempt, every device, and every data request must be continuously authenticated and authorized. For the individual user, this translates to using Multi-Factor Authentication (MFA), keeping software updated to patch vulnerabilities, and being skeptical of "internal" messages that seem slightly off. By adopting a Zero-Trust mindset in our daily digital lives, we create multiple layers of defense that make it significantly harder for attackers to gain a foothold. Security is not a product you buy; it is a mindset you inhabit.`,
    quiz: [
      shuffleOptionsWithAnswer("What is the core mantra of Zero-Trust architecture?", 
        ["Trust but verify", "Never trust, always verify", "Always trust internal links", "Verify once, trust forever"], 1),
      shuffleOptionsWithAnswer("How can an individual apply Zero-Trust principles?", 
        ["By using MFA and staying skeptical of all requests", "By using the same password for everything", "By disabling their firewall", "By sharing passwords with colleagues"], 1)
    ]
  }
];

// COLLECT ALL QUIZ QUESTIONS FOR FINAL EXAM (24 TOTAL)
const getAllExamQuestions = () => {
  let allQuestions = [];
  modules.forEach((module) => {
    module.quiz.forEach((q, qIdx) => {
      allQuestions.push({
        id: `${module.id}_q${qIdx}`,
        moduleId: module.id,
        moduleTitle: module.title,
        question: q.question,
        options: [...q.options],
        correctAnswer: q.correctAnswer,
        category: module.category
      });
    });
  });
  return allQuestions;
};

// FUNCTION TO RANDOMLY SELECT QUESTIONS
const getRandomExamQuestions = (allQuestions, count = 24) => {
  const shuffled = [...allQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

export default function Awareness() {
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const { completeModule, resetProgress, shieldProgress } = useStore();
  
  const [activeModule, setActiveModule] = useState(null);
  const [moduleQuizIndex, setModuleQuizIndex] = useState(0);
  const [isFinalExam, setIsFinalExam] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentExamQuestionIndex, setCurrentExamQuestionIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // INITIALIZE RANDOM EXAM QUESTIONS WHEN FINAL EXAM STARTS
  const startFinalExam = () => {
    const allQuestions = getAllExamQuestions();
    const randomQuestions = getRandomExamQuestions(allQuestions, 24);
    setExamQuestions(randomQuestions);
    setCurrentExamQuestionIndex(0);
    setExamAnswers({});
    setExamSubmitted(false);
    setShowCertificate(false);
    setIsFinalExam(true);
  };

  const downloadCertificate = async () => {
    if (!userName) {
      alert("Please enter your name first!");
      return;
    }
    
    setIsDownloading(true);
    
    try {
      const element = certificateRef.current;
      if (!element) {
        throw new Error("Certificate element not found");
      }
      
      // Make element temporarily visible for capture
      element.style.position = 'fixed';
      element.style.left = '0';
      element.style.top = '0';
      element.style.visibility = 'visible';
      element.style.zIndex = '9999';
      element.style.backgroundColor = '#ffffff';
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = await html2canvas(element, { 
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: false,
        imageTimeout: 0
      });
      
      // Hide the element again
      element.style.visibility = 'hidden';
      element.style.zIndex = '-1';
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save(`Digital_Ethics_Certificate_${userName.replace(/\s+/g, '_')}.pdf`);
      
    } catch (error) {
      console.error('Certificate download error:', error);
      alert("There was an error generating your certificate. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const submitExam = () => {
    let correct = 0;
    examQuestions.forEach((q, idx) => {
      if (examAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = (correct / examQuestions.length) * 100;
    setExamScore(percentage);
    setExamSubmitted(true);
    
    if (percentage >= 70) {
      modules.forEach(module => {
        if (!shieldProgress.modulesCompleted.includes(module.id)) {
          completeModule(module.id);
        }
      });
    }
  };

  const handleExamAnswer = (questionIndex, answerIndex) => {
    setExamAnswers({
      ...examAnswers,
      [questionIndex]: answerIndex
    });
  };

  const goToNextQuestion = () => {
    if (currentExamQuestionIndex < examQuestions.length - 1) {
      setCurrentExamQuestionIndex(currentExamQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentExamQuestionIndex > 0) {
      setCurrentExamQuestionIndex(currentExamQuestionIndex - 1);
    }
  };

  const resetAndExitExam = () => {
    setIsFinalExam(false);
    setExamSubmitted(false);
    setExamQuestions([]);
    setExamAnswers({});
    setCurrentExamQuestionIndex(0);
  };

  const proceedToCertificate = () => {
    setShowCertificate(true);
    setIsFinalExam(false);
  };

  const handleViewReports = () => {
    navigate("/report");
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        
        {/* HEADER - Mobile Responsive */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-10 gap-4 sm:gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-2 sm:gap-3 justify-center md:justify-start">
              <GraduationCap className="text-blue-600" size={isMobile ? 32 : 44} /> 
              <span className="text-xl sm:text-2xl md:text-4xl">Awareness Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">12-Module Certification Path</p>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Button
              variant="outline"
              className="transition-all duration-300 transform active:scale-95 font-bold border-2 shadow-sm cursor-pointer bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 hover:shadow-xl hover:-translate-y-1 px-4 sm:px-6 text-sm sm:text-base"
              onClick={() => navigate("/report")}
            >
              Report
            </Button>
            <Button 
              variant="ghost" 
              className="hover:bg-red-100 hover:text-red-600 transition-all duration-300 hover:scale-105" 
              onClick={resetProgress}
            >
              <RotateCcw size={isMobile ? 16 : 18} />
            </Button>
          </div>
        </div>

        {/* PROGRESS BAR - Mobile Responsive */}
        <div className="mb-6 sm:mb-12 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between mb-2 text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Progress</span>
            <span>{shieldProgress.modulesCompleted.length} / 12</span>
          </div>
          <div className="h-2 sm:h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${(shieldProgress.modulesCompleted.length / 12) * 100}%` }}
              className="h-full bg-blue-600"
            />
          </div>
        </div>

        {/* FINAL EXAM COMPONENT - Mobile Responsive */}
        {isFinalExam && !showCertificate && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-slate-900 p-4 sm:p-6 md:p-8 text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2">Final Certification Exam</h2>
                  <p className="text-xs sm:text-sm text-slate-400">24 Questions • 70% to Pass • Randomly Selected from All Modules</p>
                </div>
                <Button variant="ghost" className="text-white hover:bg-slate-800 transition-all duration-300 hover:scale-105 p-2" onClick={resetAndExitExam}>
                  <X size={isMobile ? 20 : 24} />
                </Button>
              </div>
            </div>

            {!examSubmitted ? (
              <>
                <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                  <div className="mb-6 sm:mb-8">
                    <div className="flex justify-between text-xs sm:text-sm text-slate-500 mb-2">
                      <span>Question {currentExamQuestionIndex + 1} of {examQuestions.length}</span>
                      <span>Answered: {Object.keys(examAnswers).length} / {examQuestions.length}</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${((currentExamQuestionIndex + 1) / examQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {examQuestions.length > 0 && examQuestions[currentExamQuestionIndex] && (
                    <div className="space-y-6 sm:space-y-8">
                      <div>
                        <Badge className="mb-3 sm:mb-4 bg-blue-100 text-blue-600 border-none px-3 sm:px-4 py-1 text-xs sm:text-sm">
                          {examQuestions[currentExamQuestionIndex].category} • Module: {examQuestions[currentExamQuestionIndex].moduleTitle}
                        </Badge>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                          {examQuestions[currentExamQuestionIndex].question}
                        </h3>
                      </div>

                      <div className="grid gap-3 sm:gap-4">
                        {examQuestions[currentExamQuestionIndex].options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleExamAnswer(currentExamQuestionIndex, optIdx)}
                            className={`p-4 sm:p-6 text-left rounded-xl sm:rounded-2xl border-2 transition-all duration-300 font-medium cursor-pointer hover:scale-[1.01] sm:hover:scale-[1.02] text-sm sm:text-base
                              ${examAnswers[currentExamQuestionIndex] === optIdx 
                                ? 'border-blue-600 bg-blue-50 text-blue-700' 
                                : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                              }`}
                          >
                            <span className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 text-center leading-6 sm:leading-8 mr-2 sm:mr-4 font-bold text-xs sm:text-sm">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="text-sm sm:text-base">{opt}</span>
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 sm:pt-8">
                        <Button 
                          variant="outline" 
                          onClick={goToPreviousQuestion} 
                          disabled={currentExamQuestionIndex === 0} 
                          className="px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:hover:scale-100 text-sm sm:text-base"
                        >
                          <ChevronLeft className="mr-1 sm:mr-2" size={isMobile ? 16 : 18} /> Previous
                        </Button>
                        
                        {currentExamQuestionIndex === examQuestions.length - 1 ? (
                          <Button 
                            onClick={submitExam} 
                            className="bg-emerald-600 text-white px-6 sm:px-8 py-2 sm:py-3 transition-all duration-300 hover:scale-105 hover:bg-emerald-700 text-sm sm:text-base"
                          >
                            Submit Exam <CheckCircle className="ml-1 sm:ml-2" size={isMobile ? 14 : 18} />
                          </Button>
                        ) : (
                          <Button 
                            onClick={goToNextQuestion} 
                            className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 transition-all duration-300 hover:scale-105 hover:bg-blue-700 text-sm sm:text-base"
                          >
                            Next <ChevronRight className="ml-1 sm:ml-2" size={isMobile ? 16 : 18} />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t p-4 sm:p-6 bg-slate-50">
                  <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">Question Navigator</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {examQuestions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentExamQuestionIndex(idx)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-lg font-bold transition-all duration-300 cursor-pointer hover:scale-110
                          ${currentExamQuestionIndex === idx 
                            ? 'bg-blue-600 text-white' 
                            : examAnswers[idx] !== undefined 
                              ? 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200' 
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 sm:p-8 md:p-12 text-center">
                <div className="max-w-2xl mx-auto">
                  {examScore >= 70 ? (
                    <>
                      <Award size={isMobile ? 60 : 80} className="text-emerald-500 mx-auto mb-4 sm:mb-6" />
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3 sm:mb-4">Congratulations!</h3>
                      <p className="text-lg sm:text-xl text-slate-600 mb-3 sm:mb-4">
                        You scored {Math.round(examScore)}% ({Object.keys(examAnswers).filter((k, idx) => examAnswers[idx] === examQuestions[idx]?.correctAnswer).length} / {examQuestions.length} correct)
                      </p>
                      <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8">You have successfully passed the certification exam!</p>
                      <div className="space-y-3 sm:space-y-4">
                        <input 
                          className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl text-center text-base sm:text-lg focus:border-blue-600 outline-none transition-all duration-300 hover:scale-[1.01]" 
                          placeholder="Enter your full name for certificate" 
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <Button 
                          className="bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl w-full transition-all duration-300 hover:scale-105 hover:bg-emerald-700" 
                          onClick={proceedToCertificate} 
                          disabled={!userName}
                        >
                          Generate Certificate <Download className="ml-2" size={isMobile ? 16 : 18} />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <X size={isMobile ? 60 : 80} className="text-red-500 mx-auto mb-4 sm:mb-6" />
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3 sm:mb-4">Not This Time</h3>
                      <p className="text-lg sm:text-xl text-slate-600 mb-3 sm:mb-4">
                        You scored {Math.round(examScore)}% ({Object.keys(examAnswers).filter((k, idx) => examAnswers[idx] === examQuestions[idx]?.correctAnswer).length} / {examQuestions.length} correct)
                      </p>
                      <p className="text-sm sm:text-base text-slate-500 mb-4 sm:mb-6">The passing score is 70%. Please review the modules and try again.</p>
                      <Button 
                        className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:bg-blue-700" 
                        onClick={startFinalExam}
                      >
                        Retake Exam <RotateCcw className="ml-2" size={isMobile ? 16 : 18} />
                      </Button>
                    </>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="mt-4 sm:mt-6 text-slate-500 transition-all duration-300 hover:scale-105 hover:bg-slate-100 text-sm sm:text-base" 
                    onClick={resetAndExitExam}
                  >
                    Exit to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* MODULE GRID - Mobile Responsive */}
        {!isFinalExam && !showCertificate && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {modules.map((m) => {
              const Icon = m.icon;
              const done = shieldProgress.modulesCompleted.includes(m.id);
              return (
                <Card key={m.id} className="bg-white border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02]">
                  <CardHeader className="p-4 sm:p-6">
                    <div className={`${m.color} w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 transition-all duration-300 hover:scale-110`}>
                      <Icon size={isMobile ? 20 : 24} />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-slate-800">{m.title}</CardTitle>
                    <CardDescription className="text-[10px] sm:text-xs font-bold text-blue-500 uppercase tracking-wider">{m.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <Button 
                      className={`w-full py-5 sm:py-7 rounded-xl sm:rounded-2xl text-sm sm:text-md transition-all duration-300 transform active:scale-95 font-bold border-2 shadow-sm cursor-pointer hover:scale-105 hover:shadow-xl hover:-translate-y-1 ${done ? 'bg-emerald-600 border-emerald-600 hover:bg-emerald-700' : 'bg-gray-700 border-gray-700 hover:bg-blue-700 hover:border-blue-700'} text-white shadow-lg`}
                      onClick={() => setActiveModule(m)}
                    >
                      {done ? 'Review Material' : 'Start Learning'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* FINAL EXAM TRIGGER - Mobile Responsive */}
        {shieldProgress.modulesCompleted.length === 12 && !isFinalExam && !showCertificate && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-8 sm:mt-16 text-center bg-slate-900 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">Certification Exam Ready</h2>
            <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 max-w-xl mx-auto px-2">
              You have completed all 12 modules! The final exam consists of 24 randomly selected questions covering all modules. 
              You need 70% to pass and earn your certificate.
            </p>
            <Button 
              className="bg-blue-600 px-8 sm:px-12 py-4 sm:py-8 text-lg sm:text-2xl font-black rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-700 w-full sm:w-auto" 
              onClick={startFinalExam}
            >
              BEGIN FINAL EXAM
            </Button>
          </motion.div>
        )}

        {/* STUDY MODAL - Mobile Responsive */}
        <AnimatePresence>
          {activeModule && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col border-[5px] sm:border-[10px] border-white">
                <div className="p-4 sm:p-6 border-b flex justify-between items-center">
                  <h3 className="font-black text-lg sm:text-xl text-slate-800">{activeModule.title}</h3>
                  <Button variant="ghost" className="rounded-full hover:bg-slate-100 transition-all duration-300 hover:scale-105 p-2" onClick={() => {setActiveModule(null); setModuleQuizIndex(0); setAnswers({});}}><X size={isMobile ? 20 : 24} /></Button>
                </div>

                <div className="p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto flex-1">
                  {moduleQuizIndex === 0 ? (
                    <div className="max-w-2xl mx-auto">
                      <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-serif text-justify" style={{ textAlignLast: 'left' }}>
                        <span className="text-3xl sm:text-5xl font-black mr-1 sm:mr-2 float-left text-blue-600 leading-none">{activeModule.note.charAt(0)}</span>
                        {activeModule.note.slice(1)}
                      </p>
                      <a href={activeModule.externalLink} target="_blank" rel="noreferrer" className="mt-4 sm:mt-8 inline-flex items-center gap-2 text-blue-600 font-bold hover:underline transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                        <ExternalLink size={isMobile ? 14 : 18} /> Explore More Resources
                      </a>
                    </div>
                  ) : (
                    <div className="max-w-xl mx-auto space-y-6 sm:space-y-8">
                      <div className="text-center">
                        <Badge className="mb-3 sm:mb-4 bg-blue-100 text-blue-600 border-none text-xs sm:text-sm">Question {moduleQuizIndex} of 2</Badge>
                        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6">{activeModule.quiz[moduleQuizIndex-1].question}</h2>
                      </div>
                      <div className="grid gap-2 sm:gap-3">
                        {activeModule.quiz[moduleQuizIndex-1].options.map((opt, i) => (
                          <Button 
                            key={i} 
                            variant="outline" 
                            className={`py-5 sm:py-8 text-sm sm:text-md border-2 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer hover:scale-[1.01] whitespace-normal break-words h-auto ${answers[moduleQuizIndex] === i ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-400'}`} 
                            onClick={() => setAnswers({...answers, [moduleQuizIndex]: i})}
                          >
                            <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 text-center leading-5 sm:leading-6 mr-2 sm:mr-3 text-[10px] sm:text-xs font-bold flex-shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-left text-xs sm:text-sm">{opt}</span>
                          </Button>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-10">
                        <Button variant="link" onClick={() => setModuleQuizIndex(0)} className="text-slate-400 transition-all duration-300 hover:scale-105 text-sm sm:text-base"><ChevronLeft className="mr-1" size={isMobile ? 14 : 16}/> Review Note</Button>
                        <Button className="transition-all duration-300 transform active:scale-95 font-bold border-2 shadow-sm cursor-pointer hover:scale-105 hover:shadow-xl hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:border-blue-700 bg-slate-900 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base" 
                               onClick={() => {
                                 if (answers[moduleQuizIndex] === undefined) return alert("Please select an answer before continuing");
                                 if (moduleQuizIndex < 2) setModuleQuizIndex(moduleQuizIndex + 1);
                                 else { completeModule(activeModule.id); setActiveModule(null); setModuleQuizIndex(0); setAnswers({}); }
                               }}>
                               {moduleQuizIndex === 2 ? 'Complete Module' : 'Next'} <ChevronRight size={isMobile ? 14 : 18}/>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {moduleQuizIndex === 0 && (
                  <div className="p-4 sm:p-8 border-t bg-slate-50 flex justify-center">
                    <Button 
                      className="bg-blue-600 text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-700 w-full sm:w-auto" 
                      onClick={() => setModuleQuizIndex(1)}
                    >
                      Start Assessment
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CERTIFICATE SCREEN - Mobile Responsive */}
        {showCertificate && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] text-center space-y-6 sm:space-y-8 px-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-xl w-full">
              <CheckCircle size={isMobile ? 48 : 64} className="text-emerald-500 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">Course Completed</h2>
              <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8">You have successfully passed the certification exam!</p>
              
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  className="bg-emerald-600 text-white py-5 sm:py-8 text-lg sm:text-xl rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-emerald-700" 
                  onClick={downloadCertificate}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={isMobile ? 16 : 20} /> Generating Certificate...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2" size={isMobile ? 16 : 20} /> Download Certificate
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-slate-200 py-4 sm:py-6 text-slate-600 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-100 hover:border-blue-400 text-sm sm:text-base" 
                  onClick={() => {setShowCertificate(false);}}
                >
                  <LayoutDashboard className="mr-2" size={isMobile ? 14 : 18} /> Exit to Dashboard
                </Button>
              </div>
            </motion.div>

            {/* CERTIFICATE AREA - Mobile Optimized */}
            <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', visibility: 'hidden', zIndex: -1 }}>
              <div 
                ref={certificateRef} 
                id="cert-area"
                style={{ 
                  width: '297mm', 
                  height: '210mm', 
                  backgroundColor: '#ffffff', 
                  color: '#0f172a',
                  border: '20px solid #0f172a',
                  padding: isMobile ? '40px' : '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'sans-serif',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <p style={{ fontWeight: 'bold', letterSpacing: '0.4em', color: '#2563eb', fontSize: '14px', marginBottom: '20px' }}>OFFICIAL CREDENTIAL</p>
                  <h1 style={{ fontSize: isMobile ? '32pt' : '42pt', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.025em', marginBottom: '20px' }}>Certificate of Mastery</h1>
                  <p style={{ fontSize: isMobile ? '16px' : '20px', fontStyle: 'italic', color: '#94a3b8', marginBottom: '10px' }}>This certifies that</p>
                  <h2 style={{ fontSize: isMobile ? '28pt' : '36pt', fontWeight: '900', borderBottom: '4px solid #e2e8f0', paddingBottom: '16px', display: 'inline-block', paddingLeft: isMobile ? '20px' : '40px', paddingRight: isMobile ? '20px' : '40px', marginBottom: '20px' }}>{userName || "Graduate"}</h2>
                  <p style={{ fontSize: isMobile ? '14px' : '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5', marginTop: '30px' }}>
                    Has successfully completed the 12-module specialized curriculum in: 
                    <span style={{ display: 'block', fontWeight: 'bold', color: '#0f172a', marginTop: '12px', textDecoration: 'underline' }}>UK Digital Ethics, Awareness, and Online Responsibility.</span>
                  </p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '24px' }}>Certification ID: CERT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingLeft: isMobile ? '20px' : '40px', paddingRight: isMobile ? '20px' : '40px', marginTop: '32px' }}>
                  <div style={{ textAlign: 'left', fontFamily: 'monospace' }}>
                    <p style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 'bold', color: '#94a3b8', marginBottom: '4px' }}>Issue Date</p>
                    <p style={{ fontWeight: 'bold', fontSize: '14px' }}>{new Date().toLocaleDateString('en-GB')}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ width: isMobile ? '60px' : '80px', height: isMobile ? '60px' : '80px', backgroundColor: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '900', fontSize: isMobile ? '16px' : '20px', border: '4px solid #e2e8f0' }}>SE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}