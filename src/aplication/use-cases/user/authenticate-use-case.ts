import { Injectable } from '@nestjs/common';
import { PrismaUser } from 'src/model/prisma/user-repository/user';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/services/auth.service';

interface authProps {
  email: string;
  password: string;
}
@Injectable()
export class AuthUserUseCase {
  constructor(
    private readonly prisma: PrismaUser,
    private readonly authService: AuthService,
  ) {}
  async execute({ email, password }: authProps) {
    const userExists = await this.prisma.getUserByEmail(email);

    if (!userExists) return null;

    const isPasswordValid = bcrypt.compareSync(password, userExists.password);

    if (!isPasswordValid) return null;

    const payload = {
      name: userExists.name,
      sub: userExists.id,
    };

    const token = await this.authService.createToken(payload);

    return { token };
  }
}
