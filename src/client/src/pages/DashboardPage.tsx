import React, { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { ConnectedProps, connect } from 'react-redux';
import { fetchRoutes } from '../redux/actions/routeActions';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import RightSideContent from '../components/RightSideContent';
import LeftSideContent from '../components/LeftSideContent';
import Onboarding from '../components/Onboarding';

interface DashboardPageProps extends ReduxProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const DashboardPage: React.FC<DashboardPageProps> = ({
  routes,
  routeLoading,
  fetchRoutes
}) => {
  useEffect(() => {
    setTimeout(fetchRoutes, 100);
  }, [fetchRoutes]);

  return (
    <div style={{ display: 'flex' }}>
      {!routeLoading && routes ? (
        routes.length ? (
          <LeftSideContent routes={routes} />
        ) : (
          <Onboarding />
        )
      ) : (
        <Spinner />
      )}
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
