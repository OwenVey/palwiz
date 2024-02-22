import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import logoDark from '~/public/images/logo-dark.webp';
import logoLight from '~/public/images/logo-light.webp';

type Props = Omit<ImageProps, 'src' | 'loading' | 'alt'>;

export function LogoImage({ className, ...rest }: Props) {
  return (
    <>
      <Image {...rest} alt="Palwiz Logo" src={logoLight} className={cn(className, 'w-auto dark:hidden')} />
      <Image {...rest} alt="Palwiz Logo" src={logoDark} className={cn(className, 'hidden w-auto dark:block')} />
    </>
  );
}
