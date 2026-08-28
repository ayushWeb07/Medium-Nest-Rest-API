import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class GenerateTokensDto {
  @IsInt()
  @IsDefined()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  userEmail: string;
}
