import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ImageUploadService {
  constructor() {}
  async getAllUploadsFiles() {
    return fs.readdirSync('imageUploads');
  }
}
