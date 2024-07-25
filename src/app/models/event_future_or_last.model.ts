import { Images } from './event.model';

export interface EventFutureOrLast {
  future: EventFutureOrLast[];
  last: EventFutureOrLast[];
}

export interface EventFutureOrLast {
  uid: number;
  images: Images;
  description: string;
  title: string;
  date_range: string;
  group_id: number;
}
