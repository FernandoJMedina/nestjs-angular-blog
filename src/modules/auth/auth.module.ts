import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigService } from 'src/config/auth.config';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: async (configService: ConfigService) => ({
      //   secret: process.env.SECRET,
      // }),
      useClass: AuthConfigService,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
