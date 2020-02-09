import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
  Fragment
} from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { RouteInputRequest } from '../types/redux/sagas/route.type';
import { StopUser } from '../types/redux/reducers/routeReducer.type';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { createRoute } from '../redux/actions/routeActions';

import Spinner from '../components/Spinner';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import StopBadge from '../components/StopBadge';
import Helmet from 'react-helmet';

interface RouteCreatePageProps extends ReduxProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const RouteCreatePage: React.FC<RouteCreatePageProps> = ({
  createRoute,
  routeLoading
}) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<
    RouteInputRequest & { stopName: string }
  >({
    name: '',
    stops: [],
    routeType: '',
    direction: '',
    status: '',
    stopName: ''
  });

  const { name, stops, routeType, direction, status } = formState;

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (stops.length < 2)
      return alert('You should have atleast two stops for creating a route.');
    else createRoute({ name, routeType, direction, stops, status });
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
        <title>R-Care Create Route</title>
        <meta name='description' content='Create page of R-Care' />
      </Helmet>
      <form className='Form' onSubmit={handleSubmit}>
        <h1>{!routeLoading ? 'Create a new route' : 'Please wait'}</h1>
        {routeLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <InputField
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
          value='Create Route'
        />
      </form>
    </section>
  );
};

const mapStateToProps = ({ route: { routeLoading, errors } }: RootState) => ({
  routeLoading,
  errors
});

const mapDispatchToProps = { createRoute: createRoute };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(RouteCreatePage);
