'use client';

import L, { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

const Map = () => {
  const bounds = [
    [0, 0],
    [1000, 1000],
  ] satisfies LatLngBoundsExpression;
  const MAX_ZOOM = 5;

  return (
    <MapContainer
      crs={L.CRS.Simple}
      zoom={1}
      worldCopyJump={true}
      maxBounds={bounds}
      style={{ height: '100vh', width: '100%' }}
      maxZoom={MAX_ZOOM}
    >
      {/* Replace with your own custom tile */}
      <TileLayer url="http://localhost:1234/tiles/{z}/{x}/{y}.png" noWrap={true} bounds={bounds} maxZoom={MAX_ZOOM} />
    </MapContainer>
  );
};

export default Map;
