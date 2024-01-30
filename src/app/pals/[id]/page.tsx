import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Badge } from '@/components/ui/badge';
import pals from '@/data/pals.json';

export function generateMetadata({ params }: { params: { id: string } }) {
  const pal = pals.find((pal) => pal.id === params.id);
  return {
    title: pal ? pal.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return pals.map(({ id }) => ({
    id,
  }));
}

export default function PalPage({ params }: { params: { id: string } }) {
  const pal = pals.find((pal) => pal.id === params.id);

  if (!pal) return <div>No pal found with the id {params.id}</div>;

  return (
    <div className="flex gap-4 py-4">
      <div className="sticky top-[81px] flex h-fit w-80 flex-col rounded-lg bg-gray-3 p-4">
        <div className="absolute">
          <Badge className="items-baseline font-mono text-sm font-bold tracking-wider" variant="outline">
            <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
            <span>{pal.zukanIndex}</span>
            <span className="text-xs">{pal.zukanIndexSuffix}</span>
          </Badge>

          <div className="mt-2 flex flex-col gap-2">
            {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
              <ElementImage key={element} element={element} className="size-8" tooltipSide="left" />
            ))}
          </div>
        </div>

        <PalImage pal={pal.id} className="mx-auto size-36 rounded-full border border-gray-6 bg-gray-1" />

        <div className="absolute right-0 flex flex-col pr-[inherit]">
          {Object.entries(pal.workSuitabilities)
            .filter(([, value]) => value > 0)
            .sort(([, value1], [, value2]) => value2 - value1)
            .map(([work, value]) => (
              <div key={work} className="flex items-center">
                <WorkTypeImage workType={work} className="size-8" />
                <span className="text-xs font-semibold text-gray-11">{value}</span>
              </div>
            ))}
        </div>

        <div className="mt-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-12">{pal.name}</h1>
          <p className="text-gray-11">{pal.title}</p>
        </div>

        <div>Stats</div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-2">
          {pal.activeSkills.map((skill) => (
            <div key={skill.id} className="rounded-lg bg-gray-3 p-3">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <ElementImage className="size-8" element={skill.element} tooltipSide="left" />
                  <div className="text-lg font-semibold text-gray-12">{skill.name}</div>
                </div>

                <div>Lvl {skill.level}</div>
              </div>
              <div className="pl-12">
                <p className="text-gray-11">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
