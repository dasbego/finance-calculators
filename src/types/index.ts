export type TUser = {
  id: string;
  email: string;
  username: string;
  created_at: string;
  last_sign_in_at: string;
  phone: string;
  role: string;
};

export type TSession = {
  id: string;
  access_token: number;
  refresh_token: number;
  user: TUser;
  expires_at: number;
  expires_in: number;
  token_type: string;
};

export interface ISessionManager {
  createSession(session: TSession): TSession;
  getSession(id: string): TSession | undefined;
  deleteSession(): void;
}
