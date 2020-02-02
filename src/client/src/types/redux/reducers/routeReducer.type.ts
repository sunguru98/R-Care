type Longitude = number;
type Latitude = number;

interface Stop {
  name: string;
  location: {
    type: 'Point';
    coordinates: [Longitude, Latitude];
  };
}

export interface Route {
  _id: string;
  name: string;
  user: string;
  status: 'active' | 'inactive';
}

export interface ExtendedRoute extends Route {
  stops: Stop[];
  direction: 'up' | 'down';
  routeType: 'ac' | 'general';
}

export interface RouteState {
  routes: Route[] | null;
  route: ExtendedRoute | null;
  routeLoading: boolean;
}
