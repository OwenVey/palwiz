'use client';

import { CRS, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function MyMap() {
  const alphaIcon = new Icon({ iconUrl: '/images/alpha.png', iconSize: [30, 30] });
  return (
    <div className="absolute left-0 top-0 z-0 h-dvh w-dvw">
      <MapContainer
        crs={CRS.Simple}
        center={[-128, 128]}
        zoom={2}
        zoomSnap={1}
        zoomDelta={1}
        className="h-full !bg-[#102536]"
      >
        <Marker position={[-128, 128]} icon={alphaIcon}>
          <Popup className="bg-red-500">Alpha</Popup>
        </Marker>
        <TileLayer url="/images/map/{z}/{x}/{y}.webp" minZoom={1} maxZoom={6} tileSize={256} />
        {/* <ImageOverlay url="/images/map.png" bounds={bounds} /> */}
      </MapContainer>
    </div>
  );
}
