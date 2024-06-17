import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class User {
  constructor() {}

  @Get('user')
  async GetUser() {}

  @Post('user')
  async createUser() {}
}
