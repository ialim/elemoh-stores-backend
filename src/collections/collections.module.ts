import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionAsset } from './entities/collection-asset.entity';
import { Collection } from './entities/collection.entity';
import { CollectionsService } from './collections.service';
import { CollectionsResolver } from './collections.resolver';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, CollectionAsset]),
    AssetsModule,
  ],
  providers: [CollectionsService, CollectionsResolver],
})
export class CollectionsModule {}
