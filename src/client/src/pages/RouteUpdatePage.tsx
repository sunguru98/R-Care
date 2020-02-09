import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
  Fragment
} from 'react';
import { RouteInputRequest } from '../types/redux/sagas/route.type';
import { RouteComponentProps } from 'react-router-dom';
import { StopUser } from '../types/redux/reducers/routeReducer.type';
import { updateRoute, getSingleRoute } from '../redux/actions/routeActions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';

import Spinner from '../components/Spinner';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import StopBadge from '../components/StopBadge';
import Helmet from 'react-helmet';

interface RouteUpdatePageProps
  extends RouteComponentProps<{ routeId: string }>,
    ReduxProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const RouteUpdatePage: React.FC<RouteUpdatePageProps> = ({
  updateRoute,
  getSingleRoute,
  routeLoading,
  route,
  match
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [routeName, setRouteName] = useState<string>('');
  const [formState, setFormState] = useState<RouteInputRequest>({
    name: '',
    stops: [],
    routeType: '',
    direction: '',
    status: ''
  });

  useEffect(() => {
    setTimeout(() => getSingleRoute(match.params.routeId), 10);
  }, [getSingleRoute, match.params.routeId]);

  useEffect(() => {
    if (inputElement.current) {
      const autoComplete = new google.maps.places.Autocomplete(
        inputElement.current as HTMLInputElement
      );
      const listener = autoComplete.addListener('place_changed', () => {
        const { name, geometry } = autoComplete.getPlace();
        const {
          location: { lat, lng }
        } = geometry!;
        const stop: StopUser = {
          name,
          location: {
            type: 'Point',
            coordinates: [lng(), lat()]
          }
        };
        setFormState(prevState => ({
          ...prevState,
          stops: [...prevState.stops, stop]
        }));
        inputElement.current!.value = '';
      });
      return () => {
        listener.remove();
      };
    }
    return;
  });

  useEffect(() => {
    if (route) {
      const { name, routeType, status, stops, direction } = route;
      setRouteName(name);
      setFormState(() => ({ name, routeType, status, stops, direction }));
    }
  }, [route]);

  const { stops, name, status, routeType, direction } = formState;

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (stops.length < 2)
      return alert('You should have atleast two stops for creating a route.');
    else
      updateRoute(
        { name, routeType, direction, stops, status },
        match.params.routeId
      );
  };

  const handleDelete = (index: number): void => {
    setFormState({
      ...formState,
      stops: [...stops.slice(0, index), ...stops.slice(index + 1)]
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section className='page'>
      <Helmet>
        <title>R-Care Update Route</title>
        <meta name='description' content='Update Route page of R-Care' />
      </Helmet>
      {routeLoading ? (
        <Spinner />
      ) : (
        <form className='Form' onSubmit={handleSubmit}>
          <h1>{!routeLoading ? `Update route ${routeName}` : 'Please wait'}</h1>
          {routeLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              <InputField
                required
                name='name'
                type='text'
                placeholder='Route name'
                value={name}
                onChange={handleChange}
                isTextArea={false}
              />
              <div className='MapField'>
                <input
                  name='stop'
                  placeholder='Enter route stops'
                  ref={inputElement}
                />
                <ul
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start'
                  }}>
                  {stops.map((stop, index) => (
                    <StopBadge
                      key={index}
                      stopName={stop.name}
                      onClick={() => handleDelete(index)}
                    />
                  ))}
                </ul>
              </div>
              <SelectField
                className='SelectField'
                name='routeType'
                required
                value={routeType}
                onChange={handleChange}
                optionValues={[
                  {
                    value: '',
                    text: 'Please select a route type',
                    isDisabled: true
                  },
                  { value: 'ac', text: 'AC' },
                  { value: 'general', text: 'General' }
                ]}
              />
              <SelectField
                className='SelectField'
                name='direction'
                required
                value={direction}
                onChange={handleChange}
                optionValues={[
                  {
                    value: '',
                    text: 'Please select a route direction',
                    isDisabled: true
                  },
                  { value: 'up', text: 'Up' },
                  { value: 'down', text: 'Down' }
                ]}
              />
              <SelectField
                className='SelectField'
                name='status'
                required
                value={status}
                onChange={handleChange}
                optionValues={[
                  {
                    value: '',
                    text: 'Please select a route status',
                    isDisabled: true
                  },
                  { value: 'active', text: 'Active' },
                  { value: 'inactive', text: 'Inactive' }
                ]}
              />
            </Fragment>
          )}
          <input
            className={`Button ${routeLoading ? 'disabled' : ''}`}
            disabled={routeLoading}
            type='submit'
            value='Update Route'
          />
        </form>
      )}
    </section>
  );
};

const mapStateToProps = ({ route: { routeLoading, route } }: RootState) => ({
  routeLoading,
  route
});
const mapDispatchToProps = {
  updateRoute,
  getSingleRoute
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RouteUpdatePage);
