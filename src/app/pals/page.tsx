'use client';
import { Badge } from '@/components/ui/badge';
import pals from '@/data/pals.json';
import Image from 'next/image';

export default function PalsPage() {
  const sortedPals = pals.sort((a, b) => a.zukanIndex - b.zukanIndex);
  console.log(sortedPals.length);

  return (
    <main className="p-10">
      <div className="grid grid-cols-8 gap-4">
        {sortedPals.map((pal) => (
          <div key={pal.id} className="flex flex-col items-center rounded-lg border border-gray-6 p-2 shadow-sm">
            <Badge className="items-baseline self-start font-mono font-bold" variant="outline">
              <span className="opacity-60">{'000'.slice(pal.zukanIndex.toString().length)}</span>
              <span>{pal.zukanIndex}</span>
              <span className="text-[10px]">{pal.zukanIndexSuffix}</span>
            </Badge>
            <Image
              className="size-24 rounded-full border border-gray-6"
              src={`/images/pals/${pal.name.toLowerCase()}.png`}
              alt={`image of ${pal.name}`}
              height={96}
              width={96}
            />
            <div className="mt-2 text-sm font-medium">{pal.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
