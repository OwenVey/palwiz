import { Navbar } from '@/components/Navbar';
import { Providers } from '@/components/Providers';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: 'Palwiz - %s',
    default: 'Palwiz',
  },
  description: 'All in one source for Palword information',
};

const vinque = localFont({
  src: './vinque.otf',
  display: 'swap',
  variable: '--font-vinque',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, GeistMono.variable, vinque.variable, 'bg-gray-1 font-sans antialiased')}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
