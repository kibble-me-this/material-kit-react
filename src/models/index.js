// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reservation } = initSchema(schema);

export {
  Reservation
};