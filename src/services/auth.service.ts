6;
7;
8;
9;
10;
11;
12;
13;
14;
15;
16;
17;
18;
19;
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(id: number) {
    return this.jwtService.sign({ id });
  }

  async checkToken(token: string) {
    try {
      return this.jwtService.verify(token.replace('Bearer ', ''));
    } catch (err) {
      return false;
    }
  }
}
