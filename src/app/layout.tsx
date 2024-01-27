import { Navbar } from '@/components/Navbar';
import { Providers } from '@/components/Providers';
import { cn } from '@/lib/utils';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Palwiz',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, GeistMono.variable, 'bg-gray-1 font-sans antialiased')}>
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
