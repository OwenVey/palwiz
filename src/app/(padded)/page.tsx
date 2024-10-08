import { LogoImage } from '@/components/images/LogoImage';
import { Card } from '@/components/ui/card';
import { NAVIGATION } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10 flex flex-col items-center">
        <LogoImage className="h-12" priority />
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:max-w-xl sm:grid-cols-2">
        {NAVIGATION.map((item) => (
          <Link key={item.name} href={item.href} className={cn('group', item.name === 'Pals' && 'sm:col-span-2')}>
            <Card hoverEffect className="flex h-full items-center gap-4 sm:flex-col sm:p-6">
              <div className="rounded-full border border-gray-4 bg-gray-3 p-4 transition-colors hover:border-gray-5 group-hover:bg-gray-4">
                <item.icon className="size-6" />
              </div>
              <div className="sm:text-center">
                <div className="text-lg font-medium">{item.name}</div>
                <p className="text-sm text-gray-10">{item.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
