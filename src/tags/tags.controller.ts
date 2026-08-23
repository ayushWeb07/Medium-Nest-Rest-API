import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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

@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTag(@Body() createTagDto: CreateTagDto) {
    // create the tag
    const tag = await this.tagsService.createTag(createTagDto);

    return {
      message: 'A new tag was successfully created',
      tag,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllTags() {
    // fetch all the tags
    const tags = await this.tagsService.findAllTags();

    return {
      message: 'All the tags were successfully fetched',
      tags,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findTagById(@Param() findTagByIdDto: FindTagByIdDto) {
    // fetch the tag
    const tag = await this.tagsService.findTagById(findTagByIdDto);

    if (!tag) {
      throw new NotFoundException('Such a tag does not exist');
    }

    return {
      message: 'The required tag was successfully fetched',
      tag,
    };
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateTag(@Body() updateTagDto: UpdateTagDto) {
    // update the tag
    const tagUpdateResult = await this.tagsService.updateTag(updateTagDto);

    if (!tagUpdateResult) {
      throw new NotFoundException('Such a tag does not exist');
    }

    return {
      message: 'The tag was successfully updated',
    };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteTag(@Param() deleteTagDto: DeleteTagDto) {
    // delete the tag
    const tagDeleteResult = await this.tagsService.deleteTag(deleteTagDto);

    if (!tagDeleteResult) {
      throw new NotFoundException('Such a tag does not exist');
    }

    return {
      message: 'The tag was successfully deleted',
    };
  }
}
