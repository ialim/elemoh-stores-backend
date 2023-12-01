import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { OrderableAsset } from 'src/core/assets/entities/orderable-asset.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Collection } from './collection.entity';

@InputType('CollectionAssetInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class CollectionAsset extends OrderableAsset {
  @Field((type) => Number)
  @Column()
  @IsNumber()
  collectionId: number;

  @Field((type) => Collection)
  @ManyToOne((type) => Collection, (collection) => collection.assets, {
    onDelete: 'CASCADE',
  })
  collection: Collection;
}
