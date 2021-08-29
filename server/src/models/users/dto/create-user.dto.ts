import { IsBoolean, IsByteLength, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  loginId?: string;

  @IsString()
  @IsOptional()
  oAuthId?: string;

  @IsBoolean()
  @IsOptional()
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
