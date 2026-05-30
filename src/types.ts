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
  currency: string;
  estimatedPrice: number;
  createdAt: string;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rateToUSD: number; // 1 USD = rate units
}

export type UrgentLevelType = 'Flexible' | 'Standard' | 'Urgent' | 'Extremely Urgent';
