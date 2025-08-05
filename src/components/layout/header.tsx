
'use client';
import { HeaderClient } from './header-client';
import type { SiteSettings, Service } from '@/lib/types';

interface HeaderProps {
    settings: SiteSettings;
    services: Pick<Service, 'slug' | 'title' | 'image' | 'short_description'>[];
}

export function Header({ settings, services }: HeaderProps) {
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { 
      href: '/services', 
      label: 'Services',
      dropdown: services.map(s => ({ href: `/services/${s.slug}`, label: s.title }))
    },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <HeaderClient navLinks={navLinks} />
  );
};
