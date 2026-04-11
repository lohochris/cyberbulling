import { Outlet, Link, useLocation } from 'react-router';
// 1. Import the Analytics component
import { Analytics } from '@vercel/analytics/react'; 
import { 
  Shield, 
  BookOpen, 
  Bot, 
  FileWarning, 
  Library, 
  Info, 
  Menu,
  X,
  Home
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/awareness', label: 'Awareness Hub', icon: BookOpen },
  { path: '/billy', label: 'Talk to Billy', icon: Bot },
  { path: '/report', label: 'Report', icon: FileWarning },
  { path: '/resources', label: 'Resources', icon: Library },
  { path: '/shield', label: 'SHIELD Dashboard', icon: Shield },
  { path: '/research', label: 'Research', icon: Info },
];

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Shield 
                className="text-blue-600 group-hover:text-blue-700 transition-colors" 
                size={32} 
                aria-hidden="true"
              />
              <div className="hidden sm:block">
                <div className="font-bold text-slate-900">Cyberbullying Awareness</div>
                <div className="text-xs text-slate-600">Strategic Support for Adults in England</div>
              </div>
              <div className="block sm:hidden">
                <div className="font-bold text-slate-900">CA System</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-slate-200/50 bg-white"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                        transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-slate-700 hover:bg-slate-100'
                        }
                      `}
                    >
                      <Icon size={20} aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="text-blue-400" size={24} aria-hidden="true" />
                <span className="font-bold text-white">Cyberbullying Awareness</span>
              </div>
              <p className="text-sm text-slate-400">
                Empowering English adults against digital aggression through evidence-based support and resources.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Crisis Support</h3>
              <ul className="space-y-2 text-sm">
                <li>Samaritans: 116 123</li>
                <li>NHS Mental Health: 111 (option 2)</li>
                <li>National Bullying Helpline: 0300 323 0169</li>
                <li>Emergency: 999</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Important Notice</h3>
              <p className="text-sm text-slate-400">
                This system provides educational resources and support tools. It is not a substitute for professional mental health care or legal advice. Always seek appropriate professional help for your specific situation.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>© 2026 Cyberbullying Awareness System. Based on research frameworks: PMT, TPB, RAT.</p>
          </div>
        </div>
      </footer>

      {/* 2. Place the component here so it captures all page views */}
      <Analytics />
    </div>
  );
}