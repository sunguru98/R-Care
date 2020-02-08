import React from 'react';
import { Link } from 'react-router-dom';
import RouteList from '../components/RouteList';
import {
  Route,
  ExtendedRoute
} from '../types/redux/reducers/routeReducer.type';
import { CSVLink } from 'react-csv';
import '../styles/components/LeftSideContent.scss';

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
    <div className='LeftSideContent'>
      <div className='LeftSideContent__buttons'>
        <Link to='/route/create'>
          <button className='Button'>Create new route</button>
        </Link>
        <Link to='/route/create/multi'>
          <button className='Button yellow'>Upload CSV File</button>
        </Link>
      </div>
      <RouteList routes={routes} />
      {routes.length ? (
        <CSVLink
          className='Export Button red'
          data={data}
          filename='routes.csv'>
          Export all Routes
        </CSVLink>
      ) : null}
    </div>
  );
};

export default LeftSideContent;
