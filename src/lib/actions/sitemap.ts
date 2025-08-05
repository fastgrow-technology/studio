
'use server';

import { getBlogPosts, getServices } from '@/lib/data/static';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function generateSitemapAction() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_SITE_URL is not defined in environment variables.");
    }

    const services = await getServices();
    const blogPosts = await getBlogPosts();

    const staticPages = ['/', '/about', '/services', '/blog', '/contact', '/get-a-quote'];

    const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages.map(page => `
          <url>
            <loc>${baseUrl}${page}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>${page === '/' ? '1.0' : '0.8'}</priority>
          </url>
        `).join('')}
        ${services.map(service => `
          <url>
            <loc>${baseUrl}/services/${service.slug}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
          </url>
        `).join('')}
        ${blogPosts.map(post => `
          <url>
            <loc>${baseUrl}/blog/${post.slug}</loc>
            <lastmod>${new Date(post.published_at).toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
          </url>
        `).join('')}
      </urlset>
    `.trim();

    const publicPath = path.join(process.cwd(), 'public');
    await fs.mkdir(publicPath, { recursive: true });
    await fs.writeFile(path.join(publicPath, 'sitemap.xml'), sitemap);
    
    return { success: true, message: 'Sitemap generated successfully.' };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    if (error instanceof Error) {
        return { success: false, message: error.message };
    }
    return { success: false, message: 'Failed to generate sitemap.' };
  }
}
