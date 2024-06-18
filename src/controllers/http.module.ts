import { Module } from '@nestjs/common';
import { AuthenticateController } from './users/authenticate-controller';
import { AuthUserUseCase } from 'src/aplication/use-cases/user/authenticate-use-case';
import { CreateUserController } from './users/create-user-controller';
import { CreateUserUseCase } from 'src/aplication/use-cases/user/create-user-use-case';
import { DataBaseModule } from 'src/model/prisma/database.module';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [DataBaseModule],
  controllers: [AuthenticateController, CreateUserController],
  providers: [AuthUserUseCase, CreateUserUseCase, AuthService],
})
export class HttpModule {}
