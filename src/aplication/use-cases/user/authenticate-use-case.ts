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

    const token = await this.authService.createToken(userExists.id);
    console.log('token ---', token);

    return token;
  }
}
