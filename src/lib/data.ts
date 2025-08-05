
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Page } from './types';

export async function getPages(): Promise<Page[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('pages').select('*');
  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
  return data;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('pages').select('*').eq('slug', slug).single();
  if (error) {
    // Gracefully handle not found error for slugs that don't exist
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
  return data;
}
