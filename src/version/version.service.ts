import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Version } from './schemas/version.schema';

@Injectable()
export class VersionService {
  constructor(
    @InjectModel(Version.name) private versionModel: Model<Version>,
  ) {}

  async createVersion(
    currentVersion: string,
    description: string,
  ): Promise<Version> {
    const newVersion = new this.versionModel({ currentVersion, description });
    return newVersion.save();
  }

  async getLatestVersion(): Promise<Version> {
    return this.versionModel.findOne().sort({ _id: -1 }).exec(); // Последняя запись по ID
  }
}
