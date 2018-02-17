import { Bike } from './bike';

export class User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  bikes: Array<Bike>;
}
