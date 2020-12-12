import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtBoardEntity } from '../models/art-board.entity';
import { ArtBoard } from '../models/art-board.interface';

@Injectable()
export class ArtBoardService {
  constructor(
    @InjectRepository(ArtBoardEntity)
    private readonly artboardRepository: Repository<ArtBoardEntity>,
  ) {}

  async getBoards() {
    return await this.artboardRepository.find();
  }

  uploadBoards(boards: ArtBoard[]) {
    return this.artboardRepository.save(boards);
  }
}
