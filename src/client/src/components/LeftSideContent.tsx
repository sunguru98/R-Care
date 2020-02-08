import React from 'react';
import { Link } from 'react-router-dom';
import RouteList from '../components/RouteList';
import {
  Route,
  ExtendedRoute
} from '../types/redux/reducers/routeReducer.type';
import { CSVLink } from 'react-csv';

interface LeftSideComponentProps {
  routes: Route[] | ExtendedRoute[];
}

const LeftSideContent: React.FC<LeftSideComponentProps> = ({ routes }) => {
  const data = (routes as ExtendedRoute[]).map(
    ({ routeType, name, stops, status, direction }, index) => ({
      'S.No': index + 1,
      Name: name,
      Direction: direction,
      Status: status,
      Stops: stops.reduce(
        (acc, stop, index) =>
          (acc += `${index > 0 ? ' & ' : ''}${stop.name} - (${
            stop.location.coordinates[0]
          }:${stop.location.coordinates[1]})`),
        ''
      ),
      'Route-Type': routeType
    })
  );
  
  return (
    <div>
      <Link to='/route/create'>
        <button>Create new route</button>
      </Link>
      <Link to='/route/create/multi'>
        <button>Upload CSV File</button>
      </Link>
      <RouteList routes={routes} />
      {routes.length ? (
        <CSVLink style={{ color: 'red' }} data={data} filename='routes.csv'>
          Download all Routes
        </CSVLink>
      ) : null}
    </div>
  );
};

export default LeftSideContent;
