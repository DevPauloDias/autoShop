import { Module } from '@nestjs/common';
import { HttpModule } from './controllers/http.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.EXPIRES),
      },
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtService],
})
export class AppModule {}
