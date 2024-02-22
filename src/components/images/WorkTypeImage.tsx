import { type CustomImageProps } from '@/types';
import Image from 'next/image';

export function WorkTypeImage({ name, alt, width, height, ...rest }: CustomImageProps) {
  return (
    <Image
      src={`/images/work/${name}.png`}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
