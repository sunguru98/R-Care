import React, { useEffect, Fragment } from 'react';
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
    setTimeout(fetchRoutes, 10);
  }, [fetchRoutes]);

  return (
    <section className='page horizontal'>
      {!routeLoading && routes ? (
        routes.length ? (
          <Fragment>
            <LeftSideContent routes={routes} />
            <RightSideContent />
          </Fragment>
        ) : (
          <Onboarding />
        )
      ) : (
        <Spinner />
      )}
    </section>
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
