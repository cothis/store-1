export interface IUser {
  loginId?: string;
  oAuthId?: string;
  isAdmin: boolean;
  password?: string;
  email: string;
  realName: string;
  zipcode: string;
  address: string;
  addressDetail: string;
}
