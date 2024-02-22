import { type CustomImageProps } from '@/types';
import Image from 'next/image';

export function PalImage({ name, alt, width, height, ...rest }: CustomImageProps) {
  return (
    <Image
      src={`/images/pals/${name}.webp`}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
