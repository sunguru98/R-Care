import React from 'react';
import { Route } from '../types/redux/reducers/routeReducer.type';
import { connect, ConnectedProps } from 'react-redux';
import { getSingleRoute, deleteRoute } from '../redux/actions/routeActions';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

interface RouteListItemProps extends ReduxProps, RouteComponentProps<{}> {
  routeObj: Route;
}

type ReduxProps = ConnectedProps<typeof connector>;

const RouteListItem: React.FC<RouteListItemProps> = ({
  routeObj: { name, status, _id },
  history,
  getSingleRoute,
  deleteRoute
}) => {
  const handleClick = (): void => {
    getSingleRoute(_id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    if (window.confirm('Confirm delete route?')) deleteRoute(_id);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    history.push(`/route/edit/${_id}`);
  };

  return (
    <div onClick={handleClick}>
      <span onClick={handleUpdate}>Update</span>
      <span onClick={handleDelete}>Delete</span>
      <h3>Name: {name}</h3>
      <h4>Status: {status}</h4>
    </div>
  );
};

const mapDispatchToProps = { getSingleRoute, deleteRoute };
const connector = connect(null, mapDispatchToProps);

export default withRouter(connector(RouteListItem));
