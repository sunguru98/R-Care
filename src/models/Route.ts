import { Schema, model } from 'mongoose';
import { TRouteMethod, TRouteStatic } from '../types/route.types';
import { TStopMethod } from '../types/stop.types';

const stopSchema = new Schema<TStopMethod>({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

const routeSchema = new Schema<TRouteMethod>({
  name: { type: String, required: true },
  direction: {
    type: String,
    enum: ['up', 'down'],
    required: true
  },
  status: { type: Boolean, required: true },
  routeType: {
    type: String,
    enum: ['ac', 'general'],
    required: true
  },
  stops: {
    type: [stopSchema as Schema<TStopMethod>],
    required: true
  }
});

const Route = model<TRouteMethod, TRouteStatic>('route', routeSchema);
export default Route;
