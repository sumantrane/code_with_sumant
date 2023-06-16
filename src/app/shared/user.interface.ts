export interface User {
  email: string;
  password: string;
}

export interface userResponse {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  __v: string;
  token: string;
}
