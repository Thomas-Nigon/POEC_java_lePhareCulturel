import { UserInterface } from './user.model';

export interface GroupInterface {
  id: number;
  name: string;
  description: string;
  time: string;
  members: UserInterface[];
}
