import { WORK_SUITABILITIES } from '@/constants';
import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';

type WorkTypeImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  id: string;
};

export function WorkTypeImage({ id, className, ...rest }: WorkTypeImageProps) {
  const workSuitability = WORK_SUITABILITIES.find((w) => w.id === id)!;
  return (
    <Image
      className={cn('size-6 object-cover', className)}
      src={`/images/work/${id}.png`}
      alt={`${workSuitability.label} work suitability`}
      height={40}
      width={40}
      quality={100}
      unoptimized
      {...rest}
    />
  );
}
