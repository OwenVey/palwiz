'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { PalCombobox } from '@/components/PalCombobox';
import { PalImage } from '@/components/PalImage';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import mapLocationsJson from '@/data/map-locations.json';
import { normalPals } from '@/data/parsed';
import { cn, parseAsArrayOfStrings } from '@/lib/utils';
import { CRS, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

type LocationGroup = {
  name: string;
  icon: string;
  iconSize: number;
  iconClass?: string;
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
function getLeafletCoords({ x, y }: { x: number; y: number }, mapSize = MAP_SIZE): [number, number] {
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

const mapLocations = mapLocationsJson.filter((l) => l.enabled);

export default function MyMap() {
  const [filters, setFilters] = useQueryState('filters', parseAsArrayOfStrings);
  const [filterPal, setFilterPal] = useQueryState('pal', parseAsString);

  return (
    <div>
      <Card className="fixed bottom-0 top-[65px] m-4 w-[425px] p-0">
        <ScrollArea className="h-full w-full p-4">
          <div className="flex flex-col gap-5">
            <Input label="Search" icon={SearchIcon} placeholder="Search" />

            <PalCombobox />

            {Object.entries(LOCATION_GROUPS).map(([group, locations]) => (
              <CollapsibleFilter key={group} label={group} defaultOpen>
                <ToggleGroup
                  type="multiple"
                  className="md:grid md:grid-cols-2 md:gap-1"
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
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-11">
                          {mapLocations.find((l) => l.name === category.name)?.locations.length}
                        </span>
                      </div>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CollapsibleFilter>
            ))}

            <CollapsibleFilter label="Pals">
              <ToggleGroup
                type="single"
                className="md:grid md:grid-cols-2 md:gap-1"
                value={filterPal ?? ''}
                onValueChange={(v) => setFilterPal(v ? v : null)}
              >
                {normalPals.map((pal) => (
                  <ToggleGroupItem key={pal.name} value={pal.name} className="h-fit gap-2 px-2 py-1">
                    <PalImage
                      className="size-[34px] rounded-full border border-gray-6 bg-gray-2"
                      id={pal.id}
                      width={34}
                      height={34}
                      alt={pal.name}
                    />

                    <div className="flex flex-1 items-center justify-between">
                      <span>{pal.name}</span>
                    </div>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </CollapsibleFilter>
          </div>
        </ScrollArea>
      </Card>

      <div className="absolute left-0 top-0 z-[-1] h-dvh w-dvw">
        <MapContainer
          crs={CRS.Simple}
          center={[-128, 128]}
          zoom={2}
          zoomSnap={1}
          zoomDelta={1}
          className="h-full !bg-[#102536]"
          zoomControl={false}
          maxBounds={[
            [BOUND_SIZE, -BOUND_SIZE],
            [-MAP_SIZE - BOUND_SIZE, MAP_SIZE + BOUND_SIZE],
          ]}
        >
          {Object.values(LOCATION_GROUPS).map((gorup) =>
            gorup.map((category) =>
              mapLocations
                .find((m) => m.name === category.name && filters.includes(category.name))
                ?.locations.map((location) => (
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
                )),
            ),
          )}
          <Coordinates />

          <TileLayer url="/images/map/tiles/{z}/{x}/{y}.webp" minZoom={1} maxZoom={6} />
          {/* <ImageOverlay url="/images/map.png" bounds={bounds} /> */}
        </MapContainer>
      </div>
    </div>
  );
}

function Coordinates() {
  const [cursorPosition, setCursorPosition] = useState<string | null>(null);

  useMapEvents({
    mousemove(e) {
      const { lat, lng } = e.latlng;
      setCursorPosition(getInGameCoords([lat, lng]));
    },
  });

  if (!cursorPosition) return null;

  return (
    <div className="leaflet-bottom leaflet-right m-2 rounded-lg bg-black/25 p-2 font-mono text-white backdrop-blur">
      {cursorPosition}
    </div>
  );
}

// C:\Users\owenv\Downloads\gdal-3.8.3\swig\python\gdal-utils\scripts>
// python gdal2tiles.py -p raster -z 0-6 --tiledriver=WEBP --xyz -e C:\Users\owenv\Documents\Programming\palwiz\public\images\map.png C:\Users\owenv\Documents\Programming\palwiz\public\images\map
