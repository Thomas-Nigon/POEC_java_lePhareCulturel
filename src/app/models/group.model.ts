import { UserInterface } from './user.model';

export interface GroupInterface {
  id: number;
  name: string;
  eventName: string;
  description: string;
  time: string;
  members: UserInterface[];
}
