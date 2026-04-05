import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  // Library removed
  Scale, 
  Building2, 
  Heart, 
  Users, 
  ExternalLink,
  Search,
  Bookmark,
  BookmarkCheck,
  Shield, // Used for the header now
  Lock,
  MessageCircle,
  Phone,
  Mail,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useStore } from '../store/useStore';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'legal' | 'health' | 'workplace' | 'safety' | 'bystander';
  icon: any;
  type: 'guide' | 'pdf' | 'article' | 'official';
  url: string;
}

const resources: Resource[] = [
  {
    id: 'legal-1',
    title: 'Online Safety Act 2023: Explainer',
    description: 'Official UK Government guide on how the new laws protect adults from online harm.',
    category: 'legal',
    icon: Scale,
    type: 'official',
    url: 'https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer'
  },
  {
    id: 'legal-2',
    title: 'Protection from Harassment Act 1997',
    description: 'Full legislative text regarding the prohibition of harassment and available legal remedies.',
    category: 'legal',
    icon: Scale,
    type: 'pdf',
    url: 'https://www.legislation.gov.uk/ukpga/1997/40/contents'
  },
  {
    id: 'health-1',
    title: 'RCN: Bullying and Harassment Guide',
    description: 'Guidelines on how to document incidents and discuss impacts with healthcare providers.',
    category: 'health',
    icon: Heart,
    type: 'guide',
    url: 'https://www.rcn.org.uk/Get-Help/RCN-advice/bullying-and-harassment'
  },
  {
    id: 'health-2',
    title: 'NHS Mental Health Support',
    description: 'Accessing 24/7 urgent mental health support and finding local NHS services.',
    category: 'health',
    icon: Heart,
    type: 'article',
    url: 'https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/'
  },
  {
    id: 'workplace-1',
    title: 'ACAS: Workplace Bullying Advice',
    description: 'Comprehensive guidance on employer responsibilities and employee rights in the UK.',
    category: 'workplace',
    icon: Building2,
    type: 'guide',
    url: 'https://www.acas.org.uk/'
  },
  {
    id: 'workplace-2',
    title: 'Official LinkedIn Safety / Security Center',
    description: 'Specific tools and settings for protecting your professional reputation and reporting abuse.',
    category: 'workplace',
    icon: Building2,
    type: 'guide',
    url: 'https://security.linkedin.com/'
  },
  {
    id: 'safety-1',
    title: 'Digital Security Toolkit',
    description: 'Practical guide for safer online engagement, using VPNs, and managing digital footprints.',
    category: 'safety',
    icon: Shield,
    type: 'article',
    url: 'https://www.salto-youth.net/tools/toolbox/tool/the-digital-security-toolkit-a-practical-guide-for-safer-online-engagement.4671/'
  },
  {
    id: 'safety-2',
    title: 'Social Media Privacy Guide',
    description: 'Step-by-step instructions for privacy settings across Instagram, X, Facebook, and TikTok.',
    category: 'safety',
    icon: Lock,
    type: 'pdf',
    url: 'https://www.montclair.edu/phish-files/wp-content/uploads/sites/290/2025/06/Social-Media-Privacy-Settings-Guide.pdf'
  },
  {
    id: 'bystander-1',
    title: 'The 5Ds of Bystander Intervention',
    description: 'Evidence-based scripts and methods to safely support victims of online harassment.',
    category: 'bystander',
    icon: Users,
    type: 'guide',
    url: 'https://righttobe.org/guides/bystander-intervention-training/'
  },
  {
    id: 'bystander-2',
    title: 'Anti-Bullying Alliance Toolkit',
    description: 'Resources and training for "Upstanders" to challenge cyberbullying effectively.',
    category: 'bystander',
    icon: MessageCircle,
    type: 'official',
    url: 'https://anti-bullyingalliance.org.uk/tools-information'
  },
];

const categories = [
  { id: 'all', label: 'All Resources', icon: Search }, // Replaced Library with Search
  { id: 'legal', label: 'Legal Rights', icon: Scale },
  { id: 'health', label: 'Health Support', icon: Heart },
  { id: 'workplace', label: 'Workplace', icon: Building2 },
  { id: 'safety', label: 'Safety Tools', icon: Shield },
  { id: 'bystander', label: 'Bystander Help', icon: Users },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { savedResources, toggleSavedResource } = useStore();

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isSaved = (id: string) => savedResources.includes(id);

  return (
    <div className="min-h-screen py-12 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Icon Updated to Shield */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="text-blue-600" size={40} />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Resource Library
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Vetted guides and official documentation to support your digital safety journey.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input
              type="search"
              placeholder="Search legal, health, or safety guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="whitespace-nowrap"
              >
                <cat.icon size={16} className="mr-1.5" />
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredResources.map((resource, index) => {
            const Icon = resource.icon;
            const saved = isSaved(resource.id);

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSavedResource(resource.id)}
                      >
                        {saved ? <BookmarkCheck className="text-blue-600" /> : <Bookmark className="text-slate-400" />}
                      </Button>
                    </div>
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="mt-auto pt-0">
                    <div className="flex items-center justify-between border-t pt-4">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                        {resource.type}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                        asChild
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Access <ExternalLink size={14} className="ml-1.5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}