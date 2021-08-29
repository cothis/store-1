import { IsByteLength, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsByteLength(0, 255)
  email: string;

  @IsString()
  @Length(0, 10)
  realName: string;

  @IsString()
  @IsByteLength(0, 60)
  @IsOptional()
  password: string;

  @IsString()
  @IsByteLength(0, 5)
  @IsOptional()
  zipcode: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  addressDetail: string;
}
