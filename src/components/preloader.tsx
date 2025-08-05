
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './icons/logo';
import { usePathname } from 'next/navigation';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
        setIsLoading(false);
        return;
    }

    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Shorter duration for page changes

    return () => clearTimeout(timer);
  }, [pathname, isInitialLoad, isAdminRoute]);


  return (
    <AnimatePresence>
      {isLoading && !isAdminRoute && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Logo />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
