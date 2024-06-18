import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthUserUseCase } from 'src/aplication/use-cases/user/authenticate-use-case';
import { z } from 'zod';

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

type SchemaType = z.infer<typeof schema>;

@Controller('auth')
export class AuthenticateController {
  constructor(private readonly authUserUseCase: AuthUserUseCase) {}
  @Post()
  async handle(@Body() body: SchemaType) {
    const { email, password } = schema.parse(body);

    const res = await this.authUserUseCase.execute({ email, password });

    if (!res) return null;

    return HttpStatus.ACCEPTED;
  }
}
