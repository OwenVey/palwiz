import { ElementImage } from '@/components/images/ElementImage';
import { PalImage } from '@/components/images/PalImage';
import { StickySidebar } from '@/components/StickySidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import ACTIVE_SKILLS from '@/data/active-skills.json';
import NORMAL_PALS from '@/data/normal-pals.json';
import { cn } from '@/lib/utils';
import { capitalCase } from 'change-case';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: { params: { id: string } }) {
  const skill = ACTIVE_SKILLS.find(({ id }) => id === params.id);
  return {
    title: skill ? skill.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return ACTIVE_SKILLS.map(({ id }) => ({ id }));
}

export default function SkillPage({ params }: { params: { id: string } }) {
  const skill = ACTIVE_SKILLS.find(({ id }) => id === params.id);

  if (!skill) notFound();

  const palsWithSkill = NORMAL_PALS.filter((pal) => pal.activeSkills.some(({ id }) => id === skill.id)).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const stats = [
    { label: 'Power', value: skill.power },
    { label: 'Cooldown Time', value: `${skill.cooldownTime} sec` },
    { label: 'Min Range', value: skill.minRange },
    { label: 'Max Range', value: skill.maxRange },
    { label: 'Category', value: skill.category },
  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <StickySidebar className="max-h-none">
        <div className="flex items-center justify-center gap-2">
          <Tooltip content={skill.element} className="capitalize">
            <ElementImage name={skill.element} alt={skill.element} width={32} height={32} />
          </Tooltip>
          <h1 className="text-2xl font-semibold text-gray-12">{skill.name}</h1>
        </div>

        <dl className="mt-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn('flex items-center justify-between rounded-lg p-3 text-sm', index % 2 === 0 && 'bg-gray-3')}
            >
              <dt className="font-medium text-gray-12">{stat.label}</dt>
              <dd className="font-mono text-gray-11">{stat.value.toLocaleString()}</dd>
            </div>
          ))}
        </dl>

        {skill.effects.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Effects</h3>
            <dl className="mt-1">
              {skill.effects.map((effect, index) => (
                <div
                  key={effect.name}
                  className={cn(
                    'flex items-center justify-between rounded-lg p-3 text-sm',
                    index % 2 === 0 && 'bg-gray-3',
                  )}
                >
                  <dt className="font-medium text-gray-12">{capitalCase(effect.name)}</dt>
                  <dd className="font-mono text-gray-11">{effect.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {skill.specialAttackRates.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold">Special Attack Rates</h3>
            <dl className="mt-1">
              {skill.specialAttackRates.map((attackRate, index) => (
                <div
                  key={attackRate.type}
                  className={cn(
                    'flex items-center justify-between rounded-lg p-3 text-sm',
                    index % 2 === 0 && 'bg-gray-3',
                  )}
                >
                  <dt className="font-medium text-gray-12">{attackRate.type.replace('vs', '')}</dt>
                  <dd className="font-mono text-gray-11">{attackRate.rate}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </StickySidebar>

      <div className="flex flex-1 flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <p className="text-gray-11">{skill.description}</p>
        </Card>

        {palsWithSkill.length > 0 && (
          <Card className="@container">
            <CardHeader>
              <CardTitle>Pals with {skill.name}</CardTitle>
            </CardHeader>

            <div className="grid grid-cols-1 gap-2 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
              {palsWithSkill.map((pal) => (
                <Link key={pal.internalName} href={`/pals/${pal.id}`}>
                  <Card className="relative flex h-full flex-col items-center border-gray-5 bg-gray-3 p-2" hoverEffect>
                    <Badge className="absolute right-1 top-1 tracking-normal">
                      Lv {pal.activeSkills.find(({ id }) => id === skill.id)!.level}
                    </Badge>
                    <PalImage
                      name={pal.id}
                      alt={pal.id}
                      width={74}
                      height={74}
                      className="rounded-full border border-gray-6 bg-gray-4"
                    />
                    <div className="mt-2 text-center font-medium text-gray-12">{pal.name}</div>
                  </Card>
                </Link>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
