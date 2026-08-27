import { IsDefined, IsInt } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsDefined()
  @IsInt()
  id: number;
}
