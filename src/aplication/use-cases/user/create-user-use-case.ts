import { Injectable } from '@nestjs/common';
import { PrismaUser } from 'src/model/prisma/user-repository/user';
import { UserProps } from 'src/utils/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaUser) {}

  async execute(user: UserProps) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    const res = await this.prisma.createUser(user);

    if (!res) return null;

    return true;
  }
}
