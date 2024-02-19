import { ItemImage } from '@/components/ItemImage';
import { PalImage } from '@/components/PalImage';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { allPals } from '@/data/parsed';
import { ITEMS } from '@/data/parsed/items';
import { cn, getBadgeVariantForRate, getItemById, getItemRecipeById, notEmpty } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);
  return {
    title: item ? item.name : 'Not Found',
  };
}
export function generateStaticParams() {
  return ITEMS.map(({ id }) => ({ id }));
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = getItemById(params.id);

  if (!item) notFound();

  const recipe = getItemRecipeById(item.id);
  const materials = recipe?.materials.map((m) => ({ ...m, item: getItemById(m.id)! })).filter(notEmpty) ?? [];

  const droppedByPals = allPals
    .filter((pal) => pal.drops.some((drop) => drop.id === item.id))
    .map(({ id, name, isBoss, internalName, drops }) => ({
      name,
      isBoss,
      internalName,
      ...drops.find((drop) => drop.id === item.id)!,
      id,
    }));

  const stats = [
    { label: 'Corruption Factor', value: item.corruptionFactor },
    { label: 'Durability', value: item.durability },
    { label: 'HP', value: item.hpValue },
    { label: 'Magazine Size', value: item.magazineSize },
    { label: 'Magic Attack Value', value: item.magicAttackValue },
    { label: 'Magic Defense Value', value: item.magicDefenseValue },
    { label: 'Max Stack Count', value: item.maxStackCount },
    { label: 'Physical Attack Value', value: item.physicalAttackValue },
    { label: 'Physical Defense Value', value: item.physicalDefenseValue },
    { label: 'Price', value: item.price },
    { label: 'Rarity', value: item.rarity },
    { label: 'Restore Concentration', value: item.restoreConcentration },
    { label: 'Restore Health', value: item.restoreHealth },
    { label: 'Restore Sanity', value: item.restoreSanity },
    { label: 'Restore Satiety', value: item.restoreSatiety },
    { label: 'Shield Value', value: item.shieldValue },
    { label: 'Weight', value: item.weight },
  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="h-fit md:sticky md:top-[81px] md:w-72">
        <ItemImage id={item.imageName} className="mx-auto mt-2 size-36 rounded-full border border-gray-6 bg-gray-1" />

        <div className="mt-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-12">{item.name}</h1>
          <p className="capitalize text-gray-11">{item.typeA}</p>
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
      </Card>

      <div className="flex flex-1 flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <p className="text-gray-11">{item.description}</p>
        </Card>

        {recipe && (
          <Card className="@container">
            <CardHeader>
              <CardTitle>Recipe</CardTitle>
              <CardDescription>
                Items needed to craft <span className="font-bold text-gray-12">{recipe.productCount}</span> {item.name}
              </CardDescription>
            </CardHeader>

            <div className="grid grid-cols-1 gap-2 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
              {materials.map((material) => (
                <Tooltip key={material.id} content={material.item.description} className="max-w-64">
                  <Link href={`/items/${material.item.id}`}>
                    <Card
                      className="relative flex h-full flex-col items-center border-gray-5 bg-gray-3 p-2"
                      hoverEffect
                    >
                      <Badge className="absolute left-1 top-1" variant="primary">
                        {material.count}
                      </Badge>

                      <div className="w-fit rounded-full border border-gray-5 bg-gray-4 p-2">
                        {material.item.imageName && <ItemImage id={material.item.imageName} className="size-14" />}
                      </div>
                      <div className="mt-2 text-center font-medium text-gray-12">{material.item.name}</div>
                    </Card>
                  </Link>
                </Tooltip>
              ))}
            </div>
          </Card>
        )}

        {droppedByPals.length > 0 && (
          <Card className="@container">
            <CardHeader>
              <CardTitle>Dropped By</CardTitle>
            </CardHeader>

            <div className="grid grid-cols-1 gap-2 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
              {droppedByPals.map((pal) => (
                <Link key={pal.internalName} href={`/pals/${pal.id}`}>
                  <Card className="relative flex h-full flex-col items-center border-gray-5 bg-gray-3 p-2" hoverEffect>
                    <Badge variant="iris" className="absolute left-1 top-1">
                      {pal.min === pal.max ? pal.min : `${pal.min}-${pal.max}`}
                    </Badge>
                    <Badge variant={getBadgeVariantForRate(pal.rate)} className="absolute right-1 top-1">
                      {pal.rate}%
                    </Badge>

                    <PalImage id={pal.id} className="size-[74px] rounded-full border border-gray-6 bg-gray-4" />

                    <div className="relative mt-2">
                      {pal.isBoss && (
                        <Image
                          className="absolute -left-7 size-6"
                          src="/images/alpha.png"
                          alt="alpha"
                          height={24}
                          width={24}
                        />
                      )}
                      <div className="text-center font-medium text-gray-12">{pal.name}</div>{' '}
                    </div>
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
