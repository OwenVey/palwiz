'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
