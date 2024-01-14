import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AdsBoardSchema } from './schemas/adsboard.schema';
import { AdsboardController } from './adsboard.controller';
import { AdsboardService } from './adsboard.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'AdsBoard', schema: AdsBoardSchema }]),
  ],
  controllers: [AdsboardController],
  providers: [AdsboardService],
})
export class AdsboardModule {}
