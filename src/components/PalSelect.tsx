import { PalImage } from '@/components/PalImage';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { normalPals } from '@/data/parsed';
import { type SelectProps } from '@radix-ui/react-select';

interface PalSelectProps extends SelectProps {}
export function PalSelect(props: PalSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select a pal" />
      </SelectTrigger>
      <SelectContent>
        {normalPals.map((pal) => (
          <SelectItem key={pal.id} value={pal.id}>
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PalImage id={pal.id} className="inline size-6 rounded-full" />
                {pal.name}
              </div>
              <Badge variant="gray" className="text-2xs">
                #{pal.zukanIndex}
                {pal.zukanIndexSuffix}
              </Badge>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
