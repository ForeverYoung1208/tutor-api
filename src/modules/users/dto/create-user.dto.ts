import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty({ enum: ['admin', 'user'], default: 'user' })
  @IsEnum(['admin', 'user'])
  role!: 'admin' | 'user';
}
