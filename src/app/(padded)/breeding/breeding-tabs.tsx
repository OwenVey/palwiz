'use client';

import { OneParent } from '@/app/(padded)/breeding/one-parent';
import { TwoParents } from '@/app/(padded)/breeding/two-parents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useQueryState } from 'nuqs';
export function BreedingTabs() {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'two-parents', clearOnDefault: true });

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="mb-10">
        <TabsTrigger value="two-parents">Two Parents</TabsTrigger>
        <TabsTrigger value="one-parent">One Parent</TabsTrigger>
        <TabsTrigger value="desired-child">Desired Child</TabsTrigger>
        <TabsTrigger value="shortest-path">Shortest Path</TabsTrigger>
      </TabsList>
      <div className="flex justify-center">
        <TabsContent value="two-parents">
          <TwoParents />
        </TabsContent>
        <TabsContent value="one-parent">
          <OneParent />
        </TabsContent>
      </div>
    </Tabs>
  );
}
