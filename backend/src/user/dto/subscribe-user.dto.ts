import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SubscribeUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
