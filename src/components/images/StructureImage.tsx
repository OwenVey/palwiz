import { type CustomImageProps } from '@/types';
import Image from 'next/image';

export function StructureImage({ name, alt, width, height, ...rest }: CustomImageProps) {
  return (
    <Image
      src={`/images/structures/${name}.webp`}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
