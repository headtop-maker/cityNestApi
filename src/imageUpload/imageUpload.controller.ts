import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageUploadService } from './imageUpload.service';

@ApiBearerAuth()
@ApiTags('Загрузка изображений')
@Controller('imageUpload')
export class ImageUploadController {
  @Post('file')
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './imageUploads',
        filename: (_, file, callback) => {
          const currentFile = decodeURIComponent(file.originalname);
          const name = currentFile.split('.')[0];
          const ext = currentFile.split('.')[1];
          callback(null, `${name}.${ext}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(file);
  }

  constructor(private imageUploadService: ImageUploadService) {}

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'imageUploads' });
  }

  @Get()
  seeAllUploadedFile() {
    return this.imageUploadService.getAllUploadsFiles();
  }
}
