import { UserProps } from 'src/utils/types';
import { PrismaService } from '../prisma-service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUser {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) return null;

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createUser(data: UserProps) {
    try {
      const res = await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });

      if (!res) return null;
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
