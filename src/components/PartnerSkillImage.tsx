import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type PartnerSkillImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  id: string;
  alt?: string;
};

export function PartnerSkillImage({ id, alt, className, ...rest }: PartnerSkillImageProps) {
  return (
    <Image
      className={cn('size-10 object-cover', className)}
      src={`/images/partner-skills/${id}.webp`}
      alt={alt ?? id}
      height={112}
      width={112}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
