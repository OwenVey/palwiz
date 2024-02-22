import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type StructureImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  id: string;
  width: number;
  height: number;
  alt: string;
};

export function StructureImage({ id, alt, className, width, height, ...rest }: StructureImageProps) {
  return (
    <Image
      className={cn(className)}
      src={`/images/structures/${id}.webp`}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
