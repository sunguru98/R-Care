import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent
} from 'react';
import { GoogleApiWrapper, ProvidedProps } from 'google-maps-react';
import { RouteInputRequest } from '../types/redux/sagas/route.type';
import { RouteComponentProps } from 'react-router-dom';
import { StopUser } from '../types/redux/reducers/routeReducer.type';
import { updateRoute, getSingleRoute } from '../redux/actions/routeActions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';

import Spinner from '../components/Spinner';
import InputField from '../components/InputField';

interface RouteUpdatePageProps
  extends RouteComponentProps<{ routeId: string }>,
    ReduxProps,
    ProvidedProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const RouteUpdatePage: React.FC<RouteUpdatePageProps> = ({
  updateRoute,
  getSingleRoute,
  routeLoading,
  route,
  match
}) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<RouteInputRequest>({
    name: '',
    stops: [],
    routeType: '',
    direction: '',
    status: ''
  });

  useEffect(() => {
    getSingleRoute(match.params.routeId);
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
  });

  useEffect(() => {
    if (route) {
      const { name, routeType, status, stops, direction } = route;
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
    <section>
      {routeLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <InputField
            required
            name='name'
            type='text'
            placeholder='Route name'
            value={name}
            onChange={handleChange}
            isTextArea={false}
          />
          <select
            name='routeType'
            required
            value={routeType}
            onChange={handleChange}>
            <option value='' disabled>
              Please select a route type
            </option>
            <option value='ac'>AC</option>
            <option value='general'>General</option>
          </select>
          <select
            name='direction'
            required
            value={direction}
            onChange={handleChange}>
            <option value='' disabled>
              Please select a Route direction
            </option>
            <option value='up'>Up</option>
            <option value='down'>Down</option>
          </select>
          <select name='status' value={status} onChange={handleChange}>
            <option value='' disabled>
              Please select a Route status
            </option>
            <option value='active'>Active</option>
            <option value='general'>Inactive</option>
          </select>
          <div>
            <input name='stop' ref={inputElement} />
            <ul>
              {stops.map((stop, index) => (
                <li key={index}>
                  <span onClick={() => handleDelete(index)}>Delete</span>
                  {stop.name}
                </li>
              ))}
            </ul>
          </div>
          <input type='submit' value='Update Route' />
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAINrQuXpXkbUE6EHL8ZWJDvxci2wDVjWw'
})(connector(RouteUpdatePage));
