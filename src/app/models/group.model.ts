import { UserProfileInterface } from './user-profile-interface.model';

export interface GroupInterface {
  id: number;
  name: string;
  description: string;
  time: string;
  members: UserProfileInterface[];
}
