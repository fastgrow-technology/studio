
'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import type { SiteSettings } from '@/lib/types';

const Analytics = () => {
    const pathname = usePathname();
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const supabase = createSupabaseBrowserClient();
            const { data, error } = await supabase.from('site_settings').select('key, value');
            
            if (error) {
                console.error('Error fetching site settings for analytics:', error);
                return;
            }

            const siteSettings = data.reduce((acc, setting) => {
                acc[setting.key] = setting.value;
                return acc;
            }, {} as SiteSettings);
            setSettings(siteSettings);
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        if (settings?.facebook_pixel_id && typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'PageView');
        }
    }, [pathname, settings]);


    if (!settings) {
        return null;
    }

    return (
        <>
            {/* Google Tag Manager */}
            {settings.google_tag_manager_id && (
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${settings.google_tag_manager_id}');
                    `}
                </Script>
            )}

            {/* Google Analytics */}
            {settings.google_analytics_id && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`}
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${settings.google_analytics_id}');
                        `}
                    </Script>
                </>
            )}

            {/* Facebook Pixel */}
            {settings.facebook_pixel_id && (
                 <Script id="facebook-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${settings.facebook_pixel_id}');
                        fbq('track', 'PageView');
                    `}
                </Script>
            )}
        </>
    );
};

export default Analytics;
