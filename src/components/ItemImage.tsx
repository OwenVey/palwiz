import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type ItemImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  id: string;
  width: number;
  height: number;
  alt?: string;
};

export function ItemImage({ id, alt, className, width, height, ...rest }: ItemImageProps) {
  return (
    <Image
      className={cn('', className)}
      src={`/images/items/${id}.webp`}
      alt={alt ?? id}
      width={width}
      height={height}
      quality={100}
      {...rest}
    />
  );
}
