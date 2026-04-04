import { LucideIcon } from 'lucide-react';

export interface AnonymousReport {
  id: string;
  timestamp: number;
  incidentType: 'harassment' | 'doxing' | 'impersonation' | 'deepfake' | 'other';
  platform: string;
  description: string;
  impactOnHealthManagement?: boolean;
  perpetratorRelationship: 'offline_known' | 'online_only' | 'unknown';
  resilienceScore?: number; // Stanford Self-Efficacy scale 1-10
  emotionalImpact?: number; // 1-10 scale
}

export interface UserSession {
  shieldProgress: {
    modulesCompleted: string[];
    resilienceScore: number;
    lastAssessment: number;
  };
  billyChatHistory: ChatMessage[];
  savedResources: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'billy';
  content: string;
  timestamp: number;
  suggestedActions?: string[]; // PMT/TPB based suggestions
}

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon; // Type-safe Lucide icon component
}

export interface EducationalModule {
  id: string;
  title: string;
  description: string;
  category: 'fist-to-click' | 'born-digital' | 'professional-doxing' | 'health-triggers';
  icon: LucideIcon;
  duration: number; // minutes
  completed?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'legal' | 'health' | 'workplace' | 'safety' | 'bystander';
  icon: LucideIcon;
  type: 'pdf' | 'article' | 'video' | 'guide';
  url?: string;
}

export interface SHIELDAssessment {
  id: string;
  timestamp: number;
  strengths: number; // 1-10
  healing: number; // 1-10
  interventions: number; // 1-10
  empowerment: number; // 1-10
  learning: number; // 1-10
  development: number; // 1-10
  overallScore: number;
}

export interface BillyResponse {
  message: string;
  suggestedActions: string[];
  emotionalTone: 'supportive' | 'encouraging' | 'informative' | 'urgent';
  resources?: string[];
}
