import { Request } from 'express';
import { User } from '../types/user';

export interface IGetUserAuthInfoRequest extends Request {
  user?: User;
}
