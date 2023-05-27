// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Pet, LineStatus, Reservation } = initSchema(schema);

export {
  Pet,
  LineStatus,
  Reservation
};