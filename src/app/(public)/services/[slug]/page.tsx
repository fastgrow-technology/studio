import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import { getServiceBySlug } from '@/lib/data/server';
import { getServices } from '@/lib/data/static';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ServiceCard } from '@/components/service-card';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Insurance Plaza`,
    description: service.short_description,
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service, relatedServices } = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-background">
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={service.image || 'https://placehold.co/1920x400.png'}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint={service.slug}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary/40" />
        </div>
        <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">{service.title}</h1>
                    <p className="text-xl text-white/90">{service.short_description}</p>
                </div>
            </div>
        </div>
      </section>
      
      <section className="bg-muted py-6">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-secondary mb-12">
                <p className="lead">{service.short_description}</p>
                <p>{service.long_description}</p>
              </div>

              {service.show_benefits && service.benefits && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-secondary mb-6">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.benefits.map((benefit, index) => (
                      <Card key={index}>
                        <CardHeader className="flex flex-row items-center gap-4">
                           <CheckCircle className="size-8 text-primary" />
                           <CardTitle className="text-xl">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {service.show_target_audience && service.target_audience && (
                <div className="mb-12">
                   <Card className="bg-primary/10 border-primary/20">
                     <CardHeader>
                       <CardTitle className="text-secondary">Who is this for?</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className="text-muted-foreground">{service.target_audience}</p>
                     </CardContent>
                   </Card>
                </div>
              )}

              {service.show_plans && service.plans && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-secondary mb-6">Our Plans</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.plans.map((plan, index) => (
                      <Card key={index} className="flex flex-col">
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <p className="text-3xl font-bold text-primary">{plan.price}</p>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="size-5 text-green-500 mt-1 shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {service.show_steps && service.steps && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-secondary mb-6">How It Works</h2>
                   <div className="relative">
                     <div className="absolute left-5 top-5 -bottom-5 w-0.5 bg-border" aria-hidden="true"></div>
                     {service.steps.map((step, index) => (
                       <div key={index} className="relative pl-12 mb-8">
                         <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{index + 1}</div>
                         <h3 className="text-xl font-semibold text-secondary mb-2">{step.title}</h3>
                         <p className="text-muted-foreground">{step.description}</p>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {service.show_faqs && service.faqs && (
                <div>
                  <h2 className="text-3xl font-bold text-secondary mb-6">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Get a Personalized Quote</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Ready to protect yourself? Contact us for a free, no-obligation quote.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/get-a-quote">Get a Free Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {service.show_related_services && relatedServices.length > 0 && (
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-secondary text-center mb-12">Related Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedServices.map((related) => {
                  const mappedService = {
                    ...related,
                    description: related.short_description
                  };
                  return <ServiceCard key={related.slug} service={mappedService} />
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
