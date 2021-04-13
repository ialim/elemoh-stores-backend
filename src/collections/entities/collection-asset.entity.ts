import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Collection } from './collection.entity';

@ObjectType()
@Entity()
export class CollectionAsset extends CoreEntity {
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
