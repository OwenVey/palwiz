import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type ElementImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  element: string;
};

export function ElementImage({ element, className, ...rest }: ElementImageProps) {
  return (
    <Image
      className={cn('size-6 object-cover', className)}
      src={`/images/elements/${element}.png`}
      alt={`${element} element`}
      height={24}
      width={24}
      quality={100}
      {...rest}
    />
  );
}
