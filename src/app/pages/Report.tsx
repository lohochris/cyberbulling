import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  FileWarning, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight,
  Shield,
  FileText,
  Info,
  BarChart3 // This matches the bar icon from your image
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Progress } from '../components/ui/progress';
import { saveReport } from '../services/db';
import { toast } from 'sonner';
import { AnonymousReport } from '../types';

// SCHEMA FIX: Explicitly defining the enum values as a non-optional string
const reportSchema = z.object({
  incidentType: z.enum(['harassment', 'doxing', 'impersonation', 'deepfake', 'other']),
  platform: z.string().min(1, 'Please enter the platform name'),
  description: z.string().default(''),
  perpetratorRelationship: z.enum(['offline_known', 'online_only', 'unknown']).default('unknown'),
  impactOnHealthManagement: z.boolean().default(false),
  emotionalImpact: z.number().min(0).max(10).default(5),
  resilienceScore: z.number().min(0).max(10).default(5),
});
type ReportFormData = z.infer<typeof reportSchema>;

const STEPS = [
  { title: 'Incident Details', icon: FileWarning },
  { title: 'Impact Assessment', icon: AlertCircle },
  { title: 'Review & Submit', icon: CheckCircle },
];

export default function Report() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    mode: 'onChange',
    defaultValues: {
      incidentType: 'harassment',
      platform: '',
      description: '',
      perpetratorRelationship: 'unknown',
      emotionalImpact: 5,
      resilienceScore: 5,
      impactOnHealthManagement: false,
    },
  });

  const watchedValues = watch();
  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  const onSubmit = async (data: ReportFormData) => {
    try {
      const report: AnonymousReport = {
        id: `report-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        timestamp: Date.now(),
        ...data,
      };

      await saveReport(report);
      setReportId(report.id);
      setSubmitted(true);
      toast.success('Report saved securely on your device');
    } catch (error) {
      toast.error('Failed to save report');
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = currentStep === 0 
      ? ['incidentType', 'platform', 'perpetratorRelationship', 'description'] 
      : ['emotionalImpact', 'resilienceScore'];
    
    const isValid = await trigger(fieldsToValidate as any);
    
    if (isValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast.error("Please check the required fields before continuing.");
    }
  };

  const handleDownloadReport = () => {
    const timestamp = new Date().toLocaleString();
    const content = `
INCIDENT REPORT SUMMARY
---------------------------------
Report ID: ${reportId}
Generated: ${timestamp}

INCIDENT DETAILS
Type: ${watchedValues.incidentType.toUpperCase()}
Platform: ${watchedValues.platform}
Relationship: ${watchedValues.perpetratorRelationship.replace('_', ' ')}

DESCRIPTION
${watchedValues.description || "No additional details provided."}

IMPACT ASSESSMENT
Emotional Severity: ${watchedValues.emotionalImpact}/10
Personal Resilience: ${watchedValues.resilienceScore}/10
Impact on Health: ${watchedValues.impactOnHealthManagement ? 'YES' : 'NO'}

---------------------------------
This report is stored locally on your device.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incident-report-${reportId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center bg-slate-50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full px-4">
          <Card className="border-2 border-emerald-200">
            <CardContent className="p-8 text-center">
              <CheckCircle className="text-emerald-600 w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Report Locally Stored</h2>
              <p className="text-slate-600 mb-6">Your data has not been sent to any server.</p>
              <div className="bg-slate-100 p-4 rounded mb-6 text-sm font-mono break-all font-bold">{reportId}</div>
              <Button onClick={handleDownloadReport} className="w-full mb-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <FileText size={18} className="mr-2" /> Download Report (.txt)
              </Button>
              <Button variant="outline" className="w-full cursor-pointer font-medium" onClick={() => window.location.href = '/'}>Return Home</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-slate-50/30">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {STEPS.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentStep >= idx ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    <step.icon size={20} />
                  </div>
                  <span className={`text-[10px] mt-2 uppercase font-bold tracking-wider ${currentStep >= idx ? 'text-blue-600' : 'text-slate-400'}`}>{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="shadow-xl border-none overflow-hidden">
              <CardContent className="p-8">
                {currentStep === 0 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="incidentType" className="font-semibold text-slate-700">Incident Type</Label>
                        <Select 
                          onValueChange={(v) => setValue('incidentType', v as any)} 
                          defaultValue={watchedValues.incidentType}
                        >
                          <SelectTrigger id="incidentType" className="cursor-pointer bg-white border-slate-200">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="harassment" className="cursor-pointer">Harassment</SelectItem>
                            <SelectItem value="doxing" className="cursor-pointer">Doxxing</SelectItem>
                            <SelectItem value="impersonation" className="cursor-pointer">Impersonation</SelectItem>
                            <SelectItem value="deepfake" className="cursor-pointer">Deepfake</SelectItem>
                            <SelectItem value="other" className="cursor-pointer">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="platform" className="font-semibold text-slate-700">Platform</Label>
                        <Input
  id="platform"
  value={watchedValues.platform || ''}
  onChange={(e) => setValue('platform', e.target.value)}
  className="bg-white border-slate-200"
  placeholder="e.g. WhatsApp, Instagram"
/>
                        {errors.platform && <p className="text-red-500 text-xs mt-1">{errors.platform.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="font-semibold text-slate-700">Relationship to Perpetrator</Label>
                      <RadioGroup 
                        onValueChange={(v) => setValue('perpetratorRelationship', v as any)}
                        defaultValue={watchedValues.perpetratorRelationship}
                        className="grid grid-cols-1 gap-3"
                      >
                        {['offline_known', 'online_only', 'unknown'].map((val) => (
                          <div key={val} className="flex items-center space-x-3 border p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                            <RadioGroupItem value={val} id={val} className="cursor-pointer" />
                            <Label htmlFor={val} className="cursor-pointer flex-1 capitalize font-medium">
                              {val.replace('_', ' ')}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="font-semibold text-slate-700">What happened? (Optional)</Label>
                      <Textarea
  id="description"
  value={watchedValues.description || ''}
  onChange={(e) => setValue('description', e.target.value)}
  className="h-40 resize-none text-base bg-white border-slate-200"
  placeholder="You can describe the incident here..."
/>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                    <div className="space-y-4">
                      <Label className="text-lg font-bold text-slate-800">How severe is the emotional impact?</Label>
                      <input 
                        type="range" min="0" max="10" 
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        {...register('emotionalImpact', { valueAsNumber: true })} 
                      />
                      <div className="flex justify-between font-bold text-blue-600">
                        <span className="px-3 py-1 bg-blue-50 rounded-full text-xs">0 (Minimal)</span>
                        <span className="text-3xl">{watchedValues.emotionalImpact}/10</span>
                        <span className="px-3 py-1 bg-blue-50 rounded-full text-xs">10 (Severe)</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-bold text-slate-800">Ability to cope (Resilience)</Label>
                      <input 
                        type="range" min="0" max="10" 
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        {...register('resilienceScore', { valueAsNumber: true })} 
                      />
                      <div className="flex justify-between font-bold text-emerald-600">
                        <span className="px-3 py-1 bg-emerald-50 rounded-full text-xs">0 (Low)</span>
                        <span className="text-3xl">{watchedValues.resilienceScore}/10</span>
                        <span className="px-3 py-1 bg-emerald-50 rounded-full text-xs">10 (High)</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
                      <Checkbox 
                        id="health" 
                        className="cursor-pointer mt-1"
                        checked={watchedValues.impactOnHealthManagement}
                        onCheckedChange={(c) => setValue('impactOnHealthManagement', !!c)} 
                      />
                      <Label htmlFor="health" className="text-sm text-blue-900 leading-relaxed cursor-pointer font-medium">
                        I feel this incident has negatively impacted my physical or long-term health management.
                      </Label>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Shield size={24} />
                      <h3 className="text-xl font-bold">Review Final Report</h3>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Type</p>
                          <p className="font-bold text-slate-800 capitalize">{watchedValues.incidentType}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Platform</p>
                          <p className="font-bold text-slate-800">{watchedValues.platform}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Incident Details</p>
                        <p className="text-slate-700 leading-relaxed italic">
                          {watchedValues.description || "No description provided."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>

              <div className="flex justify-between p-6 bg-slate-50/50 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)} disabled={currentStep === 0} className="cursor-pointer font-medium">
                  Back
                </Button>
                {currentStep < 2 ? (
                  <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white px-8 cursor-pointer font-medium shadow-md">
                    Continue <ChevronRight size={18} className="ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 shadow-lg cursor-pointer font-bold">
                    <Send size={18} className="mr-2" /> Finish & Save
                  </Button>
                )}
              </div>
            </Card>
          </form>
        </div>

        {/* Right Column: Quick Tips (UI match for your uploaded image) */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-blue-50/30 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Info className="text-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Quick Tips</h3>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>Adjust each category using the sliders below.</p>
                <div className="flex items-center gap-2">
                  <span>Ratings range from</span>
                  <span className="bg-slate-200 px-3 py-1 rounded font-bold text-slate-700 text-sm">0</span>
                  <span>to</span>
                  <span className="bg-blue-600 px-3 py-1 rounded font-bold text-white text-sm">10</span>
                </div>
                <div className="flex items-start gap-3 pt-4 border-t border-blue-100">
                  <BarChart3 className="text-blue-600 shrink-0 mt-1" size={18} />
                  <p className="text-sm">Your overall resilience will sync automatically as you move them.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl">
             <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
               <Shield size={16} /> Privacy Reminder
             </h4>
             <p className="text-xs text-amber-700 leading-relaxed">
               All data remains in your browser's local storage. We do not use cookies or trackers to identify you.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}