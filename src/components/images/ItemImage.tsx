import { type CustomImageProps } from '@/types';
import Image from 'next/image';

export function ItemImage({ name, alt, width, height, ...rest }: CustomImageProps) {
  return (
    <Image
      src={`/images/items/${name}.webp`}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
