import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { users } from '../../database/schemas';
import { InsertUserType, SelectUserType } from '../../database/types/user.type';
import { FindUserByIdDto } from '../dtos/find-user-by-id.dto';
import { eq } from 'drizzle-orm';
import { FindUserByEmailDto } from '../dtos/find-user-by-email.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<InsertUserType | null> {
    // insert the user into the db
    const [newUser] = await this.db
      .insert(users)
      .values(createUserDto)
      .returning();

    return newUser ?? null;
  }

  async findAllUsers(): Promise<SelectUserType[]> {
    // query users from the db
    const fetchedUsers = await this.db.select().from(users);
    return fetchedUsers;
  }

  async findUserById(
    findUserByIdDto: FindUserByIdDto,
  ): Promise<SelectUserType | null> {
    // query single user from the db
    const [fetchedUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, findUserByIdDto.id));

    return fetchedUser ?? null;
  }

  async findUserByEmail(
    findUserByEmailDto: FindUserByEmailDto,
  ): Promise<SelectUserType | null> {
    // query single user from the db
    const [fetchedUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, findUserByEmailDto.email));

    return fetchedUser ?? null;
  }
}

export default UsersService;
