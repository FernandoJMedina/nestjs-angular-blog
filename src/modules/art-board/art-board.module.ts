import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtBoardController } from './controllers/art-board.controller';
import { ArtBoardEntity } from './models/art-board.entity';
import { ArtBoardService } from './services/art-board.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtBoardEntity])],
  controllers: [ArtBoardController],
  providers: [ArtBoardService],
})
export class ArtBoardModule {}
