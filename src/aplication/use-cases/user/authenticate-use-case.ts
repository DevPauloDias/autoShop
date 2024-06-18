import { Injectable } from '@nestjs/common';
import { PrismaUser } from 'src/model/prisma/user-repository/user';
import * as bcrypt from 'bcrypt';

interface authProps {
  email: string;
  password: string;
}
@Injectable()
export class AuthUserUseCase {
  constructor(private readonly prisma: PrismaUser) {}
  async execute({ email, password }: authProps) {
    const userExists = await this.prisma.getUserByEmail(email);

    if (!userExists) return null;

    const isPasswordValid =
      bcrypt.hashSync(password, 10) === userExists.password;

    if (!isPasswordValid) return null;

    return true;
  }
}
