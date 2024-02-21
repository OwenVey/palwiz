'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { PalCombobox } from '@/components/PalCombobox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import MAP_LOCATIONS from '@/data/map-locations.json';
import PAL_LOCATIONS from '@/data/pal-locations.json';
import { useQueryString } from '@/hooks/useQueryString';
import { useQueryStringArray } from '@/hooks/useQueryStringArray';
import { cn } from '@/lib/utils';
import { useToggle } from '@uidotdev/usehooks';
import { capitalCase } from 'change-case';
import { CRS, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ChevronLeftIcon, MaximizeIcon, MinimizeIcon, MinusIcon, MoonIcon, PlusIcon, SunIcon } from 'lucide-react';
import Image from 'next/image';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents } from 'react-leaflet';

const BOSS_PAL_LOCATIONS = PAL_LOCATIONS.filter(({ isBoss }) => isBoss);

type LocationGroup = {
  name: string;
  icon: string;
  iconSize: number;
  iconClass?: string;
  count?: number;
};
const LOCATION_GROUPS: Record<string, LocationGroup[]> = {
  locations: [
    { name: 'Fast Travel', icon: '/images/map/icons/fast-travel.png', iconSize: 40 },
    { name: 'Respawn Point', icon: '/images/map/icons/respawn-point.png', iconSize: 50 },
    { name: 'Syndicate Tower', icon: '/images/map/icons/syndicate-tower.png', iconSize: 50 },
    { name: 'Sealed Realm', icon: '/images/map/icons/sealed-dungeon.png', iconSize: 30 },
    { name: 'Dungeon', icon: '/images/map/icons/sealed-dungeon.png', iconSize: 30 },
    { name: 'Statue of Power', icon: '/images/map/icons/star.png', iconSize: 40, iconClass: 'scale-125' },
    { name: 'NPC', icon: '/images/map/icons/man.svg', iconSize: 30 },
    { name: 'Boss Pals', icon: '/images/pals/jetragon.webp', iconSize: 30, count: BOSS_PAL_LOCATIONS.length },
  ],
  collectibles: [
    { name: 'Lifmunk Effigy', icon: '/images/items/relic.webp', iconSize: 20 },
    { name: 'Note', icon: '/images/map/icons/note.svg', iconSize: 20, iconClass: 'p-1' },
    { name: 'Skill Fruit Tree', icon: '/images/map/icons/apple.svg', iconSize: 20, iconClass: 'p-1' },
  ],
} as const;

const BOUND_SIZE = 500;
const MAP_SIZE = 256;

const GAME_BOUNDS = {
  x: { min: -582888, max: 335112 },
  y: { min: -301000, max: 617000 },
};

// Converts large coordinates found in game files to Leaflet coordinates based on MAP_SIZE
// Ex: { x: -363806.765646, y: 273023.873396 } --> [-194.90545098624835, 160.076374280366]
function getLeafletCoords({ x, y }: { x: number; y: number; z?: number }, mapSize = MAP_SIZE): [number, number] {
  const scaleX = mapSize / (GAME_BOUNDS.x.max - GAME_BOUNDS.x.min);
  const scaleY = mapSize / (GAME_BOUNDS.y.max - GAME_BOUNDS.y.min);

  const mapX = (x - GAME_BOUNDS.x.min) * scaleX - mapSize;
  const mapY = (y - GAME_BOUNDS.y.min) * scaleY;

  return [mapX, mapY];
}

// Converts Leaflet coordinates to Palword in game coordinates
// Ex: [-50, 200] --> [563, 609]
function getInGameCoords([x, y]: [number, number]) {
  const scale = 2000 / MAP_SIZE;
  const newX = Math.round((y - MAP_SIZE / 2) * scale);
  const newY = Math.round((x + MAP_SIZE / 2) * scale);
  return `(${newX}, ${newY})`;
}

export default function MyMap() {
  const [filters, setFilters] = useQueryStringArray('filters');
  const [palFilter, setPalFilter] = useQueryString('pal');
  const [showNightLocations, setShowNightLocations] = useQueryState(
    'night',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const [hideSidebar, toggleHideSidebar] = useToggle(false);
  return (
    <div className="relative h-full">
      <Card
        className={cn(
          'absolute left-4 right-4 top-4 z-[1001] flex h-fit max-h-[75vh] flex-col p-0 transition-transform sm:max-h-[calc(100vh-65px-32px)] sm:w-[425px]',
          hideSidebar && 'top-0 -translate-y-full sm:left-0 sm:top-4 sm:-translate-x-full sm:translate-y-0',
        )}
      >
        <button
          onClick={() => toggleHideSidebar(undefined)}
          className="absolute -bottom-6 right-1/2 grid h-6 w-16 translate-x-1/2 place-items-center rounded-b-md border border-t-0 border-gray-4 bg-gray-2 text-gray-11 transition-colors hover:bg-gray-3 hover:text-gray-12 active:bg-gray-4 sm:-right-6 sm:top-8 sm:h-16 sm:w-6 sm:translate-x-0 sm:rounded-none sm:rounded-r-md sm:border-l-0"
        >
          <ChevronLeftIcon
            className={cn(
              'size-5 rotate-90 transition-transform sm:rotate-0',
              hideSidebar && 'rotate-[270deg] sm:rotate-180',
            )}
          />
        </button>
        <ScrollArea className="flex h-full w-full flex-col px-4" type="auto">
          <div className="flex flex-col gap-5 py-4">
            <div className="flex flex-wrap items-end gap-2">
              <PalCombobox className="flex-1" label="Pal Locations" value={palFilter} setValue={setPalFilter} />
              <div className="mr-px flex h-10 items-center gap-1.5">
                <Label htmlFor="daytime-toggle">
                  <SunIcon
                    className={cn('size-5 transition-colors', showNightLocations ? 'text-gray-9' : 'text-amber-9')}
                  />
                </Label>
                <Switch id="daytime-toggle" checked={showNightLocations} onCheckedChange={setShowNightLocations} />
                <Label htmlFor="daytime-toggle">
                  <MoonIcon
                    className={cn('size-5 transition-colors', showNightLocations ? 'text-iris-9' : 'text-gray-9')}
                  />
                </Label>
              </div>
            </div>

            {Object.entries(LOCATION_GROUPS).map(([group, locations]) => (
              <CollapsibleFilter className="@container" key={group} label={group}>
                <ToggleGroup
                  type="multiple"
                  className="grid grid-cols-1 gap-1 @sm:grid-cols-2"
                  value={filters}
                  onValueChange={(v) => setFilters(v.length > 0 ? v : null)}
                >
                  {locations.map((category) => (
                    <ToggleGroupItem key={category.name} value={category.name} className="h-fit gap-2 px-2 py-1">
                      <div className="rounded-full border border-gray-6 bg-gray-2 p-1">
                        <Image
                          className={cn('size-6', category.iconClass)}
                          src={category.icon}
                          width={24}
                          height={24}
                          alt={category.name}
                        />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <span className="line-clamp-1 text-left">{category.name}</span>
                        <span className="ml-2 text-xs text-gray-11 sm:ml-0">
                          {category.count ?? MAP_LOCATIONS.find((l) => l.name === category.name)?.locations.length}
                        </span>
                      </div>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CollapsibleFilter>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <MapContainer
        crs={CRS.Simple}
        center={[-128, 128]}
        zoom={2}
        zoomSnap={1}
        zoomDelta={1}
        className="h-full !bg-[#102536]"
        zoomControl={false}
        attributionControl={false}
        maxBounds={[
          [BOUND_SIZE, -BOUND_SIZE],
          [-MAP_SIZE - BOUND_SIZE, MAP_SIZE + BOUND_SIZE],
        ]}
      >
        {/* Top Right corner */}
        <div className="leaflet-top leaflet-right !pointer-events-auto m-4 flex flex-col gap-2">
          <FullscreenButton />
          <ZoomControls />
        </div>

        {/* Bottom Right corner */}
        <div className="leaflet-bottom leaflet-right !pointer-events-auto m-4 flex flex-col gap-2">
          <Coordinates />
        </div>

        {/* All location groups */}
        {Object.values(LOCATION_GROUPS).map((gorup) =>
          gorup.map((category) =>
            MAP_LOCATIONS.find((m) => m.name === category.name && filters.includes(category.name))?.locations.map(
              (location) => (
                <Marker
                  key={location.x}
                  position={getLeafletCoords(location)}
                  icon={
                    new Icon({
                      iconUrl: category.icon,
                      iconSize: [category.iconSize, category.iconSize],
                    })
                  }
                >
                  <Popup>
                    {category.name}: {getInGameCoords(getLeafletCoords(location))}
                  </Popup>
                </Marker>
              ),
            ),
          ),
        )}

        {/* Pal Locations */}
        {palFilter &&
          PAL_LOCATIONS.find((p) => p.id === palFilter)?.locations[showNightLocations ? 'night' : 'day'].map(
            (location, index) => (
              <Circle
                key={`${location.x},${location.y},${location.z}-${index}`}
                center={getLeafletCoords(location)}
                pathOptions={{
                  fillColor: showNightLocations ? '#5ecdff' : 'orange',
                  color: showNightLocations ? '#3197c4' : '#bf800a',
                  weight: 1,
                  opacity: 0.2,
                  fillOpacity: 0.5,
                }}
                radius={2}
              />
            ),
          )}

        {/* Boss Pals */}
        {filters.includes('Boss Pals') &&
          BOSS_PAL_LOCATIONS.map((boss) => (
            <Marker
              key={boss.id}
              position={getLeafletCoords(boss.locations.day[0]!)}
              icon={
                new Icon({
                  iconUrl: `/images/pals/${boss.id}.webp`,
                  iconSize: [35, 35],
                  className: 'rounded-full bg-black border border-white',
                })
              }
            >
              <Popup>
                {capitalCase(boss.id)}: {getInGameCoords(getLeafletCoords(boss.locations.day[0]!))}
              </Popup>
            </Marker>
          ))}

        {/* Map Tiles */}
        <TileLayer url="/images/map/tiles/{z}/{x}/{y}.webp" minZoom={1} maxZoom={6} />
      </MapContainer>
    </div>
  );
}

function FullscreenButton() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSupported, setIsSupported] = useState(document.fullscreenEnabled);

  useEffect(() => {
    if (!document.fullscreenEnabled) {
      setIsSupported(false);
    }
    document.onfullscreenchange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    return () => {
      document.onfullscreenchange = null;
    };
  }, []);

  const toggleFullScreen = () => {
    const element = document.documentElement;
    if (isFullScreen) {
      if (document.exitFullscreen) void document.exitFullscreen();
      else if (document.mozCancelFullScreen) void document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) void document.webkitExitFullscreen();
      else if (document.msExitFullscreen) void document.msExitFullscreen();
    } else {
      if (element.requestFullscreen) void element.requestFullscreen();
      else if (element.mozRequestFullScreen) void element.mozRequestFullScreen();
      else if (element.webkitRequestFullscreen) void element.webkitRequestFullscreen();
      else if (element.msRequestFullscreen) void element.msRequestFullscreen();
    }
  };

  if (!isSupported) return null;

  return (
    <Button onClick={toggleFullScreen} size="icon" variant="outline">
      {isFullScreen ? <MinimizeIcon className="size-5" /> : <MaximizeIcon className="size-5" />}
    </Button>
  );
}

function Coordinates() {
  const [cursorPosition, setCursorPosition] = useState<string | null>(null);

  useMapEvent('mousemove', (e) => {
    const { lat, lng } = e.latlng;
    setCursorPosition(getInGameCoords([lat, lng]));
  });

  if (!cursorPosition) return null;

  return <div className="rounded-lg border border-gray-5 bg-gray-1 p-2 font-mono text-gray-12">{cursorPosition}</div>;
}

function ZoomControls() {
  const map = useMapEvents({});

  return (
    <div className="flex flex-col">
      <Button size="icon" variant="outline" onClick={() => map.zoomIn()} className="rounded-b-none">
        <PlusIcon className="size-5" />
      </Button>

      <Button size="icon" variant="outline" onClick={() => map.zoomOut()} className="rounded-t-none">
        <MinusIcon className="size-5" />
      </Button>
    </div>
  );
}

// C:\Users\owenv\Downloads\gdal-3.8.3\swig\python\gdal-utils\scripts>
// python gdal2tiles.py -p raster -z 0-6 --tiledriver=WEBP --xyz -e C:\Users\owenv\Documents\Programming\palwiz\public\images\map.png C:\Users\owenv\Documents\Programming\palwiz\public\images\map
