import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { WORK_SUITABILITIES } from '@/constants';
import { type Pal } from '@/types';

interface PalWorkSuitabilitiesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  workSuitabilities: Pal['workSuitabilities'];
}

function getWorkLabel(workId: string) {
  return WORK_SUITABILITIES.find(({ id }) => id === workId)?.label ?? 'Invalid Work Suitability';
}

export function PalWorkSuitabilitiesCard({ workSuitabilities, ...rest }: PalWorkSuitabilitiesCardProps) {
  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle>Work Suitability</CardTitle>
      </CardHeader>
      <div className="flex flex-col gap-2">
        {Object.entries(workSuitabilities)
          .filter(([, value]) => value > 0)
          .sort(([, value1], [, value2]) => value2 - value1)
          .map(([workId, value]) => (
            <div
              key={workId}
              className="flex items-center rounded border border-gray-4 bg-gray-3 px-3 py-2 text-gray-12"
            >
              <WorkTypeImage id={workId} className="size-8" />
              <span className="ml-3 truncate font-medium capitalize">{getWorkLabel(workId)}</span>
              <div className="ml-auto whitespace-nowrap font-mono text-sm font-medium">
                Lv <span className="text-base">{value}</span>
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
}
