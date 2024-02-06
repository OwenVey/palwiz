import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type PalImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  id: string;
  alt?: string;
};

export function PalImage({ id, alt, className, ...rest }: PalImageProps) {
  return (
    <Image
      className={cn('size-28', className)}
      src={`/images/pals/${id}.webp`}
      alt={alt ?? id}
      height={24}
      width={24}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
