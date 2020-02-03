import React, { useState } from 'react';
import { Map, GoogleApiWrapper, ProvidedProps } from 'google-maps-react';

interface MapComponentProps extends ProvidedProps {}

const MapComponent: React.FC<MapComponentProps> = ({ google }) => {
  const [location] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 22.4808921, lng: 80.6882728 });
  return <Map draggable={false} google={google} zoom={5} initialCenter={location} />  ;
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API!
})<MapComponentProps>(MapComponent);
