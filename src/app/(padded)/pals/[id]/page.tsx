import { PalActiveSkillsCard } from '@/app/(padded)/pals/[id]/PalActiveSkillsCard';
import { ItemDropsCard } from '@/app/(padded)/pals/[id]/PalDropsCard';
import { PalStatsSidebar } from '@/app/(padded)/pals/[id]/PalStatsSidebar';
import { PalWorkSuitabilitiesCard } from '@/app/(padded)/pals/[id]/PalWorkSuitabilitiesCard';
import { PartnerSkillImage } from '@/components/PartnerSkillImage';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { normalPals } from '@/data/parsed';
import { getPalById } from '@/lib/utils';

export function generateMetadata({ params }: { params: { id: string } }) {
  const pal = getPalById(params.id);
  return {
    title: pal ? pal.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return normalPals.map(({ id }) => ({ id }));
}

export default function PalPage({ params }: { params: { id: string } }) {
  const pal = getPalById(params.id);

  if (!pal) {
    return <div>No pal found with id: {params.id}</div>;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <PalStatsSidebar className="h-fit md:sticky md:top-[81px] md:w-72" pal={pal} />

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
            {pal.partnerSkill.name !== null ? (
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    {pal.partnerSkillIcon !== null && (
                      <PartnerSkillImage id={pal.partnerSkillIcon.toString()} className="size-8 scale-[2]" />
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
