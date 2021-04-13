import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionAsset } from './entities/collection-asset.entity';
import { Collection } from './entities/collection.entity';

@Module({ imports: [TypeOrmModule.forFeature([Collection, CollectionAsset])] })
export class CollectionsModule {}
