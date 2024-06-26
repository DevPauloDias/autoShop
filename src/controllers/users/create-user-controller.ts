import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/aplication/use-cases/user/create-user-use-case';
import { AuthGuard } from 'src/services/guard/auth.guard';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

type SchemaType = z.infer<typeof schema>;
@Controller()
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @UseGuards(AuthGuard)
  @Post('user')
  async createUser(@Body() req: SchemaType) {
    const { email, name, password } = schema.parse(req);

    const res = await this.createUserUseCase.execute({ email, name, password });

    if (!res) return new BadRequestException();
  }
}
