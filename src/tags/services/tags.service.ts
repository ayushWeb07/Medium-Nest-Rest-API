import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { FindTagByIdDto } from '../dtos/find-tag-by-id.dto';
import { DeleteTagDto } from '../dtos/delete-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';
import { DRIZZLE_PROVIDER } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { tags } from '../../database/schemas';
import { InsertTagType, SelectTagType } from '../../database/types/tag.type';
import { eq } from 'drizzle-orm';

@Injectable()
export class TagsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<InsertTagType | null> {
    // insert the tag into the db
    const [newTag] = await this.db
      .insert(tags)
      .values(createTagDto)
      .returning();

    return newTag ?? null;
  }

  async findAllTags(): Promise<SelectTagType[]> {
    // fetch all the tags from db
    const fetchedTags = await this.db.select().from(tags);
    return fetchedTags;
  }

  async findTagById(
    findTagByIdDto: FindTagByIdDto,
  ): Promise<SelectTagType | null> {
    // fetch the tag from db
    const [fetchedTag] = await this.db
      .select()
      .from(tags)
      .where(eq(tags.id, findTagByIdDto.id));

    return fetchedTag ?? null;
  }

  async updateTag(updateTagDto: UpdateTagDto): Promise<void> {
    // check if tag does exist
    const existingTag: SelectTagType | null = await this.findTagById({
      id: updateTagDto.id,
    });

    if (!existingTag) {
      throw new NotFoundException('Such tag does not exist');
    }

    // update the tag in the db
    await this.db
      .update(tags)
      .set(updateTagDto)
      .where(eq(tags.id, updateTagDto.id));
  }

  async deleteTag(deleteTagDto: DeleteTagDto): Promise<void> {
    // check if tag does exist
    const existingTag: SelectTagType | null = await this.findTagById({
      id: deleteTagDto.id,
    });

    if (!existingTag) {
      throw new NotFoundException('Such tag does not exist');
    }

    // delete the tag from the db
    await this.db.delete(tags).where(eq(tags.id, deleteTagDto.id));
  }
}
