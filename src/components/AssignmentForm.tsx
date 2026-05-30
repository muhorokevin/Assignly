import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, UploadCloud, ArrowRight, Calculator, Check, Info, X, 
  MessageSquare, Mail, Copy, CheckCircle2, AlertTriangle, ShieldCheck, 
  Sparkles, Calendar
} from 'lucide-react';
import { AssignmentSubmission, CurrencyConfig } from '../types';

// Currencies mapping
const currencies: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateToUSD: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rateToUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rateToUSD: 0.79 },
  KES: { code: 'KES', symbol: 'KSh', rateToUSD: 132.0 },
  NGN: { code: 'NGN', symbol: '₦', rateToUSD: 1450.0 },
  ZAR: { code: 'ZAR', symbol: 'R', rateToUSD: 18.5 },
  INR: { code: 'INR', symbol: '₹', rateToUSD: 83.5 },
  AED: { code: 'AED', symbol: 'د.إ', rateToUSD: 3.67 },
  CAD: { code: 'CAD', symbol: 'CA$', rateToUSD: 1.36 },
  AUD: { code: 'AUD', symbol: 'A$', rateToUSD: 1.51 },
  SAR: { code: 'SAR', symbol: 'SR', rateToUSD: 3.75 },
  QAR: { code: 'QAR', symbol: 'QR', rateToUSD: 3.64 },
  OMR: { code: 'OMR', symbol: 'RO', rateToUSD: 0.385 },
  KWD: { code: 'KWD', symbol: 'KD', rateToUSD: 0.31 },
  BHD: { code: 'BHD', symbol: 'BD', rateToUSD: 0.38 },
  MYR: { code: 'MYR', symbol: 'RM', rateToUSD: 4.70 },
  SGD: { code: 'SGD', symbol: 'S$', rateToUSD: 1.35 },
  NZD: { code: 'NZD', symbol: 'NZ$', rateToUSD: 1.63 },
  GHS: { code: 'GHS', symbol: 'GH₵', rateToUSD: 14.5 },
  RWF: { code: 'RWF', symbol: 'RF', rateToUSD: 1300.0 },
  UGX: { code: 'UGX', symbol: 'USh', rateToUSD: 3800.0 },
  TZS: { code: 'TZS', symbol: 'TSh', rateToUSD: 2600.0 },
  CNY: { code: 'CNY', symbol: '¥', rateToUSD: 7.25 },
  HKD: { code: 'HKD', symbol: 'HK$', rateToUSD: 7.80 },
  PKR: { code: 'PKR', symbol: 'Rs', rateToUSD: 278.0 },
  BDT: { code: 'BDT', symbol: '৳', rateToUSD: 117.0 },
  CHF: { code: 'CHF', symbol: 'CHF', rateToUSD: 0.91 }
};

// Base Pricing Configurations in USD - adjusted to start at $5.00!
const BASE_PRICES: Record<string, { baseUSD: number; perPageUSD: number }> = {
  'Micro Task / Basic Homework': { baseUSD: 5.0, perPageUSD: 0.0 },
  'Small Homework Job': { baseUSD: 5.0, perPageUSD: 2.0 },
  'Poster / Infographic Selection': { baseUSD: 10.0, perPageUSD: 3.0 },
  'Small Assignment': { baseUSD: 12.0, perPageUSD: 4.0 },
  'Essay': { baseUSD: 20.0, perPageUSD: 8.0 },
  'Research Paper': { baseUSD: 65.0, perPageUSD: 12.0 },
  'Report': { baseUSD: 35.0, perPageUSD: 9.0 },
  'PowerPoint Presentation': { baseUSD: 25.0, perPageUSD: 6.0 },
  'Coding Project': { baseUSD: 110.0, perPageUSD: 15.0 },
  'Data Analysis': { baseUSD: 75.0, perPageUSD: 12.0 },
  'Final Year Project': { baseUSD: 220.0, perPageUSD: 20.0 },
  'Dissertation': { baseUSD: 380.0, perPageUSD: 25.0 },
  'Thesis': { baseUSD: 550.0, perPageUSD: 30.0 },
  'Tutoring Session': { baseUSD: 15.0, perPageUSD: 0.0 },
  'Literature Review': { baseUSD: 40.0, perPageUSD: 10.0 },
  'Lab Report & Scientific Guides': { baseUSD: 35.0, perPageUSD: 9.0 },
  'Case Study & Case Brief Analysis': { baseUSD: 30.0, perPageUSD: 8.5 },
  'Mathematical Proof or Derivation': { baseUSD: 45.0, perPageUSD: 12.0 },
  'Proofreading & Formatting Correction': { baseUSD: 10.0, perPageUSD: 4.0 },
  'Custom/Other Academic Task': { baseUSD: 25.0, perPageUSD: 8.0 }
};

// Comprehensive list of departments and coursework fields
const COURSEWORK_SUBJECTS = [
  'Mathematics (Pure, Calculus, Applied)',
  'Biology (Microbiology, Genetics, General)',
  'Medicine (Clinical, Anatomy, Pharmacology)',
  'Nursing & Community Public Health',
  'Civil & Structural Engineering',
  'Electrical & Electronic Engineering',
  'Mechanical & Robotics Engineering',
  'Computer Science & Software Development',
  'IT & Cloud Cybersecurity',
  'Data Science & Advanced Statistics',
  'Business Administration & Management',
  'Economics & Econometrics',
  'Finance & Corporate Accounting',
  'Law & Jurisprudence Studies',
  'Psychology & Psychiatry',
  'Chemistry (Organic, Physical, Analytical)',
  'Physics & Astronomy',
  'Social Sciences & Anthropology',
  'Philosophy & Political Science',
  'History & International Relations',
  'Literature, Grammar & Linguistics',
  'Environmental & Agricultural Sciences',
  'Fine Art, Graphic Design & Architecture',
  'Custom Professional Major Syllabus'
];

// Country config to assign default currency & phone codes
const countriesList = [
  { name: 'United Kingdom', currency: 'GBP', phoneCode: '+44' },
  { name: 'United States', currency: 'USD', phoneCode: '+1' },
  { name: 'Kenya', currency: 'KES', phoneCode: '+254' },
  { name: 'Nigeria', currency: 'NGN', phoneCode: '+234' },
  { name: 'South Africa', currency: 'ZAR', phoneCode: '+27' },
  { name: 'Germany', currency: 'EUR', phoneCode: '+49' },
  { name: 'France', currency: 'EUR', phoneCode: '+33' },
  { name: 'Italy', currency: 'EUR', phoneCode: '+39' },
  { name: 'Spain', currency: 'EUR', phoneCode: '+34' },
  { name: 'Canada', currency: 'CAD', phoneCode: '+1' },
  { name: 'Australia', currency: 'AUD', phoneCode: '+61' },
  { name: 'Ireland', currency: 'EUR', phoneCode: '+353' },
  { name: 'India', currency: 'INR', phoneCode: '+91' },
  { name: 'United Arab Emirates', currency: 'AED', phoneCode: '+971' },
  { name: 'Saudi Arabia', currency: 'SAR', phoneCode: '+966' },
  { name: 'Qatar', currency: 'QAR', phoneCode: '+974' },
  { name: 'Oman', currency: 'OMR', phoneCode: '+968' },
  { name: 'Kuwait', currency: 'KWD', phoneCode: '+965' },
  { name: 'Bahrain', currency: 'BHD', phoneCode: '+973' },
  { name: 'Malaysia', currency: 'MYR', phoneCode: '+60' },
  { name: 'Singapore', currency: 'SGD', phoneCode: '+65' },
  { name: 'New Zealand', currency: 'NZD', phoneCode: '+64' },
  { name: 'Ghana', currency: 'GHS', phoneCode: '+233' },
  { name: 'Rwanda', currency: 'RWF', phoneCode: '+250' },
  { name: 'Uganda', currency: 'UGX', phoneCode: '+256' },
  { name: 'Tanzania', currency: 'TZS', phoneCode: '+255' },
  { name: 'China', currency: 'CNY', phoneCode: '+86' },
  { name: 'Hong Kong', currency: 'HKD', phoneCode: '+852' },
  { name: 'Pakistan', currency: 'PKR', phoneCode: '+92' },
  { name: 'Bangladesh', currency: 'BDT', phoneCode: '+880' },
  { name: 'Switzerland', currency: 'CHF', phoneCode: '+41' },
  { name: 'Other / International', currency: 'USD', phoneCode: '+' }
];

// Multipliers
const URGENCY_MULTIPLIERS: Record<string, number> = {
  'Flexible (7+ days)': 1.0,
  'Standard (4–6 days)': 1.2,
  'Urgent (2–3 days)': 1.5,
  'Extremely Urgent (24 hours)': 2.0
};

const LEVEL_MULTIPLIERS: Record<string, number> = {
  'High School': 0.85,
  'Diploma': 1.0,
  'Undergraduate': 1.15,
  'Masters': 1.5,
  'PhD': 2.2
};

const DIFFICULTY_MULTIPLIERS: Record<string, number> = {
  'Basic': 1.0,
  'Intermediate': 1.25,
  'Advanced': 1.6
};

interface AssignmentFormProps {
  onSubmissionsUpdated: () => void;
}

export default function AssignmentForm({ onSubmissionsUpdated }: AssignmentFormProps) {
  // Form input states - pre-configured to output $5 initially!
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [whatsappNumber, setWhatsappNumber] = useState('+44');
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('Mathematics (Pure, Calculus, Applied)');
  const [assignmentType, setAssignmentType] = useState('Micro Task / Basic Homework');
  const [academicLevel, setAcademicLevel] = useState('High School');
  const [difficulty, setDifficulty] = useState('Basic');
  const [pages, setPages] = useState(1);
  const [workloadUnit, setWorkloadUnit] = useState<'pages' | 'words'>('pages');
  const [wordCount, setWordCount] = useState(275);
  const [submissionMethod, setSubmissionMethod] = useState<'WhatsApp' | 'Email'>('WhatsApp');
  const [deadline, setDeadline] = useState(() => {
    // Default deadline to 8 days from now
    const d = new Date();
    d.setDate(d.getDate() + 8);
    return d.toISOString().split('T')[0];
  });
  const [urgency, setUrgency] = useState('Flexible (7+ days)');
  const [isUrgentToggle, setIsUrgentToggle] = useState(false);
  const [referencingStyle, setReferencingStyle] = useState('No Citations Required');
  const [instructions, setInstructions] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number }[]>([]);
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Email' | 'Both'>('Both');
  const [currency, setCurrency] = useState<string>('GBP');
  
  // Interface states
  const [isDragActive, setIsDragActive] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(5);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState<AssignmentSubmission | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-set currency and phone dial code when country changes
  const handleCountryChange = (countryName: string) => {
    setCountry(countryName);
    const found = countriesList.find(c => c.name === countryName);
    if (found) {
      setCurrency(found.currency as any);
      setWhatsappNumber(found.phoneCode);
    }
  };

  // Recalculate estimated price instantly when inputs change
  useEffect(() => {
    const pricingConfig = BASE_PRICES[assignmentType] || { baseUSD: 5, perPageUSD: 2 };
    
    let rawUSD = 0;
    if (assignmentType === 'Tutoring Session') {
      rawUSD = pricingConfig.baseUSD * pages;
    } else {
      rawUSD = pricingConfig.baseUSD + (pages > 1 ? (pages - 1) * pricingConfig.perPageUSD : 0);
    }

    const urgencyMult = URGENCY_MULTIPLIERS[urgency] || 1.0;
    const levelMult = LEVEL_MULTIPLIERS[academicLevel] || 1.0;
    const diffMult = DIFFICULTY_MULTIPLIERS[difficulty] || 1.0;

    const finalUSD = rawUSD * urgencyMult * levelMult * diffMult;
    
    // Convert to target currency
    const rate = currencies[currency]?.rateToUSD || 1.0;
    const finalPrice = Math.max(5, Math.round(finalUSD * rate)); // Price never falls below 5 local currency units
    
    setCalculatedPrice(finalPrice);
  }, [assignmentType, academicLevel, difficulty, pages, urgency, currency]);

  // Adjust urgency selection automatically when deadline picker changes
  const handleDeadlineChange = (val: string) => {
    setDeadline(val);
    const selectedDate = new Date(val);
    const today = new Date();
    const diffTime = Math.abs(selectedDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      setUrgency('Extremely Urgent (24 hours)');
      setIsUrgentToggle(true);
    } else if (diffDays <= 3) {
      setUrgency('Urgent (2–3 days)');
      setIsUrgentToggle(true);
    } else if (diffDays <= 6) {
      setUrgency('Standard (4–6 days)');
      setIsUrgentToggle(false);
    } else {
      setUrgency('Flexible (7+ days)');
      setIsUrgentToggle(false);
    }
  };

  const handleUrgentToggleChange = (isUrgentSelected: boolean) => {
    setIsUrgentToggle(isUrgentSelected);
    const d = new Date();
    if (isUrgentSelected) {
      d.setDate(d.getDate() + 2);
      setUrgency('Urgent (2–3 days)');
    } else {
      d.setDate(d.getDate() + 7);
      setUrgency('Flexible (7+ days)');
    }
    setDeadline(d.toISOString().split('T')[0]);
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesArray = Array.from(e.dataTransfer.files).map((f: File) => ({ name: f.name, size: f.size }));
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files).map((f: File) => ({ name: f.name, size: f.size }));
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // Validate and submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Please provide a valid email';
    if (!whatsappNumber.trim()) errors.whatsappNumber = 'Please specify your WhatsApp number';
    if (!country.trim()) errors.country = 'Country is required';
    if (!instructions.trim()) errors.instructions = 'Some basic project details or instructions are required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstError = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstError}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setFormErrors({});
    setIsPreviewMode(true);
    // Scroll the form container smoothly into view
    const el = document.getElementById('estimator-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFinalSubmit = () => {
    const newSubmission: AssignmentSubmission = {
      id: `AL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName,
      email,
      whatsappNumber,
      country,
      university: university || 'Not Specified',
      course,
      assignmentType,
      academicLevel,
      difficulty,
      pages,
      wordCount,
      submissionMethod,
      deadline,
      urgency,
      instructions,
      files: [],
      preferredContact,
      currency,
      estimatedPrice: calculatedPrice,
      createdAt: new Date().toISOString()
    };

    // Save in localStorage under Assignly
    const saved = localStorage.getItem('assignly_submissions');
    const existing = saved ? JSON.parse(saved) : [];
    localStorage.setItem('assignly_submissions', JSON.stringify([newSubmission, ...existing]));

    setLatestSubmission(newSubmission);
    setIsPreviewMode(false);
    setShowSuccessModal(true);
    onSubmissionsUpdated();
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setWhatsappNumber('+44');
    setCountry('United Kingdom');
    setUniversity('');
    setInstructions('');
    setUploadedFiles([]);
    setReferencingStyle('No Citations Required');
    setIsUrgentToggle(false);
    setShowSuccessModal(false);
    setWordCount(275);
    setWorkloadUnit('pages');
    setSubmissionMethod('WhatsApp');
    setIsPreviewMode(false);
  };

  // Build beautiful WhatsApp text configuration
  const getWhatsAppURL = () => {
    if (!latestSubmission) return '#';
    const sym = currencies[latestSubmission.currency]?.symbol || '$';
    const workloadStr = latestSubmission.assignmentType === 'Tutoring Session'
      ? `${latestSubmission.pages} Hour(s)`
      : `${latestSubmission.pages} Page(s) (~${(latestSubmission.wordCount || latestSubmission.pages * 275).toLocaleString()} words)`;

    const fileListForWhatsapp = `\n\n📎 *ATTACHED FILES DISCLOSURE*:\n*(⚠️ Hint: Please manually press attach file button inside WhatsApp chat to share your assignments guidelines, tasks, sheets or screenshots with our verified matched assistants)*`;

    const message = `Hello Assignly! 🌟 I have registered a secure academic support request. Here are my details:

📚 Subject: ${latestSubmission.course}
📝 Task Type: ${latestSubmission.assignmentType}
🏛️ College: ${latestSubmission.university}
📆 Deadline: ${latestSubmission.deadline} (${latestSubmission.urgency})
📖 Volume: ${workloadStr}
🔌 Submit & Contact Pref: ${latestSubmission.submissionMethod || 'WhatsApp'}
⚙️ Complexity: ${latestSubmission.difficulty} (${latestSubmission.academicLevel})
✍️ Citations Style: ${referencingStyle}
💰 Est. Budget Range: ${sym}${Math.round(latestSubmission.estimatedPrice * 0.9).toLocaleString()} - ${sym}${Math.round(latestSubmission.estimatedPrice * 1.15).toLocaleString()} ${latestSubmission.currency}

Instructions: "${latestSubmission.instructions.substring(0, 150)}${latestSubmission.instructions.length > 150 ? '...' : ''}"${fileListForWhatsapp}

Can my dedicated graduate helper review files and confirm details on ${latestSubmission.submissionMethod || 'WhatsApp'}? Thank you!`;

    return `https://wa.me/254710974670?text=${encodeURIComponent(message)}`;
  };

  // Create copyable Email Draft parameters
  const generateEmailDraft = () => {
    if (!latestSubmission) return '';
    const sym = currencies[latestSubmission.currency]?.symbol || '$';
    const workloadStr = latestSubmission.assignmentType === 'Tutoring Session'
      ? `${latestSubmission.pages} Hour(s)`
      : `${latestSubmission.pages} Page(s) (~${(latestSubmission.wordCount || latestSubmission.pages * 275).toLocaleString()} words)`;

    const fileListForEmail = `\n\n📎 ATTACHED FILES FOR REVIEW:\n⚠️ [IMPORTANT SENDER NOTICE: Please manually drag or select your coursework task sheets, PDF files, images, or instructions inside your email writer application before hitting send, so our matching experts can review immediately!] 👋`;

    return `Subject: New Academic Coaching Request - ${latestSubmission.course} (${latestSubmission.assignmentType})

Hello Assignly Support Team,

I recently submitted my coursework details on the landing page. Here is the copy of my instructions and calculations:

CUSTOMER DETAILS:
- Full Name: ${latestSubmission.fullName}
- Preferred Contact Email: ${latestSubmission.email}
- WhatsApp Contact: ${latestSubmission.whatsappNumber}
- Country & College: ${latestSubmission.country} | ${latestSubmission.university}
- Preferred Submission Method: Send updates/drafts via ${latestSubmission.submissionMethod || 'WhatsApp'}

PROJECT INFORMATION:
- Coursework Field: ${latestSubmission.course}
- Assignment Model: ${latestSubmission.assignmentType}
- Academic Grading Level: ${latestSubmission.academicLevel}
- Technical Complexity: ${latestSubmission.difficulty}
- Scope Check: ${workloadStr}
- Detailed Bibliographic Citation Formatting: ${referencingStyle}
- Deadline Target: ${latestSubmission.deadline} (${latestSubmission.urgency})${fileListForEmail}

INSTRUCTIONS & SPECIAL REQUIREMENTS:
"${latestSubmission.instructions}"

CALCULATED GUIDE PRICE:
Estimated Range: ${sym}${Math.round(latestSubmission.estimatedPrice * 0.9).toLocaleString()} - ${sym}${Math.round(latestSubmission.estimatedPrice * 1.15).toLocaleString()} ${latestSubmission.currency}

Please connect me with a verified grad assistant as soon as possible.`;
  };

  const copyEmailDraft = () => {
    const draft = generateEmailDraft();
    navigator.clipboard.writeText(draft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  const activeCurrencySymbol = currencies[currency]?.symbol || '$';
  const isUrgent = urgency.includes('Urgent') || urgency.includes('Extremely');

  return (
    <section id="estimator-form" className="py-24 bg-transparent relative">
      
      {/* Visual glowing points */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-blob" />
      <div className="absolute bottom-10 right-1/4 w-[250px] h-[250px] bg-emerald-500/5 rounded-full blur-blob" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-black tracking-widest text-[#d97706] bg-[#d97706]/10 border border-[#d97706]/35 px-4 py-2 rounded-full">
            Live Cost Calculator
          </span>
          <h2 className="mt-4 font-display font-black text-3.5xl sm:text-4.5xl text-[#022c22]">
            Get Expert Academic Coaching
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#022c22]/80 font-bold leading-relaxed max-w-xl mx-auto">
            Tell us about your coursework parameters below. Our live calculation engine instantly outputs a fair, student-friendly range based on complexity, size, and urgency.
          </p>
        </div>

        {/* Form and sticky estimator box wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Input Form (Col-8) */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 bg-[#f4f4f0] border-2 border-[#e7e5e4] rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300">
            
            {isPreviewMode ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-[#e7e5e4] mb-4">
                  <div className="w-10 h-10 bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black font-display text-[#022c22] uppercase tracking-wider">Review Request Details</h3>
                    <p className="text-xs text-[#022c22]/70 font-bold">Double check your coursework parameters below before placing your evaluation request.</p>
                  </div>
                </div>

                <div className="bg-white border border-[#e7e5e4] rounded-2xl overflow-hidden shadow-sm">
                  {/* Title Banner */}
                  <div className="bg-[#022c22] px-5 py-3.5 text-[#FDFBF7] flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest font-display">Target Evaluation Profile</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d97706] text-[#FDFBF7] font-black uppercase tracking-wider">
                      In-Review
                    </span>
                  </div>

                  {/* Summary Rows */}
                  <div className="divide-y divide-[#e7e5e4] text-sm">
                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Contact Name</span>
                      <span className="col-span-2 font-black text-[#022c22]">{fullName}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Email Address</span>
                      <span className="col-span-2 font-black text-[#022c22] break-all">{email}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">WhatsApp Number</span>
                      <span className="col-span-2 font-mono font-black text-[#022c22]">{whatsappNumber}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Country Info</span>
                      <span className="col-span-2 font-black text-[#022c22]">{country}</span>
                    </div>

                    {university && (
                      <div className="grid grid-cols-3 p-4 gap-2">
                        <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">College Context</span>
                        <span className="col-span-2 font-black text-[#022c22]">{university}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Subject Major</span>
                      <span className="col-span-2 font-black text-[#022c22]">{course}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Coaching Format</span>
                      <span className="col-span-2 font-black text-[#022c22]">{assignmentType}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Academic Level</span>
                      <span className="col-span-2 font-black text-[#022c22]">{academicLevel}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Complexity Match</span>
                      <span className="col-span-2 font-black text-[#d97706]">{difficulty}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Workload Scope</span>
                      <span className="col-span-2 font-black text-[#022c22] font-mono">
                        {assignmentType === 'Tutoring Session' 
                          ? `${pages} Hour(s)` 
                          : `${pages} Page(s) (~${wordCount.toLocaleString()} words)`}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Delivery Speed</span>
                      <span className="col-span-2 font-black text-[#022c22] font-mono">{urgency}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Target Deadline</span>
                      <span className="col-span-2 font-black text-[#022c22] font-mono">{deadline}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Citations Style</span>
                      <span className="col-span-2 font-black text-[#022c22]">{referencingStyle}</span>
                    </div>

                    <div className="grid grid-cols-3 p-4 gap-2">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Discussion Channel</span>
                      <span className="col-span-2 font-black text-[#022c22]">{submissionMethod}</span>
                    </div>

                    <div className="p-4 grid grid-cols-1 gap-2 bg-[#f4f4f0]/50">
                      <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide">Detailed Support Instructions</span>
                      <p className="text-xs text-[#022c22] font-bold leading-relaxed bg-white border border-[#e7e5e4] p-3 rounded-xl whitespace-pre-wrap font-sans max-h-48 overflow-y-auto">
                        {instructions}
                      </p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="p-4 bg-[#f4f4f0]/30">
                        <span className="font-extrabold text-[#022c22]/60 text-xs uppercase tracking-wide block mb-2">Pending Attachments Review</span>
                        <div className="flex flex-wrap gap-2">
                          {uploadedFiles.map((file, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-white border border-[#e7e5e4] text-[#022c22] rounded-lg">
                              📎 {file.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-[#022c22]/5 border border-[#022c22]/15 rounded-2xl flex gap-3 text-left">
                  <ShieldCheck className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#022c22]/85 font-semibold leading-relaxed">
                    By confirming, you will register this secure pricing estimate inside localStorage. Next, you will open direct secure live dialogue with verified graduate coursework mentors.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPreviewMode(false);
                      const el = document.getElementById('estimator-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex-1 py-4 px-6 bg-white hover:bg-[#e7e5e4] text-[#022c22] border-2 border-[#e7e5e4] font-black rounded-xl shadow-sm hover:scale-[1.01] duration-200 transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer h-14"
                  >
                    ← Wait, Go Back & Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="flex-1 bg-[#022c22] hover:bg-[#023126] text-[#FDFBF7] font-black py-4 px-6 rounded-xl border-2 border-[#d97706] shadow-xl hover:scale-[1.01] duration-200 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm uppercase tracking-wider h-14"
                  >
                    Confirm & Submit Estimate <ArrowRight className="h-5 w-5 text-[#d97706]" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="w-10 h-10 bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-[#022c22]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black font-display text-[#022c22] uppercase tracking-wider">Coursework Details</h3>
                    <p className="text-xs text-[#022c22]/70 font-bold">Fill in the essential fields below to get matched with subject specialists.</p>
                  </div>
                </div>

                {/* Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div id="field-fullName" className="flex flex-col">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2 flex items-center gap-1">
                      Full Name <span className="text-rose-450 font-black text-rose-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-sm text-[#022c22] bg-white ${
                        formErrors.fullName 
                          ? 'border-red-500 bg-red-50 focus:ring-red-400' 
                          : 'border-[#e7e5e4] focus:border-[#d97706] focus:ring-0'
                      } focus:outline-none`}
                    />
                    {formErrors.fullName && <span className="text-[11px] text-red-400 font-extrabold mt-1">{formErrors.fullName}</span>}
                  </div>

                  {/* Email */}
                  <div id="field-email" className="flex flex-col">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2 flex items-center gap-1">
                      Email Address <span className="text-rose-450 font-black text-rose-400">*</span>
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@university.edu"
                      className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-sm text-[#022c22] bg-white ${
                        formErrors.email 
                          ? 'border-red-500 bg-red-50 focus:ring-red-400' 
                          : 'border-[#e7e5e4] focus:border-[#d97706] focus:ring-0'
                      } focus:outline-none`}
                    />
                    {formErrors.email && <span className="text-[11px] text-red-100 font-extrabold mt-1">{formErrors.email}</span>}
                  </div>

                  {/* Country Select */}
                  <div id="field-country" className="flex flex-col">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2 flex items-center gap-1">
                      Select Country (Assigns Currency) <span className="text-rose-450 font-black text-rose-400">*</span>
                    </label>
                    <select 
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#e7e5e4] focus:border-[#d97706] bg-white font-bold text-[#022c22] text-sm focus:outline-none focus:ring-0"
                    >
                      {countriesList.map(item => (
                        <option key={item.name} value={item.name} className="bg-white text-[#022c22]">{item.name}</option>
                      ))}
                    </select>
                    {formErrors.country && <span className="text-[11px] text-red-400 font-extrabold mt-1">{formErrors.country}</span>}
                  </div>

                  {/* WhatsApp Number with Country Auto Code prefix */}
                  <div id="field-whatsappNumber" className="flex flex-col">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2 flex items-center gap-1">
                      WhatsApp Number <span className="text-rose-450 font-black text-rose-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. +447123456789"
                      className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-sm text-[#022c22] bg-white ${
                        formErrors.whatsappNumber 
                          ? 'border-red-500 bg-red-955/20 focus:ring-red-400' 
                          : 'border-[#e7e5e4] focus:border-[#d97706] focus:ring-0'
                      } focus:outline-none`}
                    />
                    {formErrors.whatsappNumber && <span className="text-[11px] text-red-00 font-extrabold mt-1">{formErrors.whatsappNumber}</span>}
                  </div>

                  {/* Course Subject Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2">
                      Coursework Subject Title
                    </label>
                    <select 
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#e7e5e4] focus:border-[#d97706] bg-white font-bold text-[#022c22] text-sm focus:outline-none focus:ring-0"
                    >
                      {COURSEWORK_SUBJECTS.map(sub => (
                        <option key={sub} value={sub} className="bg-white text-[#022c22]">{sub}</option>
                      ))}
                    </select>
                  </div>

                  {/* Assignment Support Type Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2">
                      Coaching Support Format
                    </label>
                    <select 
                      value={assignmentType}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAssignmentType(val);
                        // Reset pages context appropriately
                        if (val === 'Tutoring Session' && pages > 20) {
                          setPages(1);
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#e7e5e4] focus:border-[#d97706] bg-white font-bold text-[#022c22] text-sm focus:outline-none focus:ring-0"
                    >
                      <option value="Micro Task / Basic Homework" className="bg-white text-[#022c22]">Micro Task / Basic Homework (Starts $5)</option>
                      <option value="Small Homework Job" className="bg-white text-[#022c22]">Small Homework Job (Basic Q&A)</option>
                      <option value="Poster / Infographic Selection" className="bg-white text-[#022c22]">Poster / Infographic Creation Guide</option>
                      <option value="Small Assignment" className="bg-white text-[#022c22]">Small Assignment Details</option>
                      <option value="Essay" className="bg-white text-[#022c22]">Essay Writing Guidance</option>
                      <option value="Research Paper" className="bg-white text-[#022c22]">Research Paper Coaching</option>
                      <option value="Report" className="bg-white text-[#022c22]">Report Structured Draft</option>
                      <option value="PowerPoint Presentation" className="bg-white text-[#022c22]">PowerPoint Presentation Guide</option>
                      <option value="Coding Project" className="bg-white text-[#022c22]">Coding Project Assistance</option>
                      <option value="Data Analysis" className="bg-white text-[#022c22]">Data Analysis & Stats Report</option>
                      <option value="Literature Review" className="bg-white text-[#022c22]">Literature Review Analysis</option>
                      <option value="Lab Report & Scientific Guides" className="bg-white text-[#022c22]">Lab Report & Scientific Guides</option>
                      <option value="Case Study & Case Brief Analysis" className="bg-white text-[#022c22]">Case Study & Case Brief Analysis</option>
                      <option value="Mathematical Proof or Derivation" className="bg-white text-[#022c22]">Mathematical Proof or Derivation</option>
                      <option value="Proofreading & Formatting Correction" className="bg-white text-[#022c22]">Proofreading & Formatting Correction</option>
                      <option value="Final Year Project" className="bg-white text-[#022c22]">Final Year Project Support</option>
                      <option value="Dissertation" className="bg-white text-[#022c22]">Dissertation / Chapters Guide</option>
                      <option value="Thesis" className="bg-white text-[#022c22]">Master's or PhD Thesis Support</option>
                      <option value="Tutoring Session" className="bg-white text-[#022c22]">1-on-1 Academic Tutoring Hour</option>
                      <option value="Custom/Other Academic Task" className="bg-white text-[#022c22]">Custom/Other Academic Task</option>
                    </select>
                  </div>

                  {/* Academic Grading Level */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2">
                      Academic Level Target
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {['High School', 'Diploma', 'Undergraduate', 'Masters', 'PhD'].map(lvl => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setAcademicLevel(lvl)}
                          className={`px-2 py-2.5 text-xs font-black rounded-xl border-2 text-center transition-all cursor-pointer ${
                            academicLevel === lvl 
                              ? 'bg-[#022c22] text-[#FDFBF7] border-[#d97706] shadow-md' 
                              : 'border-[#e7e5e4] bg-white text-[#022c22] hover:bg-[#f4f4f0] hover:border-[#022c22]/50'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technical Complexity Rating */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2">
                      Technical Complexity Level
                    </label>
                    <div className="grid grid-cols-3 gap-2 bg-white p-1.5 rounded-xl border border-[#e7e5e4]">
                      {['Basic', 'Intermediate', 'Advanced'].map(diff => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => setDifficulty(diff)}
                          className={`py-2 text-xs font-black rounded-lg text-center transition-all cursor-pointer ${
                            difficulty === diff 
                              ? 'bg-[#022c22] text-[#FDFBF7] shadow-md border border-[#022c22]' 
                              : 'text-[#022c22]/75 hover:text-[#022c22] hover:bg-[#f4f4f0]'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional University Name */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-1.5 flex items-center gap-1">
                      University / College Context <span className="text-[#022c22]/50 font-bold">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. University of Nairobi, UCL, Boston College"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#e7e5e4] focus:border-[#d97706] bg-white font-bold text-[#022c22] text-sm focus:outline-none focus:ring-0"
                    />
                  </div>

                  {/* Volume pages/words slider */}
                  <div className="flex flex-col md:col-span-2 bg-[#022c22] p-6 rounded-2xl border-2 border-[#d97706] text-[#FDFBF7] shadow-xl relative overflow-hidden transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[13px] font-black uppercase text-[#d97706] tracking-wider">
                        {assignmentType === 'Tutoring Session' ? 'Coaching Duration' : 'Assignments Workload Measure'}
                      </label>
                      {assignmentType !== 'Tutoring Session' && (
                        <div className="flex bg-[#023126] p-0.5 rounded-lg text-[10px] font-black shadow-inner border border-[#d97706]/30">
                          <button
                            type="button"
                            onClick={() => {
                              setWorkloadUnit('pages');
                              const p = Math.max(1, Math.ceil(wordCount / 275));
                              setPages(p);
                            }}
                            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                              workloadUnit === 'pages' ? 'bg-[#d97706] text-[#FDFBF7] shadow-sm font-black' : 'text-[#e7e5e4] hover:text-white'
                            }`}
                          >
                            Pages
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setWorkloadUnit('words');
                              setWordCount(pages * 275);
                            }}
                            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                              workloadUnit === 'words' ? 'bg-[#d97706] text-[#FDFBF7] shadow-sm font-black' : 'text-[#e7e5e4] hover:text-white'
                            }`}
                          >
                            Words
                          </button>
                        </div>
                      )}
                    </div>

                    {assignmentType === 'Tutoring Session' ? (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-[#e7e5e4] font-bold font-sans">Total Hours Targeted:</span>
                          <span className="text-xs font-black font-mono text-[#022c22] bg-[#d97706] border border-[#d97706] px-2.5 py-0.5 rounded">
                            {pages} Hour(s)
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="20" 
                          value={pages}
                          onChange={(e) => setPages(Number(e.target.value))}
                          className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#d97706] focus:outline-none"
                        />
                        <div className="flex justify-between text-[10px] text-[#e7e5e4]/80 mt-1.5 font-bold">
                          <span>1 Hour</span>
                          <span>20 Hours max</span>
                        </div>
                      </>
                    ) : workloadUnit === 'pages' ? (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-[#e7e5e4] font-bold font-sans">Equivalent Words: ~{(pages * 275).toLocaleString()} words</span>
                          <span className="text-xs font-black font-mono text-[#022c22] bg-[#d97706] border border-[#d97706] px-2.5 py-0.5 rounded">
                            {pages} Page(s)
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="150" 
                          value={pages}
                          onChange={(e) => {
                            const p = Number(e.target.value);
                            setPages(p);
                            setWordCount(p * 275);
                          }}
                          className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#d97706] focus:outline-none"
                        />
                        <div className="flex justify-between text-[10px] text-[#e7e5e4]/80 mt-1.5 font-bold">
                          <span>1 Page</span>
                          <span>150 Pages limit</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-[#e7e5e4] font-bold font-sans">Equivalent Pages: ~{Math.ceil(wordCount / 275)} page(s)</span>
                          <span className="text-xs font-black font-mono text-[#022c22] bg-[#d97706] border border-[#d97706] px-2.5 py-0.5 rounded">
                            {wordCount.toLocaleString()} Word(s)
                          </span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <input 
                            type="range" 
                            min="100" 
                            max="40000" 
                            step="100"
                            value={wordCount}
                            onChange={(e) => {
                              const w = Number(e.target.value);
                              setWordCount(w);
                              setPages(Math.max(1, Math.ceil(w / 275)));
                            }}
                            className="flex-1 h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#d97706] focus:outline-none"
                          />
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="100"
                              max="100000"
                              value={wordCount}
                              onChange={(e) => {
                                const w = Math.max(0, Number(e.target.value));
                                setWordCount(w);
                                setPages(Math.max(1, Math.ceil(w / 275)));
                              }}
                              className="w-24 px-2 py-1.5 bg-[#FDFBF7] border-2 border-[#d97706] text-xs font-black text-[#022c22] text-center rounded-xl focus:ring-2 focus:ring-[#d97706] outline-none font-mono"
                            />
                            <span className="text-[10px] font-bold text-[#e7e5e4] uppercase font-sans">Words</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-[9.5px] text-[#e7e5e4]/80 mt-1.5 font-semibold">
                          <span>100 Words</span>
                          <span>40,000 Words limit</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Submission Method Selection (How they will submit/receive project followups) */}
                  <div className="flex flex-col md:col-span-2 bg-[#f4f4f0] border-2 border-[#e7e5e4] p-5 rounded-2xl">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-2 flex items-center gap-1.5">
                      <span className="p-1 rounded bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22]"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                      Do you plan to submit/discuss details via WhatsApp or Email? <span className="text-[#d97706] font-extrabold">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                      <button
                        type="button"
                        onClick={() => setSubmissionMethod('WhatsApp')}
                        className={`p-3.5 rounded-xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                          submissionMethod === 'WhatsApp'
                            ? 'bg-white border-[#022c22] text-[#022c22] shadow-lg ring-1 ring-[#022c22]'
                            : 'border-[#e7e5e4] bg-white hover:border-[#022c22]/50 text-[#022c22]/80'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          submissionMethod === 'WhatsApp' ? 'border-[#022c22] bg-[#022c22] text-[#FDFBF7]' : 'border-[#e7e5e4]'
                        }`}>
                          {submissionMethod === 'WhatsApp' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-sm font-black flex items-center gap-1 text-[#022c22]">
                            Submit via WhatsApp <span className="text-[9px] bg-[#d97706] text-[#FDFBF7] px-1.5 py-0.5 rounded font-black uppercase tracking-wider animate-pulse">Fastest</span>
                          </p>
                          <p className="text-[11px] text-[#022c22]/80 mt-0.5 leading-snug font-bold">Instant 1-on-1 chats, fast attachment verification, and immediate helper assignation.</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSubmissionMethod('Email')}
                        className={`p-3.5 rounded-xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                          submissionMethod === 'Email'
                            ? 'bg-white border-[#022c22] text-[#022c22] shadow-lg ring-1 ring-[#022c22]'
                            : 'border-[#e7e5e4] bg-white hover:border-[#022c22]/50 text-[#022c22]/80'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          submissionMethod === 'Email' ? 'border-[#022c22] bg-[#022c22] text-[#FDFBF7]' : 'border-[#e7e5e4]'
                        }`}>
                          {submissionMethod === 'Email' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-sm font-black flex items-center gap-1 text-[#022c22]">
                            Submit via Email
                          </p>
                          <p className="text-[11px] text-[#022c22]/80 mt-0.5 leading-snug font-bold">Formal documented receipt delivery to your inbox, written quotes, and email draft confirmation.</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Target Deadline Picker with native Calendar popup helper overlay */}
                  <div className="flex flex-col">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-1.5 flex items-center justify-between">
                      <span>Target Deadline (Click to pop calendar)</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] font-mono">
                        {urgency}
                      </span>
                    </label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={deadline}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => handleDeadlineChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#e7e5e4] bg-white text-[#022c22] focus:outline-none focus:border-[#d97706] text-sm font-semibold cursor-pointer"
                      />
                      <Calendar className="w-4 h-4 text-[#022c22]/60 absolute left-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Is the project Urgent / Priority Toggle selector */}
                  <div className="flex flex-col">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-1.5">
                      Is This Work Urgent?
                    </label>
                    <div className="grid grid-cols-2 bg-white p-1 rounded-xl gap-1 border-2 border-[#e7e5e4]">
                      <button
                        type="button"
                        onClick={() => handleUrgentToggleChange(false)}
                        className={`py-2 text-xs font-black rounded-lg text-center transition-all cursor-pointer ${
                          !isUrgentToggle
                            ? 'bg-[#022c22] text-[#FDFBF7] shadow-md'
                            : 'text-[#022c22]/70 hover:text-[#022c22]'
                        }`}
                      >
                        No (Normal)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUrgentToggleChange(true)}
                        className={`py-2 text-xs font-black rounded-lg text-center transition-all cursor-pointer ${
                          isUrgentToggle
                            ? 'bg-[#d97706] text-[#FDFBF7] shadow-md'
                            : 'text-[#022c22]/70 hover:text-[#022c22]'
                        }`}
                      >
                        ⚡ Yes (Prioritize)
                      </button>
                    </div>
                  </div>

                   {/* Bibliographic Citation Referencing style list */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-1.5">
                      Required Referencing Style
                    </label>
                    <select
                      value={referencingStyle}
                      onChange={(e) => setReferencingStyle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#e7e5e4] bg-white text-[#022c22] font-bold text-sm focus:outline-none focus:border-[#d97706] focus:ring-0"
                    >
                      <option value="No Citations Required" className="bg-white text-[#022c22]">No Citations / Standard Homework Guide</option>
                      <option value="APA (7th Edition)" className="bg-white text-[#022c22]">APA (7th Edition) format</option>
                      <option value="Harvard Referencing Style" className="bg-white text-[#022c22]">Harvard Referencing Style guidelines</option>
                      <option value="MLA (9th Edition)" className="bg-white text-[#022c22]">MLA (9th Edition) humanities layout</option>
                      <option value="Chicago / Turabian Footnotes Style" className="bg-white text-[#022c22]">Chicago / Turabian Footnotes format</option>
                      <option value="IEEE Format (Tech & Eng)" className="bg-white text-[#022c22]">IEEE Format (Coding & Engineering style)</option>
                      <option value="OSCOLA Cites (Oxford Law)" className="bg-white text-[#022c22]">OSCOLA Oxford Law footnotes citations</option>
                      <option value="Vancouver Style (Medical)" className="bg-white text-[#022c22]">Vancouver Medical indexing style</option>
                      <option value="Specify Custom Syllabus Rules" className="bg-white text-[#022c22]">Specify Custom Coursework Syllabus Rules</option>
                    </select>
                  </div>

                  {/* Instructions and Details text */}
                  <div id="field-instructions" className="flex flex-col md:col-span-2">
                    <label className="text-[13px] font-extrabold text-[#022c22] mb-1.5 flex items-center justify-between">
                      <span>Coursework Instructions, Guidelines or Brief description <span className="text-[#d97706] font-extrabold">*</span></span>
                      <span className="text-[11px] text-[#022c22]/70 font-bold font-sans">Min 10 characters</span>
                    </label>
                    <textarea 
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows={4}
                      placeholder="Paste details of the assignment, research rubrics, formatting guidelines, syllabus rules, or data formulas here..."
                      className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-sm leading-relaxed text-[#022c22] bg-white focus:outline-none ${
                        formErrors.instructions 
                          ? 'border-red-500 bg-red-50 focus:border-red-400' 
                          : 'border-[#e7e5e4] focus:border-[#d97706]'
                      }`}
                    />
                    {formErrors.instructions && <span className="text-[11px] text-red-500 font-extrabold mt-1">{formErrors.instructions}</span>}
                  </div>

                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-8 w-full bg-[#022c22] hover:bg-[#023126] text-[#FDFBF7] font-black py-4 px-6 rounded-xl border-2 border-[#d97706] shadow-xl hover:scale-[1.01] duration-200 transition-all flex items-center justify-center gap-2 cursor-pointer text-base uppercase tracking-wider h-14"
                >
                  Securely Request Free Evaluation <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}

          </form>

          {/* Sticky Cost Estimator Receipt (Col-4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            
            <div className="bg-[#FDFBF7] border-2 border-[#e7e5e4] hover:border-[#d97706]/35 p-6 rounded-3xl shadow-xl relative overflow-hidden transition-all duration-300 font-sans">
              
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#d97706]/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-[#e7e5e4] pb-4 mb-5">
                <span className="text-xs font-black text-[#022c22]/80 uppercase tracking-widest font-display">Student Calculator</span>
                <span className="px-2.5 py-1 text-[10px] font-black bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] rounded-full animate-pulse flex items-center gap-1 font-mono">
                  Live Estimate
                </span>
              </div>

              {/* Cost Highlight */}
              <div className="text-center py-5 bg-[#f4f4f0] rounded-2xl border border-[#e7e5e4]">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#022c22]/75">Student Budget Range</span>
                <div className="mt-1 flex flex-wrap items-baseline justify-center gap-0.5 px-1 pb-1">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#022c22]">
                    {activeCurrencySymbol}{Math.round(calculatedPrice * 0.9).toLocaleString()} - {activeCurrencySymbol}{Math.round(calculatedPrice * 1.15).toLocaleString()}
                  </span>
                  <span className="text-[#d97706] font-black text-[12px] uppercase tracking-widest pl-1 font-mono">
                    {currency}
                  </span>
                </div>
                <div className="mt-2.5 px-3 text-[11px] text-[#022c22]/80 border-t border-[#e7e5e4] pt-2 text-left leading-relaxed font-bold">
                  <strong className="text-[#d97706] font-extrabold uppercase tracking-wider">Academics Trust Note:</strong> Assignly guarantees budget stability. Base rates may slightly shift within this student-friendly range once assignment rubrics are fully assessed.
                </div>
                <p className="text-[10px] text-[#022c22]/70 mt-3.5 flex items-center justify-center gap-1 px-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#022c22] shrink-0" /> Authorized subject-expert matchmaking
                </p>
              </div>

              {/* Parameters Summary */}
              <div className="mt-6 space-y-3.5">
                
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#022c22]/75">Project Type:</span>
                  <span className="font-extrabold text-[#022c22] truncate max-w-[180px] text-right">{assignmentType}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#022c22]/75">{assignmentType === 'Tutoring Session' ? 'Hours:' : 'Volume:'}</span>
                  <span className="font-extrabold text-[#022c22] font-mono">{pages} {assignmentType === 'Tutoring Session' ? 'Hour(s)' : 'Page(s)'}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#022c22]/75">Academic Grading Level:</span>
                  <span className="font-extrabold text-[#022c22]">{academicLevel}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#022c22]/75">Technical Difficulty:</span>
                  <span className="font-extrabold text-[#022c22]">{difficulty}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#022c22]/75">Target Delivery Timeline:</span>
                  <span className="font-extrabold text-[#022c22] font-mono">{deadline}</span>
                </div>

                <div className="flex items-center justify-between text-xs border-b border-[#e7e5e4] pb-3 font-bold">
                  <span className="text-[#022c22]/75">Delivery Speed Indicator:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    isUrgent 
                      ? 'bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706]' 
                      : 'bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22]'
                  }`}>
                    {urgency}
                  </span>
                </div>

              </div>

              {/* Close Deadline Warnings */}
              {isUrgent && (
                <div className="mt-4 p-3 bg-[#d97706]/5 border border-[#d97706]/25 rounded-xl flex gap-2 animate-pulse">
                  <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-[#d97706] leading-tight font-extrabold">
                    <strong>Short deadline:</strong> Urgency increases coaching cost due to priority scheduling and expedited graduate analyst review.
                  </p>
                </div>
              )}

              {/* Guarantees Box */}
              <div className="mt-6 pt-5 border-t border-[#e7e5e4] space-y-3.5">
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-[#022c22] uppercase tracking-wider">Confidentiality & Privacy Secure</h5>
                    <p className="text-[10px] text-[#022c22]/70 leading-tight font-bold font-sans">We never share guidelines, contact details, or credentials with anyone.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#022c22]/10 border border-[#022c22]/20 text-[#022c22] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-[#022c22] uppercase tracking-wider">Zero Plagiarism Integrity</h5>
                    <p className="text-[10px] text-[#022c22]/70 leading-tight font-bold font-sans">Authentic references and thorough explanations designed for study aid.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-[#d97706] uppercase tracking-wider">Full Refund Safety Policy</h5>
                    <p className="text-[10px] text-[#d97706]/85 leading-tight font-bold font-sans">We promise precise milestone guidance, else you are fully refunded.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SUCCESS MODAL POPUP */}
      {showSuccessModal && latestSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] border-2 border-[#e7e5e4] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col font-sans">
            
            {/* Header banner glow */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#022c22] to-[#d97706]" />
            
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* Success graphic */}
              <div className="flex flex-col items-center justify-center text-center mt-4">
                <div className="w-16 h-16 bg-[#022c22]/10 border-2 border-[#022c22]/20 rounded-2xl flex items-center justify-center mb-4 text-[#022c22] shadow">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#022c22]">Estimate Registered Successfully!</h3>
                <p className="text-xs text-[#022c22]/85 max-w-md mt-1 font-bold">
                  Your request ID <span className="font-mono font-black text-[#d97706] bg-[#d97706]/10 border border-[#d97706]/20 px-1.5 py-0.5 rounded">{latestSubmission.id}</span> has been processed. Our academic team is analyzing details.
                </p>
              </div>

              {/* Receipt Summary block */}
              <div className="mt-6 bg-[#f4f4f0] px-4 py-3.5 rounded-2xl border border-[#e7e5e4] text-xs text-[#022c22] font-bold">
                <p className="font-black text-[10px] uppercase text-[#022c22] tracking-wider mb-2">Request Details Summary</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div>Subject: <span className="font-black text-[#022c22]">{latestSubmission.course}</span></div>
                  <div>Format: <span className="font-black text-[#022c22]">{latestSubmission.assignmentType}</span></div>
                  <div>Workload: <span className="font-black text-[#022c22] font-mono">{latestSubmission.pages} Pages</span></div>
                  <div>Deadline: <span className="font-black text-[#022c22] font-mono">{latestSubmission.deadline}</span></div>
                  <div className="col-span-2 border-t border-[#e7e5e4] pt-2 mt-1 font-black text-[#d97706] flex justify-between uppercase">
                    <span>Estimated Evaluation Guide Cost:</span>
                    <span>{currencies[latestSubmission.currency]?.symbol || '$'}{latestSubmission.estimatedPrice.toLocaleString()} {latestSubmission.currency}</span>
                  </div>
                </div>
              </div>

              {/* ALWAYS visible guide instructing students to attach file documents inside WhatsApp/Email client */}
              <div className="mt-5 bg-[#d97706]/5 border border-[#d97706]/20 rounded-2xl p-5 text-[#022c22] shadow-sm flex gap-3 text-left">
                <AlertTriangle className="w-6 h-6 text-[#d97706] shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-black text-[#d97706] uppercase tracking-widest flex items-center gap-1">
                    📎 Remember to attach your Coursework files!
                  </h4>
                  <p className="text-[11px] text-[#022c22]/90 leading-relaxed mt-1 font-bold">
                    To trigger an instant evaluation, please <strong className="text-[#d97706] font-black underline cursor-pointer">manually attach</strong> your instructions, PDFs, worksheet screenshots, or coding briefs directly inside your WhatsApp screen or Email writer when they pop open!
                  </p>
                </div>
              </div>

              {/* Action buttons list */}
              <div className="mt-6 space-y-4">
                
                {/* Flow 1: WhatsApp CTA */}
                <div className="bg-[#022c22]/5 border border-[#022c22]/15 p-4 rounded-2xl">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#022c22] text-[#FDFBF7] flex items-center justify-center shrink-0 shadow">
                      <MessageSquare className="w-5 h-5 fill-current text-[#d97706]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-[#022c22] mb-1 flex items-center gap-1.5 uppercase">
                        Connect Instantly on WhatsApp <span className="bg-[#d97706] text-[#FDFBF7] text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest uppercase animate-bounce">Preferred</span>
                      </h4>
                      <p className="text-[11.5px] text-[#022c22]/80 font-bold leading-relaxed">
                        Instructors are online right now. Click to initiate a custom secure thread with files and requirements attached.
                      </p>
                    </div>
                  </div>
                  <a
                    href={getWhatsAppURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full bg-[#022c22] hover:bg-[#023126] text-[#FDFBF7] font-black py-4 px-4 rounded-xl shadow border border-[#d97706]/35 text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer h-12"
                  >
                    Open WhatsApp Chat <MessageSquare className="w-4 h-4 text-[#d97706]" />
                  </a>
                </div>

                {/* Flow 2: Email Copy Paste CTA */}
                <div className="bg-[#d97706]/5 border border-[#d97706]/15 p-4 rounded-2xl">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-f4f4f0 border border-[#e7e5e4] text-[#d97706] flex items-center justify-center shrink-0 shadow">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-[#d97706] mb-1 flex items-center gap-1.5 uppercase">
                        Alternative: Submit by Email
                      </h4>
                      <p className="text-[11.5px] text-[#022c22]/80 font-bold leading-relaxed">
                        Copy the formatted request blueprint text body and email it to <strong className="font-black text-[#022c22] underline">assignly1@gmail.com</strong> along with your attachments.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button 
                      onClick={copyEmailDraft}
                      className="flex-1 py-3 bg-[#022c22] hover:bg-[#023126] border border-[#d97706]/30 text-[#FDFBF7] text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow h-11"
                    >
                      {copiedDraft ? (
                        <>Copied Draft Blueprint! <Check className="w-4 h-4" /></>
                      ) : (
                        <>Copy Email Draft Blueprint <Copy className="w-4 h-4" /></>
                      )}
                    </button>
                    <a 
                      href={`mailto:assignly1@gmail.com?subject=Coaching%20Request%20${latestSubmission.id}&body=${encodeURIComponent(generateEmailDraft())}`}
                      className="px-4 py-3 bg-[#f4f4f0] hover:bg-[#e7e5e4] border border-[#e7e5e4] text-[#022c22] text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center cursor-pointer h-11"
                    >
                      Email Us
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* Footer with Reset */}
            <div className="p-4 bg-[#f4f4f0] border-t border-[#e7e5e4] flex justify-end gap-3.5">
              <button
                onClick={handleResetForm}
                className="px-4 py-2.5 bg-[#022c22] hover:bg-[#023126] text-[#FDFBF7] border border-[#d97706]/35 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Close and Reset Form
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
