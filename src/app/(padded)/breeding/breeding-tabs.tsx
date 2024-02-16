'use client';

import { DesiredChild } from '@/app/(padded)/breeding/desired-child';
import { OneParent } from '@/app/(padded)/breeding/one-parent';
import { ShortestPath } from '@/app/(padded)/breeding/shortest-path';
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
      <TabsContent value="two-parents" className="mx-auto flex w-full max-w-xl flex-col items-center">
        <TwoParents />
      </TabsContent>
      <TabsContent value="one-parent" className="mx-auto flex w-full max-w-xl flex-col items-center">
        <OneParent />
      </TabsContent>
      <TabsContent value="desired-child" className="mx-auto flex w-full max-w-xl flex-col items-center">
        <DesiredChild />
      </TabsContent>
      <TabsContent value="shortest-path" className="mx-auto flex w-full max-w-xl flex-col items-center">
        <ShortestPath />
      </TabsContent>
    </Tabs>
  );
}
