import { Logo } from '@/components/Logo';
import { NAVIGATION } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <Logo className="h-8 w-auto text-primary-9" />
        <h1 className="font-title text-4xl leading-none text-gray-12">palwiz</h1>
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-4 p-4 sm:max-w-xl sm:grid-cols-2">
        {NAVIGATION.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex w-full items-center rounded-lg border border-gray-4 bg-gray-2 p-4 text-gray-12 hover:border-primary-9 hover:bg-gray-3 hover:text-gray-12 hover:shadow-md hover:shadow-primary-5 sm:justify-center sm:p-6',
              item.name === 'Pals' && 'sm:col-span-2',
            )}
          >
            <div className="flex items-center gap-4 sm:flex-col">
              <div className="rounded-full border border-gray-4 bg-gray-3 p-4 hover:border-gray-5 group-hover:bg-gray-4">
                <item.icon className="size-6" />
              </div>
              <div className="sm:text-center">
                <div className="text-lg font-medium">{item.name}</div>
                <p className="text-sm text-gray-10">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
