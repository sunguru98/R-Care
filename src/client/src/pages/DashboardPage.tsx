import React, { useEffect } from 'react';
import Spinner from '../components/Spinner';
import RouteList from '../components/RouteList';
import { ConnectedProps, connect } from 'react-redux';
import { fetchRoutes } from '../redux/actions/routeActions';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import RightSideContent from '../components/RightSideContent';

interface DashboardPageProps extends ReduxProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const DashboardPage: React.FC<DashboardPageProps> = ({
  routes,
  routeLoading,
  fetchRoutes
}) => {
  useEffect(() => {
    setTimeout(fetchRoutes, 100);
  }, []);

  return routeLoading || !routes ? (
    <Spinner />
  ) : (
    <div style={{ display: 'flex' }}>
      <RouteList routes={routes} />
      <RightSideContent />
    </div>
  );
};

const mapStateToProps = ({ route: { routes, routeLoading } }: RootState) => ({
  routes,
  routeLoading
});

const mapDispatchToProps = {
  fetchRoutes
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(DashboardPage);
