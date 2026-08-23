import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindTagByIdDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
