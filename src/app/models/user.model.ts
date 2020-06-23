import { ModelBase } from './model.base';

export class User extends ModelBase {
  public firstName: string;
  public lastName: string;
  public email: string;
}