import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { type TooltipContentProps } from '@radix-ui/react-tooltip';
import Image, { type ImageProps } from 'next/image';

type ElementImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  element: string;
  tooltipSide?: TooltipContentProps['side'];
};

export function ElementImage({ element, tooltipSide, className, ...rest }: ElementImageProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Image
            className={cn('size-6', className)}
            src={`/images/elements/${element}.png`}
            alt={`${element} element`}
            height={24}
            width={24}
            quality={100}
            {...rest}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent side={tooltipSide} className="capitalize">
        {element}
      </TooltipContent>
    </Tooltip>
  );
}
