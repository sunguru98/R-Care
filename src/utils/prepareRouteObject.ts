import { TUser } from '../types/user.types';
import { RouteError, RouteInput, RouteOutput, Stop } from '../types/util.types';

const checkForErrors = (
  {
    status,
    direction,
    routeType
  }: {
    status: string;
    direction: string;
    routeType: string;
  },
  rowNumber: number
): RouteError[] => {
  let errors: RouteError[] = [];
  if (status !== 'active' && status !== 'inactive')
    errors.push({
      error: `Status should be either active or inactive`,
      prop: 'status',
      rowNumber,
      recievedValue: status
    });

  if (direction !== 'up' && direction !== 'down')
    errors.push({
      error: `Direction should be either up or down`,
      prop: 'direction',
      rowNumber,
      recievedValue: direction
    });

  if (routeType !== 'ac' && routeType !== 'general')
    errors.push({
      error: `Route type should be either ac or general`,
      prop: 'route-type',
      rowNumber,
      recievedValue: routeType
    });

  return errors;
};

const prepareRouteObject = (
  { name, status, stops, direction, routeType }: RouteInput,
  index: number,
  user: TUser
): RouteOutput => {
  const stopsArr = parseStopsString(stops);
  const errors = checkForErrors({ status, direction, routeType }, index + 1);
  if (errors.length) throw new Error(`Custom: ${JSON.stringify(errors)}`);
  return {
    name,
    status,
    user: user._id,
    stops: stopsArr,
    direction,
    routeType
  };
};

const parseStopsString = (stops: string): Stop[] => {
  stops = stops.replace(/"|'/g, '');
  return stops.split('&').map(stop => {
    // Splitting the name and coords first
    const [name, coords] = stop.trim().split('-');
    // Trimming the name for extra white space
    const trimmedName = name.trim();
    // Extracting the location.
    const [longitude, latitude] = coords
      .trim()
      .replace('(', '')
      .replace(')', '')
      .split(':');
    return {
      name: trimmedName.split('')[0].toUpperCase() + trimmedName.slice(1),
      location: {
        type: 'Point',
        coordinates: [parseInt(longitude), parseInt(latitude)]
      }
    };
  });
};

export default (routes: string[], user: TUser): RouteOutput[] => {
  const parsedRoutes = [];
  for (let index = 0; index < routes.length; index++) {
    const [name, direction, status, stops, routeType] = routes[index]
      .split(',')
      .slice(1);

    if (routes[index].length < 5) throw new Error('CSV Badly Formatted');
    parsedRoutes.push(
      prepareRouteObject(
        {
          name,
          direction,
          status,
          stops,
          routeType
        },
        index,
        user
      )
    );
  }
  return parsedRoutes;
};
