import PalsGrid from '@/app/pals/grid';
import pals from '@/data/pals.json';

export default function PalsPage() {
  const sortedPals = pals.sort((a, b) => a.zukanIndex - b.zukanIndex);

  return (
    <div className="mt-10">
      <PalsGrid pals={sortedPals} />
    </div>
  );
}
