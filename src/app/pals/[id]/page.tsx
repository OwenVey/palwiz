import pals from '@/data/pals.json';
import Image from 'next/image';

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
    <div className="py-4">
      <div className="flex w-fit flex-col rounded-lg bg-gray-2 p-4">
        <Image
          className="size-36 rounded-full border border-gray-6 bg-gray-1"
          src={`/images/pals/${pal.id}.webp`}
          alt={`image of ${pal.name}`}
          height={112}
          width={112}
          quality={100}
          unoptimized
        />
        <div className="mt-2 text-center ">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-12">{pal.name}</h1>
          <p>{pal.title}</p>
        </div>
      </div>
    </div>
  );
}
