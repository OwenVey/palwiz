import { PalActiveSkillsCard } from '@/app/(padded)/pals/[id]/PalActiveSkillsCard';
import { ItemDropsCard } from '@/app/(padded)/pals/[id]/PalDropsCard';
import { PalStatsSidebar } from '@/app/(padded)/pals/[id]/PalStatsSidebar';
import { PalWorkSuitabilitiesCard } from '@/app/(padded)/pals/[id]/PalWorkSuitabilitiesCard';
import { PartnerSkillImage } from '@/components/images/PartnerSkillImage';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import NORMAL_PALS from '@/data/normal-pals.json';
import { getPalById } from '@/lib/pal-utils';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: { params: { id: string } }) {
  const pal = getPalById(params.id);
  return {
    title: pal ? pal.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return NORMAL_PALS.map(({ id }) => ({ id }));
}

export default function PalPage({ params }: { params: { id: string } }) {
  const pal = getPalById(params.id);

  if (!pal) notFound();

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <PalStatsSidebar pal={pal} />

      <div className="flex flex-1 grid-cols-1 flex-col gap-4 md:grid md:grid-cols-2">
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
            {pal.partnerSkill ? (
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    {pal.partnerSkill.group !== null && (
                      <PartnerSkillImage
                        name={pal.partnerSkill.group}
                        alt={pal.partnerSkill.group}
                        width={32}
                        height={32}
                        className="scale-[2]"
                      />
                    )}
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

        <PalWorkSuitabilitiesCard workSuitabilities={pal.workSuitabilities} />

        <ItemDropsCard className="col-span-2" pal={pal} />

        <PalActiveSkillsCard className="col-span-2" pal={pal} />
      </div>
    </div>
  );
}
