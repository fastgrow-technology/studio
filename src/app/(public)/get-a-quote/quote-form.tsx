
'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HeartPulse,
    Plane,
    FileText,
    Hospital,
    Earth,
    LineChart,
    ChevronRight,
    ChevronLeft,
    Loader2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { submitQuote } from '@/lib/actions';
import { quoteFormSchema, type QuoteFormState } from '@/lib/validators';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const services = [
  { value: 'life-insurance', label: 'Life Insurance', icon: HeartPulse },
  { value: 'visitor-insurance', label: 'Visitor Insurance', icon: Plane },
  { value: 'super-visa-insurance', label: 'Super Visa Insurance', icon: FileText },
  { value: 'health-dental', label: 'Health & Dental', icon: Hospital },
  { value: 'travel-insurance', label: 'Travel Insurance', icon: Earth },
  { value: 'financial-services', label: 'RESP/RRSP/TFSA', icon: LineChart },
];

const steps = [
    { id: 'service', title: 'Service', fields: ['service'] },
    { id: 'insurance-details', title: 'Details' },
    { id: 'personal-info', title: 'About You', fields: ['firstName', 'lastName', 'email', 'phone', 'birthDate'] },
    { id: 'submit', title: 'Submit', fields: ['consent'] },
];

const getFieldsForService = (service?: string) => {
    switch(service) {
        case 'life-insurance':
            return ['coverageAmount', 'smoker'];
        case 'travel-insurance':
            return ['tripStartDate', 'tripEndDate', 'destination'];
        case 'visitor-insurance':
        case 'super-visa-insurance':
            return ['coverageAmount', 'hasPreExistingConditions'];
        case 'health-dental':
            return ['coverageType'];
        case 'financial-services':
            return ['financialService'];
        default:
            return [];
    }
};

export function QuoteForm() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<QuoteFormData>({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: {
            consent: false,
        },
    });

    const selectedService = form.watch('service');

    const onSubmit = (data: QuoteFormData) => {
        startTransition(async () => {
            const result = await submitQuote(data);

            if (result.success) {
                toast({
                    title: "Submission Successful",
                    description: "Your quote request has been sent.",
                });
                router.push('/quote-submitted');
            } else {
                 const message = result.message || "Please check the form fields.";
                 toast({
                    title: "Submission Failed",
                    description: message,
                    variant: 'destructive',
                 });
                 if (result.issues) {
                    for (const issue of result.issues) {
                        form.setError(issue.path[0] as keyof QuoteFormData, { type: 'server', message: issue.message });
                    }
                 }
            }
        });
    };
    
    const renderInsuranceDetails = () => {
        switch (selectedService) {
            case 'life-insurance':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="coverageAmount">Desired Coverage Amount</Label>
                             <Controller
                                name="coverageAmount"
                                control={form.control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="250000">$250,000</SelectItem>
                                            <SelectItem value="500000">$500,000</SelectItem>
                                            <SelectItem value="750000">$750,000</SelectItem>
                                            <SelectItem value="1000000">$1,000,000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.coverageAmount && <p className="text-sm text-red-500 mt-1">{form.formState.errors.coverageAmount.message}</p>}
                        </div>
                        <div>
                            <Label>Are you a smoker?</Label>
                            <Controller
                                name="smoker"
                                control={form.control}
                                render={({ field }) => (
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="yes" /> Yes
                                        </Label>
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="no" /> No
                                        </Label>
                                    </RadioGroup>
                                )}
                            />
                             {form.formState.errors.smoker && <p className="text-sm text-red-500 mt-1">{form.formState.errors.smoker.message}</p>}
                        </div>
                    </div>
                );
            case 'travel-insurance':
                 return (
                    <div className="space-y-6">
                         <div><Label htmlFor="destination">Destination</Label><Input id="destination" {...form.register('destination')} placeholder="e.g. USA, Europe" />{form.formState.errors.destination && <p className="text-sm text-red-500 mt-1">{form.formState.errors.destination.message}</p>}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><Label htmlFor="tripStartDate">Trip Start Date</Label><Input id="tripStartDate" type="date" {...form.register('tripStartDate')} />{form.formState.errors.tripStartDate && <p className="text-sm text-red-500 mt-1">{form.formState.errors.tripStartDate.message}</p>}</div>
                            <div><Label htmlFor="tripEndDate">Trip End Date</Label><Input id="tripEndDate" type="date" {...form.register('tripEndDate')} />{form.formState.errors.tripEndDate && <p className="text-sm text-red-500 mt-1">{form.formState.errors.tripEndDate.message}</p>}</div>
                        </div>
                    </div>
                 );
            case 'visitor-insurance':
            case 'super-visa-insurance':
                 return (
                     <div className="space-y-6">
                         <div>
                            <Label htmlFor="coverageAmount">Desired Coverage Amount</Label>
                             <Controller
                                name="coverageAmount"
                                control={form.control}
                                render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="50000">$50,000</SelectItem>
                                        <SelectItem value="100000">$100,000</SelectItem>
                                        <SelectItem value="150000">$150,000</SelectItem>
                                        <SelectItem value="200000">$200,000+</SelectItem>
                                    </SelectContent>
                                </Select>
                                )}
                            />
                            {form.formState.errors.coverageAmount && <p className="text-sm text-red-500 mt-1">{form.formState.errors.coverageAmount.message}</p>}
                        </div>
                        <div>
                            <Label>Any pre-existing medical conditions?</Label>
                            <Controller
                                name="hasPreExistingConditions"
                                control={form.control}
                                render={({ field }) => (
                                     <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="yes" /> Yes
                                        </Label>
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="no" /> No
                                        </Label>
                                    </RadioGroup>
                                )}
                            />
                            {form.formState.errors.hasPreExistingConditions && <p className="text-sm text-red-500 mt-1">{form.formState.errors.hasPreExistingConditions.message}</p>}
                        </div>
                     </div>
                 );
            case 'health-dental':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Type of Coverage</Label>
                             <Controller
                                name="coverageType"
                                control={form.control}
                                render={({ field }) => (
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="health" /> Health
                                        </Label>
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="dental" /> Dental
                                        </Label>
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="both" /> Both
                                        </Label>
                                    </RadioGroup>
                                )}
                            />
                            {form.formState.errors.coverageType && <p className="text-sm text-red-500 mt-1">{form.formState.errors.coverageType.message}</p>}
                        </div>
                    </div>
                )
             case 'financial-services':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label>Which financial service are you interested in?</Label>
                             <Controller
                                name="financialService"
                                control={form.control}
                                render={({ field }) => (
                                     <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="resp" /> RESP
                                        </Label>
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="rrsp" /> RRSP
                                        </Label>
                                        <Label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                            <RadioGroupItem value="tfsa" /> TFSA
                                        </Label>
                                    </RadioGroup>
                                )}
                            />
                            {form.formState.errors.financialService && <p className="text-sm text-red-500 mt-1">{form.formState.errors.financialService.message}</p>}
                        </div>
                    </div>
                )
            default:
                return null;
        }
    }

    const nextStep = async () => {
        let fieldsToValidate: (keyof QuoteFormData)[] | undefined = steps[currentStep].fields as (keyof QuoteFormData)[] | undefined;

        if (currentStep === 1) { // Insurance Details
            fieldsToValidate = getFieldsForService(selectedService) as (keyof QuoteFormData)[];
        }

        const isValid = fieldsToValidate ? await form.trigger(fieldsToValidate) : true;

        if (isValid) {
            let nextStepIndex = currentStep + 1;
            // Skip the details step if the service doesn't require it
            if (currentStep === 0 && getFieldsForService(selectedService).length === 0) {
                nextStepIndex = 2;
            }
            setCurrentStep(nextStepIndex);
        }
    };

    const prevStep = () => {
        let prevStepIndex = currentStep - 1;
        // Skip the details step if the service doesn't require it
        if (currentStep === 2 && getFieldsForService(selectedService).length === 0) {
            prevStepIndex = 0;
        }
        setCurrentStep(prevStepIndex);
    };

    const hasDetails = getFieldsForService(selectedService).length > 0;
    const visibleSteps = hasDetails ? steps : steps.filter(s => s.id !== 'insurance-details');
    const progress = ((currentStep + 1) / visibleSteps.length) * 100;
    const activeStep = visibleSteps[currentStep];

    return (
        <>
            <div className="mb-12 space-y-4">
                <Progress value={progress} className="w-full h-2" />
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground font-medium">
                       Step {currentStep + 1} of {visibleSteps.length}: <span className="text-primary">{activeStep?.title}</span>
                    </p>
                </div>
            </div>

             <form onSubmit={form.handleSubmit(onSubmit)}>
                 <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What type of insurance are you looking for?</h2>
                                <Controller
                                    name="service"
                                    control={form.control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {services.map(service => (
                                            <Label key={service.value} className={cn(
                                                "cursor-pointer p-6 border-2 rounded-lg transition-colors",
                                                field.value === service.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary"
                                            )}>
                                                <input
                                                    type="radio"
                                                    className="sr-only"
                                                    {...field}
                                                    value={service.value}
                                                    checked={field.value === service.value}
                                                />
                                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                                    <service.icon className="size-6 text-primary" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900 mb-2 text-center">{service.label}</h3>
                                            </Label>
                                        ))}
                                        </div>
                                    )}
                                />
                                {form.formState.errors.service && <p className="text-sm text-red-500 text-center mt-4">{form.formState.errors.service.message}</p>}
                                <div className="text-center mt-8">
                                    <Button type="button" onClick={nextStep} disabled={!selectedService}>
                                        Continue <ChevronRight className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && hasDetails && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                           <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Provide Some Details</h2>
                                {renderInsuranceDetails()}
                                <div className="flex justify-between mt-8">
                                    <Button type="button" variant="outline" onClick={prevStep}><ChevronLeft className="mr-2" /> Back</Button>
                                    <Button type="button" onClick={nextStep}>Continue <ChevronRight className="ml-2" /></Button>
                                </div>
                           </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                         <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                           <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tell us about yourself</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div><Label htmlFor="firstName">First Name *</Label><Input id="firstName" {...form.register('firstName')} />{form.formState.errors.firstName && <p className="text-sm text-red-500 mt-1">{form.formState.errors.firstName.message}</p>}</div>
                                <div><Label htmlFor="lastName">Last Name *</Label><Input id="lastName" {...form.register('lastName')} />{form.formState.errors.lastName && <p className="text-sm text-red-500 mt-1">{form.formState.errors.lastName.message}</p>}</div>
                                <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" {...form.register('email')} />{form.formState.errors.email && <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>}</div>
                                <div><Label htmlFor="phone">Phone *</Label><Input id="phone" type="tel" {...form.register('phone')} />{form.formState.errors.phone && <p className="text-sm text-red-500 mt-1">{form.formState.errors.phone.message}</p>}</div>
                                <div><Label htmlFor="birthDate">Date of Birth *</Label><Input id="birthDate" type="date" {...form.register('birthDate')} />{form.formState.errors.birthDate && <p className="text-sm text-red-500 mt-1">{form.formState.errors.birthDate.message}</p>}</div>
                            </div>
                            <div className="flex justify-between mt-8">
                                <Button type="button" variant="outline" onClick={prevStep}><ChevronLeft className="mr-2" /> Back</Button>
                                <Button type="button" onClick={nextStep}>Continue <ChevronRight className="ml-2" /></Button>
                            </div>
                           </div>
                        </motion.div>
                    )}
                    
                     {currentStep === 3 && (
                        <motion.div
                            key="step4"
                             initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Review & Submit</h2>
                                
                                <div className="space-y-4 mb-8">
                                     <Controller
                                        name="consent"
                                        control={form.control}
                                        render={({ field }) => (
                                            <div className="flex items-start">
                                                <Checkbox
                                                    id="consent"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="mt-1 mr-3"
                                                />
                                                <Label htmlFor="consent" className="text-sm text-gray-600">I consent to Insurance Plaza collecting my information for the purpose of providing insurance quotes.*</Label>
                                             </div>
                                        )}
                                    />
                                    {form.formState.errors.consent && <p className="text-sm text-red-500">{form.formState.errors.consent.message}</p>}
                                </div>
                                
                                <div className="flex justify-between">
                                    <Button type="button" variant="outline" onClick={prevStep}><ChevronLeft className="mr-2" /> Back</Button>
                                     <Button type="submit" disabled={isPending}>
                                        {isPending ? <><Loader2 className="animate-spin" /> Submitting...</> : "Get My Free Quote"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </>
    );
}
