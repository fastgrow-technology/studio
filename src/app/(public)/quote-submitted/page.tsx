
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function QuoteSubmittedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <CheckCircle className="size-24 text-primary mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Thank You!</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Your quote request has been submitted successfully. Our team will review your information and get back to you within 24 business hours.
            </p>
            <Button asChild>
                <Link href="/">Return to Homepage</Link>
            </Button>
        </div>
    );
}
