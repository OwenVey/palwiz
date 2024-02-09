'use client';

import { CollapsibleFilter } from '@/components/CollapsibleFilter';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CRS, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SearchIcon } from 'lucide-react';
import { MapContainer, TileLayer } from 'react-leaflet';

const MAP_SIZE = 256;
const BOUND_SIZE = 256;

export default function MyMap() {
  const alphaIcon = new Icon({ iconUrl: '/images/alpha.png', iconSize: [30, 30] });
  return (
    <div>
      <Card className="fixed m-4 flex w-96 flex-col gap-5">
        <Input label="Search" icon={SearchIcon} placeholder="Search" />
        <CollapsibleFilter label="Locations" defaultOpen>
          TODO
        </CollapsibleFilter>
        <CollapsibleFilter label="Collectibles" defaultOpen>
          TODO
        </CollapsibleFilter>
        <CollapsibleFilter label="Pals">TODO</CollapsibleFilter>
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
          {/* <Marker position={[0, 0]} icon={alphaIcon}>
            <Popup className="bg-red-500">Alpha</Popup>
          </Marker>
          <Marker position={[-128, 128]} icon={alphaIcon}>
            <Popup className="bg-red-500">Alpha</Popup>
          </Marker>
          <Marker position={[-256, 256]} icon={alphaIcon}>
            <Popup className="bg-red-500">Alpha</Popup>
          </Marker> */}
          <TileLayer url="/images/map/{z}/{x}/{y}.webp" minZoom={1} maxZoom={6} tileSize={256} />
          {/* <ImageOverlay url="/images/map.png" bounds={bounds} /> */}
        </MapContainer>
      </div>
    </div>
  );
}

// C:\Users\owenv\Downloads\gdal-3.8.3\swig\python\gdal-utils\scripts>
// python gdal2tiles.py -p raster -z 0-6 --tiledriver=WEBP --xyz -e C:\Users\owenv\Documents\Programming\palwiz\public\images\map.png C:\Users\owenv\Documents\Programming\palwiz\public\images\map
