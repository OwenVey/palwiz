import { ItemImage } from '@/components/ItemImage';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle, type CardProps } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import ITEMS from '@/data/items.json';
import { notEmpty } from '@/lib/utils';
import { type ItemRecipe } from '@/types';
import Link from 'next/link';

interface ItemRecipeCardProps extends CardProps {
  title?: string;
  description?: React.ReactNode;
  materials: ItemRecipe['materials'];
}
export function CraftingMaterialsCard({ title = 'Crafting Materials', description, materials }: ItemRecipeCardProps) {
  const materialsWithItem =
    materials.map((m) => ({ ...m, item: ITEMS.find(({ id }) => id === m.id)! })).filter(notEmpty) ?? [];
  return (
    <Card className="@container">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <div className="grid grid-cols-1 gap-2 @xs:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
        {materialsWithItem.map((material) => (
          <Tooltip key={material.id} content={material.item.description} className="max-w-64">
            <Link href={`/items/${material.item.id}`}>
              <Card className="relative flex h-full flex-col items-center border-gray-5 bg-gray-3 p-2" hoverEffect>
                <Badge className="absolute left-1 top-1" variant="primary">
                  {material.count}
                </Badge>

                <div className="w-fit rounded-full border border-gray-5 bg-gray-4 p-2">
                  {material.item.imageName && (
                    <ItemImage id={material.item.imageName} alt={material.item.imageName} width={56} height={56} />
                  )}
                </div>
                <div className="mt-2 text-center font-medium text-gray-12">{material.item.name}</div>
              </Card>
            </Link>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}
