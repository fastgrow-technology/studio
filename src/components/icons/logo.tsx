
'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import type { SiteSettings } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export const Logo = ({ className, forFooter = false }: { className?: string, forFooter?: boolean }) => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.from('site_settings').select('key, value');
      if (error) {
        console.error('Error fetching settings for logo:', error);
      } else {
        const settingsObj = data.reduce((acc, setting) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {} as SiteSettings);
        setSettings(settingsObj);
      }
      setIsLoading(false);
    };
    fetchSettings();
  }, []);
  
  const logoUrl = forFooter ? settings.site_footer_logo_url : settings.site_logo_url;
  const siteName = settings.site_name || 'Insurance Plaza';

  if (isLoading) {
    return <Skeleton className="h-8 w-36" />;
  }
  
  if (logoUrl) {
    return <Image src={logoUrl} alt={siteName} width={150} height={40} className="w-auto h-auto" priority />;
  }

  return (
    <div className={`font-['Pacifico'] text-3xl text-primary ${className}`}>
      {siteName}
    </div>
  );
};
