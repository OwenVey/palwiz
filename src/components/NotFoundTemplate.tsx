import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';

export function NotFoundTemplate({
  title = `Page not found`,
  message = `Sorry, we couldn't find the page you're looking for.`,
  returnText = 'Go back home',
  returnHref = '/',
}: {
  title?: string;
  message?: string;
  returnText?: string;
  returnHref?: LinkProps['href'];
}) {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary-9">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-12 sm:text-5xl">{title}</h1>
        <p className="mt-6 text-base leading-7 text-gray-11">{message}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href={returnHref}>
              <ArrowLeftIcon className="mr-2 size-4" />
              {returnText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
