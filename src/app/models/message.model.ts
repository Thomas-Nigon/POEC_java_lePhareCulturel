export interface messageInterface {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    picture: string;
  };
  message: string;
  date: string;
  group: number;
}
