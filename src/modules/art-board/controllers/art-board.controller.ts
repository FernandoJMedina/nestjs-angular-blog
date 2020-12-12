import {
  Controller,
  ForbiddenException,
  Get,
  NotAcceptableException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';
import { ArtBoardService } from '../services/art-board.service';
import { v4 as uuid } from 'uuid';
import * as readXlsxFile from 'read-excel-file/node';
import { ArtBoard } from '../models/art-board.interface';

@Controller('art-board')
export class ArtBoardController {
  constructor(private artboardService: ArtBoardService) {}

  @Get()
  getBoards() {
    return this.artboardService.getBoards();
  }

  // @UseGuards(JwtAuthGuard)
  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/boards',
        filename: (req, file, cb) => {
          const filename =
            parse(file.originalname).name.replace(/\s/g, '') + uuid();
          const extension = parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.includes('excel') ||
          file.mimetype.includes('spreadsheetml')
        ) {
          cb(null, true);
        } else {
          cb(
            new NotAcceptableException('Please upload only excel file.'),
            false,
          );
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file) {
    try {
      const data = await readXlsxFile(file.path);
      data.shift();
      const boards: ArtBoard[] = [];
      data.forEach((row: ArtBoard) => {
        const board: ArtBoard = {
          name: row[0],
          size: row[1],
          url: row[2],
        };

        boards.push(board);
      });
      return this.artboardService.uploadBoards(boards);
    } catch (error) {
      console.error({ error });
    }
    return;
  }
}
