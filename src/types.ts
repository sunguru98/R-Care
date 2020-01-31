export interface UserRegisterRequest {
  name: string,
  password: string,
  email: string
}

export interface UserLoginRequest {
  email: string,
  password: string
}

export interface UserSuccess {
  name: string,
  email: string,
  accessToken: string,
  _id: string
}

export interface Stop {
  _id: string,
  name: string,
  latitude: number,
  longitude: number
}

export interface Route {
  name: string,
  direction: 'up' | 'down',
  _id: string,
  status: 'active' | 'inactive',
  stops: Stop[],
  routeType: 'AC' | 'General'
}

export interface JWT_PAYLOAD {
  _id: string,
  email: string
}