import { Module } from '@nestjs/common';
import { HttpModule } from './controllers/http.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.EXPIRES),
      },
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
