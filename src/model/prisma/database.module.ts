import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service';
import { PrismaUser } from './user-repository/user';

@Module({
  providers: [PrismaService, PrismaUser],
  exports: [PrismaService, PrismaUser],
})
export class DataBaseModule {}
