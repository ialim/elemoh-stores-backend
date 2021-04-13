import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';

@Module({ imports: [TypeOrmModule.forFeature([Asset])] })
export class AssetsModule {}
