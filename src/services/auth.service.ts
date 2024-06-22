import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface payloadProps {
  name: string;
  sub: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  private secretJWT = process.env.SECRET;

  async createToken(payload: payloadProps) {
    return await this.jwtService.signAsync(payload, { secret: this.secretJWT });
  }

  async checkToken(token: string) {
    try {
      return this.jwtService.verify(token.replace('Bearer ', ''), {
        secret: this.secretJWT,
      });
    } catch (err) {
      return false;
    }
  }
}
