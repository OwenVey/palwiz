import { type CustomImageProps } from '@/types';
import { kebabCase } from 'change-case';
import Image from 'next/image';

export function PartnerSkillImage({ name, alt, width, height, ...rest }: CustomImageProps) {
  return (
    <Image
      src={`/images/partner-skills/${kebabCase(name)}.webp`}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
