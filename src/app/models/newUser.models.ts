export interface NewUser {
  username: string;
  credientials: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}
