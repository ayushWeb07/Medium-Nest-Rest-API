import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { FindTagByIdDto } from './dtos/find-tag-by-id.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';
import { DeleteTagDto } from './dtos/delete-tag.dto';
import { InsertTagType, SelectTagType } from '../database/types/tag.type';

@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTag(@Body() createTagDto: CreateTagDto) {
    // call the create tag service
    const newTag: InsertTagType | null =
      await this.tagsService.createTag(createTagDto);

    if (!newTag) {
      throw new InternalServerErrorException(
        'Something went wrong while creating the tag',
      );
    }

    return {
      success: true,
      message: 'Successfully created a new tag',
      newTag,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllTags() {
    // call the find all tags service
    const fetchedTags: SelectTagType[] = await this.tagsService.findAllTags();

    return {
      success: true,
      message: 'Successfully fetched all the tags',
      fetchedTags,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findTagById(@Param() findTagByIdDto: FindTagByIdDto) {
    // call the find tag by id service
    const fetchedTag: SelectTagType | null =
      await this.tagsService.findTagById(findTagByIdDto);

    if (!fetchedTag) {
      throw new NotFoundException('Such tag does not exist');
    }

    return {
      success: true,
      message: 'Successfully fetched the tag',
      fetchedTag,
    };
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateTag(@Body() updateTagDto: UpdateTagDto) {
    // call the update tag service
    await this.tagsService.updateTag(updateTagDto);

    return {
      success: true,
      message: 'Successfully updated the tag',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTag(@Param() deleteTagDto: DeleteTagDto) {
    // call the delete tag service
    await this.tagsService.deleteTag(deleteTagDto);

    return {
      success: true,
      message: 'Successfully deleted the tag',
    };
  }
}
