import { User } from '../../api/users/types/user';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
