import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { users } from '../../database/schemas';
import { SelectUserType } from '../../database/types/user.type';
import { FindUserByIdDto } from '../dtos/find-user-by-id.dto';
import { eq } from 'drizzle-orm';
import { CheckEmailExistsDto } from '../dtos/check-email-exists.dto';

@Injectable()
class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAllUsers(): Promise<SelectUserType[]> {
    const fetchedUsers = await this.db.select().from(users);
    return fetchedUsers;
  }

  async findUserById(
    findUserByIdDto: FindUserByIdDto,
  ): Promise<SelectUserType> {
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
