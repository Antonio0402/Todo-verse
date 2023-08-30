export type User = {
  user_email: string;
  hashed_password: string;
  refresh_token?: string;
}