
import { getSiteSettings } from '@/lib/data/server';
import { MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
    const settings = await getSiteSettings();
    const defaultRobotsContent = "User-agent: *\nAllow: /";
    
    if (settings.robots_txt && settings.robots_txt.trim() !== '') {
        return {
            rules: [], // Handled by string output below
            sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
        };
    }
    
    return new Response(settings.robots_txt || defaultRobotsContent) as any;
}
