import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from '../user/services/user.service';
import { UserModule } from '../user/user.module';

import { ArtBoardController } from './controllers/art-board.controller';
import { ArtBoardEntity } from './models/art-board.entity';
import { ArtBoardService } from './services/art-board.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtBoardEntity]), AuthModule, UserModule],
  controllers: [ArtBoardController],
  providers: [ArtBoardService],
})
export class ArtBoardModule {}
