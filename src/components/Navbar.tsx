'use client';
import { Logo } from '@/components/Logo';
import { ThemeSelector } from '@/components/ThemeSelector';
import { cn } from '@/lib/utils';
import * as Accordion from '@radix-ui/react-accordion';
import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Pals', href: '/pals' },
  { name: 'Breeding', href: '/breeding' },
  { name: 'Items', href: '/items' },
  { name: 'Map', href: '/map' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <Accordion.Root type="single" collapsible asChild>
      <Accordion.Item value="nav" asChild>
        <nav className="border-gray-6 border-b">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Accordion.Header>
                  <Accordion.Trigger className="text-gray-10 hover:text-gray-12 hover:bg-gray-3 relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {false ? (
                      <XIcon className="block size-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block size-6" aria-hidden="true" />
                    )}
                  </Accordion.Trigger>
                </Accordion.Header>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Logo className="text-primary-9 h-8 w-auto" />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? 'bg-gray-12 text-gray-1'
                            : 'text-gray-11 hover:bg-gray-3 hover:text-gray-12',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
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
          <Accordion.Content className="space-y-1 px-2 pb-3 pt-2 sm:hidden">
            {navigation.map((item) => (
              <Accordion.Trigger key={item.name} asChild>
                <Link
                  className={cn(
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  href={item.href}
                >
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
