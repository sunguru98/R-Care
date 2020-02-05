import React from 'react';
import { Link } from 'react-router-dom';
import RouteList from '../components/RouteList';
import { Route } from '../types/redux/reducers/routeReducer.type';

interface LeftSideComponentProps {
  routes: Route[];
}

const LeftSideContent: React.FC<LeftSideComponentProps> = ({ routes }) => {
  return (
    <div>
      <Link to='/route/create'>
        <button>Create new route</button>
      </Link>
      <Link to='/route/create/multi'>
        <button>Upload CSV File</button>
      </Link>
      <RouteList routes={routes} />
    </div>
  );
};

export default LeftSideContent;
