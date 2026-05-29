export interface AssignmentSubmission {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  country: string;
  university: string;
  course: string;
  assignmentType: string;
  academicLevel: string;
  difficulty: string;
  pages: number;
  deadline: string;
  urgency: string;
  instructions: string;
  files: { name: string; size: number }[];
  preferredContact: 'WhatsApp' | 'Email' | 'Both';
  submissionMethod?: 'WhatsApp' | 'Email';
  wordCount?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'KES' | 'NGN' | 'ZAR' | 'INR' | 'AED' | 'CAD' | 'AUD';
  estimatedPrice: number;
  createdAt: string;
}

export interface CurrencyConfig {
  code: 'USD' | 'EUR' | 'GBP' | 'KES' | 'NGN' | 'ZAR' | 'INR' | 'AED' | 'CAD' | 'AUD';
  symbol: string;
  rateToUSD: number; // 1 USD = rate units
}

export type UrgentLevelType = 'Flexible' | 'Standard' | 'Urgent' | 'Extremely Urgent';
