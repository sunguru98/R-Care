import { Document, Model } from 'mongoose';

export interface TStop extends Document {
  name: string;
  location: {
    type: 'Point';
    coordinates: [Longitude, Latitude];
  };
}

export interface TStopMethod extends TStop {}
export interface TStopStatic extends Model<TStopMethod> {}

type Longitude = number;
type Latitude = number;
