'use client';
import { Logo } from '@/components/Logo';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import { NAVIGATION } from '@/constants';
import { cn } from '@/lib/utils';
import * as Accordion from '@radix-ui/react-accordion';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  function isLinkActive(href: string) {
    return pathname.includes(href);
  }

  return (
    <Accordion.Root type="single" collapsible asChild>
      <Accordion.Item value="nav" asChild>
        <nav className="sticky top-0 z-10 border-b border-gray-6 dark:bg-gray-2">
          <div className="glass-10" />
          <div className="mx-auto max-w-7xl px-2 sm:px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Accordion.Header>
                  <Accordion.Trigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-8 hover:text-gray-12">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {false ? (
                        <XIcon className="block size-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block size-6" aria-hidden="true" />
                      )}
                    </Button>
                  </Accordion.Trigger>
                </Accordion.Header>
              </div>
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" className="flex items-center gap-1">
                    <Logo className="h-7 w-auto text-primary-9" />
                    <div className="font-title text-3xl leading-none text-gray-12">palwiz</div>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex gap-3">
                    {NAVIGATION.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium',
                          isLinkActive(item.href)
                            ? 'bg-primary-9 text-white'
                            : 'text-gray-11 hover:bg-gray-3 hover:text-gray-12',
                        )}
                      >
                        <item.icon className="hidden size-5 md:block" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ThemeSelector />
              </div>
            </div>
          </div>
          <Accordion.Content className="sticky space-y-1 px-2 pb-3 pt-2 sm:hidden">
            {NAVIGATION.map((item) => (
              <Accordion.Trigger key={item.name} asChild>
                <Link
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium',
                    isLinkActive(item.href)
                      ? 'bg-primary-9 text-white'
                      : 'text-gray-11 hover:bg-gray-3 hover:text-gray-12',
                  )}
                  href={item.href}
                >
                  <item.icon className="size-6" />
                  {item.name}
                </Link>
              </Accordion.Trigger>
            ))}
          </Accordion.Content>
        </nav>
      </Accordion.Item>
    </Accordion.Root>
  );
}
