export interface messageInterface {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  };
  message: string;
  date: string;
  group: number;
}
