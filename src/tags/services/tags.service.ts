import { Injectable } from '@nestjs/common';
import { Tag } from '../tag.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { FindTagByIdDto } from '../dtos/find-tag-by-id.dto';
import { DeleteTagDto } from '../dtos/delete-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    // create the tag instance
    let newTag = this.tagsRepository.create(createTagDto);

    // save it
    newTag = await this.tagsRepository.save(newTag);
    return newTag;
  }

  async findAllTags(): Promise<Tag[]> {
    // fetch all the tags
    const tags = await this.tagsRepository.find();
    return tags;
  }

  async findTagById(findTagByIdDto: FindTagByIdDto): Promise<Tag | null> {
    // fetch the tag
    const tag = await this.tagsRepository.findOne({
      where: {
        id: findTagByIdDto.id,
      },
    });

    return tag;
  }

  async updateTag(updateTagDto: UpdateTagDto): Promise<UpdateResult | null> {
    // fetch the tag
    const tag = await this.findTagById({
      id: updateTagDto.id,
    });

    if (!tag) {
      return null;
    }

    // update the tag
    const result: UpdateResult = await this.tagsRepository.update(
      {
        id: updateTagDto.id,
      },
      {
        ...updateTagDto,
      },
    );

    return result;
  }

  async deleteTag(deleteTagDto: DeleteTagDto): Promise<DeleteResult | null> {
    // fetch the tag
    const tag = await this.findTagById({
      id: deleteTagDto.id,
    });

    if (!tag) {
      return null;
    }

    // delete the tag
    const result: DeleteResult = await this.tagsRepository.delete({
      id: deleteTagDto.id,
    });

    return result;
  }
}
