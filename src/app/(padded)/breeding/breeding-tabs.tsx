'use client';

import { DesiredChild } from '@/app/(padded)/breeding/desired-child';
import { OneParent } from '@/app/(padded)/breeding/one-parent';
import { ShortestPath } from '@/app/(padded)/breeding/shortest-path';
import { TwoParents } from '@/app/(padded)/breeding/two-parents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RouteIcon, UserIcon, UserSearchIcon, UsersIcon } from 'lucide-react';

import { useQueryState } from 'nuqs';
export function BreedingTabs() {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'two-parents', clearOnDefault: true });

  return (
    <Tabs value={tab} onValueChange={setTab} className="flex flex-col items-center">
      <TabsList className="mb-10 h-fit w-full flex-col sm:max-w-3xl sm:flex-row">
        <TabsTrigger value="two-parents" className="w-full flex-1 justify-start sm:justify-center">
          <UsersIcon className="mr-2 size-4" />
          Two Parents
        </TabsTrigger>
        <TabsTrigger value="one-parent" className="w-full flex-1 justify-start sm:justify-center">
          <UserIcon className="mr-2 size-4" />
          One Parent
        </TabsTrigger>
        <TabsTrigger value="desired-child" className="w-full flex-1 justify-start sm:justify-center">
          <UserSearchIcon className="mr-2 size-4" />
          Desired Child
        </TabsTrigger>
        <TabsTrigger value="shortest-path" className="w-full flex-1 justify-start sm:justify-center">
          <RouteIcon className="mr-2 size-4" />
          Shortest Path
        </TabsTrigger>
      </TabsList>

      <TabsContent value="two-parents" className="mx-auto flex w-full flex-col items-center sm:max-w-xl">
        <TwoParents />
      </TabsContent>
      <TabsContent value="one-parent" className="mx-auto flex w-full flex-col items-center sm:max-w-xl">
        <OneParent />
      </TabsContent>
      <TabsContent value="desired-child" className="mx-auto flex w-full flex-col items-center sm:max-w-xl">
        <DesiredChild />
      </TabsContent>
      <TabsContent value="shortest-path" className="mx-auto flex w-full flex-col items-center sm:max-w-xl">
        <ShortestPath />
      </TabsContent>
    </Tabs>
  );
}
