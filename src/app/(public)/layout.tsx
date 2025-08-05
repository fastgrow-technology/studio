
'use client';

import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingButtons from '@/components/floating-buttons';
import { getSiteSettings } from '@/lib/data/server';
import { getServices } from '@/lib/data/static';
import type { SiteSettings, Service } from '@/lib/types';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function PublicLayout({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [services, setServices] = useState<Pick<Service, 'slug' | 'title' | 'image' | 'short_description'>[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const supabase = createSupabaseBrowserClient();
      
      const { data: settingsData, error: settingsError } = await supabase.from('site_settings').select('key, value');
      if (settingsData) {
        const settingsObj = settingsData.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {} as SiteSettings);
        setSettings(settingsObj);
      } else if (settingsError) {
        console.error('Error fetching site settings:', settingsError);
      }

      const { data: servicesData, error: servicesError } = await supabase.from('services').select('slug, title, image, short_description');
      if (servicesData) {
        setServices(servicesData);
      } else if (servicesError) {
         console.error('Error fetching services:', servicesError);
      }
    };
    
    fetchInitialData();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} services={services} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer settings={settings} services={services} />
      <FloatingButtons settings={settings} />
    </div>
  );
}
