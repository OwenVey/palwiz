import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { type TooltipContentProps } from '@radix-ui/react-tooltip';
import Image, { type ImageProps } from 'next/image';

type WorkTypeImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  workType: string;
  tooltipSide?: TooltipContentProps['side'];
};

export function WorkTypeImage({ workType, tooltipSide, className, ...rest }: WorkTypeImageProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Image
            className={cn('size-6', className)}
            src={`/images/work/${workType}.png`}
            alt={`${workType} work suitability`}
            height={24}
            width={24}
            quality={100}
            {...rest}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent side={tooltipSide} className="capitalize">
        {workType.replace('-', ' ')}
      </TooltipContent>
    </Tooltip>
  );
}
