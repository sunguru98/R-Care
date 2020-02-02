import { Schema } from 'mongoose';

export interface Stop {
  name: string;
  location: { type: string; coordinates: [number, number] };
}

export interface RouteBase {
  name: string;
  direction: string;
  status: string;
  routeType: string;
}

export interface RouteInput extends RouteBase {
  stops: string;
}

export interface RouteOutput extends RouteBase {
  stops: Stop[];
  user: Schema.Types.ObjectId;
}

export interface RouteError {
  error: string;
  rowNumber: number;
  prop: string;
  recievedValue: string;
}