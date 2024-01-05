import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor() {}
  async getAllUploadsFiles() {
    return fs.readdirSync('uploads');
  }
}
