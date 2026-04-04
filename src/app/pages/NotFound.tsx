import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Frown, Bot, Shield, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-2 border-slate-200 shadow-2xl">
          <CardContent className="p-12 text-center">
            {/* Icon Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <Frown className="text-slate-400" size={96} aria-hidden="true" />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -right-6 -top-6"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="text-blue-600" size={24} aria-hidden="true" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                We couldn't find the page you're looking for. But don't worry, we're here to help guide you back to safety.
              </p>
            </motion.div>

            {/* Billy Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={20} aria-hidden="true" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-slate-900 mb-2">Billy says:</p>
                  <p className="text-sm text-slate-700">
                    "Lost pages happen, just like navigating difficult online situations. 
                    If you need support or guidance, I'm always here to help. You're not alone on this journey."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/">
                  <Home size={20} aria-hidden="true" />
                  Go Home
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link to="/billy">
                  <Bot size={20} aria-hidden="true" />
                  Talk to Billy
                </Link>
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 pt-8 border-t border-slate-200"
            >
              <p className="text-sm text-slate-600 mb-4">You might be looking for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { to: '/awareness', label: 'Awareness Hub' },
                  { to: '/report', label: 'Report Incident' },
                  { to: '/resources', label: 'Resources' },
                  { to: '/shield', label: 'SHIELD Dashboard' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline px-3 py-1 bg-blue-50 rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Accessibility Note */}
            <div className="mt-8 p-4 bg-slate-50 rounded-lg text-left">
              <div className="flex items-start gap-3">
                <Shield className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-slate-900 mb-1">Accessibility Support</p>
                  <p className="text-xs text-slate-600">
                    If you're experiencing difficulty navigating our site, please use the "Talk to Billy" 
                    button for personalized assistance, or return to our homepage.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
