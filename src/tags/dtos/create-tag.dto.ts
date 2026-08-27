import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(25)
  @MaxLength(300)
  description: string;
}
