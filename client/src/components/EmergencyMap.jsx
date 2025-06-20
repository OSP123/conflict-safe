import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function EmergencyMap({ shelters }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; // initialize once

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [ -118.25, 34.05 ], // default center
      zoom: 12,
    });

    // Add navigation controls
    mapRef.current.addControl(new maplibregl.NavigationControl());

    // Cache offline tiles via service worker (handled in sw.js)
  }, []);

  // Add shelter markers whenever shelters change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing markers
    map.eachLayer && map.eachLayer(layer => {
      if (layer.id && layer.id.startsWith('shelter-marker-')) {
        map.removeLayer(layer.id);
        map.removeSource(layer.id);
      }
    });

    shelters.forEach(s => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.background = 'rgba(255,0,0,0.7)';
      el.style.borderRadius = '50%';

      new maplibregl.Marker(el)
        .setLngLat([s.lon, s.lat])
        .setPopup(new maplibregl.Popup().setHTML(
          `<strong>${s.name}</strong><br/>Capacity: ${s.capacity}`
        ))
        .addTo(map);
    });
  }, [shelters]);

  return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
}
