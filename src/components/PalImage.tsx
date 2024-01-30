import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type PalImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  pal: string;
  alt?: string;
};

export function PalImage({ pal, alt, className, ...rest }: PalImageProps) {
  return (
    <Image
      className={cn('size-28', className)}
      src={`/images/pals/${pal}.webp`}
      alt={alt ?? pal}
      height={24}
      width={24}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
