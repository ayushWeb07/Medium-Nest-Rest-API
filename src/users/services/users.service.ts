import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { users } from '../../database/schemas';
import { InsertUserType, SelectUserType } from '../../database/types/user.type';
import { FindUserByIdDto } from '../dtos/find-user-by-id.dto';
import { eq } from 'drizzle-orm';
import { CheckEmailExistsDto } from '../dtos/check-email-exists.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<InsertUserType> {
    // insert the user into the db
    const [newUser] = await this.db
      .insert(users)
      .values(createUserDto)
      .returning();

    if (!newUser) {
      throw new InternalServerErrorException(
        'Something went wrong while creating the user',
      );
    }

    return newUser;
  }

  async findAllUsers(): Promise<SelectUserType[]> {
    // query users from the db
    const fetchedUsers = await this.db.select().from(users);
    return fetchedUsers;
  }

  async findUserById(
    findUserByIdDto: FindUserByIdDto,
  ): Promise<SelectUserType> {
    // query single user from the db
    const [fetchedUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, findUserByIdDto.id));

    if (!fetchedUser) {
      throw new NotFoundException('Such a user does not exist');
    }

    return fetchedUser;
  }

  async checkEmailExists(
    checkEmailExistsDto: CheckEmailExistsDto,
  ): Promise<boolean> {
    // query single user from the db
    const [fetchedUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, checkEmailExistsDto.email));

    if (!fetchedUser) {
      return false;
    }

    return true;
  }
}

export default UsersService;
