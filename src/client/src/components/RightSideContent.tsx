import React from 'react';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { connect, ConnectedProps } from 'react-redux';
import MapComponent from '../components/MapComponent';
import RouteDetail from '../components/RouteDetail';

type ReduxProps = ConnectedProps<typeof connector>;

const RightSideContent: React.FC<ReduxProps> = ({ route }) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
      <MapComponent route={route} />
      {route && <RouteDetail route={route} />}
    </div>
  );
};

const mapStateToProps = ({ route: { route } }: RootState) => ({ route });
const connector = connect(mapStateToProps);

export default connector(RightSideContent);
