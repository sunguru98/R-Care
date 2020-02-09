/// <reference path='../../node_modules/@types/googlemaps/index.d.ts' />
import React, { useState, useEffect, useRef } from 'react';
import { ExtendedRoute } from '../types/redux/reducers/routeReducer.type';

interface MapComponentProps {
  route: ExtendedRoute | null;
}

interface LocationState {
  map: google.maps.Map<HTMLDivElement> | null;
  coordinates: google.maps.LatLngLiteral[];
  polyline: google.maps.Polyline | null;
  markers: google.maps.Marker[];
}

const MapComponent: React.FC<MapComponentProps> = ({ route }) => {
  const [locationDetails, setLocationDetails] = useState<LocationState>({
    map: null,
    coordinates: [],
    polyline: null,
    markers: []
  });

  const { coordinates, map, polyline, markers } = locationDetails;
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLocationDetails(prevState => ({
      ...prevState,
      map: new google.maps.Map<HTMLDivElement>(mapRef.current!, {
        center: new google.maps.LatLng(22.4808921, 79.6882728),
        zoom: 5,
        gestureHandling: 'cooperative'
      })
    }));
  }, []);

  useEffect(() => {
    if (map && coordinates.length) {
      polyline && polyline.setMap(null);
      markers && markers.forEach(m => m.setMap(null));
      setLocationDetails(prevState => ({
        ...prevState,
        polyline: new google.maps.Polyline({
          path: coordinates,
          geodesic: true,
          strokeColor: '#669DF6',
          strokeOpacity: 1,
          strokeWeight: 5
        }),
        markers: coordinates.map(c => new google.maps.Marker({ position: c }))
      }));
    }
  }, [coordinates, map]);

  useEffect(() => {
    if (polyline) {
      polyline.setMap(map);
      const bounds = new google.maps.LatLngBounds();
      polyline
        .getPath()
        .getArray()
        .forEach(p => bounds.extend(p));
      markers.forEach(m => {
        m.setMap(map);
        m.addListener('click', marker => {
          const { lat, lng } = marker.latLng as google.maps.LatLng;
          map?.setCenter(new google.maps.LatLng(lat(), lng()));
          map?.setZoom(17);
        });
      });
      map!.fitBounds(bounds);
    }
  }, [polyline]);

  useEffect(() => {
    if (route) {
      setLocationDetails(prevState => {
        return {
          ...prevState,
          coordinates: route.stops.map(
            ({ location: { coordinates } }): google.maps.LatLngLiteral => ({
              lat: coordinates[1],
              lng: coordinates[0]
            })
          )
        };
      });
    }
  }, [route]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
};

export default MapComponent;
