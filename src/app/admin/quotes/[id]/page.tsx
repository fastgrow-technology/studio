
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function QuoteDetailPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: submission, error } = await supabase
    .from('quote_submissions')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !submission) {
    notFound();
  }

  const detailItems = [
    { label: 'First Name', value: submission.firstName },
    { label: 'Last Name', value: submission.lastName },
    { label: 'Email Address', value: submission.email },
    { label: 'Phone Number', value: submission.phone },
    { label: 'Date of Birth', value: submission.birthDate ? format(new Date(submission.birthDate), 'PPP') : 'N/A' },
    { label: 'Consent Given', value: <Badge variant={submission.consent ? 'default' : 'destructive'}>{submission.consent ? 'Yes' : 'No'}</Badge> },
  ];
  
  const serviceSpecificItems = [
    { label: 'Desired Coverage', value: submission.coverageAmount, services: ['life-insurance', 'visitor-insurance', 'super-visa-insurance'] },
    { label: 'Smoker', value: submission.smoker, services: ['life-insurance'] },
    { label: 'Destination', value: submission.destination, services: ['travel-insurance'] },
    { label: 'Trip Start Date', value: submission.tripStartDate ? format(new Date(submission.tripStartDate), 'PPP') : null, services: ['travel-insurance'] },
    { label: 'Trip End Date', value: submission.tripEndDate ? format(new Date(submission.tripEndDate), 'PPP') : null, services: ['travel-insurance'] },
    { label: 'Pre-existing Conditions', value: submission.hasPreExistingConditions, services: ['visitor-insurance', 'super-visa-insurance'] },
    { label: 'Coverage Type', value: submission.coverageType, services: ['health-dental'] },
    { label: 'Financial Service', value: submission.financialService, services: ['financial-services'] },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/admin/quotes">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Quotes</span>
                    </Link>
                </Button>
                <h1 className="text-xl md:text-2xl font-semibold">
                    Quote Submission Details
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {submission.firstName} {submission.lastName}
                    </CardTitle>
                    <CardDescription>
                        Received on {format(new Date(submission.created_at), 'PPP p')} for {submission.service}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-secondary mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {detailItems.map(item => item.value ? (
                                <div key={item.label} className="p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                    <p className="font-medium text-lg">{item.value}</p>
                                </div>
                            ) : null)}
                        </div>
                    </div>

                     <div>
                        <h3 className="text-lg font-semibold text-secondary mb-4">Service-Specific Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {serviceSpecificItems.map(item =>
                                item.services.includes(submission.service) && item.value ? (
                                <div key={item.label} className="p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                    <p className="font-medium text-lg capitalize">{item.value}</p>
                                </div>
                                ) : null
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
