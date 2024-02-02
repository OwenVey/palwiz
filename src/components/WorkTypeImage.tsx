import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { WORK_SUITABILITIES } from '@/constants';
import { cn } from '@/lib/utils';
import { type TooltipContentProps } from '@radix-ui/react-tooltip';
import Image, { type ImageProps } from 'next/image';

type WorkTypeImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  id: string;
  tooltipSide?: TooltipContentProps['side'];
};

export function WorkTypeImage({ id, tooltipSide, className, ...rest }: WorkTypeImageProps) {
  const workSuitability = WORK_SUITABILITIES.find((w) => w.id === id)!;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Image
            className={cn('size-6', className)}
            src={`/images/work/${id}.png`}
            alt={`${workSuitability.label} work suitability`}
            height={40}
            width={40}
            quality={100}
            unoptimized
            {...rest}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent side={tooltipSide} className="capitalize">
        {workSuitability.label}
      </TooltipContent>
    </Tooltip>
  );
}
