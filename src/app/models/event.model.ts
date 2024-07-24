export interface EventInterface {
  id: number;
  event_name: string;
  event_pic: string;
  event_time: string;
  event_date: string;
  event_desc: string;
  event_category: string;
}
export interface Coordinates {
  lon: number;
  lat: number;
}

export interface Location {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  coordinates: Coordinates;
}

export interface Images {
  thumbnail: string;
  base: string;
}

export interface Timing {
  begin: Date;
  end: Date;
}

export interface ApiEvent {
  uid: number;
  images: Images;
  description: string;
  longDescription: string;
  title: string;
  location: Location;
  tarifs: string | null;
  dateRange: string;
  image_credits: string | null;
  groups: Group[];
  first_timing: Timing;
  last_timing: Timing;
}

export interface EventResponse {
  size: number;
  events: ApiEvent[];
}

export interface Group {
  id: number;
  group_name: string;
  description: string;
  author: Author;
  messages: Message;
  time_meet: Date;
}
export interface Author {
  profileNickname: string;
  avatar: string;
}
export interface Message {
  text: string;
  author: Author;
}
