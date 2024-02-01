import ItemDropsCard from '@/app/pals/[id]/PalDropsCard';
import { ElementImage } from '@/components/ElementImage';
import { PalImage } from '@/components/PalImage';
import { WorkTypeImage } from '@/components/WorkTypeImage';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import pals from '@/data/pals.json';
import { getWorkLabel } from '@/lib/utils';
import { PalSchema } from '@/schemas/pal';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { id: string } }) {
  const pal = pals.find((pal) => pal.id === params.id);
  return {
    title: pal ? pal.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return pals
    .filter((pal) => pal.zukanIndex > 0)
    .map(({ id }) => ({
      id,
    }));
}

export default function PalPage({ params }: { params: { id: string } }) {
  const pal = PalSchema.parse(pals.find(({ id }) => id === params.id));

  if (!pal) return <div>No pal found with the id {params.id}</div>;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Card className="h-fit lg:sticky lg:top-[81px] lg:w-80">
        <div className="relative flex flex-col">
          <Badge className="absolute items-baseline font-mono text-sm font-bold tracking-wider">
            <span className="text-gray-8">#{'000'.slice(pal.zukanIndex.toString().length)}</span>
            <span>{pal.zukanIndex}</span>
            <span className="text-xs">{pal.zukanIndexSuffix}</span>
          </Badge>

          <div className="absolute right-0 flex flex-col gap-2 pr-[inherit]">
            {[pal.elementType1, pal.elementType2].filter(Boolean).map((element) => (
              <ElementImage key={element} element={element} className="size-8" tooltipSide="left" />
            ))}
          </div>

          <PalImage pal={pal.id} className="mx-auto mt-2 size-36 rounded-full border border-gray-6 bg-gray-1" />

          <div className="mt-2 text-center">
            <h1 className="text-2xl font-semibold text-gray-12">{pal.name}</h1>
            <p className="text-gray-11">{pal.title}</p>
          </div>

          <div>Stats</div>
        </div>
      </Card>

      <div className="flex flex-1 grid-cols-1 flex-col gap-4 lg:grid lg:grid-cols-2">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <p className="text-gray-11">{pal.description}</p>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partner Skill</CardTitle>
            </CardHeader>
            {pal.partnerSkill.name !== null ? (
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <ElementImage className="size-8" element="fire" tooltipSide="left" />
                    <div className="font-medium text-gray-12">{pal.partnerSkill.name}</div>
                  </div>
                </div>
                <div className="pl-12">
                  <p className="text-sm text-gray-11">{pal.partnerSkill.description}</p>
                </div>
              </div>
            ) : (
              <div>None</div>
            )}
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Work Suitability</CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-2">
            {Object.entries(pal.workSuitabilities)
              .filter(([, value]) => value > 0)
              .sort(([, value1], [, value2]) => value2 - value1)
              .map(([workId, value]) => (
                <div
                  key={workId}
                  className="flex items-center rounded border border-gray-5 bg-gray-3 px-3 py-2 text-gray-12"
                >
                  <WorkTypeImage id={workId} className="size-8" />
                  <span className="ml-3 font-medium capitalize">{getWorkLabel(workId)}</span>
                  <div className="ml-auto font-mono text-sm font-medium">
                    Lv <span className="text-base">{value}</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <ItemDropsCard drops={pal.drops} alphaDrops={pal.bossDrops} />

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Active Skills</CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-2">
            {pal.activeSkills.map((skill) => (
              <Link key={skill.id} href={`/skills/${skill.id}`}>
                <Card className="relative bg-gray-3" hoverEffect>
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <ElementImage className="size-8" element={skill.element} tooltipSide="left" />
                      <div className="font-medium text-gray-12">{skill.name}</div>
                    </div>

                    <Badge className="absolute right-2 top-2 bg-gray-5 font-mono text-sm">Lv {skill.level}</Badge>
                  </div>
                  <div className="-mt-1 pl-12">
                    <p className="text-sm text-gray-11">{skill.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
