import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './services/tags.service';
import { Tag } from './tag.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
