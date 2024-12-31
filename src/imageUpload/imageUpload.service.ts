import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ImageUploadService {
  constructor() {}

  async getAllUploadsFiles() {
    return fs.readdirSync('imageUploads');
  }

  async deleteFile(fileName: string) {
    const pathToFile = 'imageUploads/' + fileName;
    if (fs.existsSync(pathToFile)) {
      fs.unlinkSync(pathToFile);
    }
    return 'ok';
  }
}
