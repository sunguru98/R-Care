import React from 'react';
import { ExtendedRoute } from '../types/redux/reducers/routeReducer.type';
import '../styles/components/RouteDetail.scss';

interface RouteDetailProps {
  route: ExtendedRoute;
}

const RouteDetail: React.FC<RouteDetailProps> = ({
  route: { name, status, routeType, direction, stops }
}) => {
  return (
    <div className='RouteDetail'>
      <h3>
        {name} ({status})
      </h3>
      <p>Route: {routeType}</p>
      <p>Direction: {direction}</p>
      <span>
        Stops:{' '}
        <ul style={{ width: '100%' }}>
          {stops.map(s => (
            <li className='MiniBadge' key={s._id}>
              {s.name}
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
};

export default RouteDetail;
