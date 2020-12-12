import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/config';
import { DatabaseConfig } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { ArtBoardModule } from './modules/art-board/art-board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // useFactory: (configService: ConfigService) =>
      //   configService.get('database'),
      // inject: [ConfigService],
      useClass: DatabaseConfig,
    }),
    UserModule,
    ArtBoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
