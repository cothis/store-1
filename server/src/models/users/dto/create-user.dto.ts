import { IsBoolean, IsByteLength, IsString } from 'class-validator';

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
  @IsByteLength(0, 10)
  realName: string;

  @IsString()
  @IsByteLength(0, 5)
  zipCode: string;

  @IsString()
  address: string;

  @IsString()
  addressDetail: string;
}
