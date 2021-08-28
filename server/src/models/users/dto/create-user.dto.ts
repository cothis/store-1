import { IsBoolean, IsByteLength, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  loginId?: string;

  @IsString()
  oAuthId?: string;

  @IsBoolean()
  isAdmin?: boolean;

  @IsString()
  @IsByteLength(0, 60)
  password: string;

  @IsString()
  @IsByteLength(0, 255)
  email: string;

  @IsString()
  @Length(0, 10)
  realName: string;

  @IsString()
  @IsByteLength(0, 5)
  zipcode: string;

  @IsString()
  address: string;

  @IsString()
  addressDetail: string;
}
