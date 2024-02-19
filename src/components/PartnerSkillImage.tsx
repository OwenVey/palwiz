import { cn } from '@/lib/utils';
import { kebabCase } from 'change-case';
import Image, { type ImageProps } from 'next/image';

type PartnerSkillImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  name: string;
  alt?: string;
};

export function PartnerSkillImage({ name, alt, className, ...rest }: PartnerSkillImageProps) {
  return (
    <Image
      className={cn('size-10 object-cover', className)}
      src={`/images/partner-skills/${kebabCase(name)}.webp`}
      alt={alt ?? name}
      height={112}
      width={112}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
