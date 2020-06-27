import { User } from './user.model';

export interface LoginResult {
  status: boolean;
  medium: string;
  platform: string;
  token: string;
  user: User;
  error: string;
  errorDescription: string;
}
