import { Module } from '@nestjs/common';
import { PrepareAdsService } from './prepare-ads.service';
import { PrepareAdsController } from './prepare-ads.controller';
import { PrepareAdsSchema } from './schemas/prepareAds.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'PrepareAds', schema: PrepareAdsSchema },
    ]),
  ],
  providers: [PrepareAdsService],
  controllers: [PrepareAdsController],
})
export class PrepareAdsModule {}
