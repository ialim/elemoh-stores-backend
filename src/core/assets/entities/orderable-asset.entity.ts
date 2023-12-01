import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, ManyToOne } from 'typeorm';
import { Asset } from './asset.entity';

@ObjectType()
export abstract class OrderableAsset extends CoreEntity {
  @Field((type) => Number)
  @Column()
  @IsNumber()
  assetId: number;

  @Field((type) => Asset)
  @ManyToOne((type) => Asset, { eager: true, onDelete: 'CASCADE' })
  asset: Asset;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  position: number;
}
