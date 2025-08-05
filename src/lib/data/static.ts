import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import type { Service, BlogPost } from '../types';

// This file uses a build-safe supabase client for static data fetching.
// It should only be used in functions that are called during build time (e.g., generateStaticParams).

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getServices(): Promise<Pick<Service, 'slug' | 'title' | 'image' | 'short_description'>[]> {
    const { data, error } = await supabase.from('services').select('slug, title, image, short_description');
    if (error) {
        console.error('Error fetching services for static generation:', error);
        return [];
    }
    return data;
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
    let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }
    
    const { data, error } = await query;

    if (error) {
        console.error('Error fetching blog posts for static generation:', error);
        return [];
    }
    return data.map(post => ({
        ...post,
        date: format(new Date(post.published_at), 'MMMM d, yyyy'),
    }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
    if (error) {
        console.error(`Error fetching blog post with slug ${slug} for static generation:`, error);
        return null;
    }
    return {
        ...data,
        date: format(new Date(data.published_at), 'MMMM d, yyyy'),
    };
}
