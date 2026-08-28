import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CheckEmailExistsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;
}
