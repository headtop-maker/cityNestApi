import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor() {}
  async getAllUploadsFiles() {
    return fs.readdirSync('uploads');
  }

  async deleteFile(fileName: string) {
    const pathToFile = 'uploads/' + fileName;
    if (fs.existsSync(pathToFile)) {
      fs.unlinkSync(pathToFile);
    }
    return 'ok';
  }
}
