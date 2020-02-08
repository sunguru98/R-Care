import React from 'react';
import { Route } from '../types/redux/reducers/routeReducer.type';
import RouteListItem from '../components/RouteListItem';

interface RouteListProps {
  routes: Route[];
}
const RouteList: React.FC<RouteListProps> = ({ routes }) => {
  return (
    <div style={{ marginTop: '2rem', overflow: 'scroll' }}>
      {routes.map(
        (route: Route): JSX.Element => (
          <RouteListItem key={route._id} routeObj={route} />
        )
      )}
    </div>
  );
};

export default RouteList;
