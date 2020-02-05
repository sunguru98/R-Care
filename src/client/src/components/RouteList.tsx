import React, { Fragment } from 'react';
import { Route } from '../types/redux/reducers/routeReducer.type';
import RouteListItem from '../components/RouteListItem';

interface RouteListProps {
  routes: Route[];
}
const RouteList: React.FC<RouteListProps> = ({ routes }) => {
  return (
    <Fragment>
      {routes.map(
        (route: Route): JSX.Element => (
          <RouteListItem key={route._id} routeObj={route} />
        )
      )}
    </Fragment>
  );
};

export default RouteList;
