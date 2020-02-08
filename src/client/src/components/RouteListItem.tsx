import React from 'react';
import { Route } from '../types/redux/reducers/routeReducer.type';
import { connect, ConnectedProps } from 'react-redux';
import { getSingleRoute, deleteRoute } from '../redux/actions/routeActions';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import '../styles/components/RouteListItem.scss';
import { ReactComponent as EditIcon } from '../edit.svg';
import { ReactComponent as DeleteIcon } from '../trash.svg';

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
    <div className='RouteListItem' onClick={handleClick}>
      <div className='RouteListItem__info'>
        <h3>Name: {name}</h3>
        <h4>Status: {status}</h4>
      </div>
      <div className='RouteListItem__buttons'>
        <span className='RouteListItem__update' onClick={handleUpdate}>
          <EditIcon />
        </span>
        <span className='RouteListItem__delete' onClick={handleDelete}>
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
};

const mapDispatchToProps = { getSingleRoute, deleteRoute };
const connector = connect(null, mapDispatchToProps);

export default withRouter(connector(RouteListItem));
