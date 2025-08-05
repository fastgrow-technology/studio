
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: z.ZodIssue[] | Record<string, string[] | undefined>;
  data?: {
    department: string;
    agent?: string;
    reason: string;
  };
}

const planSchema = z.object({
  name: z.string(),
  price: z.string(),
  features: z.array(z.string()),
});

const benefitSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const stepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const serviceFormSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  image: z.string().url().optional().or(z.literal('')),
  short_description: z.string(),
  long_description: z.string().nullable(),
  icon_svg: z.string().nullable(),
  show_benefits: z.boolean(),
  benefits: z.array(benefitSchema).nullable(),
  show_target_audience: z.boolean(),
  target_audience: z.string().nullable(),
  show_plans: z.boolean(),
  plans: z.array(planSchema).nullable(),
  show_steps: z.boolean(),
  steps: z.array(stepSchema).nullable(),
  show_faqs: z.boolean(),
  faqs: z.array(faqSchema).nullable(),
  show_related_services: z.boolean(),
  related_services: z.array(z.string()).nullable(),
});


export const blogPostFormSchema = z.object({
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  published_at: z.string().transform((str) => new Date(str).toISOString()),
  excerpt: z.string(),
  content: z.string(),
  image: z.string().url().optional().or(z.literal('')),
});

export const testimonialFormSchema = z.object({
  name: z.string(),
  role: z.string(),
  quote: z.string(),
  image: z.string().url().optional().or(z.literal('')),
});

export const teamMemberFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters.' }),
  image: z.string().url().optional().or(z.literal('')),
});


export const pageContentFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  'hero.title': z.string().optional(),
  'hero.subtitle': z.string().optional(),
  'hero.image': z.string().url().optional().or(z.literal('')),
  'about.title': z.string().optional(),
  'about.text': z.string().optional(),
  'about.image': z.string().url().optional().or(z.literal('')),
  'story.title': z.string().optional(),
  'story.text_1': z.string().optional(),
  'story.text_2': z.string().optional(),
  'story.image': z.string().url().optional().or(z.literal('')),
}).catchall(z.string());

export const quoteFormSchema = z.object({
    service: z.string({ required_error: 'Please select a service.' }).min(1, 'Please select a service.'),
    coverageAmount: z.string().optional().nullable(),
    smoker: z.string().optional().nullable(),
    destination: z.string().optional().nullable(),
    tripStartDate: z.string().optional().nullable(),
    tripEndDate: z.string().optional().nullable(),
    hasPreExistingConditions: z.string().optional().nullable(),
    coverageType: z.string().optional().nullable(),
    financialService: z.string().optional().nullable(),
    firstName: z.string().min(1, 'First name is required.'),
    lastName: z.string().min(1, 'Last name is required.'),
    email: z.string().email('Invalid email address.'),
    phone: z.string().min(1, 'Phone number is required.'),
    birthDate: z.string().min(1, 'Date of birth is required.'),
    consent: z.boolean().refine((val) => val === true, {
        message: 'You must provide consent to continue.',
    }),
}).superRefine((data, ctx) => {
    if (data.service === 'life-insurance') {
        if (!data.coverageAmount) {
            ctx.addIssue({ code: 'custom', message: 'Coverage amount is required.', path: ['coverageAmount'] });
        }
        if (!data.smoker) {
            ctx.addIssue({ code: 'custom', message: 'Please specify smoker status.', path: ['smoker'] });
        }
    }
    if (data.service === 'travel-insurance') {
        if (!data.tripStartDate) {
            ctx.addIssue({ code: 'custom', message: 'Trip start date is required.', path: ['tripStartDate'] });
        }
        if (!data.tripEndDate) {
            ctx.addIssue({ code: 'custom', message: 'Trip end date is required.', path: ['tripEndDate'] });
        }
         if (!data.destination) {
            ctx.addIssue({ code: 'custom', message: 'Destination is required.', path: ['destination'] });
        }
    }
    if (data.service === 'visitor-insurance' || data.service === 'super-visa-insurance') {
        if (!data.coverageAmount) {
            ctx.addIssue({ code: 'custom', message: 'Coverage amount is required.', path: ['coverageAmount'] });
        }
        if (!data.hasPreExistingConditions) {
            ctx.addIssue({ code: 'custom', message: 'Please specify pre-existing conditions.', path: ['hasPreExistingConditions'] });
        }
    }
    if (data.service === 'health-dental') {
        if(!data.coverageType) {
            ctx.addIssue({ code: 'custom', message: 'Please select coverage type.', path: ['coverageType'] });
        }
    }
    if (data.service === 'financial-services') {
        if(!data.financialService) {
            ctx.addIssue({ code: 'custom', message: 'Please select a financial service.', path: ['financialService'] });
        }
    }
});

export type QuoteFormState = {
  success: boolean;
  message?: string | null;
  issues?: z.ZodIssue[];
};

export const newsletterFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});
