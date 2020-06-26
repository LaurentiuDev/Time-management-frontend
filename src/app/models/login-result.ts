import { User } from './user.model';

export interface LoginResult {
  status: boolean;
  medium: string;
  platform: string;
  user: User;
  error: string;
  errorDescription: string;
  token: string;
}
