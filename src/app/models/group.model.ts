import { MessageInterface } from './message.model';
import { UserInterface } from './user.model';

export interface GroupInterface {
  id: number;
  group_name: string;
  event_name: string;
  author: UserInterface;
  description: string;
  time_meet: string;
  group_size: number;
  participants: UserInterface[];
  messages: MessageInterface[];
}
