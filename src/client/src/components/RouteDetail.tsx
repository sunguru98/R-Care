import React from 'react';
import { ExtendedRoute } from '../types/redux/reducers/routeReducer.type';

interface RouteDetailProps {
  route: ExtendedRoute;
}

const RouteDetail: React.FC<RouteDetailProps> = ({
  route: { name, status, routeType, direction, stops }
}) => {
  return (
    <div>
      <h3>Name: {name}</h3>
      <h4>Status: {status}</h4>
      <p>Route Type: {routeType}</p>
      <p>Direction: {direction}</p>
      <span>
        Stops:{' '}
        <ul>
          {stops.map(s => (
            <li key={s._id}>{s.name}</li>
          ))}
        </ul>
      </span>
    </div>
  );
};

export default RouteDetail;
