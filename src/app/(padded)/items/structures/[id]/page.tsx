import { CraftingMaterialsCard } from '@/components/CraftingMaterialsCard';
import { StickySidebar } from '@/components/StickySidebar';
import { StructureImage } from '@/components/images/StructureImage';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import STRUCTURES from '@/data/structures.json';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: { params: { id: string } }) {
  const structure = STRUCTURES.find(({ id }) => id === params.id);
  return {
    title: structure ? structure.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return STRUCTURES.map(({ id }) => ({ id }));
}

export default function StructurePage({ params }: { params: { id: string } }) {
  const structure = STRUCTURES.find(({ id }) => id === params.id);

  if (!structure) notFound();

  const STATS = [
    { label: 'Build Work', value: structure.buildWork },
    { label: 'Consume Energy Speed', value: structure.consumeEnergySpeed },
    { label: 'Defense', value: structure.defense },
    { label: 'Deterioration Damage', value: structure.deteriorationDamage },
    { label: 'Extinguish Burn Work Amount', value: structure.extinguishBurnWorkAmount },
    { label: 'HP', value: structure.hp },
    { label: 'Material Type', value: structure.materialType },
    { label: 'Material Sub Type', value: structure.materialSubType },
    { label: 'Category', value: structure.typeA },
    { label: 'Subcategory', value: structure.typeB },
  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <StickySidebar>
        <div className="mx-auto w-fit rounded-full border border-gray-6 bg-gray-1 p-4">
          <StructureImage name={structure.imageName} alt={structure.name} width={110} height={110} />
        </div>

        <div className="mt-2 text-center">
          <h1 className="break-all text-2xl font-semibold text-gray-12">{structure.name}</h1>
          <p className="capitalize text-gray-11">{structure.typeA}</p>
        </div>

        <dl className="mt-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={cn('flex items-center justify-between rounded-lg p-3 text-sm', index % 2 === 0 && 'bg-gray-3')}
            >
              <dt className="font-medium text-gray-12">{stat.label}</dt>
              <dd className="font-mono text-gray-11">{stat.value.toLocaleString()}</dd>
            </div>
          ))}
        </dl>
      </StickySidebar>

      <div className="flex flex-1 flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <p className="text-gray-11">{structure.description}</p>
        </Card>

        <CraftingMaterialsCard materials={structure.materials} />
      </div>
    </div>
  );
}
