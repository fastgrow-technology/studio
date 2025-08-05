
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Service, Testimonial, RelatedService, SiteSettings, Media } from '../types';

export async function getServiceBySlug(slug: string): Promise<{ service: Service | null, relatedServices: RelatedService[] }> {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('services').select('*').eq('slug', slug).single();
    
    if (error) {
        console.error(`Error fetching service with slug ${slug}:`, error);
        return { service: null, relatedServices: [] };
    }

    const service = data as Service;
    let relatedServices: RelatedService[] = [];

    if (service && service.related_services && service.related_services.length > 0) {
        const { data: rsData, error: rsError } = await supabase
            .from('services')
            .select('slug, title, image, short_description')
            .in('slug', service.related_services);

        if (rsError) {
            console.error('Error fetching related services:', rsError);
        } else {
            relatedServices = rsData;
        }
    }

    return { service, relatedServices };
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('testimonials').select('*');
    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
    return data;
}

export async function getSiteSettings(): Promise<SiteSettings> {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('site_settings').select('key, value');
    
    if (error) {
        console.error('Error fetching site settings:', error);
        return {};
    }

    return data.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
    }, {} as SiteSettings);
}

export async function getMediaFiles(): Promise<Media[]> {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching media files:', error);
        return [];
    }
    
    const filesWithUrls = data.map((file) => {
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(file.name);
        return {
            ...file,
            url: publicUrl,
        };
    });

    return filesWithUrls;
}
