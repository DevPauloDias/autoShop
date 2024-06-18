import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/aplication/use-cases/user/create-user-use-case';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

type SchemaType = z.infer<typeof schema>;
@Controller()
export class User {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('user')
  async createUser(@Body() req: SchemaType) {
    const { email, name, password } = schema.parse(req);

    const res = await this.createUserUseCase.execute({ email, name, password });

    if (!res) return new BadRequestException();

    return HttpStatus.ACCEPTED;
  }
}
