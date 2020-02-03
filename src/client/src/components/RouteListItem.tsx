import React from 'react';
import { Route } from '../types/redux/reducers/routeReducer.type';
import { connect, ConnectedProps } from 'react-redux';
import { getSingleRoute } from '../redux/actions/routeActions';

interface RouteListItemProps extends ReduxProps {
  route: Route;
}

type ReduxProps = ConnectedProps<typeof connector>;

const RouteListItem: React.FC<RouteListItemProps> = ({
  route: { name, status, _id },
  getSingleRoute
}) => {
  const handleClick = (): void => {
    getSingleRoute(_id);
  };

  return (
    <div onClick={handleClick}>
      <h3>Name: {name}</h3>
      <h4>Status: {status}</h4>
    </div>
  );
};

const mapDispatchToProps = { getSingleRoute };
const connector = connect(null, mapDispatchToProps);

export default connector(RouteListItem);
