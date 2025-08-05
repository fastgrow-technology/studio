
'use client';

import Link from 'next/link';
import type { Service } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface ServiceCardProps {
  service: Pick<Service, 'slug' | 'title' | 'image' | 'short_description' | 'icon_svg'>;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden rounded-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 bg-white border border-gray-200/80 shadow-sm">
        <CardContent className="p-6 text-center flex flex-col items-center justify-center flex-grow">
                <div
                className="flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary mx-auto mb-4"
                // Use dangerouslySetInnerHTML to render the SVG string
                dangerouslySetInnerHTML={service.icon_svg ? { __html: service.icon_svg } : undefined}
                >
                {/* Fallback icon if no SVG is provided */}
                {!service.icon_svg && <ShieldCheck className="size-8" />}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">{service.short_description}</p>
                <div className="font-semibold text-primary inline-flex items-center group-hover:underline">
                    Learn More <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </div>
        </CardContent>
        </Card>
    </Link>
  );
};
