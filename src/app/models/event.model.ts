/* 
export interface EventPageInterface {
  size: number;
  total_pages: number;
  total_elements: number;
  events: {
    id: number;
    uid: number;
    images: {
      thumbnail: string;
      base: string;
    };
    description: string;
    longDescription: string;
    title: string;
    location: {
      name: string;
      address: string;
      postalCode: string;
      city: string;
      coordinates: {
        lon: number;
        lat: number;
      };
    };
    tarifs: null;
    dateRange: string;
    image_credits: null;
    first_timing: {
      begin: Date;
      end: Date;
    };
    last_timing: {
      begin: Date;
      end: Date;
    };
  };
}

 */
// event.model.ts

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
  first_timing: Timing;
  last_timing: Timing;
}

export interface EventResponse {
  size: number;
  events: ApiEvent[];
}
