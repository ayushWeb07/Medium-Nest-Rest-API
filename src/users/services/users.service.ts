import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}
}
