import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type ItemImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  id: string;
  alt?: string;
};

export function ItemImage({ id, alt, className, ...rest }: ItemImageProps) {
  return (
    <Image
      className={cn('size-28 object-cover', className)}
      src={`/images/items/${id}.webp`}
      alt={alt ?? id}
      height={112}
      width={112}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
