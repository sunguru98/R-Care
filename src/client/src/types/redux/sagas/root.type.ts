import { Stop } from '../reducers/routeReducer.type'
export interface RouteInputRequest {
  name: string,
  stops: Stop[],
  status: 'active' | 'inactive',
  routeType: 'ac' | 'general',
  direction: 'up' | 'down'
}