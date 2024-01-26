import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="flex gap-2 p-10">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </main>
  );
}
