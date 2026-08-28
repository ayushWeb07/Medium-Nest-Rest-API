import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import UsersService from './services/users.service';
import { SelectUserType } from '../database/types/user.type';
import { FindUserByIdDto } from './dtos/find-user-by-id.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers() {
    // call the find all users service
    const fetchedUsers: SelectUserType[] =
      await this.usersService.findAllUsers();

    return {
      success: true,
      message: 'Successfully fetched all the users',
      fetchedUsers,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Param() findUserByIdDto: FindUserByIdDto) {
    // call the find user by id service
    const fetchedUser: SelectUserType | null =
      await this.usersService.findUserById(findUserByIdDto);

    if (!fetchedUser) {
      throw new NotFoundException('Such user does not exist');
    }

    return {
      success: true,
      message: 'Successfully fetched the user',
      fetchedUser,
    };
  }
}
