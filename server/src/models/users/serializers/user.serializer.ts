import { Expose } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';
import { ModelEntity } from 'src/common/serializers/model.serializer';

export class UserEntity extends ModelEntity implements IUser {
  id: string;
  realName: string;
  isAdmin: boolean;
  email: string;
  loginId: string;
  oAuthId: string;
  password: string;
  zipcode: string;
  address: string;
  addressDetail: string;
}
